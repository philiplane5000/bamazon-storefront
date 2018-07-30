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

    },

    displayInventory: displayInventory = (connection) => {
        console.log('POPULATING INVENTORY BELOW:');
        connection.query(`SELECT * FROM products`, function (err, results) {
            if (err) throw err;
            //
            logCleanResults(results);
        })
    },

    viewLowInventory: viewLowInventory = () => {
        console.log('YOU CLICKED: VIEW LOW INVENTORY');
    },

    addToInventory: addToInventory = () => {
        console.log('YOU CLICKED: ADD TO INVENTORY');
    },

    addNewProduct: addNewProduct = () => {
        console.log('YOU CLICKED ADD NEW PRODUCT');
    }


}