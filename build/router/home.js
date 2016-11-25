const express  = require('express'),
	  router   = express.Router(),
	  base     = require('./base');

router.get('/',function(req,res){
	let data = { title: 'index', appContext: 121 }
	
	res.render('error', data);
});

module.exports = router;