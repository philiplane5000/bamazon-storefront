const result = require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const utils = require('./utils');
let managerPresent = true;

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

promptManager()

function promptManager() {

    if (managerPresent) {

        inquirer.prompt([{
            type: "list",
            message: "Hello Sir, please select from the following:",
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
            name: "command"
        }]).then(answers => {

            switch (answers.command) {
                case 'View Products for Sale':
                    utils.displayInventory(connection)
                    connection.end()
                    break;
                case 'View Low Inventory':
                    utils.viewLowInventory(connection)
                    connection.end()
                    break;
                case 'Add to Inventory':
                    promptForInventory(queryById);
                    // connection.end()
                    break;
                case 'Add New Product':
                    promptNewProduct(addNewProduct);
                    // connection.end()
                    break;
                case 'Exit':
                    managerPresent = false;
                    connection.end()
                    break;
                default:
                    console.log('Sorry, what was that?');
                    promptManager()
                    break;
            }

            // promptManager();

        })
    }
}

// MANAGER SPECIFIC FUNCTIONS://
// **************************//
function promptNewProduct(callback) {
    console.log("NEW PRODUCT INFORMATION:")
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

        callback(newProduct)
    })
}

function addNewProduct(product) {
    connection.query('INSERT INTO products SET ?', product, function (err, results) {
        if (err) throw err;
        console.log("\n****************************************************")
        console.log(`PRODUCT SUCCESSFULLY ADDED AND ASSIGNED ID NUMBER: ${results.insertId}`)
        console.log("****************************************************\n")
        connection.end()
    });
}

function promptForInventory(callback) {

    inquirer.prompt([
        {
            type: "input",
            message: "Please provide product ID number:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter total number of new products to add:",
            name: "num_added"
        }
    ]).then(answers => {

        let productID = answers.id;
        let stockToAdd = answers.num_added;

        callback(connection, productID, stockToAdd, updateInventory);

    })
}

function queryById(connection, ID, stockToAdd, callback) {

    connection.query("SELECT * FROM products WHERE ID = ?", [ID], function (err, results) {
        if (err) throw err;
        currentStock = results[0].stock;
        updatedStock = parseInt(currentStock) + parseInt(stockToAdd);
        callback(connection, ID, updatedStock)


    });
}

function updateInventory(connection, ID, updatedStock) {

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
            connection.end()
        });
}