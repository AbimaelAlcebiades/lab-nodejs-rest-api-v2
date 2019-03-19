module.exports = function (app) {

    let PagamentosDAO = app.src.models.PagamentosDAO;
    let pagamentosDAO = new PagamentosDAO();

    app.get('/pagamentos', (req, res) => {
        pagamentosDAO.list()
            .then(function (pagamentos) {
                res.send(pagamentos);
            }).catch(error => res.end(error));
    });

    app.get('/pagamento/:id', (req, res) => {
        let pagamento = {};
        pagamento.id = req.params.id;
        pagamentosDAO.getById(pagamento)
            .then(pagamentResponse => {
                if (pagamentResponse) {
                    res.send(pagamentResponse);
                } else {
                    res.status(404);
                    res.send(`Não foi encontrado pagamento com id ${pagamento.id}`);
                }
            }).catch(error => {
                res.send(error);
            });
    });

    app.get('/pagamentos/form', (req, res) => {
        res.marko(
            require('../views/pagamentos/form.marko')
        );
    });

    app.post("/pagamentos/pagamento", (req, res) => {
        let pagamento = req.body;

        req.assert('forma_de_pagamento', 'Forma de pagamento é obrigatória.').notEmpty();
        req.assert('valor', 'Valor é obrigatório e deve ser decimal.').notEmpty().isFloat();
        req.assert('moeda', 'Moeda é obrigatória e deve ter 3 caracteres').notEmpty().len(3, 3);

        let errors = req.validationErrors();
        if (errors) {
            res.status(400).send(errors);
        }

        pagamentosDAO.save(pagamento)
            .then((pagamentoCreated) => {
                res.location(`/pagamentos/pagamento/${pagamentoCreated.id}`)
                res.status(201).json(pagamentoCreated);
            }).catch(function (error) {
                res.status(500).send(error);
            });


        /*if (pagamento.forma_de_pagamento.name == 'credit_card') {
            let creditCard = pagamento.forma_de_pagamento.data;

            let clientCustomersCards = new app.services.CustomersCards();
            clientCustomersCards.authorize(creditCard, (error, request, response, authorizedCreditCard) => {
                if (error) {
                    res.status(400).send(error.body);
                }
                pagamento.forma_de_pagamento.data = authorizedCreditCard.dados_do_cartao;
                res.send(pagamento);
            });

            return;

            pagamento.data = new Date();

            pagamentosDAO.save(pagamento)
                .then(function (pagamentoCreated) {
                    console.log(pagamentoCreated);
                    res.location(`/pagamentos/pagamento/${pagamentoCreated.id}`)
                    //res.status(201).json(pagamentoCreated);
                }).catch(function (error) {
                    res.status(500).send(error);
                });
        } else {
            res.status(400).send('Forma de pagamentos não implementada');
        }*/

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
                if (pagamentoCreated) {
                    res.status(200).send(pagamentoCreated);
                } else {
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
                if (pagamentoDeleted) {
                    res.status(200);
                    res.end();
                } else {
                    res.status(404).send(`O id ${pagamento.id} não existe`);
                }
            }).catch(function (error) {
                res.status(500).send('Error');
            });

    });

}
