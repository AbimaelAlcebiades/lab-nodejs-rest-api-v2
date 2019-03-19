module.exports = function (app) {

    let ProductsDAO = app.src.models.ProductsDAO;
    let productsDAO = new ProductsDAO();

    app.get('/products', (req, res) => {

        productsDAO.list()
            .then(products => {

                res.format({
                    'json': function () {
                        res.send(products);
                    },

                    'html': function () {
                        return res.marko(
                            require('../views/products/list.marko'),
                            {
                                products: products
                            }
                        )
                    }
                });
            }).catch(error => console.log(error));
    });
}
