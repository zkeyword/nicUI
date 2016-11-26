module.exports = app => {

    app.use('/', require('./home'));

    app.use((err, req, res, next) => {
        res.status(500);
        next();
    });

    app.use((req, res, next) => {
        res.status(404);
        next();
    });

};
