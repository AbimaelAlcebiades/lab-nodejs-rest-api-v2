let restifyClients = require('restify-clients');

let restifyClient = restifyClients.createJSONClient({
    url: 'http://localhost:3001',
    version: '~1.0'
});

class CustomersCards{
    
    constructor(){
        this._client = restifyClient;
    }

    authorize(card, callback){
        console.log('Consumindo serviço de cartões');
        this._client.post('/cartoes/autoriza', card, callback);
    }
}

module.exports = function() {
    return CustomersCards;
}