let db = require('../config/database');
let PagamentosDAO = require('../model/PagamentosDAO');

let pagamentosDAO = new PagamentosDAO(db);

module.exports = function (app) {

    app.get("/pagamentos", function (req, res) {
        res.end("OK");
    });

    app.post("/pagamentos/pagamento", function (req, res) {
        pagamentosDAO.save(req.body)
            .then(res.redirect('/')
            .catch(function(error){
                console.log(error);
            }));
        res.end("OK");
    });

}
