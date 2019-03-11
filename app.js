let configExpress = require('./src/config/custom-express');

let app = configExpress();

let host = 'localhost';
let port = 3000;

app.listen(port, host, function(){
    console.log(`Servidor rodando em http://${host}:${port}`);
});



