let express = require('express');
let consign = require('consign');

let app = express();

consign().include('src\\controllers').into(app);

module.exports = function(){
    return app;
};