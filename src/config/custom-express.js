let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

consign({cwd: "src"})
    .include('models')
    .then('controllers')
    .into(app);

module.exports = function () {
    return app;
};