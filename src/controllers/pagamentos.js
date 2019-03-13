let db = require('../config/database');
// let PagamentosDAO = require('../model/PagamentosDAO');

module.exports = function (app) {
    let pagamentosDAO = new app.model.PagamentosDAO(db);
    
    app.get('/pagamentos', function (req, res) {
        pagamentosDAO.list()
        .then(function (pagamentos) {
            console.log(pagamentos);
        }).catch(error => console.log(error));
        res.end('OK');
    });

    app.get('/pagamento/:id', function (req, res) {
        pagamentosDAO.getById(req.params.id)
            .then(pagamentos => {
               console.log(pagamentos);
               res.end('ok');
            }).catch(error => {
                console.log(error);
                res.end('ok');
            });
    });

    app.post("/pagamentos/pagamento", function (req, res) {
        pagamentosDAO.save(req.body)
            .then(res.redirect('/'))
            .catch(function (error) {
                console.log(error);
            });
    });

    // app.post('/pagamentos/pagamento', function (req, res) {
    //     pagamentosDAO.save(req.body)
    //         .then(res.redirect('/'))
    //         .catch(error => console.log(error));
    // });

}
