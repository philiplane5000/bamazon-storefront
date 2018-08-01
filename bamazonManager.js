// const result = require('dotenv').config();
const utils = require('./assets/js/utils');

utils.promptManager()

//WILL MOVE TO UTILS:
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