let db = require('../config/database');

class PagamentosDAO {

    constructor() {
        this._db = db;
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
            this._db.run(
                `INSERT INTO
                    pagamentos(forma_de_pagamento, valor, moeda, status, data, descricao)
                VALUES
                    (:forma_de_pagamento, :valor, :moeda, :status, :data, :descricao)`,
                [pagamento.forma_de_pagamento, pagamento.valor, pagamento.moeda, pagamento.status, pagamento.data, pagamento.descricao],
                function (error) {
                    if (error) {
                        console.log(error);
                        return reject('Não foi possível salvar o pagamento!');
                    }
                    console.log("Pagamento salvo")
                    pagamento.id = this.lastID;
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
                ":status": pagamento.status
            };
            
            let st = this._db.prepare(sql);

            st.run( binds, (error) => {
                if(error){
                    reject(error);
                }

                if(st.changes == 0){
                    pagamento = null
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

            st.run( binds, (error) => {
                if(error){
                    reject(error);
                }

                if(st.changes == 0){
                    pagamento = null
                }
                
                resolve(pagamento);
            });
        });
    }
}

module.exports = function () {
    return PagamentosDAO;
}