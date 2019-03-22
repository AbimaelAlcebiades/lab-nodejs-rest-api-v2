let fs = require('fs');

fs.readFile('teste.txt', (err, buffer) => {
    console.log('Lendo arquivo');

    fs.writeFile('testeEscrevendo.txt', buffer, (err) => {
        console.log('Escrevendo arquivo');
    });
});