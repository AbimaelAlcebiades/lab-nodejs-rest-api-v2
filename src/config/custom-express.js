require('marko/node-require');

let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let markoExpress = require('marko/express');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(markoExpress());

app.use(
    '/bootstrap',
    express.static('node_modules/bootstrap/dist'),
);

app.use(
    '/public',
    express.static('src/app/public'),
);

app.use(
    '/jquery',
    express.static('node_modules/jquery/dist'),
);

consign()
    .include('services')
    .include('src/models')
    .then('src/controllers')
    .into(app);


module.exports = function () {
    return app;
};