let db = require('../config/database');

const PAYMENT_CREATED = 'CRIADO';
const PAYMENT_CONFIRMED = 'CONFIRMADO';
const PAYMENT_CANCELED = 'CANCELADO';
class PagamentosDAO {

    constructor() {
        this._db = db;
    }

    getById(pagamento) {
        return new Promise((resolve, reject) =>
            this._db.get(
                `SELECT
                    *
                FROM
                    pagamentos
                WHERE
                    id = ?`,
                [pagamento.id],
                (error, results) => {
                    if (error) {
                        return reject('Não foi possivel recuperar o pagamento');
                    }
                    return resolve(results);
                }
            )
        );
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM pagamentos',
                function (error, results) {
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
            console.log('Gravando pagamento...\n', pagamento);
            pagamento.status = PAYMENT_CREATED;
            pagamento.data = new Date();
            this._db.run(
                `INSERT INTO
                    pagamentos(forma_de_pagamento, valor, moeda, status, data, descricao)
                VALUES
                    (:forma_de_pagamento, :valor, :moeda, :status, :data, :descricao)`,
                [pagamento.forma_de_pagamento.name, pagamento.valor, pagamento.moeda, pagamento.status, pagamento.data, pagamento.descricao],
                function (error) {
                    if (error) {
                        reject(`Não foi possível salvar o pagamento. ${error}`);
                    }
                    pagamento.id = this.lastID;
                    pagamento.links = [
                        {
                            href: `localhost:3000\pagamentos\pagamento\${pagamento.id}`,
                            rel: 'confirm',
                            method: 'PUT'
                        },
                        {
                            href: `localhost:3000\pagamentos\pagamento\${pagamento.id}`,
                            rel: 'cancel',
                            method: 'DELETE'
                        }
                    ]

                    resolve(pagamento);
                }
            )
        });
    }

    update(pagamento) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE
                pagamentos
            SET
                status = :status
            WHERE
                id = :id`;

            let binds = {
                ":id": pagamento.id,
                ":status": PAYMENT_CONFIRMED
            };

            let st = this._db.prepare(sql);

            st.run(binds, (error) => {
                if (error) {
                    reject(error);
                }

                if (st.changes == 0) {
                    pagamento = null
                } else {
                    pagamento.links = [
                        {
                            href: `localhost:3000\pagamentos\pagamento\${pagamento.id}`,
                            rel: 'list',
                            method: 'GET'
                        }
                    ]
                }

                resolve(pagamento);
            });
        });
    }

    delete(pagamento) {
        return new Promise((resolve, reject) => {
            let sql =
                `DELETE FROM
                pagamentos
            WHERE
                id = :id`;

            let binds = {
                ":id": pagamento.id
            };

            let st = this._db.prepare(sql);

            st.run(binds, (error) => {
                if (error) {
                    reject(error);
                }

                if (st.changes == 0) {
                    pagamento = null
                } else {
                    pagamento.status = PAYMENT_CANCELED;
                }

                resolve(pagamento);
            });
        });
    }
}

module.exports = function () {
    return PagamentosDAO;
}