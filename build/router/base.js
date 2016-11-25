const path       = require('path');
const Freemarker = require('freemarker.js');
const minify     = require('html-minifier').minify;
const fs         = require('fs');
const co         = require('co');
const cheerio    = require('cheerio');
const _          = require('lodash');

let base = {};
let fm	 = new Freemarker({
	viewRoot: path.join(__dirname, "../views")
});
let devPath   = path.join(__dirname, "../viewsDev") + '/';
let bulidPath = path.join(__dirname, "../views") + '/';

let conf = {
}

let defParam = {
	title: '测试title数据',
	appContext:{},
	fromNuoMi: false
}

base.render = (req, res, next) => {
	
	let render = (req, res, tpl, data) => {

		let body,
			ua       = req.get('User-Agent'),
			rendFile = next => {
				fs.readFile(devPath + tpl, 'utf-8', (err, str) => {
					if (err) throw err;
					
					let regText  = 'url|bainuo|cdn|master|js|css|body',
						reg      = new RegExp('<@('+ regText +')(.+?)>', 'g'),
						$        = cheerio.load( str.replace(reg, '<z$1 $2></z$1>'), {decodeEntities: false} ),
						fHost    = str => {
							let s = conf[str];
							
							if( s.indexOf(',') !== -1 ){
								let a = s ? s.split(',') : [],
									r = Math.ceil(Math.random()*a.length);
								s = a[r-1];
							}
							
							return 'http://' + s;
						},
						fhaddle  = (name, val, result) => {
							let reg = new RegExp('<@'+ name +'(.+?)(' + val + ')(.+?)\/>', 'g');
							str = str.replace(reg, result);
						},
						fReplace = obj => {
							for(let i = 0, len = obj.length; i<len; i++){
								let item  = obj[i],
									oItem = obj.eq(i);
								switch ( item.name ){
									case 'zurl':
										fhaddle('url', oItem.attr('value'), oItem.attr('value'));
										break;
									case 'zjs':
										fhaddle('js', oItem.attr('src'), '<script src="'+ fHost(oItem.attr('servername')) + oItem.attr('src') +'"></script>');
										break;
									case 'zcss':
										fhaddle('css', oItem.attr('href'), '<link href="'+ fHost(oItem.attr('servername')) + oItem.attr('href') +'" rel="stylesheet"/>');
										break;
									case 'zcdn':
										//oItem.after('<link type="text/css" rel="stylesheet" href="'+ fHost(oItem.attr('servername')) + oItem.attr('href') +'"/>');
										console.error('render未写逻辑');
										break;
									case 'zbainuo':
										//oItem.after('<link type="text/css" rel="stylesheet" href="'+ fHost(oItem.attr('servername')) + oItem.attr('href') +'"/>');
										console.error('render未写逻辑');
										break;
									case 'zmaster':
										//oItem.after('<link type="text/css" rel="stylesheet" href="'+ fHost(oItem.attr('servername')) + oItem.attr('href') +'"/>');
										console.error('render未写逻辑');
										break;
									case 'zbody':
										//oItem.after('<link type="text/css" rel="stylesheet" href="'+ fHost(oItem.attr('servername')) + oItem.attr('href') +'"/>');
										console.error('render未写逻辑');
										break;
								}
							}
						};
						
					for(let i = 0, arr = regText.split('|'), len = arr.length; i<len; i++){
						let obj = $('z' + arr[i]);
						obj.length && fReplace( obj );
					}
					
					//body = $.html();
					str = str.replace(/\#noescape/g, 'noescape');
					body = str;
					
					next();
				});
			},
			writeFile = next => {
				fs.writeFile(bulidPath + tpl, body, function (err) {
					if (err) throw err;
					next();
				});
			};

		co(function *(){
			yield rendFile;
			yield writeFile;
		}).then(function (value) {
			defParam.appContext.fromApp = /from-app/.test(ua);
			res.type('html');
			res.send( fm.renderSync(tpl, _.assignIn(defParam, data)) );
			body = null;
		}, function (err) {
			console.error(err.stack);
			res.end();
		});
		
	};
	
	res._render = res.render;

	res.render = (view, options, fn) => {
		if( !/\.ftl/g.test(view) ) view = view + '.ftl';
		render(req, res, view, options);
	};

	next();
};

base.auth = (req, res, next) => {
	console.log('auth')
	next();
}


base.compress = () => {
	return (req, res, next) => {
		let send = res.send;
		res.send = (body) => {
		if('string' == typeof body)
			body = minify(body,{
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				removeScriptTypeAttributes: true,
				removeEmptyAttributes: true
			});
			send.call(res, body);
		}
		next();
	}
};

base.getClientIp = req => {
	return req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
};

module.exports = base;
