const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const PAGAMENTOS_SCHEMA =
    `CREATE TABLE IF NOT EXISTS pagamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    forma_de_pagamento VARCHAR(255) NOT NULL,
    valor decimal(10,2) NOT NULL,
    moeda varchar(3) NOT NULL,
    status varchar(255) NOT NULL,
    data DATE,
    descricao text
)`;

const PRODUCTS_SCHEMA =
    `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR(255) NOT NULL,
    price decimal(10,2) NOT NULL,
    currency varchar(3) NOT NULL
)`;

const INSERT_PRODUCT_1 =
`INSERT INTO products (
    name, 
    price,
    currency
) SELECT 
    'Produto 1', 10.0, 'BRL'
  WHERE 
    NOT EXISTS (
        SELECT 
            *
        FROM 
            products
        WHERE 
            name = 'Produto 1'
    )
`;

const INSERT_PRODUCT_2 =
`INSERT INTO products (
    name, 
    price,
    currency
) SELECT 
    'Produto 2', 30.0, 'BRL'
  WHERE 
    NOT EXISTS (
        SELECT 
            *
        FROM 
            products
        WHERE 
            name = 'Produto 2'
    )
`;

const INSERT_PRODUCT_3 =
`INSERT INTO products (
    name, 
    price,
    currency
) SELECT 
    'Produto 3', 60.0, 'BRL'
  WHERE 
    NOT EXISTS (
        SELECT 
            *
        FROM 
            products
        WHERE 
            name = 'Produto 3'
    )
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(PAGAMENTOS_SCHEMA);
    db.run(PRODUCTS_SCHEMA);
    db.run(INSERT_PRODUCT_1);
    db.run(INSERT_PRODUCT_2);
    db.run(INSERT_PRODUCT_3);
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = db;