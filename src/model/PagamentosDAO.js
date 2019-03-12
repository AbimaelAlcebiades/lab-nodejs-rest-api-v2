class PagamentosDAO {

    constructor(db) { 
        console.log(db);   
        this._db = db;
    }

    save(pagamento) {
        return new Promise(function (resolve, reject) {
            this._db.run(
                `INSERT INTO
                    pagamentos
                SET
                    ?`,
                pagamento,
                (error) => {
                    if (error) {
                        console.log(error);
                        return reject('Não foi possível salva o pagamento!');
                    }
                    resolve();
                }
            )
        });
    }
}

module.exports = PagamentosDAO;