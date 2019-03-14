let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
require('./database');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

consign({cwd: "src"})
    .include('models')
    .then('controllers')
    .into(app);

module.exports = function () {
    return app;
};