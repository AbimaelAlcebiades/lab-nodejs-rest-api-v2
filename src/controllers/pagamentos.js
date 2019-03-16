module.exports = function (app) {

    let pagamentosDAO = new app.models.PagamentosDAO();

    app.get('/pagamentos', function (req, res) {
        pagamentosDAO.list()
            .then(function (pagamentos) {
                res.send(pagamentos);
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
        console.log('Validando dados de entrada...');

        req.assert('forma_de_pagamento', 'Forma de pagamento é obrigatória.').notEmpty();
        req.assert('valor', 'Valor é obrigatório e deve ser decimal.').notEmpty().isFloat();
        req.assert('moeda', 'Moeda é obrigatória e deve ter 3 caracteres').notEmpty().len(3, 3);

        let errors = req.validationErrors();
        if (errors) {
            console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
        }

        console.log('Processando pagamento...');
        pagamento.status = "CREATED";
        pagamento.data = new Date();

        pagamentosDAO.save(pagamento)
            .then(function (pagamentoCreated) {
                console.log(pagamentoCreated);
                res.location(`/pagamentos/pagamento/${pagamentoCreated.id}`)
                res.status(201).json(pagamentoCreated);
            }).catch(function (error) {
                console.log(error);
            });
    });

    app.put('/pagamentos/pagamento/:id', (req, res) => {
        
        req.assert('id', 'Id de pagamento deve ser um inteiro.').isInt();
        let errors = req.validationErrors();
        if (errors) {
            console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
        }

        let pagamento = {};
        pagamento.id = req.params.id;
        pagamento.status = "CONFIRMADO";

        pagamentosDAO.update(pagamento)
            .then(function (pagamentoCreated) {
                if(pagamentoCreated){
                    res.status(200).send(pagamentoCreated);
                }else{
                    res.status(404).send(`O id ${pagamento.id} não existe`);
                }
            }).catch(function (error) {
                res.status(500).send('Error');
            });
    });

    app.delete('/pagamentos/pagamento/:id', (req, res) => {
        req.assert('id', 'Id de pagamento deve ser um inteiro.').isInt();
        let errors = req.validationErrors();
        if (errors) {
            console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
        }

        let pagamento = {};
        pagamento.id = req.params.id;

        pagamentosDAO.delete(pagamento)
            .then(function (pagamentoDeleted) {
                if(pagamentoDeleted){
                    res.status(200);
                    res.end();
                }else{
                    res.status(404).send(`O id ${pagamento.id} não existe`);
                }
            }).catch(function (error) {
                res.status(500).send('Error');
            });

    });

}
