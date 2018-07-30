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

    },

    logFivePlusTwo() {
        console.log(5 + 2);
    }
}