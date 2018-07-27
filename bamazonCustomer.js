const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Jeffabrick-3',
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //
    displayInventory();
    promptUser();
})

displayInventory = () => {
    console.log('POPULATING INVENTORY BELOW...')
    connection.query('SELECT * from products', function (err, results) {
        if (err) throw err;
        logCleanResults(results);
    })
}

promptUser = () => {

    inquirer.prompt([
        {
            type: "input",
            message: "\nEnter ID of the product you would like to buy:",
            name: "item_id"
        },
        {
            type: "input",
            message: "\nEnter quantity you would like to purchase:\n",
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
                // logCleanResults(results);
                console.log('RUNNING TRANSACTION...');

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock: stockPostTransaction
                        },
                        {
                            id: answers.item_id
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log('TRANSACTION COMPLETED');
                        console.log('YOU PAID: $' + orderPrice + '.00');
                        promptUser();
                    }
                )
            } else {
                console.log('INSUFFICIENT QUANITTY:');
                logCleanResults(results);
                promptUser()
            }
        });

    })

}

// utils //
//*******//

logCleanResults = (results) => {
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
        console.log('***END-INVENTORY***')
        console.log('*******************')
        console.log('Press `DOWN ARROW` to continue...')
    } else {
        console.log(`
        *********************************
        Item-ID: ${results[0].ID}
        Product-Name: ${results[0].product_name}
        Price: $${results[0].price}.00
        Stock: ${results[0].stock}
        *********************************
        `);
        // console.log('Press `DOWN ARROW` to continue...')
    }

}

