let db = require('../config/database');

class ProductsDAO {

    constructor() {
        this._db = db;
    }

    getById(product) {
        return new Promise((resolve, reject) =>
            this._db.get(
                `SELECT
                    *
                FROM
                    products
                WHERE
                    id = ?`,
                [product.id],
                (error, product) => {
                    if (error) {
                        return reject('Não foi possível recuperar o produto');
                    }
                    return resolve(product);
                }
            )
        );
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM products',
                function (error, products) {
                    if (error) {
                        return reject('Não foi possível listar os produtos');
                    }
                    return resolve(products);
                }
            )
        });
    }
}

module.exports = function () {
    return ProductsDAO;
}