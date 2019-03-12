const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('data.db');

const PAGAMENTOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS pagamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    forma_de_pagamento VARCHAR(255) NOT NULL,
    valor decimal(10,2) NOT NULL,
    moeda varchar(3) NOT NULL,
    status varchar(255) NOT NULL,
    data DATE,
    descricao text
)
`;

bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
    bd.run(PAGAMENTOS_SCHEMA);
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;