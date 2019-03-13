const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

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

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(PAGAMENTOS_SCHEMA);
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = db;