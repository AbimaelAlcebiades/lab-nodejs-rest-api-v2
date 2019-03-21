module.exports = function (app) {

    app.post('/correios/calculo-prazo', function (req, res) {
        let dadosDaEntrega = req.body;

        let correiosSOAPClient = new app.services.CorreiosSOAPClient();
        correiosSOAPClient.calculaPrazo(dadosDaEntrega, function (erro, resultado) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log('prazo calculado');
            res.json(resultado);
        });

    });
}