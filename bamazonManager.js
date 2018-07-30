const mysql = require('mysql');
const inquirer = require('inquirer');

let managerPresent = true;

const connection = mysql.createConnection({
    host: 'bamazon-west-coast.cpzqdqagzv5q.us-west-1.rds.amazonaws.com',
    port: 3306,
    user: 'mysqladmin5000',
    password: 'pZ3M008#',
    database: 'bamazon'
})


promptManager()

function promptManager() {

    if (managerPresent) {
        
        inquirer.prompt([
            {
                type: "list",
                message: "Hello Sir, please select from the following:",
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
                name: "command"
            }
        ]).then(answers => {
            console.log(answers.command);
            managerPresent = false;

            connection.connect(function (err) {
                if (err) throw err;
                console.log("\n" + "connected as id " + connection.threadId);
                console.log("*********************************************" + "\n");
                //functions here:
            })
        })

    }


}