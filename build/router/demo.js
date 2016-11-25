let express  = require('express'),
	router   = express.Router(),
	base     = require('./base');
	Mock     = require('mockjs'),
	csrf     = require('csurf')({ cookie: true })

router.get('/', csrf, (req, res) => {
	let data  = Mock.mock({
	  "number|123.3": 1
	});
	//http://mockjs.com/examples.html
	
	//不支持加载默认文件
	res.render('demo/index', data);
});


module.exports = router;