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

connection.connect(function (err) {
    if (err) throw err;
    //functions here:
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
            switch (answers.command) {
                case 'View Products for Sale':
                    viewProducts()
                break;
                case 'View Low Inventory':
                    viewLowInventory()
                break;
                case 'Add to Inventory':
                    addToInventory()
                break;
                case 'Add New Product':
                    addNewProduct()
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

function viewProducts() {

    connection.query(`SELECT * FROM products`, function(err, results) {
        if (err) throw err;
        //
        console.log(results);
    })
    // console.log('VIEW PRODUCTS');


}


function viewLowInventory() {
    console.log('VIEW LOW INVENTORY');
}

function addToInventory() {
    console.log('ADD TO INVENTORY');
}

function addNewProduct() {
    console.log('ADD NEW PRODUCT');
}