var fs      = require('fs'),
	express = require('express'),
	app     = express(),
	Mock    = require('mockjs');

app.use(express.static('demo/dest/'));

app.get('/grid', function (req, res) {
	var Random = Mock.Random,
		data   = Mock.mock({
			'rows|10': [{
				'id': '@integer(60, 1000)',
				'name': '@cname',
				'email': '@email',
				'address': '@region',
				'time': '@datetime'
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

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});