const express  = require('express'),
	  router   = express.Router();

router.get('/',function(req,res){
	let data = { title: 'index', appContext: 121 }
	
	res.render('index', data);
});

module.exports = router;