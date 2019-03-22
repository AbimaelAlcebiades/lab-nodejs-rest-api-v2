let fileSystem = require('fs');

module.exports = (app) => {
    app.post('/upload/image', (req, res) => {
        console.log('Lendo...');

        let fileName = req.headers.filename;

        req.pipe(fileSystem.createWriteStream(`utils/${fileName}`))
            .on('finish', () => {
                res.status(201);
                res.end('MINHA REPOSTA');
            });

    })
};