let fileSystem = require('fs');

fileSystem.createReadStream('teste.txt')
    .pipe(fileSystem.createWriteStream('testeWithStream.txt'))
    .on('finish', ()=>{
        console.log('arquivo escrito com stream');
    });
