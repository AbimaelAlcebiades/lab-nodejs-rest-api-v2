module.exports = function (app) {

    let pagamentosDAO = new app.models.PagamentosDAO();

    app.get('/pagamentos', function (req, res) {
        pagamentosDAO.list()
            .then(function (pagamentos) {
                res.end(JSON.stringify(pagamentos));
            }).catch(error => res.end(error));
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
        let pagamento = req.body;
        console.log('Processando pagamento...');

        pagamento.status = "CREATED";
        pagamento.data = new Date();

        pagamentosDAO.save(req.body)
            .then(function (pagamentoCreated) {
                res.json(pagamentoCreated);
            }).catch(function (error) {
                console.log(error);
            });
    });

}
