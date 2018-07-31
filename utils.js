// const inquirer = require('inquirer');

module.exports = {

    logCleanResults: logCleanResults = (results) => {
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
        } else {
            console.log(`
            *********************************
            Item-ID: ${results[0].ID}
            Product-Name: ${results[0].product_name}
            Price: $${results[0].price}.00
            Stock: ${results[0].stock}
            *********************************
            `);
        }

    },

    displayInventory: displayInventory = (connection) => {
        console.log('POPULATING INVENTORY BELOW:');
        connection.query(`SELECT * FROM products`, function (err, results) {
            if (err) throw err;
            //
            logCleanResults(results);
        })
    },

    runTransaction: runTransaction = (connection, stockPostTransaction, orderPrice, ID) => {
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
                console.log('YOU PAID: $' + orderPrice + '.00');
                return;
            }
        )

    },

    viewLowInventory: viewLowInventory = (connection) => {
        connection.query(
            "SELECT * FROM products WHERE (stock < 5)",
            function (err, response) {
                if (err) throw err;
                console.log('\n' + 'ITEMS BELOW 5 STOCK:');
                logCleanResults(response);
                return;
            }
        )
    },

    addToInventory: addToInventory = (connection) => {
        console.log('YOU CLICKED ADD TO INVENTORY');
    },

    addNewProduct: addNewProduct = () => {
        console.log('YOU CLICKED ADD NEW PRODUCT');
    },

}