'use strict';

/*载入jquery依赖*/
window.$ = require('jquery');

(function() {
	/**
	 * 针对原型的方法添加应用支持
	 */
	
	/**
	 * 获取中文长度
	 * @method getLength
	 */
	String.prototype.getLength = function(){
		return this.replace(/[^\x00-\xff]/g, "en").length; //若为中文替换成两个字母
	};
	
	/**
	 * 清空空格
	 * @method trims
	 * @return {String}
	 */
	String.prototype.trims = function(){
		return this.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "");
	};
	
	/**
	 * 转为unicode编码
	 * @method toUnicode
	 * @return {String}
	 */
	String.prototype.toUnicode = function(){
		return escape( this.toLocaleLowerCase() ).replace(/\%/gi, '\\') ;
	};
	
	/**
	 * 转为unicode编码
	 * @method unicodeTo
	 * @return {String}
	 */
	String.prototype.unicodeTo = function(){
		return unescape( this.toLocaleLowerCase().replace(/%u/gi, '\\') );
	};
	
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	Date.prototype.format = function(fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	
	/**
	 * 重写console
	 */
	if(!window.console){
		window.console = {};
	}
	if(!console.log){
		console.log = function(){};
	}
	
	/**
	 * 设定基本命名空间
	 * @namespace nic
	 * @author norion
	 * @blog http://zkeyword.com/
	 */
	var nic = window.nic || {};

	/*设定基本构架*/
	nic = {
		_INSTALL: function(){
			window.nic = nic;
		},
		base: {}, //基础层，所有的基础函数库，如cookie等
		ui: {},   //前端显示层，用来重构和回流DOM，前端的特效显示处理
		app:{}    //应用层，挂载一些应用的通用类。
	};
	
	nic._INSTALL();
}(window));

/*鼠标滚轮监听*/
/*(function($){
    $.fn.preventScroll = function(){
        var that = this[0];
        if($.browser.mozilla){
        	that.addEventListener('DOMMouseScroll',function(e){
        		that.scrollTop += e.detail > 0 ? 60 : -60;   
                e.preventDefault();
            },false); 
        }else{
        	that.onmousewheel = function(e){   
                e = e || window.event;   
                that.scrollTop += e.wheelDelta > 0 ? -60 : 60;   
                e.returnValue = false;  
            };
        }
        return this;
    };
})(jQuery);*/

/**
 * 基础函数库
 * @class nic.base 基础函数库
 * @author norion
 * @blog http://zkeyword.com/
 */
nic.base = {
	
	/**
	 * 判断是否是数组
	 * @method nic.base.isArray
	 * @param {Object} 数组对象
	 * @return {Boolean}
	 */
	isArray: function(o){
		return o ? jQuery.isArray(o) : false;
	},
	
	/**
	 * 判断是否是对象
	 * @method nic.base.isObject
	 * @param {Object} 字符串对象
	 * @return {Boolean}
	 */
	isObject: function(o){
		return o ? Object.prototype.toString.call(o) === "[object Object]" : false;
	},
	
	/**
	 * 判断是否是函数
	 * @method nic.base.isFunction
	 * @param {Function} Function对象
	 * @return {Boolean}
	 */
	isFunction: function(o){
		return o ? Object.prototype.toString.call(o) === "[object Function]" : false;
	},
	
	/**
	 * 判断是否是空值
	 * @method nic.base.isEmpty
	 * @param {Object} 对象
	 * @return {Boolean}
	 */
	isEmpty: function(){
		if( Object.keys ){
			return Object.keys(o)
		}else{
			if( obj == null) return true;
			if( obj.length > 0) return false;
			if( obj.length === 0) return true;
			for( var key in obj ){
				if( Object.prototype.hasOwnProperty.call(obj, key) ) return false;
			}
			return true;
		}
	},
	
	/**
	 * 获取浏览器 userAgent
	 * @method nic.base.browser
	 * @return {Object}
	 */
	browser: (function(){
		var na            = window.navigator,
			browserTester = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos)[ \/os]*([\d_.]+)/ig,
			ua            = na.userAgent.toLowerCase(),
			browser       = {
								platform: na.platform
							};
		ua.replace(browserTester, function(a, b, c) {
			var bLower = b.toLowerCase();
			if (!browser[bLower]) {
				browser[bLower] = c; 
			}
		});
		if( browser.msie ){
			browser.ie = browser.msie;
			var v = parseInt(browser.msie, 10);
			browser['ie' + v] = true;
		}	
		return browser;
	}()),
	
	/**
	 * cookie
	 * @method nic.base.cookie
	 */
	cookie: {

		/**
		 * 设置cookie
		 * @param {String} cookie的名称
		 * @param {String} cookie的值
		 * @param {String} cookie的有效期
		 * @param {String} cookie的域名
		 * @param {String} cookie存放的路径
		 * @return {Boolean}
		 */
		set: function(name, value, hour, domain, path){
			if( hour ){
				var today  = new Date(),
					expire = new Date();
				expire.setTime(today.getTime() + 36E5 * hour);
			}
			document.cookie = name + "=" + encodeURI(value) + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "");
			return true;
		},
		
		/**
		 * 获取cookie
		 * @param {String} cookie的名称
		 * @return {String} cookie的值
		 */
		get: function( name ){
			var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
				m = document.cookie.match(r);
				
			return unescape(decodeURI(!m ? "" : m[1]));
		},
		
		/**
		 * 删除cookie
		 * @param {String} cookie的名称
		 * @param {String} cookie的域名
		 * @param {String} cookie存放的路径
		 */
		del: function(name, domain, path){
			document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "");
		}
	}
};
	
	
	
/**
 * 前端显示层，用来重构和回流DOM，前端的特效显示处理
 * @class nic.ui 前端显示层
 * @author norion
 * @blog http://zkeyword.com/
 */
nic.ui = {
	
	/**
	 * 设置z-index
	 * @method nic.ui.zIndex
	 * @return {Number} z-index值
	 */
	zIndex: function(){
		return 99999 + $('.l-ui').length;
	},
	
	/**
	 * 设置tabindex
	 * @method nic.ui.tabindex
	 * @param {object} 表单元素jquery对象
	 * @return {Number} tabindex值
	 */
	tabindex: function(obj){
		var form = obj.parents('form'),
			all  = form.find('select, input, textarea')
	},
	
	/**
	 * 需要ui元素需要绝对定位的容器
	 * @method nic.ui.wrap
	 * @return {Object} ui元素jquery对象
	 */
	wrap: function(){
		if( !$('#l-ui-wrap').length ){
			$('body').append('<div id="l-ui-wrap"><!--[if lte IE 6.5]><iframe src="javascript:false;" style="width:0;height:0;"></iframe><![endif]--></div>');
		}
		return $('#l-ui-wrap');
	},
	
	/**
	 * 去除滚动条
	 * @method nic.ui.noScroll
	 */
	noScroll: function(){
		var html = $('html');
		
		/*监听滚轮*/
		if( document.onmousewheel === undefined ){
			html[0].addEventListener('DOMMouseScroll',function(e){
				html.scrollTop += e.detail > 0 ? 60 : -60;   
            },false);
		}else{
			html.onmousewheel = function(e){   
                e = e || window.event;   
                html.scrollTop += e.wheelDelta > 0 ? -60 : 60;   
                e.returnValue = false;  
            };
		}
		
		html.addClass('html-noScroll');
	},
	
	/**
	 * 设置遮罩
	 * @method nic.ui.lock
	 * @return {Object} 遮罩元素jquery对象
	 */
	lock: function(){
		var win      = $(window),
			body     = $('body'),
			lock     = $('.l-ui-lock'),
			_setSize = function(){
				if( !lock.length ){
					lock = body
							.append('<div class="l-ui-lock fn-hide"></div>')
							.find('.l-ui-lock')
				}
				lock.css({
					filter:'Alpha(opacity=20)',
					width:'100%',
					height: body[0].scrollHeight
				});
			};
			
		this.noScroll();
		_setSize();	
		win.resize(_setSize);
		lock.fadeIn();

		return lock;
	},
	
	/**
	 * 删除遮罩
	 * @method nic.ui.unlock
	 */
	unlock: function(){
		$('html').removeClass('html-noScroll');
		$('.l-ui-lock').fadeOut();
	},
	
	/**
	 * 获取鼠标位置
	 * @method nic.ui.mousePosition
	 * @param {Object} event事件
	 * @return {Array} 返回鼠标的x、y轴：[positionX, positionY]
	 */
	mousePosition: function(e){
		e = e || window.event;
		
		var x = e.pageX || e.clientX + document.body.scrollLeft,
			y = e.pageY || e.clientY + document.body.scrollTop;
			
		return{
			positionX : x,
			positionY : y
		};
	},
	
	/**
	 * 判断是否宽屏
	 * @method nic.ui.widescreen
	 * @return {Boolean} 
	 */
	widescreen: (function(){
		return (screen.width >= 1210);
	})(),
	
	/**
	 * onselectstart 选中处理
	 * @method nic.ui.onselectstart
	 * @param {Object} jquery 对象
	 */
	onselectstart: function(obj){
		if( !obj || !obj.length ){ return false; }
		if( document.onselectstart !== undefined ){
			obj[0].onselectstart = function(){return false;};
		}else{
			obj.css({'-moz-user-select':'none'});
		}
		return obj;
	}
};
	
module.exports = window.nic = nic;