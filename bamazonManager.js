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
    //functions here:
})

promptManager()

function promptManager() {

    if (managerPresent) {

        inquirer.prompt([{
            type: "list",
            message: "Hello Sir, please select from the following:",
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            name: "command"
        }]).then(answers => {
            console.log(answers.command);
            switch (answers.command) {
                case 'View Products for Sale':
                    utils.displayInventory(connection)
                    break;
                case 'View Low Inventory':
                    utils.viewLowInventory()
                    break;
                case 'Add to Inventory':
                    utils.addToInventory()
                    break;
                case 'Add New Product':
                    utils.addNewProduct()
                    break;
                default:
                    console.log('Sorry, what was that?');
                    promptManager()
                    break;
            }

            managerPresent = false;

        })
    }
}