var express = require('express'),
	app     = express(),
	Mock    = require('mockjs');


app.get('/grid', function (req, res) {
	var Random = Mock.Random,
		data   = Mock.mock({
			'rows|10': [{
				'id': '@integer(60, 1000)',
				'name': '@cname',
				'email': '@email',
				'address': '@region',
				'time': '@datetime',
				'tel': '@integer(13000000000, 13900000000)',
				'type': '@integer(1, 5)',
				'sex': '@integer(0, 1)'
			}],
			'total': 50
		});
	
	res.send( JSON.stringify(data, null, 4) );
});

app.get('/common/search_travelagency', function (req, res) {
	var Random = Mock.Random,
		data   = [],
		dataFn = function(){
			return Mock.mock({
				'id': '@integer(60, 1000)',
				'name': '@cname'
			});
		}
		
	for(var i = 0; i<20; i++){
		data.push( dataFn() );
	}
		
	res.send( JSON.stringify(data, null, 4) );
});

app.put('/put', function (req, res) {
	res.send( JSON.stringify([], null, 4) );
});

app.del('/del', function (req, res) {
	res.send( JSON.stringify([], null, 4) );
});


module.exports = app;
