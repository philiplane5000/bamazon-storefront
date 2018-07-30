const mysql = require('mysql');
const inquirer = require('inquirer');
const utils = require('./utils');

const connection = mysql.createConnection({
    host: 'bamazon-west-coast.cpzqdqagzv5q.us-west-1.rds.amazonaws.com',
    port: 3306,
    user: 'mysqladmin5000',
    password: 'pZ3M008#',
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) throw err;
    utils.displayInventory(connection);
    promptShopper();
})

promptShopper = () => {

    inquirer.prompt([{
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
            let id = answers.item_id;
            let quantityWanted = answers.quantity_wanted;
            let stockPriorTransaction = results[0].stock;
            let itemPrice = results[0].price;
            let orderPrice = itemPrice * quantityWanted;

            if (stockPriorTransaction - quantityWanted >= 0) {
                let stockPostTransaction = (stockPriorTransaction - quantityWanted);
                console.log('RUNNING TRANSACTION...');
                utils.runTransaction(connection, stockPostTransaction, orderPrice, id);
                connection.end();
                // promptShopper();
            } else {
                console.log('INSUFFICIENT QUANITTY:');
                utils.logCleanResults(results);
                // promptShopper()
                connection.end();
            }
        });

    })

}