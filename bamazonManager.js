const mysql = require('mysql');
const inquirer = require('inquirer');
const utils = require('./utils');
let managerPresent = true;

const connection = mysql.createConnection({
    host: 'bamazon-west-coast.cpzqdqagzv5q.us-west-1.rds.amazonaws.com',
    port: 3306,
    user: 'mysqladmin5000',
    password: 'pZ3M008#',
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
                    // connection.end()
                    break;
                case 'View Low Inventory':
                    utils.viewLowInventory(connection)
                    // connection.end()
                    break;
                case 'Add to Inventory':
                    utils.addToInventory(connection)
                    // connection.end()
                    break;
                case 'Add New Product':
                    utils.addNewProduct(connection)
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

            promptManager();

        })
    }
}