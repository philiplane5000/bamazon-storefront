const result = require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bamazon-west-coast.cpzqdqagzv5q.us-west-1.rds.amazonaws.com',
    port: 3306,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) throw err;
})

module.exports = {

    promptShopper: promptShopper = () => {
        inquirer.prompt([
            {
                type: "list",
                message: "Welcome to Bamazon!",
                choices: ["Shop Products", "Exit"],
                name: "command"
            }
        ]).then(answers => {
            switch (answers.command) {
                case 'Shop Products':
                    displayInventory(addToCart);
                    break;
                case 'Exit':
                    connection.end()
                    break;
                default:
                    console.log('Sorry, what was that?');
                    promptShopper()
                    break;
            }
        })
    },

    addToCart: addToCart = () => {
        inquirer.prompt([{
            type: "input",
            message: "Enter ID of the product you would like to buy:",
            name: "item_id"
        },
        {
            type: "input",
            message: "Enter quantity you would like to purchase:",
            name: "quantity_wanted"
        }
        ]).then(answers => {
            connection.query(`SELECT * FROM products WHERE ID = ${answers.item_id}`, function (error, results) {
                if (error) throw err;
                let quantityWanted = answers.quantity_wanted;
                let stockPriorTransaction = results[0].stock;
                let itemPrice = results[0].price;
                let orderPrice = itemPrice * quantityWanted;

                if (stockPriorTransaction - quantityWanted >= 0) {
                    let stockPostTransaction = (stockPriorTransaction - quantityWanted);
                    console.log('RUNNING TRANSACTION...');
                    runTransaction(stockPostTransaction, orderPrice, answers.item_id, promptShopper);
                } else {
                    console.log('INSUFFICIENT QUANITTY:');
                    logCleanResults(results, promptShopper);
                }
            });
        })
    },

    runTransaction: runTransaction = (stockPostTransaction, orderPrice, ID, callback) => {
        connection.query(
            "UPDATE products SET ? WHERE ?", [{
                stock: stockPostTransaction
            },
            {
                id: ID
            }
            ],
            function (err) {
                if (err) throw err;
                console.log('\n' + 'TRANSACTION COMPLETED');
                console.log('YOU PAID: $' + orderPrice + '.00\ncl');
                callback();
                return;
            }
        )

    },

    promptManager: promptManager = () => {

        inquirer.prompt([
            {
                type: "list",
                message: "Hello Sir, please select from the following:",
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
                name: "command"
            }
        ]).then(answers => {

            switch (answers.command) {
                case 'View Products for Sale':
                    displayInventory(promptManager)
                    // connection.end()
                    break;
                case 'View Low Inventory':
                    viewLowInventory(promptManager)
                    // connection.end()
                    break;
                case 'Add to Inventory':
                    addToInventory(restoreStockByID);
                    break;
                case 'Add New Product':
                    promptNewProduct(addNewProduct);
                    break;
                case 'Exit':
                    connection.end()
                    break;
                default:
                    console.log('Sorry, what was that?');
                    promptManager()
                    break;
            }

        })
    },

    displayInventory: displayInventory = (callback) => {
        console.log('POPULATING INVENTORY BELOW:');
        connection.query(`SELECT * FROM products`, function (err, results) {
            if (err) throw err;
            //
            logCleanResults(results);
            callback();
        })
    },

    viewLowInventory: viewLowInventory = (callback) => {
        connection.query(
            "SELECT * FROM products WHERE (stock < 5)",
            function (err, response) {
                if (err) throw err;
                console.log('\n' + 'ITEMS BELOW 5 STOCK:');
                logCleanResults(response);
                callback();
                return;
            }
        )
    },

    logCleanResults: logCleanResults = (results, callback) => {
        if (results.length > 1) {

            results.forEach(product => {
                console.log(`
                *********************************
                Item-ID: ${product.ID}
                Product-Name: ${product.product_name}
                Price: $${product.price}.00
                Stock: ${product.stock}
                *********************************
                `);
            })
            console.log('*********************END-INVENTORY***************')
            console.log('*************************************************')
            if (!(callback === undefined || callback === null)) {
                callback()
            }
        } else {
            console.log(`
            *********************************
            Item-ID: ${results[0].ID}
            Product-Name: ${results[0].product_name}
            Price: $${results[0].price}.00
            Stock: ${results[0].stock}
            *********************************
            `);
            if (!(callback === undefined || callback === null)) {
                callback()
            }
        }

    },

    addToInventory: addToInventory = (callback) => {
        inquirer.prompt([
            {
                type: "input",
                message: "Please provide product ID number:",
                name: "id"
            },
            {
                type: "input",
                message: "Enter total number of new products to add:",
                name: "addStockNum"
            }
        ]).then(answers => {
            callback(answers.id, answers.addStockNum, updateInventory);
        })
    },

    restoreStockByID: restoreStockByID = (ID, stockToAdd, callback) => {
        connection.query("SELECT * FROM products WHERE ID = ?", [ID], function (err, results) {
            if (err) throw err;
            currentStock = results[0].stock;
            updatedStock = parseInt(currentStock) + parseInt(stockToAdd);
            callback(ID, updatedStock, promptManager);
        });
    },

    updateInventory: updateInventory = (ID, updatedStock, callback) => {
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock: updatedStock
                },
                {
                    id: ID
                }
            ],
            function (err) {
                if (err) throw err;
                console.log("\n****************************************");
                console.log(`ITEM #${ID} RESTOCKED TO ${updatedStock}`);
                console.log("****************************************\n");
                callback();
            });
    },

    promptNewProduct: promptNewProduct = (callback) => {
        console.log("PROVIDE NEW PRODUCT INFORMATION:")

        inquirer.prompt([
            {
                type: "input",
                message: "Enter product name:",
                name: "product_name"
            },
            {
                type: "input",
                message: "Enter category/department name:",
                name: "dep_name"
            },
            {
                type: "input",
                message: "Enter product price:",
                name: "price"
            },
            {
                type: "input",
                message: "Enter initial product stock:",
                name: "stock"
            }
        ]).then(answers => {

            let newProduct = {
                product_name: answers.product_name,
                department_name: answers.dep_name,
                price: answers.price,
                stock: answers.stock
            }

            callback(newProduct, promptManager)
        })
    },

    addNewProduct: addNewProduct = (product, callback) => {
        connection.query('INSERT INTO products SET ?', product, function (err, results) {
            if (err) throw err;
            console.log("\n****************************************************")
            console.log(`PRODUCT SUCCESSFULLY ADDED AND ASSIGNED ID NUMBER: ${results.insertId}`)
            console.log("****************************************************\n")
            callback();
        });
    }

}