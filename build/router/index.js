let base = require('./base');

module.exports = app => {
	
	//app.use(base.auth());
	
	app.use(base.render);
	
	app.use('/', require('./home'));
	
	app.use('/demo', base.auth, require('./demo'));

	app.use((err, req, res, next) => {
		res.status(500);
		next();
	});
	
	app.use((req, res, next) => {
		res.status(404);
		next();
	});
	
};
