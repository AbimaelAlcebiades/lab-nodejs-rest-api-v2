module.exports = (app) => {
    
    app.get('/', (req, res) => {
        res.marko(
            require('../views/home/home.marko')
        );
    });

}
