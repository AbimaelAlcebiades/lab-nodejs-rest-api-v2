class PagamentosDAO {

    constructor(db) {
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM pagamentos',
                (error, results) => {
                    if (error) {
                        return reject('Não foi possível listar os livros');
                    }
                    return resolve(results);
                }
            )
        });
    }

    save(pagamento) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO
                    pagamentos(forma_de_pagamento, valor, moeda, status, data, descricao)
                VALUES
                    (?, ?, ?, ?, ?, ?)`,
                [pagamento.forma_de_pagamento, pagamento.valor, pagamento.moeda, pagamento.status, pagamento.data, pagamento.descricao],
                (error) => {
                    if (error) {
                        console.log(error);
                        return reject('Não foi possível adicionar o livro!');
                    }
                    resolve();
                }
            )
        });
    }

    getById(id) {
        return new Promise((resolve, reject) =>
            this._db.get(
                `SELECT
                    *
                FROM
                    pagamentos
                WHERE
                    id = ?`,
                [id],
                (error, results) => {
                    if (error) {
                        return reject('Não foi possivel recuperar o pagamento');
                    }
                    return resolve(results);
                }
            )
        );
    }
}

module.exports = PagamentosDAO;