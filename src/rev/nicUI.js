/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var nic;

	/* 基本依赖 */
	nic               = __webpack_require__(1);
	nic.ui.drag       = __webpack_require__(3);
	nic.ui.pagination = __webpack_require__(4);

	/* 一般组件 */
	nic.ui.grid       = __webpack_require__(5);
	nic.ui.gridFree   = __webpack_require__(6);
	nic.ui.validator  = __webpack_require__(8);
	nic.ui.pop        = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./core/pop\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	nic.ui.dialog     = __webpack_require__(9);
	nic.ui.check      = __webpack_require__(10);
	nic.ui.tab        = __webpack_require__(11);
	nic.ui.tip        = __webpack_require__(12);
	nic.ui.tree       = __webpack_require__(13);
	nic.ui.btnSwitch  = __webpack_require__(14);

	/* 其他$.fn插件 */
	__webpack_require__(15);
	__webpack_require__(16);

	/* 第三方插件 */
	window.ZeroClipboard = __webpack_require__(17);

	module.exports = window.nic = nic;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*载入jquery依赖*/
	window.$ = __webpack_require__(2);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('jquery'));
	    } else {
	        root.Drag = factory(root.jQuery);
	    }
	}(this, function ($) {

		'use strict';

		/**
		* nic.ui.drag 拖拽控件
		* @class nic.ui.drag
		* @author norion.z
		* @blog http://zkeyword.com/
		* @param {Object} options drag参数
		* @param {String} options.dragItem 拖拽触发对象选择器
		* @param {String} options.dragWrap 拖拽移动对象选择器
		*/
		var Drag = function(options){         //IE下 iframe内的的拖动还是有问题

			var o = options || {};
			if( !o.dragItem ){return false;}
			var	dragItem = $('body').find(o.dragItem),
				dragWrap = $('body').find(o.dragWrap),
				win      = parent.document || document,
				mouse    = {x:0,y:0};
				
			function _moveDialog(e){
		        
		        var top  = dragWrap.css('top') === 'auto' ? 0 : dragWrap.css('top'),
					left = dragWrap.css('left') === 'auto' ? 0 : dragWrap.css('left');
					
		        dragWrap
					.css({
						top  : parseInt(top) + (e.clientY - mouse.y),
						left : parseInt(left) + (e.clientX - mouse.x)
					});
		        
		        mouse.x = e.clientX;
		        mouse.y = e.clientY;
		    }
			
		    dragItem
				.on('mousedown', function(e){
					mouse.x = e.clientX;
					mouse.y = e.clientY;
					$(win).on('mousemove', _moveDialog);
					
					if(e.preventDefault){
						e.preventDefault();
					}else{
						e.returnValue = false;
					}
				});
		    
		    $(win)
				.on('mouseup', function(){
					$(win).off('mousemove', _moveDialog);
				});
		};

		return Drag;

	}));

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*

	pagination({
		cur:17,
		total:20,
		target: 'wrap',
		prevText: 'prev',
		nextText: 'next',
		len:8,
		callback: function(cur, total){
			console.log(cur, total)
		}
	});

	*/


	'use strict';

	var Pagination = function(options){

		this.cur      = options.cur || 1;
		this.total    = options.total === undefined ? 10 : options.total;
		this.len      = options.len ? options.len : 5;
		this.prevText = options.prevText || '上一页';
		this.nextText = options.nextText || '下一页';
		this.target   = options.target;
		this.callback = options.callback || function(){};
		
		if( typeof this.target === 'String' ){
			this.target = document.getElementById(this.target);
		}
		if( !this.target ) return;
		
		this.init();
		this.click(this.callback);
	}

	Pagination.prototype.init = function() {

		var tmp      = '',
			link     = '<a href="javascript:;" data-index="{{num}}">{{num}}</a>',
			prev     = '<a href="javascript:;" class="prev" data-index="{{num}}">'+ this.prevText +'</a>',
			next     = '<a href="javascript:;" class="next" data-index="{{num}}">'+ this.nextText +'</a>',
			cur      = '<span class="current">{{num}}</span>',
			ellipsis = '<span class="ellipsis">...</span>',
			haddle   = function(src, num){
							return src.replace(/{{num}}/g, num);
						},
			showNum  = 3;
		
		/* 显示的长度 */			
		if( this.len >= 3 ){
			showNum = Math.round(this.len/2);
		}
		
		/* 上一页 */
		if( this.cur >= 2 ){
			tmp += haddle(prev, this.cur - 1)
		}
		
		/* 前置省略号 */
		if( this.cur >= 4 && this.total >= this.len + 1 ){
			tmp += haddle(link, 1);
			tmp += ellipsis;
		}
		
		/* 连接 */
		if( this.len >= this.total ){
			for(var i = 1; i<=this.total; i++){
				tmp += haddle(i === this.cur ? cur : link, i);
			}
		}else{
			for(var i = 1, isCur = false, num = 0; i<=this.len; i++){

				if( this.cur < showNum ){
					if( i === this.cur ){
						isCur = true;
					}
					num = i;
				}else if(this.total - this.cur < showNum){
					if( this.len - (this.total - this.cur) === i ){
						isCur = true;
					}
					num = this.total - this.len + i;
				}else{
					if( i === showNum ){
						isCur = true;
					}
					num = this.cur - showNum + i;
				}

				tmp += haddle(isCur ? cur : link, num);
				isCur = false;
			}
		}
		
		/* 后置省略号 */
		if( this.total - this.cur >= showNum && this.total >= this.len + 1 && this.cur + this.len - showNum !== this.total  ){
			tmp += ellipsis;
			tmp += haddle(link, this.total)
		}
		
		/* 下一页 */
		if( this.total - this.cur >= 1 ){
			tmp += haddle(next, this.cur + 1)
		}

		this.target.innerHTML = tmp;
	};

	Pagination.prototype.click = function(fn){
		var that = this,
			oA   = this.target.getElementsByTagName('a');

		for (var i = oA.length - 1; i >= 0; i--) {
			oA[i].onclick = function(){
				that.cur = Number(this.getAttribute('data-index'));
				that.init();
				that.click(fn);
				fn.apply(this, [that.cur, that.total]);
			}
		};
	}
		
	module.exports = function(o){
		return o ? new Pagination(o) : {};
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	**┏┓　　　┏┓ 
	*┏┛┻━━━┛┻┓ 
	*┃　　　　　　　┃ 　 
	*┃　　　━　　　┃ 
	*┃　┳┛　┗┳　┃ 
	*┃　　　　　　　┃ 
	*┃　　　┻　　　┃ 
	*┃　　　　　　　┃ 
	*┗━┓　　　┏━┛ 
	****┃　　　┃　　　　 
	****┃　　　┃ 神兽保护，代码无bug
	****┃　　　┗━━━┓ 
	****┃　　　　　　　┣┓ 
	****┃　　　　　　　┏┛ 
	****┗┓┓┏━┳┓┏┛ 
	******┃┫┫　┃┫┫ 
	******┗┻┛　┗┻┛  
	*/

	'use strict';

	/**
	* nic.ui.grid 表格控件
	* @class nic.ui.grid
	* @author norion.z
	* @blog http://zkeyword.com/
	* @param {Object} o 表格参数
	* @param {String} o.wrap 表格容器
	* @param {String} o.id 表格id
	* @param {Object} o.pageAjax ajax数据
	* @param {String} o.pageAjax.url ajax请求的url
	* @param {String} o.pageAjax.type ajax请求类型，默认是GET
	* @param {String} o.pageAjax.data ajax请求的条件
	* @param {Object} o.data 静态数据
	* @param {String|Number} o.width 表格宽度
	* @param {Boolean} o.isFixedWidth 表宽度是否为固定宽度，默认为false，会去对比grid外框的宽度和o.columns.width，而达到自适应列的目的
	* @param {Object} o.columns 列结构
	* @param {String} o.columns.display 表头名称
	* @param {String} o.columns.name 数据字段名
	* @param {Number} o.columns.width 列宽度，这里是占比
	* @param {Function} o.columns.render 列自定义显示函数
	* @param {Function} o.columns.statisRender 统计列自定义显示函数
	* @param {String} o.columns.statisType 统计类型
	* @param {String} o.columns.statisWrap 统计容器
	* @param {Object} o.statis 统计
	* @param {Object} o.detail 表格详细
	* @param {Object} o.bottomBtns 底部按钮
	* @param {Boolean} o.isPage 是否显示分页
	* @param {Boolean} o.isHead 是否显示头部
	* @param {Boolean} o.showAllRow 显示所有数据，默认false，以分页和显示条数互斥 ，isPage=false、pageSize = total
	* @param {String} o.pageIndex 分页起始页
	* @param {String} o.pageSize 每页显示的条数
	* @param {Array} o.pageSizeOptions 可选择设定的每页结果数，默认[10, 20, 50, 100, 200]，不显示时可设置null
	* @param {Function} o.onPageFn 翻页事件
	* @param {Boolean} o.isPageCache 翻页时是否缓存当页数据
	* @param {Boolean} o.isMemory 翻页是否记住选择记录，默认false
	* @param {Boolean} o.checkbox 是否有checkbox
	* @param {Function} o.onCheckFn 点击checkbox事件
	* @param {Function} o.onRowFn 点击行事件
	* @param {Boolean} o.isSelectSingleRow 点击是否选中单行,onRowFn有设置时才生效
	* @param {Boolean} o.isOnRowCheckbox 点击行选中checkbox
	* @param {Function} o.initSelected 初始化选中事件
	* @param {String}  o.nullText 空文本
	* @param {String}  o.requestText 请求文本
	* @param {Boolean} o.isSort 是否排序，默认false
	* @param {Boolean} o.isSortCurrent 排序当前页中数据，默认false，使用时isSort必须是true，isPageCache必须是true
	* @param {Boolean} o.isShowLoading 是否显示loading效果，默认true
	* @param {String} o.countFont 统计文字
	* @param {String} o.refreshIndex 刷新当前页索引pageIndex,默认false
	* @param {String} o.isHideColumns 是否要隐藏列Columns, 隐藏列是请设置ID
	* @return {Object} grid对象
	*/


	// XXX
	var lang = {
		/*grid*/
	    nextPage: '&gt;',
	    prevPage: '&lt;',
	    //countFont: '每页显示：{{size}}条，当前显示从{{start}}到{{end}}，总{{count}}条 。',
	    countFont:'',
	    nullText: '暂无数据，请确认！',
	    requestText: '数据请求中，请稍后...'
	}

	var nic  = __webpack_require__(1),
		Grid = function(o){
		
			var 
				/**
				* 全局对象
				* @public
				*/
				g       = this,
			
				/**
				* 默认配置
				* @private
				*/
				p = {
					wrap:            $(o.wrap),
					id:              o.id || 'l-grid-' + (new Date()).valueOf(),	
					pageAjax:        o.pageAjax || null,
					data:            o.data || {},                                           //静态数据
					width:           o.width || 'auto',
					isFixedWidth:    o.isFixedWidth  === undefined ? false : o.isFixedWidth, //表宽度是否为固定宽度，默认为false，为true时会去对比width和grid外框的宽度
					columns:         o.columns || {},
					statis:          o.statis || [],                                         //统计
					statisToFixed:   o.statisToFixed === undefined ? 2 : o.statisToFixed,    //统计精确的位数
					detail:          o.detail || null,
					bottomBtns:      o.bottomBtns === undefined ? null : o.bottomBtns,       //底部按钮
					isPage:          o.isPage === undefined ? true : o.isPage,               //是否显示分页
					isHead:          o.isHead === undefined ? true : o.isHead,               //是否显示头部
					showAllRow:      o.showAllRow ? true : false,                            //显示所有数据，默认false，以分页和显示条数互斥 ，isPage=false、pageSize = total
					pageIndex:       o.pageIndex || 1,                                       //分页起始页
					pageSize:        o.pageSize || 10,                                       //每页显示的条数
					pageSizeOptions: o.pageSizeOptions === undefined ? [10, 20, 50, 100, 200] : o.pageSizeOptions, //可选择设定的每页结果数
					onPageFn:        o.onPageFn,                                             //翻页事件
					isPageCache:     o.isPageCache === undefined ? true : o.isPageCache,     //翻页时是否缓存当页数据
					isMemory:        o.isMemory ? true : false,                              //翻页是否记住选择记录，默认false
					checkbox:        o.checkbox === undefined ? true : o.checkbox,           //是否有checkbox
					isHeadCheckbox:  o.isHeadCheckbox === undefined ? true : o.isHeadCheckbox, //是否有表头checkbox
					onCheckFn:       o.onCheckFn || null,                                    //点击checkbox事件
					onRowFn:         o.onRowFn || null,                                      //点击行事件
					isSelectSingleRow: o.isSelectSingleRow === undefined ? false : o.isSelectSingleRow, //点击是否选中单行
					isOnRowCheckbox: o.isOnRowCheckbox ? true : false,                       //点击行选中checkbox
					initSelected:    o.initSelected || null,                                 //初始化选中事件
					nullText:        o.nullText ? o.nullText : lang.nullText,                //空文本
					requestText:     o.requestText ? o.requestText : lang.requestText,       //请求文本
					isSort:          o.isSort ? true : false,                                //是否排序，默认false
					isSortCurrent:   o.isSortCurrent ? true : false,                         //排序当前页缓存中数据，默认false，使用时isSort必须是true，isPageCache必须是true
					isShowLoading:   o.isShowLoading === undefined ? true : o.isShowLoading, //是否显示loading效果
					countFont:       o.countFont ? o.countFont : lang.countFont,             //统计文字
					refreshIndex:    o.refreshIndex === undefined ? false : o.refreshIndex,  //刷新当前页索引pageIndex,默认false
				    isHideColumns:   o.isHideColumns === undefined ? false : o.isHideColumns //是否要隐藏列Columns
				},
			
				/**
				* 缓存池
				* @private
				*/
				_cache = {
					data: [],
					tmpData: [],
					columns: [],
					rowSelected: [],
					detailSelected: [],
					width: 0,
					browser: nic.base.browser
				},
				
				/**
				* 内部对象
				* @private
				*/
				_core   = {
					/**
					* 表格表头内容
					*/
					tHeadCreateHtml: function(){
						var isHideColumns  = p.isHideColumns,
							columns        = p.columns,
							detail         = p.detail,   //表格明细
							checkbox       = p.checkbox, //复选框
							isHeadCheckbox = p.isHeadCheckbox,
							popup          = g.popup,
							grid1          = g.grid1,
							grid2          = g.grid2,
							isInit         = g.isInit,
							i              = 0,
							s1             = '',
							s2             = '',
							s3             = '';
							
						/*grid1*/
						s1 += '<table>';
						s1 += '<tr class="l-grid-hd-row">';
						
						if( detail ){
							s1 += '<th class="l-grid-hd-cell l-grid-hd-detail"><div class="l-grid-row-cell-inner"><span class="l-grid-row-detailbtn"></span></div></th>';
						}
						
						if( checkbox ){
							s1 += '<th class="l-grid-hd-cell l-grid-hd-checkbox"><div class="l-grid-hd-cell-inner">';
							if( isHeadCheckbox ){
								s1 += '<span class="l-checkbox l-grid-hd-checkbox"></span>';
							}
							s1 += '</div></th>';
						}
						
						s1 += '</tr>';
						s1 += '</table>';
						
						/*grid2*/
						if( isInit && !nic.base.cookie.get(encodeURIComponent(location.pathname)) ){
							_cache.columns = columns;
						}
						
						if( isHideColumns ){
							
							columns = _cache.columns;
							
							for(var h = 0; h < p.columns.length; h++){
								var popupSelected = '';
								for(var j = 0; j<columns.length; j++){
									if( p.columns[h].display === columns[j].display ){
										popupSelected = ' l-checkbox-selected';
									}
								}
								s3 += '<div class="l-grid-popup-item fn-clear"><span class="l-checkbox'+ popupSelected +'"></span><span class="l-grid-popup-text">'+ p.columns[h].display +'</span></div>';
							}
							
							popup.html(s3)
						}
						
						s2 += '<table>';
						s2 += '<tr class="l-grid-hd-row">';
						
						for(; i < columns.length; i++){
							
							var column     = columns[i],
								columnName = p.isSort ? ( (column.isSort !== false && column.name) ? ' data-columnName="'+ column.name +'"' : '' ) : '',
								lastCls    = i === columns.length - 1 ? ' l-grid-hd-cell-last' : '';
								
							s2 += '<th class="l-grid-hd-cell'+ lastCls +'"><div class="l-grid-hd-cell-inner"><span class="l-grid-hd-cell-span"'+ columnName +'><span class="l-grid-hd-cell-text">'+ column.display +'</span></span></div></th>';
							
						}
						
						s2 += '</tr>';
						s2 += '</table>';

						if( isInit ){
							grid1.append('<div class="l-grid-header">'+ s1 + '</div>');
							grid2.append('<div class="l-grid-header">'+ s2 +'</div>');
						}else{
							grid1.find('.l-grid-header').html(s1);
							grid2.find('.l-grid-header').html(s2);
						}
					},
					
					/**
					* 表格主体内容
					* @param {Number} index 页面索引
					*/
					tBodyCreateHtml: function(index){
						var columns    = _cache.columns.length ? _cache.columns : p.columns,
							len        = columns.length,
							statis     = p.statis,
							statisData = [],
							detail     = p.detail,   //表格明细
							checkbox   = p.checkbox, //复选框
							nullText   = g.loding.is(':visible') ? p.requestText : p.nullText,
							pageSize   = p.pageSize,
							popup      = g.popup,
							grid       = g.grid,
							grid1      = g.grid1,
							grid2      = g.grid2,
							i          = 0,
							s1         = '',
							s2         = '',
							tmpData    = _cache.tmpData,
							total      = p.data.total,
							rows       = p.data.rows,
							isInit     = g.isInit,
							that       = this;
						
						/*修改索引值，从1开始，所以减1*/
						index = index !== undefined ? index - 1 : 0;

						/*grid1*/
						if( checkbox || detail ){
							s1 += '<table>';
							if( total && rows.length ){
								for(var i = 0; i<pageSize; i++){
									if( tmpData[index][i] ){
										s1 += '<tr class="l-grid-row'+ 
												  (i%2 === 0 ? '' : ' l-grid-row-even') +
												  (that.initSelected( tmpData[index][i] ) ? ' l-grid-row-selected' : '') +
												  '" data-row="'+ i +'">';

										if( detail ){
											s1 += '<td><div class="l-grid-row-cell-inner"><span class="l-grid-row-detailbtn l-grid-row-detailbtn-close"></span></div></td>';
										}
										if( checkbox ){
											s1 += '<td><div class="l-grid-row-cell-inner"><span class="l-checkbox l-grid-row-checkbox"></span></div></td>';
										}
										s1 += '</tr>';
									}
								}
								/*判断是否统计*/
								if( statis ){
									var sLen = statis.length,
										n    = 0;
									for(; n<sLen; n++){
										s1 += '<tr class="l-grid-row l-grid-row-statis l-grid-row-'+ statis[n].type +'">';
										if( checkbox && detail ){
											s1 += '<td style="width:13px"><div class="l-grid-row-cell-inner"></div></td><td style="width:13px"><div class="l-grid-row-cell-inner"></div></td>';
										}else{
											s1 += '<td style="width:13px"><div class="l-grid-row-cell-inner"></div></td>';
										}
										s1 += '</tr>';
									}
								}
							}else{
								s1 += '<tr class="l-grid-row"><td></td></tr>';
							}
							s1 += '</table>';
						}

						/*grid2*/
						s2 += '<table>';
						
						if( total && rows.length ){
							
							for(var k = 0; k<len; k++){
								statisData[k] = [];
							}
							
							for(var i = 0; i<pageSize; i++){
								
								var tmpDataObj = tmpData[index][i],
									selectCls  = that.initSelected(tmpDataObj, i) ? ' l-grid-row-selected' : '',
									evenCls    = i%2 === 0 ? '' : ' l-grid-row-even';

								if( tmpDataObj ){
									
									s2 += '<tr class="l-grid-row'+ evenCls + selectCls +'" data-row="'+ i +'">';
									
									var rowStatis = 0; //行统计和
									
									for(var h = 0; h < len; h++){
										
										var columnsObj    = columns[h],
											lastCls       = h === len - 1 ? ' l-grid-row-cell-last' : '',
											columnAlign   = columnsObj.align ? ' l-grid-align-' + columnsObj.align : '',
											columnsStatis = nic.base.isFunction(columnsObj.statis),
											columnsRender = columnsObj.render;
											
										/*统计数据*/
										if( columnsObj.statisType ){
											var statisRow = parseFloat( tmpDataObj[columnsObj.name] );
											statisData[h][i] = !isNaN(statisRow) ? statisRow : 0;
											rowStatis += statisData[h][i];
											if( columnsStatis ){
												statisData[h][i] = rowStatis;
											}
										}
										
										s2 += '<td class="l-grid-row-cell'+ lastCls +'" data-cell="'+ h +'"><div class="l-grid-row-cell-inner'+ columnAlign +'">';

										if( columnsStatis ){
											if( columnsObj.statisRender !== undefined ){
												s2 += columnsObj.statisRender(rowStatis);
											}else{
												s2 += rowStatis;
											}
										}
										
										if( nic.base.isFunction(columnsRender) ){
											s2 += columnsRender(tmpDataObj, i, tmpDataObj[columnsObj.name], h);
										}else{
											s2 += tmpDataObj[columnsObj.name];
										}
										
										s2 += '</div></td>';
									}
									
									s2 += '</tr>';
									
									if( detail ){
										var chlidren = tmpDataObj.chlidren ? tmpDataObj.chlidren : [],
											colLen   = columns.length + (checkbox ? 1 : 0) + 1;
										
										if( nic.base.isFunction(detail.render) ){
											s2 += '<tr class="l-grid-row-detail l-grid-row-detail'+ i + evenCls + selectCls +'" data-row="'+ i +'">';
											s2 += '<td colspan="'+ colLen +'">'+ 
													detail.render(chlidren) +
												  '</td>';
											s2 += '</tr>';
										}else{
											for(var m = 0; m<chlidren.length; m++){
												s2 += '<tr class="l-grid-row-detail l-grid-row-detail'+ i + evenCls + selectCls +'" data-row="'+ i +'">';
												for(var h = 0; h < len; h++){
													var columnsObj = columns[h];
													s2 += '<td class="l-grid-row-cell" data-cell="'+ h +'"><div class="l-grid-row-cell-inner l-grid-align-'+ (columnsObj.align ? columnsObj.align : 'left') +'">';
													if( nic.base.isFunction(columnsObj.detailRender) ){
														s2 += columnsObj.detailRender(chlidren[m], h, chlidren[m][columnsObj.name], m);
													}else{
														s2 += (chlidren[m][columnsObj.name] ? chlidren[m][columnsObj.name] : '');
													}
													s2 += '</div></td>';
												}
												s2 += '</tr>';
											}
										}
									}
									
								}
							}

							/*判断是否统计*/
							if( statis ){
								
								var sLen = statis.length,
									n    = 0;
									
								for(; n<sLen; n++){
									
									s2 += '<tr class="l-grid-row l-grid-row-statis l-grid-row-'+ statis[n].type +'">';
									
									for(var m = 0; m < len; m++){
										
										var statisColumns = columns[m],
											statisAlign   = statisColumns.align ? statisColumns.align : 'left',
											statisWrap    = statisColumns.statisWrap,
											statisType    = statisColumns.statisType,
											statisRender  = statisColumns.statisRender,
											statisLastCls = m === len - 1 ? ' l-grid-row-cell-last' : '';
										
										s2 += '<td class="l-grid-row-cell'+ statisLastCls +'"><div class="l-grid-row-cell-inner l-grid-align-'+ statisAlign +'">';
										
										if( statisWrap ){
											s2 += statis[n].display;
										}else{
											var sData = statisData[m],
												ssLen = sData.length,
												ssVal = 0,
												x     = 0,
												sum   = 0,
												avg   = 0,
												min   = 0,
												max   = 0;
											
											for(; x<ssLen; x++){
												ssVal += sData[x];
											}
											
											if( statisType ){
												
												var str  = statisType,
													arr  = str.split(','),
													d    = 0,
													dlen = arr.length,
													dStr = '';
												
												for(; d<dlen; d++){
													if( statis[n].type === arr[d] ){
														switch(arr[d]){
															case 'sum':
																dStr = ssVal;
																break;
															case 'avg':
																dStr = (ssVal*1.0)/x;
																break;
															case 'min':
																dStr = Math.min.apply(Math, sData);
																break;
															case 'max':
																dStr = Math.max.apply(Math, sData);
																break;
														};
														
														//if( parseInt(dStr, 10) !== dStr ){
															dStr = dStr.toFixed(p.statisToFixed);
														//}
														
														s2 += nic.base.isFunction(statisRender) ? statisRender(dStr) : dStr;
													}
												}// end for
												
											} // end if
											
										}
										s2 += '</div></td>';
									}
									s2 += '</tr>';
								}
							}// end if statis
							
						}else{
							s2 += '<tr class="l-grid-row"><td><div class="l-grid-row-cell-inner l-grid-align-center l-grid-nullText">'+ nullText +'</div></td></tr>';
						}
						s2 += '</table>';
						
						
						/*init*/
						if( isInit ){
							grid1.append('<div class="l-grid-body">' + s1 +'</div>');
							grid2.append('<div class="l-grid-body">' + s2 +'</div>');
						}else{
							grid1.find('.l-grid-body').html(s1);
							grid2.find('.l-grid-body').html(s2);
						}
						
						/*hover*/
						grid
							.off('mouseover', '.l-grid-row, .l-grid-row-detail')
							.on('mouseover', '.l-grid-row, .l-grid-row-detail', function(){
								var index = this.getAttribute('data-row');
									
								grid
									.find('.l-grid-row')
									.eq(index)
									.addClass('l-grid-row-hover');
									
								grid2
									.find('.l-grid-row')
									.eq(index)
									.addClass('l-grid-row-hover');
									
								grid2
									.find('.l-grid-row-detail'+index)
									.addClass('l-grid-row-hover');
							})
							.off('mouseout', '.l-grid-row, .l-grid-row-detail')
							.on('mouseout', '.l-grid-row, .l-grid-row-detail', function(){
								var index = this.getAttribute('data-row');
								
								grid1
									.find('.l-grid-row')
									.eq(index)
									.removeClass('l-grid-row-hover');
									
								grid2
									.find('.l-grid-row')
									.eq(index)
									.removeClass('l-grid-row-hover');
									
								grid2
									.find('.l-grid-row-detail'+index)
									.removeClass('l-grid-row-hover');
							})
						
						/*set size*/
						if( checkbox || detail ){
							if( checkbox && detail ){
								grid1.width(68)
							}else{
								grid1.width(34);
							}
						}
						
						that.setCellWidth();
						(checkbox || detail) && that.setRowsHeight();

						$(window).resize(function(){
							that.setCellWidth();
							(checkbox || detail) && that.setRowsHeight();
						});
						
						/* 设置ajax模式缓存 */
						if( !p.isPageCache && !p.isSortCurrent ){
							_cache.tmpData[p.pageIndex - 1] = [];
						}
					},
					
					/**
					* 分页内容
					*/
					pageCreateHtml: function(){
						var that            = this,
							s               = '',
							total           = p.data.total,
							pageIndex       = p.pageIndex,
							pageSize        = p.pageSize,
							countFont       = p.countFont,
							pageSizeOptions = p.pageSizeOptions,
							pageCore        = {
								/**
								* 获取数字连接
								* @private
								* @param {Number} index 链接索引
								* @param {String} txt 上下翻页的文本
								*/
								getLink: function(index, txt){
									return '<a href="javascript:;" data-page="'+ index +'"'+ (p.pageIndex === index ? ' class="current"' : '') + '>'+ (txt || index) +'</a>';
								},
								
								/**
								* 获取显示的数据
								* @private
								* @param {Number} pageSize 每页显示条数
								* @param {Number} count 数据长度
								* @param {Number} index 当前位置
								*/
								getCount: function(pageSize, count, index){
									var start   = (index-1)*pageSize + 1,
										end     = index*pageSize,
										str     = p.countFont+'',
										pageNum = Math.ceil(count / pageSize),
										diff    = pageNum*pageSize - count;

									str = str.replace('{{start}}', start);     //当前开始位置
									str = str.replace('{{end}}', (pageNum*pageSize === end ? end - diff : end)); //当前结束位置
									str = str.replace('{{count}}', count);     //总条数
									str = str.replace('{{size}}', pageSize);   //每页显示条数
									str = str.replace('{{pageNum}}', pageNum); //总页数
									str = str.replace('{{current}}', index);   //当前位置
									
									return str;
								},
								
								/**
								* 获取分页按钮
								* @private
								* @param {Number} pageSize 每页显示条数
								* @param {Number} count 数据长度
								* @param {Number} index 当前位置
								*/
								getBtn: function(pageSize, count, index){
									var s       = '',
										begin   = 1,
										end     = 1,
										i       = 0,
										itemNum = 2,
										pageNum = Math.ceil(count / pageSize);
										
									if(index > 1){
										s += this.getLink(index - 1, lang.prevPage);
									}else{
										s += '<span class="prev">'+ lang.prevPage +'</span>';
									}
									if(index - itemNum > 1){
										s += this.getLink(1) + '<span>...</span>';
										begin = index - itemNum;
									}
									end = Math.min(pageNum, begin + itemNum * 2);
									if(end === pageNum - 1){
										end = pageNum;
									}
									for(i = begin; i <= end; i++) {
										s += this.getLink(i);
									}
									if(end < pageNum){
										s += '<span>...</span>' + this.getLink(pageNum);
									}
									if(index < pageNum){
										s += this.getLink(index + 1, lang.nextPage);
									}else{
										s += '<span class="next">'+ lang.nextPage +'</span> ';
									}
									
									return s;
								},
								
								/**
								* 获取分页选项
								* @private
								*/
								getPageSelect: function(pageSizeOptions){
									
									if( !nic.base.isArray( pageSizeOptions ) ){ return false; }
									
									var pageSize = p.pageSize,
										len      = pageSizeOptions.length,
										i        = 0,
										s        = '';
										
									s += '<select class="ui-select">';
									for(; i<len; i++){
										s += '<option value="'+ pageSizeOptions[i] +'"'+ (pageSize === pageSizeOptions[i] ? ' selected="selected"' : '') +'>'+ pageSizeOptions[i] +'</option>';
									}
									s += '</select>';
									
									return s;
								}
							};
						
						/*分页统计*/
						if( total && countFont ){
							s += '<div class="l-grid-footer-page-msg">'+ pageCore.getCount(pageSize, total, pageIndex) +'</div>';
						}
						
						/*分页选项*/
						if( total && pageSizeOptions ){
							s += '<div class="l-grid-footer-page-select">'+ pageCore.getPageSelect(pageSizeOptions) +'</div>';
						}

						/*分页按钮*/
						if( total ){
							s += '<div class="l-grid-footer-page-btn ui-pagination">'+ pageCore.getBtn(pageSize, total, pageIndex) +'</div>';	
						}
											
						/*生成分页*/
						g.page.html(s);
						
						that.initCheckbox();
						
						/*if( p.pageSizeOptions ){
							select({
								target:'.l-grid-footer-page-select select',
								type:'single'
							})
						}*/
					},
					
					bottomBtnsCreateHtml: function(){
						var btns    = p.bottomBtns,
							btnWrap = g.btnWrap;
							
						if( !btns ){ return; }

						btnWrap
							.html(function(){
								var len      = btns.length,
									html     = '',
									i        = 0,
									checkbox = p.checkbox,
									detail   = p.detail;
									
								if( !len || !checkbox ){ return html; }
									
								if( detail ){
									html += '<span class="l-checkbox l-grid-footer-checkbox l-grid-footer-checkbox-detail"></span>';
								}else{
									html += '<span class="l-checkbox l-grid-footer-checkbox"></span>';
								}
								
								for(; i<len; i++){
									var btn = btns[i],
										cls = btn.cls ? ' '+ btn.cls : '';
									html += '<a href="javascript:;" class="ui-btn'+ cls +'" data-index="'+ i +'"><span>'+btn.text+'</span></a>';
								}
								
								return html;
							})
							.off('click', '.ui-btn')
							.on('click',' .ui-btn', function(){
								var index = this.getAttribute('data-index'),
									obj   = btns[index];
								nic.base.isFunction(obj.click) && obj.click.call(this);
							});
					},
					
					bottomBtnsFn: function(){
						var btnWrap  = g.btnWrap,
							checkbox = g.grid1.find('.l-checkbox');

						btnWrap
							.off('click','.l-checkbox')
							.on('click','.l-checkbox',function(){
								var self = $(this);
								
								nic.ui.onselectstart(self);
								checkbox.trigger('click');
								
								if( checkbox.hasClass('l-checkbox-selected') ){
									self.addClass('l-checkbox-selected')
								}else{
									self.removeClass('l-checkbox-selected')
								}
								
							});
					},
					
					/**
					* 设置列宽
					*/
					setCellWidth: function(){
						var columns      = _cache.columns.length ? _cache.columns : p.columns,
							len          = columns.length,
							wrapWidth    = p.wrap.width(),
							grid         = g.grid,
							slGrid       = grid.find('.l-sl-grid2'),
							grid1        = g.grid1,
							checkbox     = p.checkbox,
							detail       = p.detail,
							grid1Width   = checkbox || detail ? grid1.outerWidth() : 0,
							grid2        = g.grid2,
							i            = 0,
							total        = 0,
							isFixedWidth = p.isFixedWidth,
							_fixedWidth  = function(width){
											var j = 0;
											
											width = width === undefined ? p.width : width;

											for(; j<len; j++){
												grid2.find('.l-grid-hd-cell').eq(j).width(columns[j].width);
												grid2.find('.l-grid-row-cell').eq(j).width(columns[j].width);
											}
											
											grid.width(width);
											slGrid.css({
												width: width - grid1Width,
												overflowX:'auto',
												marginRight:0
											});
											grid2.css({
												width: total,
												marginLeft:0
											});
										},
							_autoWidth   = function(){
											var j        = 0,
												colWidth = 0;
											for(; j<len; j++){
												colWidth = columns[j].width/total*100 + '%';
												grid2.find('.l-grid-hd-cell').eq(j).width(colWidth);
												grid2.find('.l-grid-row-cell').eq(j).width(colWidth);
											}
											grid.width('100%');
											slGrid.css({
												position:'relative',
												width: grid.width() - grid1Width - 1, //XXX:宽度有问题先 -1 console.log( grid1Width, grid.width(),slGrid.width(), grid )
												overflowX:'inherit',
												float:'left'
											});
											grid2.css({
												width: 'auto'
											});
										};

						for(; i<len; i++){
							total += columns[i].width;
						}
						
						if( p.width === 'auto' ){
							_autoWidth();
						}else{
							if( isFixedWidth ){
								_fixedWidth();
							}else{
								if( wrapWidth > total || wrapWidth < p.width ){
									_autoWidth();
								}else{
									_fixedWidth( wrapWidth );
								}
							}
						}
					},
					
					/**
					* 设置行高
					*/
					setRowsHeight: function(){
						var grid1    = g.grid1,
							grid2    = g.grid2,
							pageSize = p.statis ? p.pageSize + p.statis.length : p.pageSize,
							i        = 0;
						
						grid1.find('.l-grid-hd-row').height( grid2.find('.l-grid-hd-row').outerHeight() );
						
						if( pageSize ){
							for(; i<pageSize; i++){
								var grid1_row       = grid1.find('.l-grid-row').eq(i),
									grid2_row       = grid2.find('.l-grid-row').eq(i),
									grid2_rowDetail = grid2.find('.l-grid-row-detail'+i),
									height          = grid2_row.outerHeight(),
									detailHeight    = 0;

								if(!height){return;}
								
								for(var j = 0; j<grid2_rowDetail.length; j++){
									detailHeight += grid2_rowDetail[j].offsetHeight;
								}

								if( _cache.browser.ie <= 7 ){
									grid1_row.height(height + detailHeight - 1); //变态ie7多算1px
								}else{
									grid1_row.height(height + detailHeight);
								}
							}
						}else{
							var grid1_row = grid1.find('.l-grid-row').eq(0),
								grid2_row = grid2.find('.l-grid-row').eq(0),
								height    = grid2_row.outerHeight();
							grid1_row.height(height);
						}
						
					},
					
					/**
					* 初始化行选中事件
					* @param {Object} rowData 行数据
					* @param {Number} i 行的索引
					*/
					initSelected: function(rowData, i){
						var that         = this,
							isMemory     = p.isMemory,
							initSelected = p.initSelected,
							pageIndex    = p.pageIndex,
							arr          = _cache.rowSelected[pageIndex-1];
						
						if( rowData && nic.base.isFunction( initSelected ) ){
							if( initSelected( rowData ) ){
								if( isMemory && i !== undefined ){
									arr[i] = that.getRowData(i); //选中数据
									that.initCheckbox();
								}
								return true;
							}
						}
						
						return false;
					},
					
					/**
					* 分页函数
					*/
					pageFn: function(){
						var that          = this,
							page          = g.page,
							grid1         = g.grid1,
							gridHeader    = grid1.find('.l-gird-header'),
							gridBody      = grid1.find('.l-gird-body'),
							pageSize      = p.pageSize,
							onPageFn      = p.onPageFn,
							isShowOptions = p.pageSizeOptions;
						
						/*分页事件*/
						page.off('click', 'a')
							.on('click', 'a', function(){
						
								var index = Number( $(this).attr('data-page') );
								
								/*修改页面位置*/
								p.pageIndex = index;
								
								/*返回接口，可能修改全局g.o对象，所以前置*/
								if( nic.base.isFunction(onPageFn) ){
									onPageFn(index, pageSize);
								}
								
								if( !_cache.tmpData[index-1] || !_cache.tmpData[index-1].length || !_cache.tmpData.length ){
									/*获取数据并重载 Html*/
									that.getData();
								}else{
									/*重载 html*/
									that.tBodyCreateHtml(index);
									that.pageCreateHtml();
								}

								/*全部选上时给表头全选*/
								if( gridBody.find('.l-checkbox-selected').length === pageSize ){
									gridHeader.find('.l-checkbox').addClass('l-checkbox-selected');
								}else{
									gridHeader.find('.l-checkbox').removeClass('l-checkbox-selected');
								}
								
								/*初始化checkbox*/
								that.initCheckbox();
							});
						
						/*下拉框事件*/
						if( isShowOptions ){
							page.off('change', 'select')
								.on('change','select', function(){
									_cache.tmpData = [];
									p.pageSize = Number( this.value );
									p.pageIndex = 1;
									g.refresh();
								});
						}
					},

					/**
					* 初始化checkbox
					*/
					initCheckbox: function(){
						var that           = this,
							pageSize       = p.pageSize,                        //每页显示多少个
							pageIndex      = p.pageIndex,                       //起始位置
							grid1          = g.grid1,
							gridHeader     = grid1.find('.l-grid-header'),        //表格头
							gridBody       = grid1.find('.l-grid-body'),          //表格主体
							checkbox       = gridBody.find('.l-checkbox'),        //复选框
							headerCheckbox = gridHeader.find('.l-checkbox'),
							footerCheckbox = g.btnWrap.find('.l-checkbox'),
							isMemory       = p.isMemory;
						
						if( !isMemory ){
							/*
							var len = _cache.rowSelected.length,
								i   = 0;
								
							for(; i<len; i++){
								_cache.rowSelected[i] = []; //修改选中的数组值
							}
							*/
							
							_cache.rowSelected = [];
							
							headerCheckbox.removeClass('l-checkbox-selected');
							footerCheckbox.removeClass('l-checkbox-selected');
						}else{
							var selected = Math.min(pageSize, checkbox.length), //已选数量
								arr      = _cache.rowSelected[pageIndex-1],
								len      = arr ? arr.length : 0,
								i        = 0,
								j        = 0;
							
							for(; i < len; i++, j++){
								if( arr[i] ){
									checkbox.eq(j).addClass('l-checkbox-selected');
								}
							}
							
							/*全部选上时给表头全选*/
							if( gridBody.find('.l-checkbox-selected').length === selected ){
								headerCheckbox.addClass('l-checkbox-selected');
								footerCheckbox.addClass('l-checkbox-selected');
							}else{
								headerCheckbox.removeClass('l-checkbox-selected');
								footerCheckbox.removeClass('l-checkbox-selected');
							}
						}
					},
					
					/**
					* 选择框事件
					*/
					checkboxFn: function(){
						var that        = this,
							grid1       = g.grid1,
							grid2       = g.grid2,
							grid1Header = grid1.find('.l-grid-header'), //表格头
							grid1Body   = grid1.find('.l-grid-body'),   //表格主体
							grid2Body   = grid2.find('.l-grid-body'),   //表格主体
							onCheckFn   = p.onCheckFn,
							pageSize    = p.pageSize,
							btnWrap     = g.btnWrap;
						
						/*多选*/
						grid1Body
							.off('click', '.l-checkbox')
							.on('click', '.l-checkbox', function(){
								var self        = $(this),
									pageIndex   = p.pageIndex,
									checkbox    = grid1Body.find('.l-checkbox'),
									i           = checkbox.index(self),
									selected    = Math.min(pageSize, checkbox.length), //已选数量
									currentArr  = _cache.rowSelected[pageIndex-1],
									grid1Row    = grid1Body.find('.l-grid-row').eq(i),
									grid2Row    = grid2Body.find('.l-grid-row').eq(i),
									grid2Detail = grid2Row.next('.l-grid-row-detail'),
									tmpData     = _cache.tmpData[p.pageIndex - 1];
								
								/*返回选择数据*/
								if( nic.base.isFunction(onCheckFn) ){
									if( !onCheckFn.apply(this, [tmpData[i], grid1Row, grid2Row]) ){
										return false;
									}
								}
								
								if( !self.hasClass('l-checkbox-selected') ){
									self.addClass('l-checkbox-selected');
									grid1Row.addClass('l-grid-row-selected');
									grid2Row.addClass('l-grid-row-selected');
									grid2Detail.addClass('l-grid-row-selected');
									currentArr[i] = that.getRowData(i); //选中数据
									
									/*全部选上时给表头全选*/
									if( grid1Body.find('.l-checkbox-selected').length === selected ){
										grid1Header.find('.l-checkbox').addClass('l-checkbox-selected');
										btnWrap.find('.l-checkbox').addClass('l-checkbox-selected');
									}
								}else{
									currentArr[i] = null;
									self.removeClass('l-checkbox-selected');
									grid1Row.removeClass('l-grid-row-selected');
									grid2Row.removeClass('l-grid-row-selected');
									grid2Detail.removeClass('l-grid-row-selected');
									grid1Header.find('.l-checkbox').removeClass('l-checkbox-selected');
									btnWrap.find('.l-checkbox').removeClass('l-checkbox-selected');
								}
								
							});
						
						/*全选*/
						grid1Header
							.off('click', '.l-checkbox')
							.on('click', '.l-checkbox', function(e){
								e.stopPropagation();
								var self        = $(this),
									pageIndex   = p.pageIndex,
									arr         = _cache.rowSelected[pageIndex-1],
									checkbox    = grid1Body.find('.l-checkbox'),
									grid1Rows   = grid1Body.find('.l-grid-row'),
									grid2Rows   = grid2Body.find('.l-grid-row'),
									grid2Detail = grid2Rows.next('.l-grid-row-detail'),
									len         = checkbox.length,
									i           = 0,
									j           = len - 1,
									tmpData     = _cache.tmpData[p.pageIndex - 1];
								
								/*返回选择数据*/
								if( nic.base.isFunction(onCheckFn) ){
									if( !onCheckFn(tmpData, grid1Rows, grid2Rows) ){
										return false;
									}
								}
								
								if( !self.hasClass('l-checkbox-selected') ){
									self.addClass('l-checkbox-selected');
									grid1Rows.addClass('l-grid-row-selected');
									grid2Rows.addClass('l-grid-row-selected');
									grid2Detail.addClass('l-grid-row-selected');
									checkbox.addClass('l-checkbox-selected');
									btnWrap.find('.l-checkbox').addClass('l-checkbox-selected');
									for(; i < len; i++){
										arr[i] = that.getRowData(i);
									}
								}else{
									self.removeClass('l-checkbox-selected');
									checkbox.removeClass('l-checkbox-selected');
									grid1Rows.removeClass('l-grid-row-selected');
									grid2Rows.removeClass('l-grid-row-selected');
									grid2Detail.removeClass('l-grid-row-selected');
									btnWrap.find('.l-checkbox').removeClass('l-checkbox-selected');
									for(; j > -1; j--){
										arr[j] = null;
									}
								}
								
							});
					},
					
					/**
					* 获取行数据
					* @param {Number} index 记录的索引值
					*/
					getRowData: function(index){
						var	pageIndex = p.pageIndex,
							data      = _cache.tmpData[pageIndex - 1]; //表格数据

						if( index === -1 ){
							return false;
						}
						
						return data[index];
					},
					
					/**
					* 明细按钮事件
					* @param {object} init 和 refresh共享的对象
					*/
					detailBtnFn: function(options){
						var that        = this,
							grid1       = g.grid1,
							grid2       = g.grid2,
							grid1Body   = grid1.find('.l-grid-body'),   //表格主体
							grid2Body   = grid2.find('.l-grid-body'),   //表格主体
							pageSize    = p.pageSize;
							
						grid1Body
							.off('click','.l-grid-row-detailbtn')
							.on('click','.l-grid-row-detailbtn',function(){
								var self         = $(this),
									parents      = self.parents('.l-grid-row'),
									index        = parents.attr('data-row'),
									grid2_row    = grid2Body.find('.l-grid-row').eq(index),
									detail       = grid2Body.find('.l-grid-row-detail'+index),
									detailHeight = 0;

								if( self.hasClass('l-grid-row-detailbtn-close') ){
									detail.show();
									self.removeClass('l-grid-row-detailbtn-close')
										.addClass('l-grid-row-detailbtn-open');
									
									for(var i = 0; i<detail.length; i++){
										detailHeight += detail[i].offsetHeight;
									}
									parents.height(grid2_row[0].offsetHeight + detailHeight);
								}else{
									detail.hide();
									self.removeClass('l-grid-row-detailbtn-open')
										.addClass('l-grid-row-detailbtn-close');
										
									parents.height(grid2_row[0].offsetHeight);
								}
							});
					},
					
					/**
					* ajax获取数据
					* @param {Function} callback ajax回调函数
					*/
					setAjaxCookieData: function(){
						
					},
					
					
					/**
					* ajax获取数据
					* @param {Function} callback ajax回调函数
					*/
					ajaxGetData: function(callback){
						var pageAjax      = p.pageAjax,
							type          = pageAjax.type === undefined ? 'GET' : pageAjax.type,
							showAllRow    = p.showAllRow,
							pageIndex     = p.pageIndex,
							pageSize      = p.pageSize,
							data          = '',
							isShowLoading = p.isShowLoading,
							args          = [],
							str           = '',
							pathname      = encodeURIComponent(location.pathname + 'getGridPrev'),
							strToData     = function(str){
												var args = {},
													data,
													param,
													name,
													value;
												
												data = str.split('&');
												
												for (var i = 0; i < data.length; i++) {
													param = data[i].split('=');
													name  = param[0];
													value = param[1];
													if(name === ""){
														name = "unkown";
													}
													if(typeof(args[name]) === "undefined"){ //参数尚不存在
														args[name] = value;
													}else if(typeof(args[name]) === "string"){ //参数已经存在则保存为数组
														args[name] = [args[name]];
														args[name].push(value);
													}else{ //已经是数组的
														args[name].push(value);
													}
												}
												
												return args;
											}
						
						if( typeof pageAjax.data ==='string' ){
							data = pageAjax.data;
							data += '&pageIndex=' + pageIndex;
							data += '&pageSize=' + pageSize;
							
							args = data.replace(/{{|}}/g,'');

						}else if( typeof pageAjax.data === 'object' || !pageAjax.data ){
							data = $.extend({}, pageAjax.data);
							data.pageSize  = p.pageSize;
							data.pageIndex = p.pageIndex;
							
							for(var i in data){
								args.push(i + '=' + data[i])
							}
							
							args = args.join('&');
						}
						
						if( !g.isInit ){
							nic.base.cookie.set(pathname, args, 200000);
						}
						if( /getGridPrev/.test(location.search) ){
							args = nic.base.cookie.get(pathname) ? nic.base.cookie.get(pathname) : args;
							p.pageIndex = Number( strToData(args).pageIndex );
						}else{
							nic.base.cookie.set(pathname, args, 200000);
						}

						$.ajax({
							type: type,
							url: pageAjax.url,
							cache: false,
							dataType: "json",
							data: args,
							beforeSend: function(){
								if( nic.base.isFunction(pageAjax.beforeSend) ){
									pageAjax.beforeSend();
								}
								if( isShowLoading ){
									g.loding.fadeIn().removeClass('fn-hide');
								}
								g.onLoaded = false;
							},
							success: function(data){
								if( nic.base.isFunction(pageAjax.success) ){
									pageAjax.success(data);
								}
								if( nic.base.isFunction(callback) ){
									setTimeout(function(){
										callback(data);
										if( isShowLoading ){
											g.loding.fadeOut();
										}
									}, 500);
								}
								if( showAllRow ){
									p.pageSize = data ? data.total : 0;
									p.isPage   = false;
								}

								g.onLoaded = true;
							},
							error: function(data){
								callback();
								g.loding.fadeOut();
								g.jump(data);
							}
						});
					},
					
					/**
					* 获取数据
					*/
					getData: function(){
						var that = this;
							
						if( p.pageAjax ){
							p.data = {rows:[],total:0};
							that.ajaxGetData(function(data){
								p.data = data = !data ? p.data : ((!data.rows || !data.total) ? p.data : data);
								that.handleData(false);
								that.tBodyCreateHtml(p.pageIndex);
								that.pageCreateHtml();
								if( data.total !== undefined ){
									g.grid2.find('.l-grid-nullText').html(p.nullText);
								}
							});
						}
					},
					
					/**
					* 设置在cookie中的columns数据
					*/
					setCacheColumns: function(){
						var columns   = p.columns,
							len       = columns.length,
							i         = 0,
							h         = 0,
							cookieStr = nic.base.cookie.get( encodeURIComponent(location.pathname) ),
							cookieArr = cookieStr.split(','),
							cookieLen = cookieArr.length;
							
						if( cookieStr ){
							_cache.columns = [];
						}
						
						for(; i<len; i++){
							for(var j = 0; j<cookieLen; j++){
								if( columns[i].display === cookieArr[j] ){
									_cache.columns[h] = columns[i];
									h++;
								}
							}
						}
					},

					/**
					* 数据处理
					* XXX: 待优化
					*@param {boolean} isGetData 防止ajax请求数据时死循环
					*/
					handleData: function(isGetData){
						var that      = this,
						    data      = p.data = !p.data ? {rows:[],total:0} : ((!p.data.rows || !p.data.total) ? {rows:[],total:0} : p.data),
							pageAjax  = p.pageAjax,
							pageSize  = p.pageSize,
							pageIndex = p.pageIndex,
							len       = Math.ceil(data.total / pageSize),
							i         = 0,
							arr       = []; //临时数组
						
						/*初始化*/
						isGetData = isGetData == undefined ? true : isGetData;
						if( isGetData ){
							that.getData(); //获取数据并重载 Html
						}

						/*分割数据*/
						for(; i<len; i++){
							
							if( !_cache.rowSelected[i] ){
								_cache.rowSelected[i] = []; //已选行数据
							}
							
							/*分割静态数据给arr*/
							if( !pageAjax ){
								var h = 0;	
								
								arr[i] = [];
								
								for(; h< pageSize; h++){
									var rowData = data.rows[pageSize*i + h];
									if( rowData ){
										arr[i][h] = rowData;
									}
								}
							}
						}
						
						if( pageAjax ){
							_cache.tmpData[pageIndex - 1] = p.data.rows;
						}else{
							_cache.tmpData = arr;
						}
						
						/*设置列的cookie*/
						if( p.isHideColumns ){
							that.setCacheColumns();
						}
					},
					
					/**
					* 对比现有数据
					* @param {String} name 要比较的的字段
					* @param {String} sortType 排序裂隙
					*/
					compareData: function(name, sortType){
						var index = p.pageIndex - 1,
							arr   = _cache.tmpData[index],
							len   = arr.length;
						
						arr.sort( getJsPercentDataComparator(name) );
						
						if( sortType === 'desc' ){
							arr.reverse();
						}
						
						_cache.tmpData[index] = arr;
						
						return arr;

						/*序顺序(a、b都是数字时按大小，a、b长度都一样是按字母，a、b长度不一时按长度)*/
						function getJsPercentDataComparator(name){
							return function(a, b){
								var result = 0;
								
								if( a[name] !== null && b[name] !== null ){
									var aStr   = a[name],
										bStr   = b[name],
										afloat = parseFloat(aStr),
										bfloat = parseFloat(bStr);
									
									if( !isNaN(bfloat) && !isNaN(afloat) ){
										result = (afloat>bfloat) ? 1 : -1;
									}else{
										if( aStr.length === bStr.length ){
											result = aStr.localeCompare(bStr);
										}else{
											result = (aStr.length>bStr.length) ? 1 : -1;
										}
										
									}
								}
								
								return result;
							}
						}
						
					},
					
					/**
					* 表头事件
					*/
					tHeadFn: function(){
						var that           = this,
							pageSize       = p.pageSize,                  //每页显示多少个
							pageIndex      = p.pageIndex,                 //起始位置
							grid1          = g.grid1,
							grid2          = g.grid2,
							grid1Header    = grid1.find('.l-grid-header'),        //表格头
							grid1Body      = grid1.find('.l-grid-body'),          //表格主体
							grid2Header    = grid2.find('.l-grid-header'),        //表格头
							grid2Body      = grid2.find('.l-grid-body'),          //表格主体
							isSort         = p.isSort,
							isSortCurrent  = p.isSortCurrent,
							popup          = g.popup,
							isHideColumns  = p.isHideColumns,
							isShow         = true;
											
						//排序
						if( isSort ){
							grid2Header
								.find('.l-grid-hd-cell-span')
								.addClass(function(){
									var that    = $(this),
										parents = that.parents('.l-grid-hd-cell');
									if( that.attr('data-columnName') ){
										that.addClass('l-grid-hd-cell-sortWrap')
											.append('<span class="l-grid-hd-cell-sort"><b class="icon icon-angle-up"></b></span>');
										parents.addClass('l-grid-hd-cell-sort');
									}
								});
								
							grid2Header
								.off('click', '.l-grid-hd-cell-sortWrap')
								.on('click', '.l-grid-hd-cell-sortWrap', function(){
									var self     = $(this),
										name     = self.attr('data-columnName'),
										sortType = '',
										sort     = self.find('.l-grid-hd-cell-sort');
										
									nic.ui.onselectstart(self);
									
									if( isSortCurrent ){
										
										if( sort.hasClass('desc') ){
											sort.html('<b class="icon icon-angle-up"></b');
											sort.removeClass('desc');
											sortType = 'desc';
										}else{
											sort.html('<b class="icon icon-angle-down"></b');
											sort.addClass('desc');
											sortType = 'asc';
										}
										
										that.compareData(name, sortType);
										that.tBodyCreateHtml();
										
									}else{
										
										if( g.onLoaded ){
											
											if( sort.hasClass('desc') ){
												sort.html('<b class="icon icon-angle-up"></b');
												sort.removeClass('desc');
												sortType = 'desc';
											}else{
												sort.html('<b class="icon icon-angle-down"></b');
												sort.addClass('desc');
												sortType = 'asc';
											}
											
											if( typeof p.pageAjax.data === 'string' ){
												if( /&sort=/.test(p.pageAjax.data) ){
													p.pageAjax.data = (p.pageAjax.data).replace(/&sort={{\w*}}/, '&sort={{'+ name+ '}}');
													p.pageAjax.data = (p.pageAjax.data).replace(/&sortType={{\w*}}/, '&sortType={{'+ sortType +'}}');
												}else{
													p.pageAjax.data = (p.pageAjax.data) + '&sort={{'+ name+ '}}&sortType={{'+ sortType +'}}';
												}
											}else if( typeof p.pageAjax.data === 'object' ){
												p.pageAjax.data.name = name;
												p.pageAjax.data.name = sortType;
											}
									
											that.handleData();
											that.tBodyCreateHtml();
											
										}// end if g.onLoaded
										
									}
								});
							
						}//end if isSort
						
						if( isHideColumns ){
							grid2Header
								.off('contextmenu', '.l-grid-hd-cell')
								.on('contextmenu', '.l-grid-hd-cell', function(e){
									var self           = $(e.currentTarget),
										popup          = g.popup,
										popupWidth     = popup.outerWidth(),
										grid           = g.grid,
										gridWidth      = grid.outerWidth(),
										gridOffsetLeft = g.grid.offset().left,
										mousePosition  = nic.ui.mousePosition(e),
										x              = mousePosition.positionX - gridOffsetLeft;
										
									if( gridWidth - x > popupWidth ){
										popup.css({'left':x});
									}else{
										popup.css({'left':x - popupWidth});
									}
									
									isShow = true;
									popup.show();
									return false;
								});
							
							popup
								.off('click')
								.on('click',function(e){
									isShow = true;
									e.stopPropagation();
								})
								.off('click', '.l-checkbox')
								.on('click', '.l-checkbox', function(e){
									var self = $(e.currentTarget);
									
									if( self.hasClass('l-checkbox-selected') ){
										if( popup.find('.l-checkbox-selected').length <= 1 ){ return false; }
										self.removeClass('l-checkbox-selected');
									}else{
										self.addClass('l-checkbox-selected');
									}
									
									var selected = popup.find('.l-checkbox-selected').next(),
										len      = selected.length,
										i        = 0,
										arr      = [];
										
									for(; i<len; i++){
										arr[i] = selected.eq(i).html();
									}
									nic.base.cookie.set(encodeURIComponent(location.pathname), arr.join(), 200000);
									that.setCacheColumns();
									that.tHeadCreateHtml();
									that.tBodyCreateHtml();
									e.stopPropagation();
								})
								.off('click', '.l-grid-popup-text')
								.on('click', '.l-grid-popup-text', function(e){
									var self  = $(e.currentTarget);
									self.prev().trigger('click');
									nic.ui.onselectstart(self);
									e.stopPropagation();
								});
							
							$(window).on('click', function(){
								if( isShow ){
									popup.hide();
									isShow = false;
								}
							});
						}
					},
							
					/**
					* 行事件
					*/
					rowFn: function(){
						
						var that   = this,
							grid1             = g.grid1,
							grid2             = g.grid2,
							grid1Body         = grid1.find('.l-grid-body'),   //表格主体						
							grid2Header       = grid2.find('.l-grid-header'), //表格头
							grid2Body         = grid2.find('.l-grid-body'),   //表格主体
							onCheckFn         = p.onCheckFn,
							pageSize          = p.pageSize,
							onRowFn           = p.onRowFn,
							isOnRowCheckbox   = p.isOnRowCheckbox,
							isSelectSingleRow = p.isSelectSingleRow,
							isOnRowFn         = nic.base.isFunction(onRowFn);
							
						grid2Body
							.off('mouseover', '.l-grid-row-cell')
							.on('mouseover', '.l-grid-row-cell', function(){
								var self = $(this),
									arrt = self.attr('data-cell');
								
								self.parent().attr('data-cell', arrt);
							});
						
						grid2Body
							.off('click', '.l-grid-row')
							.on('click', '.l-grid-row', function(){
								var self          = $(this),
									pageIndex     = p.pageIndex,
									//selected      = grid2Body.find('.l-grid-row-selected'),
									selfDetail    = self.next('.l-grid-row-detail'),
									i             = self.attr('data-row'),
									currentArr    = _cache.rowSelected[pageIndex-1],
									grid1Row      = grid1Body.find('.l-grid-row').eq(i),
									grid1Checkbox = grid1Body.find('.l-checkbox').eq(i);
													
								if( !self.hasClass('l-grid-row-selected') ){
									if( !onRowFn || isSelectSingleRow ){
										self.siblings().removeClass('l-grid-row-selected');
										grid1Row.siblings().removeClass('l-grid-row-selected');
									}
									if( isOnRowCheckbox ){
										grid1Checkbox.addClass('l-checkbox-selected');									
									}
																
									self.addClass('l-grid-row-selected');
									selfDetail.addClass('l-grid-row-selected');
									grid1Row.addClass('l-grid-row-selected');

								}else{
									if( !isSelectSingleRow ){
										self.removeClass('l-grid-row-selected');
										selfDetail.removeClass('l-grid-row-selected');
										grid1Row.removeClass('l-grid-row-selected');
									}
									if( isOnRowCheckbox ){
										grid1Checkbox.removeClass('l-checkbox-selected');								
									}
								}
								
								if( isOnRowFn ){
									if( !self.hasClass('l-grid-row-selected') ){
										currentArr[i] = that.getRowData(i);
										
									}else{
										_cache.rowSelected[pageIndex-1][i] = null;
									}
									onRowFn(that.getRowData(i), self);
								}
							});
					},
					
					/**
					* 列事件
					* TODO
					*/
					cellFn: function(){
						var grid1           = g.grid1,
							grid2           = g.grid2,
							grid1Body       = grid1.find('.l-grid-body'),   //表格主体						
							grid2Header     = grid2.find('.l-grid-header'), //表格头
							grid2Body       = grid2.find('.l-grid-body'),   //表格主体
							onCheckFn       = p.onCheckFn,
							pageSize        = p.pageSize,
							onRowFn         = p.onRowFn,
							isOnRowCheckbox = p.isOnRowCheckbox,
							isOnRowFn       = nic.base.isFunction(onRowFn);
					},
					
					/**
					* 运行 grid 控件
					*/
					run: function(reRequest){
						var that = this;
						
						reRequest = reRequest === undefined ? true : reRequest;
						
						that.handleData(reRequest);
						
						if( p.isHead ){
							that.tHeadCreateHtml();
							that.tHeadFn();
						}
						
						that.tBodyCreateHtml();
						
						if( g.isInit ){
							that.rowFn();
							//this.cellFn();
							that.checkboxFn();
							that.detailBtnFn();
							g.isInit = false;
							nic.ui.onselectstart(g.grid1);
						}
						
						if( p.isPage || p.bottomBtns ){
							if( p.isPage ){
								that.pageCreateHtml();
								that.pageFn();
							}
							if( p.bottomBtns ){
								that.bottomBtnsCreateHtml();
								that.bottomBtnsFn();
							}
						}else{
							g.footer.remove();
						}
						
					},
					
					/**
					* grid 初始化
					* @return {Object} grid对象
					*/
					init: function(){
						var grid    = p.wrap.append('<div class="l-grid" id='+ p.id +'></div>').find('#'+p.id),
							loding  = grid.append('<div class="l-grid-loading fn-hide"><div class="l-grid-loadingBg"></div><div class="l-grid-loadingIco"></div></div>').find('.l-grid-loading'),
							popup   = grid.append('<div class="l-grid-popup"></div>').find('.l-grid-popup'),
							gBody   = grid.append('<div class="l-grid-body fn-clear"></div>').find('.l-grid-body'),
							grid1   = gBody.append('<div class="l-grid1"></div>').find('.l-grid1'),
							grid2   = gBody.append('<div class="l-sl-grid2"><div class="l-grid2"></div></div>').find('.l-grid2'),
							footer  = grid.append('<div class="l-grid-footer"></div>').find('.l-grid-footer'),
							btnWrap = footer.append('<div class="l-grid-footer-btns"></div>').find('.l-grid-footer-btns'),
							page    = footer.append('<div class="l-grid-footer-page"></div>').find('.l-grid-footer-page');
						
						p.pageIndex = 1;
						g.loding      = loding;
						g.popup       = popup;
						g.grid        = grid;
						g.grid1       = grid1;
						g.grid2       = grid2;
						g.footer      = footer;
						g.page        = page;
						g.btnWrap     = btnWrap;
						g.isInit      = true;
						g.onLoaded    = false;

						this.run();
						return g;
					}
					
				};//_core end

			/**
			* grid 刷新对象
			* @method nic.ui.grid.refresh
			* @param {object} [o] - 刷新grid新的配置项
			* @return {Object} grid对象
			*/
			g.refresh = function(o){
				if( o ){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined ){
							if( p.pageAjax && o.pageAjax ){
								for(var key2 in o.pageAjax){
									p[key][key2] = o.pageAjax[key2];
								}
							}else{
								p[key] = o[key];
							}
						}
					}
				}
				
				if( o && !o.refreshIndex ){
					p.pageIndex = 1;
				}
				
				_cache.tmpData = [];
				_cache.rowSelected = [];
				_cache.detailSelected = [];
				
				_core.run();
				return g;
			};
			
			/**
			* grid 获取列头
			* @method nic.ui.grid.getColumns
			* @return {Array} grid对象的列头数据
			*/
			g.getColumns = function(){
				if( _cache.columns.length ){
					return _cache.columns;
				}
				return p.columns;
			},

			/**
			* grid 重设列头
			* @method nic.ui.grid.reSetColumns
			* @param {object} 列对象
			* @return {Object} grid对象
			*/
			g.reSetColumns = function(o){
				 p.columns = _cache.columns = o.columns;
				_core.run(false);
			};

			/**
			* grid 修改列名
			* @method nic.ui.grid.changeHeaderText
			* @param {Number|String} i - 为Number时Columns的引值，checkbox的不算；为string时是Columns的name
			* @param {String} text - 要修改的文本
			* @return {Object} grid对象
			*/
			g.changeHeaderText = function(i, text){
				var grid2    = g.grid2,
					isString = isNaN(Number(i));
					
				
				if( isString ){
					var obj = grid2.find('.l-grid-hd-cell-span'),
						len = obj.length,
						j   = 0;
					for(; j<len; j++){
						if( obj.eq(j).attr('data-columnname') === i ){
							obj.eq(j).find('.l-grid-hd-cell-text').html(text);
						}
					}
				}else{
					grid2.find('.l-grid-hd-cell-text').eq(i).html(text);
				}
				
				return g;
			};

			/**
			* grid 获取当前页数据，只支持静态数据，使用ajax数据时请用pageAjax提供的success方式获取
			* @method nic.ui.grid.getCurrentData
			* @return {Object} grid当前页数据对象
			*/
			g.getCurrentData = function(){
				var pageIndex = p.pageIndex;
				return _cache.tmpData[pageIndex - 1];
			};
			
			/**
			* grid 获取当前页所有数据
			* @method nic.ui.grid.getCurrentAllData
			*/
			g.getCurrentAllData = function(){
				return p.data;
			};

			/**
			* grid 获取选中的数据
			* @method nic.ui.grid.getSelectData
			* @return {object} grid数据，格式与请求的一样
			*/
			g.getSelectData = function(){
				var arr      = [],
					i        = 0, 
					selected = _cache.rowSelected,
					len      = selected.length,   //记录的长度
					total    = 0;                 //data个数
				
				/*过滤掉records下面的空元素*/
				for(; i < len; i++){
					if( selected[i] ){
						for(var h = 0; h<selected[i].length; h++){
							if( selected[i][h] ){
								arr.push( selected[i][h] );
							}
						}
					}
				}
				
				/*组装一个表格适用的data数据*/
				total = arr.length;
				
				return {
					"rows": arr,
					"total":total
				};
			};
			
			/**
			* grid 获取当前页索引
			* @method nic.ui.grid.getPageIndex
			* @return {Boolean} 
			*/
			g.getPageIndex = function(){
				return p.pageIndex;
			};
			
			/**
			* grid 取消的选中的行
			* @method nic.ui.grid.uncheckRow
			* @param {Number} i 取消的选中的行，值为当前页
			* @return {Object} grid对象
			*/
			/*g.uncheckRow = function(i, pageIndex){
				if( i !== undefined ){
					var grid1       = g.grid1,
						grid2       = g.grid2,
						grid1Header = grid1.find('.l-grid-header'), //表格头
						grid1Body   = grid1.find('.l-grid-body'),   //表格主体
						grid2Body   = grid2.find('.l-grid-body'),   //表格主体
						grid1Row    = grid1Body.find('.l-grid-row').eq(i),
						grid2Row    = grid2Body.find('.l-grid-row').eq(i),
						checkbox    = grid1Body.find('.l-checkbox').eq(i),
						currentArr  = _cache.rowSelected[pageIndex-1];
					
					checkbox.removeClass('l-checkbox-selected');
					grid1Row.removeClass('l-grid-row-selected');
					grid2Row.removeClass('l-grid-row-selected');
					grid1Header.find('.l-checkbox').removeClass('l-checkbox-selected');
					currentArr[i] = null;
					
					_core.initCheckbox();
				}
				return g;
			};
		    */
		    g.uncheckRowByID = function(id){
				if( id !== undefined ){
					var grid1       = g.grid1,
						grid2       = g.grid2,
						grid1Header = grid1.find('.l-grid-header'), //表格头
						grid1Body   = grid1.find('.l-grid-body'),   //表格主体
						grid2Body   = grid2.find('.l-grid-body'),   //表格主体
		                i           = getIndex(),
						grid1Row    = grid1Body.find('.l-grid-row').eq(i),
						grid2Row    = grid2Body.find('.l-grid-row').eq(i),
						checkbox    = grid1Body.find('.l-checkbox').eq(i);
		            
					checkbox.removeClass('l-checkbox-selected');
					grid1Row.removeClass('l-grid-row-selected');
					grid2Row.removeClass('l-grid-row-selected');
					grid1Header.find('.l-checkbox').removeClass('l-checkbox-selected');
					
					_core.initCheckbox();
				}
		        
				return g;
		        
		        function getIndex(){
		            var selectedArr = _cache.rowSelected,
		                len         = selectedArr.length,
		                index       = 0;
		                
		            for(; index<len; index++){
		                if( selectedArr[index] ){
		                    var subSelectedArr = selectedArr[index],
		                        subLen         = subSelectedArr.length,
		                        subIndex       = 0;
		                    for(; subIndex<subLen; subIndex++){
		                        if( subSelectedArr[subIndex] && subSelectedArr[subIndex].id == id ){
		                            subSelectedArr[subIndex] = null;
		                            return subIndex;
		                        }
		                    }
		                }
		            }
		        }
			};
			
			/*g.uncheckRow2 = function(key, val){
				var data = _cache.rowSelected;
				
				for(var i = 0; i<data.length; i++){
					var dataItem = data[i];
					for(var h = 0; h<dataItem.length; h++){
						if( dataItem[h][key] !== undefined && dataItem[h][key] === val ){
							
						}
					}
				}
			};*/
			
			g.resetStatisToFixed = function(num){
				p.statisToFixed = num;
			}
			
			/**
			* grid 跳出执行
			* @method nic.ui.grid.jump
			* @return {Boolean} 
			*/
			g.jump = function(data){
				console.log('ajax data error:',data);
				return false;
			};
			
			/**
			* grid 扩展
			* @method nic.ui.grid.methos
			* @return {object} 
			*/
			g.methos = g.methos || {};
			
			return _core.init(o);
		};

	module.exports = function(options){
		return new Grid(options);
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	**┏┓　　　┏┓ 
	*┏┛┻━━━┛┻┓ 
	*┃　　　　　　　┃ 　 
	*┃　　　━　　　┃ 
	*┃　┳┛　┗┳　┃ 
	*┃　　　　　　　┃ 
	*┃　　　┻　　　┃ 
	*┃　　　　　　　┃ 
	*┗━┓　　　┏━┛ 
	****┃　　　┃　　　　 
	****┃　　　┃ 神兽保护，代码无bug
	****┃　　　┗━━━┓ 
	****┃　　　　　　　┣┓ 
	****┃　　　　　　　┏┛ 
	****┗┓┓┏━┳┓┏┛ 
	******┃┫┫　┃┫┫ 
	******┗┻┛　┗┻┛  
	*/

	'use strict';

	var 
		/**
		* 默认配置
		* @private
		*/
		template   = __webpack_require__(7),
		pagination = __webpack_require__(4),
		p          = {
					template: null, //模板ID
					nullTemplate: null, //空模板ID
					wrap: null, //插入位置
					pageIndex:1, //初始化页码
					pageSize:10, //每页显示的条数
					pageSizeOptions: [10, 20, 50, 100, 200], //可选择设定的每页结果数
					//data:{}, //静态数据
					pageAjax:{ //ajax数据源
						type: 'GET',
						dataType: "json",
						success: function(){},
						error: function(){},
						beforeSend: function(){}
					},
					before: function(){},
					after: function(){},
					isShowLoading: true, //是否显示loading效果
					onRowFn: function(){}, //点击行事件
					bottomBtns: {}, //底部按钮
					statis: [], //统计
					statisToFixed: 2 //统计精确位数
				},
				
		/**
		* 缓存池
		* @private
		*/
		_cache = {
			data: {},
			tmpData: [],
			rowSelected: [],
			ele: {},
			isInit: true,
			fragment: {
				loading: '<div class="l-gridFree-loading"><div class="l-grid-loadingBg"></div><div class="l-grid-loadingIco"></div></div>',
				pagination: '<div class="l-gridFree-footer-page ui-pagination"></div>',
				pageSelect: '<div class="l-gridFree-footer-select"></div>',
				bottomBtns: '<div class="l-gridFree-footer-btn"></div>',
				nullWrap: p.nullTemplate ? template(p.nullTemplate, {cls: 'l-gridFree-body-nullWrap'}) :'<div class="l-gridFree-body-nullWrap"></div>'
			}
		},
		
		/**
		* 内部对象
		* @private
		*/
		_core = {
			ajax: function(callback){
				var pageAjax      = p.pageAjax,
					type          = pageAjax.type === undefined ? 'GET' : pageAjax.type,
					pageIndex     = p.pageIndex,
					pageSize      = p.pageSize,
					data          = '',
					isShowLoading = p.isShowLoading,
					args          = [],
					str           = '',
					pathname      = encodeURIComponent(location.pathname + 'getGridPrev'),
					strToData     = function(str){
										var args = {},
											data,
											param,
											name,
											value;
										
										data = str.split('&');
										
										for (var i = 0; i < data.length; i++) {
											param = data[i].split('=');
											name  = param[0];
											value = param[1];
											if(name === ""){
												name = "unkown";
											}
											if(typeof(args[name]) === "undefined"){ //参数尚不存在
												args[name] = value;
											}else if(typeof(args[name]) === "string"){ //参数已经存在则保存为数组
												args[name] = [args[name]];
												args[name].push(value);
											}else{ //已经是数组的
												args[name].push(value);
											}
										}
										
										return args;
									}
				if( typeof pageAjax.data ==='string' ){
					data = pageAjax.data;
					data += '&pageIndex=' + pageIndex;
					data += '&pageSize=' + pageSize;
					
					args = data.replace(/{{|}}/g,'');

				}else if( typeof pageAjax.data === 'object' || !pageAjax.data ){
					data = $.extend({}, pageAjax.data);
					data.pageSize  = p.pageSize;
					data.pageIndex = p.pageIndex;
					
					for(var i in data){
						args.push(i + '=' + data[i])
					}
					
					args = args.join('&');
				}
				
				if( !_cache.isInit ){
					nic.base.cookie.set(pathname, args, 200000);
				}
				if( /getGridPrev/.test(location.search) ){
					args = nic.base.cookie.get(pathname) ? nic.base.cookie.get(pathname) : args;
					p.pageIndex = Number( strToData(args).pageIndex );
				}else{
					nic.base.cookie.set(pathname, args, 200000);
				}
				
				$.ajax({
					type: p.pageAjax.type,
					url: p.pageAjax.url,
					cache: false,
					dataType: p.pageAjax.dataType,
					data: args,
					beforeSend: function(){
						//if( p.isShowLoading && _cache.ele.loading && ( p.nullTemplate || p.pageIndex !== 1 ) ){
							_cache.ele.loading.style.display = 'block';
						//}
					},
					success: function(data){
						_cache.data = data;
						_cache.tmpData[p.pageIndex - 1] = data.rows;
						
						//if( p.pageIndex === 1 && !p.nullTemplate ){
						//	callback(data);
						//	p.pageAjax.success(data);
						//}else{
							setTimeout(function(){
								callback();
								p.pageAjax.success(data);
								
								if( p.isShowLoading ){
									_cache.ele.loading.style.display = 'none';
								}
							}, 500);
						//}
					},
					error: function(data){
						_cache.tmpData[p.pageIndex - 1] = [];
						_cache.total = 0;
						callback();
						p.pageAjax.error(data);
						console.log(data)
						setTimeout(function(){
							_cache.ele.loading.style.display = 'none';
						}, 500);
					}
				});
			},
			createWrap: function(ele){
				var wrap     = document.getElementById(ele),
					children = null,
					footer   = null,
					fragment = _cache.fragment;
					
				if( !wrap ) return console.log('请指定容器！');
				
				if( !wrap.children.length ){
					wrap.innerHTML ='<div class="l-gridFree">'+ 
										fragment.loading +
										'<div class="l-gridFree-body">'+
											fragment.nullWrap +
										'</div>'+
										'<div class="l-gridFree-footer">'+
											fragment.bottomBtns +
											fragment.pageSelect +
											fragment.pagination +
										'</div>'+
									'</div>';
				}
				
				children = wrap.firstChild.children;
				footer   = children[2];
				
				return {
					wrap: wrap,
					loading: children[0],
					body: children[1],
					footer: footer,
					bottomBtns: footer.children[0],
					pageSelect: footer.children[1],
					pagination: footer.children[2]
				}
			},
			createBody: function(){
				var arr = _cache.tmpData[p.pageIndex - 1];

				/* 扩展template的辅助函数  */
				if( p.templateRender ){
					for(var i = 0, len = p.templateRender.length; i<len; i++){
						template.helper(p.templateRender[i].name, p.templateRender[i].handle);
					}
				}

				_cache.data.rows          = arr;
				_cache.ele.body.innerHTML = arr.length ? template(p.template, _cache.data) : _cache.fragment.nullWrap;
				
			},
			createFooter: function(){
				
				if( !_cache.tmpData[p.pageIndex - 1].length ) {
					 _cache.ele.footer.style.display = 'none';
				}else{
					_cache.ele.footer.style.display = '';
				}
				
				var html            = '',
					pageSize        = p.pageSize,
					pageSizeOptions = p.pageSizeOptions;
				
				if( pageSizeOptions.length ){
					html += '<select class="ui-select">';
					for(var i = 0, len = pageSizeOptions.length, select = _cache.ele.pageSelect; i<len; i++){
						html += '<option value="'+ pageSizeOptions[i] +'"'+ (pageSize === pageSizeOptions[i] ? ' selected="selected"' : '') +'>'+ pageSizeOptions[i] +'</option>';
					}
					html += '</select>';
					
					select.innerHTML = html;
					
					select.firstChild.onchange = function(){
						p.pageSize = Number( this.value );
						p.pageIndex = 1;
						_cache.tmpData = [];
						
						_core.ajax(function(){
							_core.before();
							_core.createBody();
							_core.after();
							_core.createFooter();
						});
					}
				}

				pagination({
	                cur: p.pageIndex,
	                total: Math.ceil(_cache.data.total / pageSize),
	                target: _cache.ele.pagination,
	                prevText: '&lt;',
	                nextText: '&gt;',
					callback: function(cur, total){
						p.pageIndex = cur;
						if( !_cache.tmpData[p.pageIndex -1] ){
							_core.ajax(function(){
								_core.before();
								_core.createBody();
								_core.after();
							});
						}else{
							_core.before();
							_core.createBody();
							_core.after();
						}
					}
	            });
			},
			
			
			/**
			* 对比现有数据
			* @param {String} name 要比较的的字段
			* @param {String} sortType 排序裂隙
			*/
			compareData: function(name, sortType, callback){
				var index = p.pageIndex - 1,
					arr   = _cache.tmpData[index];
				
				arr.sort( getJsPercentDataComparator(name) );
				
				if( sortType === 'desc' ){
					arr.reverse();
				}
				
				_cache.tmpData[index] = arr;
				
				_core.before();
				_core.createBody();
				_core.after();
				callback();
				
				return;

				/*序顺序(a、b都是数字时按大小，a、b长度都一样是按字母，a、b长度不一时按长度)*/
				function getJsPercentDataComparator(name){
					return function(a, b){
						var result = 0;
						
						if( a[name] !== null && b[name] !== null ){
							var aStr   = a[name],
								bStr   = b[name],
								afloat = parseFloat(aStr),
								bfloat = parseFloat(bStr);
							
							if( !isNaN(bfloat) && !isNaN(afloat) ){
								result = (afloat>bfloat) ? 1 : -1;
							}else{
								if( aStr.length === bStr.length ){
									result = aStr.localeCompare(bStr);
								}else{
									result = (aStr.length>bStr.length) ? 1 : -1;
								}
								
							}
						}
						
						return result;
					}
				}
				
			},
			
			/**
			* 对比所有数据
			* @param {String} name 要比较的的字段
			* @param {String} sortType 排序裂隙
			*/
			compareAllData: function(name, sortType, callback){
				if( typeof p.pageAjax.data === 'string' ){
					if( /&sort=/.test(p.pageAjax.data) ){
						p.pageAjax.data = (p.pageAjax.data).replace(/&sort={{\w*}}/, '&sort={{'+ name+ '}}');
						p.pageAjax.data = (p.pageAjax.data).replace(/&sortType={{\w*}}/, '&sortType={{'+ sortType +'}}');
					}else{
						p.pageAjax.data = (p.pageAjax.data) + '&sort={{'+ name+ '}}&sortType={{'+ sortType +'}}';
					}
				}else if( typeof p.pageAjax.data === 'object' ){
					p.pageAjax.data.sort     = name;
					p.pageAjax.data.sortType = sortType;
				}else{
					p.pageAjax.data          = {};
					p.pageAjax.data.sort     = name;
					p.pageAjax.data.sortType = sortType;
				}
				_core.ajax(function(){
					_core.before();
					_core.createBody();
					_core.after();
					callback();
				});
			},

			before: function(){
				var that = this,
					data = nic.base.isFunction( p.before ) ? p.before() : null;

				if( data ) _cache.data.selectedData = data;
			},

			after: function(){
				if( nic.base.isFunction(p.after) ) p.after();
			}
		},
		
		/**
		* 表格对象
		* @public
		*/
		GridFree = function(options){

			p = $.extend(true, p, options);
			
			if( !p.wrap ) return;
			
			_cache.ele = $.extend({}, _cache.ele, _core.createWrap(p.wrap) );
			
			/*if( p.data ){
				_cache.data = p.data;
				_cache.tmpData[p.pageIndex - 1] = p.data.rows;
				_core.createBody();
				_core.createFooter();
				_cache.isInit = false;
			}else{*/
				_core.ajax(function(){
					_core.before();
					_core.createBody();
					_core.after();
					_core.createFooter();
					_cache.isInit = false;
				});
			/*}*/
		};


	// DDD
	function equal(objA, objB){
	    if (typeof arguments[0] != typeof arguments[1])
	        return false;
	    //数组
	    if (arguments[0] instanceof Array)
	    {
	        if (arguments[0].length != arguments[1].length)
	            return false;
	        
	        var allElementsEqual = true;
	        for (var i = 0; i < arguments[0].length; ++i)
	        {
	            if (typeof arguments[0][i] != typeof arguments[1][i])
	                return false;
	            if (typeof arguments[0][i] == 'number' && typeof arguments[1][i] == 'number')
	                allElementsEqual = (arguments[0][i] == arguments[1][i]);
	            else
	                allElementsEqual = arguments.callee(arguments[0][i], arguments[1][i]);            //递归判断对象是否相等                
	        }
	        return allElementsEqual;
	    }
	    
	    //对象
	    if (arguments[0] instanceof Object && arguments[1] instanceof Object)
	    {
	        var result = true;
	        var attributeLengthA = 0, attributeLengthB = 0;
	        for (var o in arguments[0])
	        {
	            //判断两个对象的同名属性是否相同（数字或字符串）
	            if (typeof arguments[0][o] == 'number' || typeof arguments[0][o] == 'string')
	                result = eval("arguments[0]['" + o + "'] == arguments[1]['" + o + "']");
	            else {
	                //如果对象的属性也是对象，则递归判断两个对象的同名属性
	                //if (!arguments.callee(arguments[0][o], arguments[1][o]))
	                if (!arguments.callee(eval("arguments[0]['" + o + "']"), eval("arguments[1]['" + o + "']")))
	                {
	                    result = false;
	                    return result;
	                }
	            }
	            ++attributeLengthA;
	        }
	        
	        for (var o in arguments[1]) {
	            ++attributeLengthB;
	        }
	        
	        //如果两个对象的属性数目不等，则两个对象也不等
	        if (attributeLengthA != attributeLengthB)
	            result = false;
	        return result;
	    }
	    return arguments[0] == arguments[1];
	}

	/**
	* 刷新表格数据
	*/
	GridFree.prototype.refresh = function(options){
		
		p = $.extend(true, p, options);
		_cache.tmpData = [];
		
		_core.ajax(function(){
			_core.before();
			_core.createBody();
			_core.after();
			_core.createFooter();
		});
		
		return this;
	};

	/**
	* 排序
	* @param {String} options.sort 要比较的的字段
	* @param {String} options.sortType 排序类型
	* @param {Boolean} options.isSortCurrent 是否排序当前页的数据，默认为true，只按字符串大小排序，设置为false时，这进行ajax排序
	* @param {Function} options.callback 排序后的回调函数
	*/
	GridFree.prototype.sort = function(options){
		if( !options || !options.sort ) return;
				
		var sort          = options.sort,
			sortType      = options.sortType || 'asc',
			isSortCurrent = options.isSortCurrent === undefined ? true : options.isSortCurrent,
			callback      = options.callback || function(){};
		
		if( isSortCurrent ){
			_core.compareData(sort, sortType, callback);
		}else{
			_core.compareAllData(sort, sortType, callback);
		}

		return this;
	};

	/**
	* 获取页码
	*/
	GridFree.prototype.getPageIndex = function(){
		return p.pageIndex;
	};

	/**
	* 获取一页条数
	*/
	GridFree.prototype.getPageSize = function(){
		return p.pageSize;
	};

	/**
	* 获取当前页数据
	*/
	GridFree.prototype.getCurrentData = function(){
		return _cache.data;
	};

	/**
	* 获取行数据
	* @param {Number} i 当前页的行索引
	*/
	GridFree.prototype.getRowData = function(i){
		return _cache.data.rows[i];
	};


	/**
	* 设置选中数据
	* @param {Number} i 当前页的行索引
	*/
	GridFree.prototype.setRowSelected = function(selectedData){
		_cache.rowSelected.push(selectedData);
	};

	/**
	* 删除选中数据
	* @param {Number} i 当前页的行索引
	*/
	GridFree.prototype.delRowSelected = function(selectedData){
		var rowSelected = _cache.rowSelected,
			len         = rowSelected.length,
			i           = 0,
			index       = 0;

		for(; i<len; i++){
			var isEqual = equal(rowSelected[i], selectedData);

			if( isEqual ){
				_cache.rowSelected.splice(i, 1);
			}
		}
		//console.log( _cache.rowSelected );
	};

	/**
	* 获取选中数据
	* @param {Number} i 当前页的行索引
	*/
	GridFree.prototype.getRowSelected = function(i){
		return _cache.rowSelected;
	};

	module.exports = function(options){
		return new GridFree(options);
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
	!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(/^$|,+/)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/[\n\r\t\s]+/g," ").replace(/<!--.*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g;e.openTag="{{",e.closeTag="}}";var y=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a,b){a=a.replace(/^\s/,"");var c=a.split(" "),e=c.shift(),f=c.join(" ");switch(e){case"if":a="if("+f+"){";break;case"else":c="if"===c.shift()?" if("+c.join(" ")+")":"",a="}else"+c+"{";break;case"/if":a="}";break;case"each":var g=c[0]||"$data",h=c[1]||"as",i=c[2]||"$value",j=c[3]||"$index",k=i+","+j;"as"!==h&&(g="[]"),a="$each("+g+",function("+k+"){";break;case"/each":a="});";break;case"echo":a="print("+f+");";break;case"print":case"include":a=e+"("+c.join(",")+");";break;default:if(-1!==f.indexOf("|")){var l=b.escape;0===a.indexOf("#")&&(a=a.substr(1),l=!1);for(var m=0,n=a.split("|"),o=n.length,p=l?"$escape":"$string",q=p+"("+n[m++]+")";o>m;m++)q=y(q,n[m]);a="=#"+q}else a=d.helpers[e]?"=#"+e+"("+c.join(",")+");":"="+a}return a}, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return d}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof exports?module.exports=d:this.template=d}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
		
	/**
	* TODO
	* nic.ui.validator
	* @class nic.ui.validator
	* @author norion.z
	* @blog http://zkeyword.com/
	* @param {Object} o 
	* @param {String} o.id 
	* @return {Object} select对象
	*/

	var nic       = __webpack_require__(1),
	    Validator = function(o){
		
	    	var 
	    		/**
	    		* 当前对象
	    		*/
	    		g = this,
	    		
	    		/**
	    		* 默认配置
	    		*/
	    		p = {
	    			target: null,
	    			//label: null,
	                text: {
	                    check: '必须勾选！',
	                    required: '不能为空！',
	    				select: '请选择！',
	                    length: '输入字符长度等于{{param}}个字符',
	                    minLength: '输入字符长度不小于{{param}}个字符',
	                    maxLength: '输入字符长度大小于{{param}}个字符',
	    				minValue: '请输入不能小于{{param}}',
	                    maxValue: '请输入不能大于{{param}}',
	                    integer: '请输入一个正确的整数值',
	                    digits: '请输入一个正确的正整数',
	                    floatNumber: '请输入一个精确到{{param}}位小数的数值',
	                    number: '请输入一个正确的数字',
	                    email: '邮箱格式不正确，请检查！',
	                    mobile: '手机号码不正确，请检查！如：13412345678',
	                    phone: '电话号码不正确，请检查！如：0592-1234567或13412345678',
	                    url: '请输入正确的网址，比如:http://www.example.com',
	                    date: '',
	                    format: '',
	                    ajax: ''
	                },
	                rules:null,
	                ajax:null,
	    			position: null
	    		},
	    			
	    		/**
	    		* 缓存池
	    		*/
	    		t = {
	    			//submit: false
	    		},
	    		
	    		/**
	    		* XXX
	    		* 代码逻辑
	    		*/
	    		c = {
	                
	                rule: {

	                    /* 强制勾选 */
	                    check: function(sVal, oItem, sParam){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	    					
	    					// XXX
	                        
	                        if( oItem[0].type === 'checkbox' && !$("input:checkbox[name='"+ oItem[0].name +"']:checked").length ){
	                            return c.handleText(oItem, 'check');
	                        }

	                        if(  oItem[0].type === 'radio' && !$("input:radio[name='"+ oItem[0].name +"']:checked").length ){
	                            return c.handleText(oItem, 'check');
	                        }
	                    },
	    				
	    				/* 强制选择 */
	    				select: function(sVal, oItem, sParam){
	                        if(sVal === sParam){
	                            return c.handleText(oItem, 'select', sParam);
	                        }
	    				},
	                    
	                    /* 非空 */
	    				//TODO
	                    required: function(sVal, oItem){
	                        if( !sVal.trims() ){
	    						return c.handleText(oItem, 'required');
	                        }
	                    },
	                    
	                    /* 固定长度 */
	                    length: function(sVal, oItem, sParam){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if( sVal.length !== Number(sParam) ){
	                            return c.handleText(oItem, 'length', sParam);
	                        }
	                    },
	                    
	                    /* 最小长度 */
	                    minLength: function(sVal, oItem, sParam){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if(sVal.length < sParam){
	                            return c.handleText(oItem, 'minLength', sParam);
	                        }
	                    },
	                    
	                    /* 最大长度 */
	                    maxLength: function(sVal, oItem, sParam){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if(sVal.length > sParam){
	                            return c.handleText(oItem, 'maxLength', sParam);
	                        }
	                    },
	    				
	    				/* 最小值 */
	                    minValue: function(sVal, oItem, sParam){
	                        
	                    	sVal   = Number(sVal);
	                    	sParam = Number(sParam);
	                    	
	                        if( sVal >= sParam ){
	                            return false;
	                        }
	                        
	                        return c.handleText(oItem, 'minValue', sParam);
	                    },
	                    
	                    /* 最大值 */
	                    maxValue: function(sVal, oItem, sParam){
	                        
	                    	sVal   = Number(sVal);
	                    	sParam = Number(sParam);
	                        
	                        if( sVal <= sParam ){
	                            return false;
	                        }
	                        
	                        return c.handleText(oItem, 'maxValue', sParam);
	                    },
	                    
	                    /* 整数 */
	                    integer: function(sVal, oItem){
	                        var f = parseFloat(sVal);
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if(!(!isNaN(f) && f.toString() === sVal && Math.round(f) === f)){
	                            return c.handleText(oItem, 'integer');
	                        }
	                    },
	                    
	                    /* 正整数 */
	                    digits: function(sVal, oItem){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if( Number(sVal) === 0 ){
	                            return c.handleText(oItem, 'digits');
	                        }
	                        
	                        if( !/^\d+$/.test(sVal) ){
	                            return c.handleText(oItem, 'digits');
	                        }
	                    },
	                    
	                    /* 浮点数 */
	                    floatNumber: function(sVal, oItem, sParam){
	                        var reg = new RegExp('^[0-9]+[\.][0-9]{'+ sParam +'}$');
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if( !reg.test(sVal) ){
	                            return c.handleText(oItem, 'floatNumber', sParam);
	                        }
	                    },
	                    
	                    /* 数字 */
	                    number: function(sVal, oItem, sParam){
	                    	var sParamArr = [],
	                    		reg       = '';
	                    	
	                        sVal = sVal.trims();

	                        if( isNaN(Number(sVal)) ){
	                            return c.handleText(oItem, 'number');
	                        }
	                        
	                        if( sParam ){
	                        	sParamArr = sParam.split(':');
	                        	if( sParamArr[0] === 'float' ){
	                        		reg = new RegExp('^[0-9]([\.][0-9]{1,'+ sParamArr[1] +'})?$');
	                        		if( !reg.test(sVal) ){
	                                    return c.handleText(oItem, 'floatNumber', sParamArr[1]);
	                                }
	                        	}
	                        }
	                    },
	                    
	                    /* 邮箱 */
	                    email: function(sVal, oItem){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if( !/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(sVal) ){
	                            return c.handleText(oItem, 'email');
	                        }
	                    },
	                    
	                    /* 手机 */
	                    mobile: function(sVal, oItem){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if( !/1[34578]{1}\d{9}$/.test(sVal) ){
	                            return c.handleText(oItem, 'mobile');
	                        }
	                    },
	                    
	                    /* 电话 */
	                    phone: function(sVal, oItem){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if( !/(1[34578]{1}\d{9}$)|(0\d{2,3}-\d{7,8}(-\d{2,3})?$)/.test(sVal) ){
	                            return c.handleText(oItem, 'phone');
	                        }
	                    },
	    				
	    				/* 身份证 */
	    				idCard: function(sVal, oItem){
	                        sVal = sVal.trims();

	                        if( !sVal.length ){
	                            return false;
	                        }

	                        if( !/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(sVal) ){
	                            return c.handleText(oItem, 'idCard');
	                        }
	                    },
	                    
	                    /* 网址 */
	                    url: function(sVal, oItem){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if( !/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(sVal) ){
	                            return c.handleText(oItem, 'url');
	                        }
	                    },
	                    
	                    //FIXME 
	                    /* 日期 */
	                    date: function(sVal, oItem, sParam){
	                        var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
	                        if (!regex.test(sVal)) return false;
	                        var d = new Date(sVal.replace(regex, '$2/$1/$3'));
	                        return ( parseInt(RegExp.$2, 10) === (1 + d.getMonth()) ) && (parseInt(RegExp.$1, 10) === d.getDate()) && (parseInt(RegExp.$3, 10) === d.getFullYear() );
	                    },
	                    
	                    format: function(sVal, oItem, sParam){
	                        var reg = new RegExp(sParam);
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        if( !reg.test(sVal) ){
	                            return c.handleText(oItem, 'format');
	                        }
	                    },
	                    
	                    ajax: function(sVal, oItem, sParam){
	                        
	                        sVal = sVal.trims();
	                        
	                        if( !sVal.length ){
	                            return false;
	                        }
	                        
	                        oItem.addClass('l-form-error');
	                        
	                        $.ajax({
	                            type: 'POST',
	                            url: sParam,
	                            cache: false,
	                            dataType: "json",
	                            beforeSend: function(){
	                                
	                            },
	                            success: function(data){
	                                if( !data ){
	                                    oItem.addClass('l-form-error');
	    								c.handleMessage(oItem, c.handleText(oItem, 'ajax'));
	                                }else{
	                                    oItem.removeClass('l-form-error');
	                                }
	                            },
	                            error: function(data){
	                                console.log(data);
	                            }
	                        });
	                    }
	                
	                },
	    			
	    			handlePositionStr: function(s){
	    				if( !s ) return;
	    				var sStr    = s.replace(/\{|\}/g, ''),
	    					oArr    = sStr.split(','),
	    					len     = oArr.length,
	    					i       = 0,
	    					oReturn = {}
	    					
	    				for(; i<len; i++){
	    					var oChlid = oArr[i].split(':');
	    					oReturn[oChlid[0]] = Number(oChlid[1]);
	    				}
	    				return oReturn;
	    			},
	    			
	    			route: function(oItem){
	    				
	    				if( !oItem.length ){ return; }
	    				
	    				var oThat      = this,
	    					sVal       = oItem.val(),
	    					aRule      = oItem.attr('data-validate').split(';'),
	    					len        = aRule.length,
	    					i          = 0,
	    					rCode      = /\=/,
	    					rFormat    = /format\=|ajax\=/,
	    					rPosition  = /\|/,
	    					isFunction = nic.base.isFunction;
	    					
	    				for(; i<len; i++){
	    					var fRule     = null,
	    						sText     = '',
	    						sType     = '',
	    						sTypeVal  = '',
	    						sPosition = '';
	    					
	    					if( rCode.test(aRule[i]) ){
	    						var aChild = aRule[i].split('=');
	    						
	    						if( rFormat ){
	    							if( aChild[0] === 'format' ){
	    								aChild = ['format', aRule[i].replace(rFormat,'')];
	    							}else{
	    								var tmpVal = '';
	    								tmpVal = aRule[i].replace(rFormat,'');
	    								tmpVal = tmpVal.replace(/{{value}}/, sVal);
	    								aChild = ['ajax', tmpVal];
	    							}
	    						}else if( aChild[0] === 'position' ){
	    							console.log(1)
	    						}
	    						
	    						fRule    = oThat.rule[aChild[0]];
	    						sType    = aChild[0];
	    						sTypeVal = aChild[1];
	    						
	    						if( fRule && isFunction(fRule) ){
	    							sText = fRule(sVal, oItem, aChild[1]);
	    						}
	    						
	    					}else{
	    						
	    						if( rPosition.test(aRule[i]) ){
	    							var aRuleChild = aRule[i].split('|');
	    							fRule     = oThat.rule[aRuleChild[0]];
	    							sType     = aRuleChild[0];
	    							sPosition = aRuleChild[1];
	    							if( !/\{.*\}/g.test(sPosition) ){
	    								sPosition = '';
	    								console.log('定位的格式不正确');
	    							}
	    						}else{
	    							fRule = oThat.rule[aRule[i]];
	    							sType = aRule[i];
	    						}
	    						
	    						if( fRule && isFunction(fRule) ){
	    							sText = fRule(sVal, oItem);
	    						}
	    					}

	    					if( sText ){
	    						return {
	    							html: sText,
	    							type: sType,
	    							typeVal: sTypeVal,
	    							position: oThat.handlePositionStr(sPosition)
	    						};
	    					}
	    				}
	    				
	    				return null;
	    			},
	    			
	                handleText: function(oItem, sMark, sParam){
	                    var arrtText    = oItem.attr('data-validate-'+ sMark +'Text'),
	                        defaultText = p.text[sMark],
	                        text        = arrtText ? arrtText : defaultText,
	                        reg         = /{{param}}/;
	    				oItem.attr('data-validate-'+ sMark +'Text', text);
	                    return text.replace(reg, sParam);
	                },
	    			
	    			handleMessage: function(oSelf, sContents, sType, sTypeVal, position){
	    				var oThat     = this,
	    					parents   = oSelf.parents('.ui-form'),
	    					message   = parents.find('.ui-form-message'),
	    					error     = parents.find('.l-form-error'),
	    					oItems    = parents.find('[data-validate]'),
	    					oTarget   = p.target,
	    					oPosition = oThat.handlePositionStr( oItems.attr('data-validate-position') ),
	    					html      = '<span class="error"><i></i>'+ sContents +'</span>',
	    					fPosition = function(position){
	    						message
	    							.attr('style', '')
	    							.css(position)
	    							.css({position:'absolute'})
	    							.addClass('ui-form-message-absolute')
	    						parents.css({position:'relative'});
	    						
	    						message.append('<i class="ui-form-message-arrow"></i>');

	    						message
	    							.append(function(){
	    								if( !message.find('.ui-form-message-arrow').length ) return '<i class="ui-form-message-arrow"></i>';
	    							})
	    							.find('.ui-form-message-arrow')
	    							.addClass(function(){
	    								if( position.top ) return 'arrowTop';
	    								if( position.bottom ) return 'arrowBottom';
	    							});
	    					}
	    					
	    				if( !message.length ){
	    					if( oSelf.next('.ui-form-message').length ){
	    						message = oSelf.next('.ui-form-message');
	    					}else if( message.length === 0 ){
	    						message = oTarget.find('.ui-form-message');
	    						message.length === 1 && message.html( html );
	    						if(!g.getStatus()){
	    							return;
	    						}
	    					}
	    				}

	    				if( !sContents ){
	    					message.empty();
	    					return false;
	    				}
	    				if( oItems.length !== 1 && error.length && sType ){
	    					html = '<span class="error"><i></i>'+ oThat.handleText(error.eq(0), sType, sTypeVal) +'</span>';
	    	 			}
	    				
	    				message.html( html );
	    				
	    				if( position ){
	    					fPosition(position);
	    				}else if(oPosition){
	    					fPosition(oPosition);
	    				}else if( p.position ){
	    					fPosition(p.position);
	    				}
	    			},
	    			
	    			handleError: function(oSelf, oRoute){
	    				var oThat      = this,
	    					sHideError = oSelf.attr('data-ishideValidte'),
	    					errorCls   = (sHideError === "true" && sHideError) ? 'l-form-error l-form-hideError' :'l-form-error',
	    					type       = oRoute ? oRoute.type : null,
	    					html       = oRoute ? oRoute.html : null,
	    					typeVal    = oRoute ? oRoute.typeVal : null,
	    					position   = oRoute ? oRoute.position : null;

	    				if( html ){
	    					oSelf
	    						.addClass(errorCls)
	    						.attr('data-validate-result', 'false')
	    						.parents('.l-select-wrap')
	    						.find('.l-select-single-init')
	    						.addClass(errorCls);
	    					oThat.handleMessage(oSelf, html, type, typeVal, position);
	    				}else{
	    					oSelf
	    						.removeClass(errorCls)
	    						.attr('data-validate-result', 'true')
	    						.parents('.l-select-wrap')
	    						.find('.l-select-single-init')
	    						.removeClass(errorCls);
	    					oThat.handleMessage(oSelf);
	    				}
	    				
	    				return html;
	    			},
	    			
	    			run: function(){
	    				var oThat      = this,
	    					oTarget    = p.target,
	                        fRules     = p.rules,
	                        fAjax      = p.ajax,
	    					fAction    = function(oSelf){
	    									var sVal     = oSelf.val(),
	    										sRule    = oSelf.attr('data-validate'),
	    										name     = oSelf.attr('data-validate-name'),
	    										allName  = oTarget.find('[data-validate-name="'+ name +'"]'),
	    										errorLen = oSelf.parents('.ui-form').find('.l-form-error').length,
	    										oRoute   = null;

	                                        if( nic.base.isFunction(fRules) && sRule === 'process' ){
	                                            return processHandle(sRule, fRules(oSelf), true );
	                                        }
	                                        
	                                        if( nic.base.isFunction(fAjax) && sRule === 'ajax' ){
	                                            processHandle(sRule);
	                                            fAjax(oSelf, function(status, isShow){
	                                                processHandle(sRule, status, isShow);
	                                            });
	                                            return true;
	                                        }

	    									oRoute = oThat.route(oSelf);
	    									
	    									if( name ){
	    										
	    										if( oRoute ){
	    											if( oRoute.type !== 'required' ){
	    												return sVal && oThat.handleError(oSelf, oRoute);
	    											}
	    											
	    											return allNameHandle();
	    										}
	    										
	    										return oThat.handleError(allName);
	    									}
	    									
	    									return oRoute ? 
	    												oThat.handleError(oSelf, oRoute) : 
	    												oThat.handleError(oSelf);
	    									
	    									function allNameHandle(){
	    										
	    										var obj     = allName.filter(function(){
	    															return this.value;
	    														}),
	    											nullObj = allName.filter(function(){
	    															return !this.value;
	    														}),
	    											okObj   = allName.filter(function(){
	    															return this.getAttribute('data-validate-result') === 'true';
	    														}),
	    											noObj   = allName.filter(function(){
	    															return this.getAttribute('data-validate-result') === 'false';
	    														})
	    										/*				
	    										console.log(
	    											errorLen, 
	    											nullObj.length, 
	    											okObj.length, 
	    											!sVal, 
	    											oSelf, 
	    											noObj, 
	    											oSelf.hasClass('l-form-error')
	    										)*/			
	    										
	    										if( errorLen ){
	    											
	    											//全部不通过
	    											if( errorLen === allName.length ){
	    												return ;
	    											}
	    											
	    											//当前无值且当前不通过、不是全部空值
	    											if( !sVal && oSelf.hasClass('l-form-error') && nullObj.length !== allName.length ){
	    												return oThat.handleError(oSelf);
	    											}
	    											
	    											//当前无值且有不通过
	    											if( !sVal && noObj.length ){
	    												return ;
	    											}
	    											
	    											//当前无值且有通过
	    											if( !sVal && okObj.length ){
	    												return ;
	    											}

	    											return oThat.handleError(oSelf, oRoute);
	    										}
	    										
	    										//全部空值
	    										if( nullObj.length === allName.length ){
	    											return oThat.handleError(allName, oRoute);
	    										}
	    										
	    										//无错且无空值
	    										if( !nullObj.length ){
	    											return ;
	    										}
	    										
	    										//无错且当前是空值
	    										if( !sVal ){
	    											return ;
	    										}
	    										
	    										return oThat.handleError(allName, oRoute);
	    									}

	                                        function processHandle(type, status, isShow){
	    										return !status ?
	    													oThat.handleError(
	    														oSelf, 
	    														type, 
	    														isShow ? oSelf.attr('data-validate-'+ type +'Text') : ''
	    													):
	    													oThat.handleError(oSelf);
	                                        }
	    								},
	    					fUnAction  = function(oSelf){
	    									var sHideError   = oSelf.attr('data-ishideValidte'),
	    										hideErrorCls = sHideError === "true" && sHideError ?
	    															'l-form-error l-form-hideError' :
	    															'l-form-error',
	    										name         = oSelf.attr('data-validate-name'),
	    										allName      = oTarget.find('[data-validate-name="'+ name +'"]'),
	    										errorLen     = allName.parents('.ui-form').find('.l-form-error').length;

	                                        if( oSelf[0].type === 'checkbox' || oSelf[0].type === 'radio' ){
	                                            $("input[name='"+ oSelf[0].name +"']").removeClass(hideErrorCls);
	                                        }
	    									
	    									if( allName.length && errorLen ){
	    										return ;
	    									}
	    									
	    									if( allName.length ){
	    										oThat.handleError(allName);
	    									}else{
	    										oThat.handleError(oSelf);
	    									}
	    								},
	    					fActionAll = function(){
	    									var oItem = oTarget.find('[data-validate]'),
	    										len   = oItem.length,
	    										i     = 0;
	    										
	    									for(; i<len; i++){
	    										if( !fAction( oItem.eq(i) ) ){
	    											fUnAction( oItem.eq(i) );
	    										}
	    									}
	    									return g.getStatus();
	    								};
	    				
	    				oTarget
	    					.on('blur', '[data-validate]', function(e){
	    						fAction( $(e.currentTarget) );
	    					})
	    					.on('focus', '[data-validate]', function(e){
	    						fUnAction( $(e.currentTarget) );
	    					})
	    					.on('change', 'select[data-validate]', function(e){
	    						fAction( $(e.currentTarget) );
	    					})
	    					.on('submit', function(){
	    						return fActionAll();
	    					})
	    					.on('all', function(){
	    						return fActionAll();
	    					});
	    					
	    				/*oTarget.on('blur', '.l-select-single-init', function(e){
	    					var obj = $(this).parents('.l-select-wrap').find('[data-validate]');
	    					if( obj.length ){
	    						fAction( obj );
	    					}
	    				});
	    				
	    				oTarget.on('focus', '.l-select-single-init', function(e){
	    					var obj = $(this).parents('.l-select-wrap').find('[data-validate]');
	    					if( obj.length ){
	    						fUnAction( $(e.currentTarget) );
	    					}
	    				});*/
	    			},
	    			
	    			init: function(o){
	    				for(var key in o){
	    					if( o.hasOwnProperty(key) && o[key] !== undefined && p[key] !== undefined ){
	    						p[key] = o[key];
	    					}
	    				}
	    				
	    				p.target = $(p.target);
	    				
	    				if( !p.target.length ){
	    					console.log('target not find');
	    				}
	    				
	    				c.run();
	    			}
	    		};
	    		
	    	g.reset = function(){
	    		var oTarget  = p.target,
	                oItem    = oTarget.find('[data-validate]'),
	                oMessage = oTarget.find('.ui-form-message'),
	                len      = oItem.length,
	                i        = 0;
	            
	            for(; i<len; i++){
	                oItem
	                    .eq(i)
	                    .val('')
	                    .removeClass('l-form-error')
	                    .next('.l-select-single')
	                    .find('.l-select-single-init')
	                    .removeClass('l-form-error');
	                oMessage.eq(i).empty();
	            }
	    	};
	    	
	    	g.getStatus = function(){
	    		var oTarget         = p.target,
	    			oError          = oTarget.find('.l-form-error'),
	    			oVisibleError   = oError.filter(function(){
	    									var that = $(this);
	    									return that.filter(':visible').length && ( that.filter(':enabled').length || that.hasClass('l-select-single-init') );
	    								}),
	    			oHideError      = oError.filter('.l-form-hideError'),
	    			len             = oVisibleError.length + oHideError.length,
	    			nErrorOffsetTop = oVisibleError.length ? oVisibleError.offset().top : 0;
	    		
	    		if( oVisibleError.length && $(window).height() < nErrorOffsetTop ){
	    			$('html, body').animate({scrollTop:nErrorOffsetTop}, 500);
	    			//oVisibleError.focus();
	    		}

	    		return !len;
	    	};
	    	
	    	g.validatorAll = function(){
	            return p.target.triggerHandler('all');
	    	};
	    	
	    	g.reload = function(){
	    		console.log('target overloaded');
	    		c.init(o);
	    	};

	    	return c.init(o);
	    };

	module.exports = function(o){
		return o ? new Validator(o) : {};
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* nic.ui.dialog 拖拽控件
	* @class nic.ui.dialog
	* @author norion.z
	* @blog http://zkeyword.com/
	*/
	// XXX
	var lang = {
		close: '关闭',
	    /*dialog*/
	    alert: '提示？',
	    confirm: '确认？',
	    error: '错误'
	}

	var nic    = __webpack_require__(1),
		drag   = __webpack_require__(3),
		dialog = {
			init: function(options){
				var o             = options || {},
					title         = o.title || '',
					text          = o.text || '',
					btns          = o.btns || '',							          //按钮若为空，将默认
					type          = o.type || '',                                     //错误类型
					top           = o.top,
					left          = o.left,
					ok            = o.ok || '',
					no            = o.no || '',
					width         = o.width || 200,
					height        = o.height || 50,
					id            = o.id || 'l-dialog-' + (new Date()).valueOf(),      //随机id，多次调用可以用
					titleId       = 'l-dialog-title' + (new Date()).valueOf(),
					isMask        = o.isMask === undefined  || o.isMask,               //是否允许遮罩
					isMaskClose   = o.isMaskClose === undefined || o.isMaskClose,      //是否点击遮罩关闭
					allowClose    = o.allowClose === undefined || o.allowClose,        //允许关闭
					allowEscClose = o.allowEscClose === undefined || o.allowEscClose,  //允许esc关闭
					isDrag        = o.isDrag === undefined || o.isDrag;                //允许拖拽
				
				var h = '';
					h += '<div class="l-ui l-dialog-wrap l-ui-current l-ui-mask" id="'+ id +'">';
					h += '	<table class="l-dialog-table">';
					h += '		<tr><td colspan="3" class="l-dialog-border l-dialog-border-top">&nbsp;</td></tr>';
					h += '		<tr>';
					h += '			<td class="l-dialog-border l-dialog-border-left">&nbsp;</td>';
					h += '			<td class="l-dialog-main"><div class="l-dialog-content" style="width:'+width+'px;height:'+height+'px"><div class="l-dialog-text">'+ text +'</div></div></td>';
					h += '			<td class="l-dialog-border l-dialog-border-right">&nbsp;</td>';
					h += '		</tr>';
					h += '		<tr><td colspan="3" class="l-dialog-border l-dialog-border-bottom">&nbsp;</td></tr>';
					h += '	</table>';
					h += '</div>';
				
				//载入容器
				nic.ui.wrap();
				$('#l-ui-wrap').prepend(h);
				
				var dialogWrap    = $('#'+id),
					dialogMain    = dialogWrap.find('.l-dialog-main'),
					dialogContent = dialogWrap.find('.l-dialog-content');
				
				nic.ui.dialog.setZIndex(id);
				
				dialogWrap.attr('tabindex', '1');
				dialogWrap.focus();
				
				/*标题*/
				if( title ){
					dialogMain.prepend('<div class="l-dialog-title" id="'+titleId+'">'+ title +'</div>');
				}	
				
				/*类型标识*/
				if( type ){
					dialogMain.find('.l-dialog-content').addClass('l-dialog-'+type);
				}
				
				/*按钮*/
				var i             = 0,
					btnWrap       = dialogMain.append('<div class="ui-floatCenter l-dialog-btnWrap"><div class="ui-sl-floatCenter"></div></div>')
											  .find('.ui-floatCenter'),
					btnMain       = dialogMain.find('.ui-sl-floatCenter'),
					btnWrapHeight = btnWrap.height();	
				if( btns ){
					$.each(btns,function(i,item){
						btnMain.append('<a href="javascript:;" class="'+ (item.cls?'ui-btn ui-btnMain ui-floatCenter-item '+item.cls:'ui-btn ui-btnMain ui-floatCenter-item') +'"><span>'+item.text+'</span></a>');
						if( item.onclick ){
							btnMain.find('a').eq(i).click(function(){
								item.onclick(i,item);
								nic.ui.dialog.close(id);
							});
						}
						
						/*item.onclick && btnMain.find('a').eq(i).click(function(){
							item.onclick(i,item);
							nic.ui.dialog.close(id);
						});*/
					});	
				}else{
					switch( type ){
						case 'alert':
							dialogContent.prepend('<div class="l-dialog-icon"><i class="icon icon-check-square-o"></i></div>');
							btnMain.append('<a href="javascript:;" class="ui-btn ui-btn-primary ui-floatCenter-item l-dialog-ok"><span>确定</span></a>');
							btnMain.find('.l-dialog-ok').click(function(){
								if( nic.base.isFunction(ok) ){
									ok();
								}
								nic.ui.dialog.close(id);
							});
							break;
						case 'confirm':
							dialogContent.prepend('<div class="l-dialog-icon"><i class="icon icon-question-circle"></i></div>');
							btnMain.append('<a href="javascript:;" class="ui-btn ui-btn-primary ui-floatCenter-item l-dialog-ok"><span>确定</span></a><a href="javascript:;" class="ui-btn ui-btnMain ui-btnMain-cancel ui-floatCenter-item l-dialog-no"><span>取消</span></a>');
							btnMain.find('.l-dialog-ok').click(function(){
								if( nic.base.isFunction(ok) ){
									ok();
								}
								nic.ui.dialog.close(id);
							});
							btnMain.find('.l-dialog-no').click(function(){
								if( nic.base.isFunction(no) ){
									no();
								}
								nic.ui.dialog.close(id);
							});
							break;
						case 'error':
							dialogContent.prepend('<div class="l-dialog-icon"><i class="icon icon-frown-o"></i></div>');
							btnMain.append('<a href="javascript:;" class="ui-btn ui-btn-primary ui-btnMain-cancel ui-floatCenter-item l-dialog-no"><span>取消</span></a>');
							btnMain.find('.l-dialog-no').click(function(){
								if( nic.base.isFunction(no) ){
									no();
								}
								nic.ui.dialog.close(id);
							});
							break;
					}//end switch
				}//end if
				
				
				/*位置*/
				var win        = $(window),
					dialogIcon = dialogWrap.find('.l-dialog-icon'),
					dialogText = dialogWrap.find('.l-dialog-text'),
					_setSize   = function(){
						dialogWrap.css({
							top: top || /*win.scrollTop() +*/ ( win.height() - dialogWrap.height() )/2,
							left: left || ( win.width() - dialogWrap.width() )/2
						});
					}
				
				_setSize();	
				win.resize(_setSize);

				dialogIcon.css({top: (height - dialogIcon.height())/2 + 15 });
				dialogText.css({'padding-top': (height - dialogText.height())/2 });
				
				dialogContent
					.css({opacity:0.1})
					.animate({ 
						opacity: 1
					}, 500);
			

				
				/*遮罩*/
				if( isMask ){
					nic.ui.lock();
				}
				
				/*拖拽*/
				if( isDrag ){
					drag({
						dragItem:'#'+titleId,
						dragWrap:'#'+id
					});
				}
				
				/*关闭*/
				if( allowClose ){
				
					/*添加关闭按钮*/
					dialogMain
						.prepend('<div class="l-dialog-close"><i class="icon icon-close" title="关闭"></i></div>')
						.find('.l-dialog-close')
						.click(function(){
							nic.ui.dialog.close(id);
						});
					
					/*点击遮罩关闭*/
					/* if( isMask && isMaskClose ){
						$('.l-ui-lock').click(function(){
							nic.ui.dialog.close(id);
						});
					} */
				
					/*esc退出*/
					if( allowEscClose ){
						var _modalKey = function (e){
							e = e || event;
							var code = e.which || event.keyCode;
							if(code === 27){
								nic.ui.dialog.close(id);
							}
						};
						
						if(document.attachEvent){
							document.attachEvent('onkeydown', _modalKey);
						}else{
							document.addEventListener('keydown', _modalKey, true);
						}
					}
				}// end if( allowClose )
			},
			
			/**
			* 设置层级
			* @param {Object} options drag参数
			*/
			setZIndex: function(id){
				var obj        = $('.l-ui'),
					i          = 0,
					len        = obj.length,
					zIndex     = nic.ui.zIndex(),
					mask       = $('.l-ui-lock'),
					maskZindex = Number( mask.css('z-index') ),
					dialog	   = $('#'+id);
				if( dialog.hasClass('l-ui-current') ){
									
					for(; i<len; i++){
						obj.eq(i).css({'z-index':maskZindex - i});
					}
					
					obj.removeClass('l-ui-current');
					dialog.css({'z-index':zIndex});
				}else{
					for(; i<len; i++){
						obj.eq(i).css({'z-index':maskZindex + len - i});
					}
					
				}
			},
			
			/**
			* 关闭释放
			* @member nic.ui.dialog
			* @param {Object} options drag参数
			*/
			close: function(id){
				if( id ){
					$('#'+id).remove();
				}else{
					$('.l-dialog-wrap').remove();
				}
				if( !$('.l-ui-mask').length ){
					nic.ui.unlock();
				}
				nic.ui.dialog.setZIndex(id);
			},
			
			/**
			* alert
			* @member nic.ui.dialog
			* @param {Object} options drag参数
			*/
			alert: function(options){
				var o      = options || {},
					title  = o.title || lang.alert,
					text   = o.text || '',
					width  = o.width,
					height = o.height,
					ok     = o.ok || '';
				dialog.init({
					title:title,
					text:text,
					width:width,
					height:height,
					type:'alert',
					ok:ok
				});
			},
			
			/**
			* confirm
			* @member nic.ui.dialog
			* @param {Object} options drag参数
			*/
			confirm: function(options){
				var o      = options || {},
					title  = o.title || lang.confirm,
					text   = o.text || '',
					width  = o.width,
					height = o.height,
					ok     = o.ok || '',
					no     = o.no || '';
				this.init({
					title:title,
					text:text,
					width:width,
					height:height,
					type:'confirm',
					ok:ok,
					no:no
				});
			},
			
			/**
			* error
			* @member nic.ui.dialog
			* @param {Object} options drag参数
			*/
			error: function(options){
				var o      = options || {},
					title  = o.title || '',
					text   = o.text || lang.error,
					width  = o.width,
					height = o.height,
					no     = o.no || '';
				this.init({
					title:title,
					text:text,
					width:width,
					height:height,
					type:'error',
					no:no
				});
			},
			
			/**
			* 小提示框
			* @member nic.ui.dialog
			* @param {Object} options drag参数
			*/
			prompt: function(options){
				var o        = options || {},
					id       = o.id || 'l-dialog-' + (new Date()).valueOf(),
					top      = o.top,
					left     = o.left,
					cls      = o.cls || '',                          //自定义Class
					text     = o.text || '',                         //提示内容
					isMask   = o.isMask || true,                     //是否允许遮罩
					showTime = o.showTime || 2000,                   //显示时间，默认2秒
					endFn    = o.endFn || '',                        //关闭后需要执行的函数
					width    = o.width || '',
					height   = o.height || 'auto';
				
				//载入容器
				nic.ui.wrap();
				var h = '';
				h += '<div class="l-ui l-dialog-wrap" id="'+ id +'">';
				h += '	<div class="l-dialog-prompt">'+ text +'</div>';
				h += '</div>';
				$('#l-ui-wrap').prepend(h);
				var zIndex     = nic.ui.zIndex(),
					dialogWrap = $('#'+id).css({'width':width,'height':height,'z-index':zIndex});
				
				//位置
				var win      = $(window),
					_setSize = function(){
						dialogWrap.css({
							top: top || /*win.scrollTop() +*/ ( win.height() - dialogWrap.height() )/2,
							left: left || ( win.width() - dialogWrap.width() )/2
						});
					}
				
				_setSize();	
				win.resize(_setSize);
				
				//遮罩
				if( isMask ){
					nic.ui.lock();
				}
				
				//关闭
				function show(){
					nic.ui.dialog.close(id);
					if( endFn && typeof endFn === 'function' ){
						endFn();
					}
				}
				setTimeout(show,showTime);
				
			}
				
		};


	module.exports = dialog;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
		
	/**
	check模拟
	*/

	var nic   = __webpack_require__(1),
		Check = function(o){
			
			var 
				/**
				* 当前对象
				*/
				g = this,
				
				/**
				* 默认配置
				*/
				p = {
						id           : 'l-check-'+(new Date()).valueOf(),
						target       : null,
						wrap         : null,   //target外框，一般不设置
						checkbox     : false,  //multiple时设置有效，与radio互斥
						radio        : false,  //multiple时设置有效，与checkbox互斥
						onLoad       : null
					},
				
				/**
				* 代码逻辑
				*/
				c = {

						/**
						* 创建 html
						*/
						createHtml: function(){
							var target  = p.target,
								len     = p.target.length,
								type    = len ? target[0].type : null,
								i       = 0;
							
							p.wrap = p.target.parent();
							
							/*遍历多个target*/						
							for(; i<len; i++){
								var checkItem      = target.eq(i);
	                            
	                            if( checkItem.parent().hasClass('l-check-wrap') ){
	                                continue;
	                            }
	                            
								var checkItemClass = checkItem[0].className,
	                                checkItemValue = checkItem.attr('value'),
									checkItemName  = checkItem.attr('name'),
									isChecked      = checkItem.attr('checked'),
									isDisabled     = checkItem.attr('disabled'),
									disabledClass  = isDisabled ? (' l-'+ type + '-disabled') :'',
									checkedClass   = isChecked ? (' l-'+ type + '-selected') :'';
									
								checkItem.next()
										 .addClass('l-check-label l-'+ type +'-label')
										 .end()
										 .wrap('<div class="l-check-wrap fn-left"></div>')
										 .after('<div class="l-check-item l-'+ type +' '+ checkItemClass + checkedClass + disabledClass +'" data-name="'+ checkItemName +'" data-val="'+ checkItemValue +'"></div>');

							}
							target.css({'width':0,'height':0})
							//target.hide();
						},

						
						/**
						* 事件处理
						*/
						checkFn: function(){
							var that    = this,
								wrap    = p.wrap
								browser = nic.base.browser;
								
							nic.ui.onselectstart(wrap.parent());
	                        
							wrap
								.off('click','.l-check-wrap')
								.on('click','.l-check-wrap',function(e){
									if( browser.ie && Number(browser.ie) < 8 ){
										var self      = $(e.currentTarget)
											checkItem = self.find('input');
										checkItem.trigger('change');
									}
								})
	                            .on('click', '.l-check-item', function(e){
	                                checkItem.trigger('change');
	                            })
								.on('change', 'input', function(e){
									var self       = $(e.currentTarget),
										checkItem  = self.next(),
										selfName   = self.attr('name'),
										selfType   = self[0].type;
										
									if( !selfName ){ return console.log(selfType+' name is not define!') }
									
									if( selfType === 'radio' ){
										var sibling    = wrap.find('.l-check-item'),
											siblingLen = sibling.length,
											i          = 0;
										for(; i<siblingLen; i++){
											if( sibling.eq(i).attr('data-name') === selfName ){
												sibling.eq(i).removeClass('l-radio-selected');
											}
										}
										checkItem.addClass('l-radio-selected');
									}else{
										if( checkItem.hasClass('l-checkbox-selected') ){
											checkItem.removeClass('l-checkbox-selected');
										}else{
											checkItem.addClass('l-checkbox-selected');
										}
									}
								})
						},
						
						/**
						* 运行check
						*/
						run: function(){
							var that = this;
								
							that.createHtml();
							that.checkFn();
							
						},
						
						/**
						* 初始化
						*/
						init: function(o){
				
							for(var key in o){
								if( o.hasOwnProperty(key) && o[key] !== undefined ){
									p[key] = o[key];
								}
							}

							p.target = $(p.target);

							c.run();

							return g;
						}//end init
					};
			
			/**
			* 刷新
			*/
			g.refresh = function(o){
				for(var key in o){
					if( o.hasOwnProperty(key) && o[key] !== undefined && !o.target){
						p[key] = o[key];
					}
				}

				c.init();
				return g;
			};
			
			return c.init(o);
		};
		
	module.exports = function(o){
		if( !o ){
			return {};
		}
		return new Check(o);
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	* nic.ui.pop 弹出窗控件
	* @class nic.ui.tab
	* @author norion.z
	* @blog http://zkeyword.com/
	* @param {Object} options 弹出窗参数
	* @param {String} options.tabItem tab选卡对象
	* @param {String} options.tabWrap tab切换内容对象
	* @param {String} options.tabEvent 切换事件，默认click
	* @param {Number} options.tabIndex tab选卡起始位置，从0开始，默认0
	* @param {Boolean} options.isAuto 是否自动播放，默认false
	* @param {Number} options.autoTime 自动播放时间
	* @param {Number} options.autoSpeed 自动播放速度
	* @param {Function} options.onclick 切换后执行的函数
	* @return {Object} tab对象
	*/	
	var nic = __webpack_require__(1),
		tab = function(options){

			var o = options || {};
			
			if( !o.tabItem ){return false;}
			
			var tabItem   = o.tabItem,                          //tab选卡对象
				tabWrap   = o.tabWrap || null,                  //tab切换内容对象
				tabEvent  = o.tabEvent || 'click',              //切换事件
				tabIndex  = o.tabIndex || 0,                    //初始位置
				isAuto    = o.isAuto || false,                  //是否自动播放
				autoTime  = o.autoTime || 2000,                 //自动播放时间
				autoSpeed = o.autoSpeed || 0,                   //自动播放速度
				onclick   = o.onclick ? o.onclick : null;       //切换后执行的函数
				
			/*切换动作*/
			var tabFn = {
				/*初始化*/
				init: function(){
					if( !tabWrap ){ return; }
					var oTabWrap    = $(tabWrap),
						index       = tabIndex,
						oTabItem    = oTabWrap.eq(index),
						oTabAllItem = $(tabItem);
						
					oTabItem
						.show()
						.siblings(tabWrap)
						.hide();
						
					oTabAllItem
						.on(tabEvent, function(){
							index = oTabAllItem.index(this);
							tabFn.cutoverFn(index, this);
						});
						
					isAuto && tabFn.autoFn(index);
				},
				
				/*切换函数*/
				cutoverFn: function(i, that){
					var oTabWrap = $(tabWrap),
						oTabItem = oTabWrap.eq(i);
					
					//tab切换内容的html不为空才做下面动作
					if( oTabItem.html() ){
						if( autoSpeed ){
							oTabItem
								.stop(true,true)
								.fadeIn(autoSpeed)
								.siblings(tabWrap)
								.fadeOut(autoSpeed);
						}else{
							oTabItem
								.stop(true,true)
								.show()
								.siblings(tabWrap)
								.hide();
						}
					}else{
						oTabWrap.hide();
					}
					
					nic.base.isFunction(onclick) && onclick.apply(that, [i, oTabWrap]);
				},
				
				/*自动播放函数*/
				autoFn: function(i){
					var mun   = $(tabWrap).size(),
						fAuto = function(){
										tabFn.cutoverFn(i);
										i++;
										if( i === mun ){
											i = 0;
										}
									},
						oTime = setInterval(fAuto, autoTime);
						
					$(tabItem)
						.parent()
						.hover(function(){
							clearInterval(oTime);
						},function(){
							oTime = setInterval(fAuto, autoTime);
						});
				}
			};//end tabfn
			
			tabFn.init();
		};
		
	module.exports = tab;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	/**
	* nic.ui.pop 弹出窗控件
	* @class nic.ui.tip
	* @author norion.z
	* @blog http://zkeyword.com/
	* @param {Object} options 弹出窗参数
	* @param {String} options.id tip的id
	* @param {String} options.target tip的触发对象
	* @param {String} options.targetWrap target的最外层，默认网页的最外层为body，因为有可能在其他元素中定位
	* @param {String} options.header tip标题
	* @param {String} options.html tip的html内容
	* @param {String} options.render render事件，动态内容
	* @param {String} options.width 宽度
	* @param {String} options.isTrack 是否鼠标跟随
	* @param {String} options.isArrow 是否需要箭头
	* @param {String} options.arrowDirection 设箭头位置，默认是向上向下，可选是向左向右
	* @param {String} options.event 触发显示tip
	* @return {Object} tip对象
	*/
	var Tip = function(o){
			var 
				/**
				* 全局对象
				* @public
				*/
				g = this,
				
				/**
				* 默认配置
				* @private
				*/
				p = {
					id             : 'l-tip-'+(new Date()).valueOf(),
					target         : '',
					targetWrap     : 'body',          //target的最外层，默认网页的最外层为body，因为有可能在其他元素中定位
					header         : '',              //tip是否有标题
					html           : '',              //tip的内容
					render         : null,            //tip的内容事件，与data-tip、html互斥
					width          : 150,
					isTrack        : false,           //是否鼠标跟随
					isArrow        : true,           //是否需要箭头
					arrowDirection : 'topBottom',     //设箭头位置，默认是向上向下，可选是向左向右
					//isInitShow     : false,           //初始化显示tip
					event          : 'mouseover'      //触发显示tip
				},
				
				/**
				* 内部对象
				* @private
				*/
				c = {
					createHeader: function(){
						var tipHeader = p.tipHeader;
						if( tipHeader ){
							p.tipMain.append('<h5>'+ tipHeader +'</h5>');
						}
					},
					
					createContent: function(){
						var h = '';
						
						if( p.render && nic.base.isFunction(p.render) ){
							h = p.render(p.target);
						}else if(p.html){
							h = p.html;
						}else{
							h = p.target.attr('data-tip');
						}
						
						if( !p.tipMain.find('.l-tipMain-text').length ){
							p.tipMain.append('<div class="l-tipMain-text">'+ h +'</div>');
						}
					},
					
					arrow: function(){
						if( p.isArrow ){
							var tipWrap          = p.tipWrap.addClass('l-tip-Arrow'),
								tipArrow         = tipWrap.prepend('<span class="l-tipArrow"></span>').find('.l-tipArrow'),
								tipWrapHeight    = tipWrap[0].offsetHeight,
								tipWrapWidth     = tipWrap[0].offsetWidth,
								target           = p.target,
								targetWidth      = target[0].offsetWidth,
								targetHeight     = target[0].offsetHeight,
								targetTop        = target.offset().top,
								targetLeft       = target.offset().left,
								targetWrap       = p.targetWrap,      
								targetWrapWidth  = targetWrap[0].offsetWidth,
								targetWrapHeight = targetWrap[0].offsetHeight,
								arrowDirection   = p.arrowDirection,
								top              = 0,
								left             = 0;
							
							if( arrowDirection === 'topBottom' ){
								tipArrow.addClass('l-tipArrow-topBottom');
								var tipArrowH = tipArrow.height(),
									tipArrowW = tipArrow.width();
								/*判断obj在左还是在右*/
								if( targetLeft < targetWrapWidth/2 - targetWidth/2 ){
									left = targetLeft;
									/*判断obj在上还是在下*/
									if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
										top = targetTop + targetHeight + tipArrowH;
										tipArrow.addClass('l-tipArrow-topLeft');
									}else{
										top = targetTop - tipWrapHeight - tipArrowH;
										tipArrow.addClass('l-tipArrow-bottomLeft');
									}
								}else{
									left = targetLeft + targetWidth - tipWrapWidth;
									/*判断obj在上还是在下*/
									if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
										top = targetTop + targetHeight + tipArrowH;
										tipArrow.addClass('l-tipArrow-topRight');
									}else{
										top = targetTop - tipWrapHeight - tipArrowH;
										tipArrow.addClass('l-tipArrow-bottomRight');
									}
								}
							}else{
								var tipArrowH = tipArrow.height(),
									tipArrowW = tipArrow.width();
								tipArrow.addClass('l-tipArrow-leftRight');
								/*判断obj在左还是在右*/
								if( targetLeft < targetWrapWidth/2 - targetWidth/2 ){
									left = targetLeft + targetWidth + tipArrowW;
									/*判断obj在上还是在下*/
									if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
										top = targetTop;
										tipArrow.addClass('l-tipArrow-leftTop');
									}else{
										top = targetTop + targetHeight - tipWrapHeight;
										tipArrow.addClass('l-tipArrow-leftBottom');
									}
								}else{
									left = targetLeft - targetWidth -tipArrowW;
									/*判断obj在上还是在下*/
									if( targetTop < targetWrapHeight/2 - targetHeight/2 ){
										top = targetTop;
										tipArrow.addClass('l-tipArrow-rightTop');
									}else{
										top = targetTop + targetHeight - tipWrapHeight;
										tipArrow.addClass('l-tipArrow-rightBottom');
									}
								}
							}
							/*var tipArrowTop    = tipArrow.css('top') !='auto' ? parseInt(tipArrow.css('top')) : 0,
							    tipArrowLeft   = tipArrow.css('left') !='auto' ? parseInt(tipArrow.css('left')) : 0,
							    tipArrowBottom = tipArrow.css('bottom') !='auto' ? parseInt(tipArrow.css('bottom')) : 0,
								tipArrowRight  = tipArrow.css('right') !='auto' ? parseInt(tipArrow.css('right')) : 0;
								
							tipWrap.css({top:top,left:left + tipArrowLeft + tipArrowRight});*/
							tipWrap.css({top:top,left:left});
							
							//console.log(tipArrow.position().left)
						}
					},
					
					defaultPositon: function(){
						var tipWrap      = p.tipWrap.addClass('l-tip-default'),
							top          = 0,
							left         = 0,
							target       = p.target,
							targetWidth  = target[0].offsetWidth,
							targetHeight = target[0].offsetHeight,
							targetOffset = target.offset(),
							targetTop    = targetOffset.top,
							targetLeft   = targetOffset.left,
						
						left = targetLeft;
						top = targetTop + targetHeight + 5;
						tipWrap.css({top:top, left:left});
					},
					
					trackMouse: function(){
						if( p.isTrack ){
							var tipWrap       = p.tipWrap.addClass('l-tip-track'),
								mousePosition = nic.ui.mousePosition();
							tipWrap.css({top:mousePosition.positionY + 5, left:mousePosition.positionX  + 5});
						}
					},
					
					remove: function(){
						p.tipWrap.remove();
						//p = null;
						//c = null;
						//g = null;
					},
					
					run:function(){
						this.createHeader();
						this.createContent();
						this.defaultPositon();
						this.trackMouse();
						this.arrow();
					},
					
					/**
					* 初始化
					*/
					init: function(o){
						for(var key in o){
							if( o.hasOwnProperty(key) && o[key] !== undefined ){
								p[key] = o[key];
							}
						}
						
						var target = p.target,
							event  = p.event,
							isShow = false;
						

						$('body').off(event, target).on(event, target, function(e){
							
							/*载入容器*/
							var wrap   = nic.ui.wrap(),
								h	   = '',
								id     = p.id,
								width  = p.width;
							
							h += '<div id="'+ id +'" class="l-ui l-tip">';
							h += '	<div class="l-tipHeader"></div>';
							h += '	<div class="l-tipMain"></div>';
							h += '</div>';
							
							/*给p添加两个新成员*/
							p.tipWrap = wrap.prepend(h)
											.find('#'+id)
											.css({'width':width, 'z-index':nic.ui.zIndex()});
							
							p.tipMain = p.tipWrap.find('.l-tipMain');
							
							/*给p修改两个成员*/
							p.target = $(e.currentTarget);
							p.targetWrap = $(p.targetWrap);
							
							c.run();
							
							/*事件是点击时*/
							if( p.event === 'click' ){
								if( $('.l-tip').length ){
									p.tipWrap.siblings('.l-tip').remove();
								}
								
								$(target).on('mouseout', function(){
									isShow = true;
								}).on('mouseover', function(){
									isShow = false;
								});
								
								p.tipWrap.on('mouseout', function(){
									isShow = true;
								}).on('mouseover', function(){
									isShow = false;
								});
								
								$(window).off('click').on('click',function(){
									if( isShow ){
										c.remove();
									}
								});
								
							}
						}).on('mousemove', target, function(){
							c.trackMouse();
						}).on('mouseout', target, function(){
							if( p.event === 'mouseover' ){
								c.remove();
							}
						});
						
						return g;
					}
				};
			
			/**
			* 关闭tip
			* @method nic.ui.tip.close
			*/
			g.close = function(){
				c.remove();
			};
			
			return c.init(o);
		};
		
	module.exports = function(o){
		return new Tip(o);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
		
	/**
	* nic.ui.tree 树形控件
	* @class nic.ui.tree
	* @author norion.z
	* @blog http://zkeyword.com/
	* @param {Object} o 树形参数
	* @param {String} o.id 树形id
	* @param {String} o.data 树形数据
	* @param {String} o.ajax 树形ajax数据，与o.data互斥
	* @param {String} o.ajax.url
	* @param {String} o.ajax.data
	* @param {String} o.ajax.beforeSend
	* @param {String} o.ajax.success
	* @param {String} o.ajax.error
	* @param {String} o.isSimple 简单数据格式，已经经过递归的数据
	* @param {String} o.target 树形容器
	* @param {Object} o.height o.target的高度
	* @param {Object} o.selectedID 初始化选中的ID
	* @param {Object} o.isOpen 初始化是否打开
	* @param {Object} o.onClick 树形item的click事件
	* @param {Object} o.onRightClick 树形item的RightClick事件
	* @param {Object} o.onMouseOver 树形item的onmouseover事件
	* @param {Object} o.onMouseOut 树形item的onmouseout事件
	* @param {Object} o.onLoad 树形加载完触发的事件
	* @return {Object} tree对象
	*/

	var nic  = __webpack_require__(1),
		Tree = function(o){
			
			var g = this,
	        
				p = {
						id           : 'l-tree-'+(new Date()).valueOf(),
						data         : o.data,
						ajax         : null,
						isSimple     : true,   //是否是简单的数据格式
						target       : null,
						height       : 'auto',
						selected     : [],
						check        : null,
						isOpen       : true,
						isMultiple   : false,
						onClick      : null,
						onRightClick : null,
						onMouseOver  : null,
						onMouseOut   : null,
						onLoad       : null
					},
	                
	            /* 缓存池 */
	            _cache = {
	                selected: [],
	                init: false
	            },
	            
				c = {
						/**
						* 创建树对象
						*/
						createHtml: function(){
							var data       = p.data,
								target     = p.target,
								//isMultiple = p.isMultiple,
								isCheckBox = p.check === 'checkbox',
								isRadio    = p.check === 'radio',
								isFirst    = true,
								tree       = function(data, pid, level){
								
									if( data ){
										var html  = '';
										
										level++;
																			
										for(var i = 0; i<data.length; i++){
											if( Number(data[i].pid) === pid ){
											
												var son          = data[i].children ? data[i].children : [],
													sonWrap      = '',
													sonHtml      = tree(son, Number(data[i].id), level),
													isLast       = !data[i+1],
													lastCls      = '',
													lastSwitch   = '',
													lastIco      = '',
													lineCls      = '',
													openCls      = '',
													closeCls     = '',
													selectCls    = '',
													isParent     = data[i].isParent === undefined ? false : data[i].isParent,
													isOpen       = data[i].open === undefined ? false : data[i].open,
	                                                icon         = data[i].icon ? ' style="background:url('+ data[i].icon +') 0 0 no-repeat;"' : '',
													parentNode   = isParent ? ' l-tree-parentNode' : '',
	                                                j            = 0,
	                                                selected     = p.selected,
	                                                selectedLen  = selected ? selected.length : 0,
	                                                isChecked    = data[i].checked === undefined ? false : data[i].checked,
	                                                checkedStr   = '',
													checkHtml    = '',
	                                                dataName     = data[i].name,
	                                                dataId       = data[i].id,
	                                                dataPid      = data[i].pid,
	                                                dataTitle    = data[i].title !== undefined ? data[i].title : data[i].name;
	                                             
	                                            /* 获取选中数据 */
	                                            for( ; j<selectedLen; j++ ){
	                                                if( isChecked ){
	                                                    _cache.selected.push(data[i]);
														selectCls = ' l-tree-selectedNode';
	                                                }
	                                            }
	                                            
	                                            if( isChecked ){
	                                                checkedStr = ' data-checked="true"';
	                                            }
												
												if( isCheckBox ){
													checkHtml = '<span class="l-tree-check l-tree-checkbox l-tree-check-'+ level +'" data-level="'+ level +'"'+ checkedStr +'></span>';
												}
												
												if( isRadio ){
													checkHtml = '<span class="l-tree-check l-tree-radio" data-level="'+ level +'"></span>';
												}
												
												/*判断是不是子*/
												if( isLast ){
													lastCls    = ' l-tree-lastItem';
													lastSwitch = ' l-tree-lastSwitch';
													lastIco    = ' l-tree-lastIco';
												}

												/*判断最后一个*/
												if( !isLast ){
													lineCls = ' l-tree-line';
												}
												
												if( isOpen || isParent ){
													openCls = ' l-tree-open';
												}
												
												/*判断子有没有存在*/											
												if( sonHtml ){
													if( !isOpen ){
	                                                    openCls  = '';
														closeCls = ' l-tree-close';
													}
													sonWrap +=	'<ul class="l-tree-ul'+ lineCls + (closeCls?' fn-hide':'') +'">';
													sonWrap +=		sonHtml;
													sonWrap +=	'</ul>';
													if( isFirst && dataPid === 0 ){
														parentNode = ' l-tree-parentNode l-tree-parentFirstNode';
														isFirst = false;
													}else{
														parentNode = ' l-tree-parentNode';
													}
												}
												
												html += '<li class="fn-clear l-tree-level-'+ level + lastCls +'">';
												html += 	'<div class="l-tree-item l-tree-itemLevel-'+ level + parentNode + '">';
												html += 		'<span class="l-tree-switch'+ openCls + closeCls + lastSwitch +'"></span>';
												html +=         checkHtml;
												html += 		'<a class="l-tree-node '+ selectCls +'" data-id="'+ dataId +'" data-pid="'+ dataPid+'" data-name="'+ dataName +'" title="'+ dataTitle +'">';
												html += 			'<span class="l-tree-ico'+ lastIco +'"'+ icon +'></span>';
												html += 			'<i class="l-tree-text">'+ dataName +'</i>';
												html += 		'</a>';
												html += 	'</div>';
												html += 	sonWrap;
												html += '</li>';
											}
										}
										return html;
									}
									
									return '';
								};
							
							target.html( '<ul class="l-tree">'+ tree(data, 0, 0) +'</ul>' );
						},
						
						/**
						* 数据处理
						*/
						handleData: function(){
							var data   = p.data,
								format = function(data, pid){
									var arr = [],
										son = [],
										h   = 0;
										
									//pid = pid === undefined ? 0 : pid,
									pid = pid >>> 0;
									
									for(var i = 0; i<data.length; i++){
										if( Number(data[i].pid) === Number(pid) ){
											son = format(data, data[i].id);
											if( son.length ){
												data[i].children = son;
											}
											arr[h] = data[i];
											h++;
										}
									}
									
									return arr;
								};
								p.data = format(data);
						},
						
						/**
						* ajax方式获取数据
						*/
						ajaxGetData: function(callback){
							var ajax = p.ajax;
							
							$.ajax({
								type: ajax.type === undefined ? 'POST' : ajax.type,
								url: ajax.url,
								cache: false,
								dataType: "json",
								data: ajax.data,
								beforeSend: function(){
									if( nic.base.isFunction(ajax.beforeSend) ){
										ajax.beforeSend();
									}
								},
								success: function(data){
									if( nic.base.isFunction(ajax.success) ){
										ajax.success(data, _cache.selected);
									}
									if( nic.base.isFunction(callback) ){
										callback(data);
									}
								},
								error: function(data){
									if( nic.base.isFunction(ajax.error) ){
										ajax.error(data);
									}
								}
							});
						},
						
						/**
						* 事件函数
						*/
						eventFn: function(){
							var target   = p.target,
								time     = null,
								itemData = function(obj){
												return {
															id: obj.attr('data-id'),
															pid: obj.attr('data-pid'),
															name: obj.attr('data-name'),
															isParent: obj.parent('.l-tree-item').hasClass('l-tree-parentNode')
														};
											};

							target
	                            .off('click', '.l-tree-node')
								.on('click', '.l-tree-node', function(e){
									var that = $(e.currentTarget),
										data = itemData(that);
										
									target
										.find('a')
										.removeClass('l-tree-selectedNode');
									that.addClass('l-tree-selectedNode');
									nic.ui.onselectstart(that);
										
									if( nic.base.isFunction(p.onClick) && !p.check ){
										clearTimeout(time);
										time = setTimeout(function(){
											p.onClick(that, data);
										}, 100);
									
										_cache.selected = data;
									}
									
									return false;
								})
	                            .off('dblclick', '.l-tree-node')
								.on('dblclick', '.l-tree-node', function(e){
									var that      = $(e.currentTarget),
										data      = itemData(that),
										switchBtn = that.siblings('.l-tree-switch'),
										isParent  = data.isParent;
										
									if( isParent ){
										clearTimeout(time);
										switchBtn.trigger('click');
									}
									
									if( nic.base.isFunction(p.dblclick) ){
										p.dblclick(that, data);
									}
	                                
	                                _cache.selected = data;
	                                
									return false;
								})
	                            .off('contextmenu', '.l-tree-node')
								.on('contextmenu', '.l-tree-node', function(e){
									if( nic.base.isFunction(p.onRightClick) ){
										var that = $(e.currentTarget),
											data = itemData(that);
											
										p.onRightClick(that, data, e);
										
										return false;
									}
								})
	                            .off('mouseover', '.l-tree-node')
								.on('mouseover', '.l-tree-node', function(e){
									if( nic.base.isFunction(p.onMouseOver) ){
										var that = $(e.currentTarget),
											data = itemData(that);
											
										p.onMouseOver(that, data);
									}
								})
	                            .off('mouseout', '.l-tree-node')
								.on('mouseout', '.l-tree-node', function(e){
									if( nic.base.isFunction(p.onMouseOut) ){
										var that = $(e.currentTarget),
											data = itemData(that);
											
										p.onMouseOut(that, data);
									}
								})
	                            .off('click', '.l-tree-switch')
								.on('click', '.l-tree-switch', function(e){
									var that = $(e.currentTarget),
										son  = that.parent('.l-tree-item').next('.l-tree-ul');
	                                    
	                                nic.ui.onselectstart(that);
										
									if( that.hasClass('l-tree-open') ){
										that.addClass('l-tree-close')
											.removeClass('l-tree-open');
										son.addClass('fn-hide');
									}else{
										that.addClass('l-tree-open')
											.removeClass('l-tree-close');
										son.removeClass('fn-hide');
									}
									
									return false;
								})
	                            .off('click', '.l-tree-checkbox')
								.on('click', '.l-tree-checkbox', function(e){
									var that    = $(e.currentTarget),
										level   = Number(that.attr('data-level')),
	                                    isInit  = _cache.init,
										checkFn = function(obj, level, isCurrent){
														var isChecked      = obj.hasClass('l-tree-checkbox-checked'),
															isPartChecked  = obj.hasClass('l-tree-checkbox-checked-part'),
															checkNum       = null,
															//partCheckNum   = null,
															parentWrap     = obj.parents('.l-tree-level-' + level ),
															parentsWrap    = obj.parents('.l-tree-level-' + (level-1) ),
															parentCheck    = parentsWrap.find('.l-tree-check-' + (level-1)),
															bother         = parentsWrap.find('.l-tree-check-' + level),
															botherNum      = bother.length,
															children       = parentWrap.find('.l-tree-check');
															
														/* 判断是否当前 */
														if( isCurrent ){
															
															if( isPartChecked  ){
																obj
																	.addClass('l-tree-checkbox-checked')
																	.removeClass('l-tree-checkbox-checked-part');
																	
																children
																	.addClass('l-tree-checkbox-checked')
																	.removeClass('l-tree-checkbox-checked-part');
															}
															
															if( !isChecked ){
																obj.addClass('l-tree-checkbox-checked');
																children.addClass('l-tree-checkbox-checked');
															}else{
																if( !isInit ){
																	obj.removeClass('l-tree-checkbox-checked');
																	children.removeClass('l-tree-checkbox-checked');
																}
															}
															
															/* 获取已选数量 */
															checkNum = parentsWrap.find('.l-tree-check-' + level +'.l-tree-checkbox-checked').length;
															
															if( botherNum === checkNum ){
																parentCheck
																	.addClass('l-tree-checkbox-checked')
																	.removeClass('l-tree-checkbox-checked-part');
															}else if( !checkNum ){
																parentCheck
																	.removeClass('l-tree-checkbox-checked')
																	.removeClass('l-tree-checkbox-checked-part');
															}else{
																parentCheck
																	.removeClass('l-tree-checkbox-checked')
																	.addClass('l-tree-checkbox-checked-part');
															}
														}else{
															/* 获取已选数量 */
															checkNum = parentsWrap.find('.l-tree-check-' + level +'.l-tree-checkbox-checked').length;
															
															if( botherNum === checkNum ){
																parentCheck
																	.addClass('l-tree-checkbox-checked')
																	.removeClass('l-tree-checkbox-checked-part');
															}else if( !checkNum && !isChecked && !isPartChecked ){
																parentCheck
																	.removeClass('l-tree-checkbox-checked')
																	.removeClass('l-tree-checkbox-checked-part');
																children.removeClass('l-tree-checkbox-checked');
															}else{
																parentCheck
																	.removeClass('l-tree-checkbox-checked')
																	.addClass('l-tree-checkbox-checked-part');
															}
														}

														level--;
														if( level > 1 ){
															checkFn(parentCheck, level, false);
														}
	                                                    
													};
									
									nic.ui.onselectstart(that);
									
									checkFn(that, level, true);
	                                p.onClick(that, g.getSelected());
	                                
								})
	                            
	                            //FIXED ME
	                            .off('click', '.l-tree-radio')
								.on('click', '.l-tree-radio', function(e){
									var that    = $(e.currentTarget),
										level   = Number(that.attr('data-level')),
										checkFn = function(obj){
														var isChecked   = obj.hasClass('l-tree-radio-checked'),
															parent      = obj.parents('.l-tree-level-' + level ),
															parents     = obj.parents('.l-tree-level-' + (level-1) ),
															parentCheck = parents.find('.l-tree-check[data-level="'+ (level-1) +'"]'),
															bother      = parents.find('.l-tree-check[data-level="'+ level +'"]'),
															botherNum   = bother.length,
															children    = parent.find('.l-tree-check');
														
														if( !isChecked ){
															bother.removeClass('l-tree-radio-checked');
															obj.addClass('l-tree-radio-checked');
															//children.addClass('l-tree-radio-checked');
														}else{
															obj.removeClass('l-tree-radio-checked');
															children.removeClass('l-tree-radio-checked');
														}
														if( botherNum === parents.find('.l-tree-check[data-level="'+ level +'"].l-tree-radio-checked').length ){
															parentCheck.addClass('l-tree-radio-checked');
														}else{
															//parentCheck.removeClass('l-tree-radio-checked');
														}
														if( level >= 1 ){
															level--;
															checkFn(parents);
														}
													};
									
									nic.ui.onselectstart(that);
									
									checkFn(that);
								});
						},
	                    
	                    /**
						* 初始化checks
						*/
	                    initCheckFn: function(){

	                        var checked = p.target.find('.l-tree-checkbox[data-checked="true"]'),
	                            len     = checked.length,
	                            i       = 0;
	                        
	                        for(; i<len; i++){
	                           checked.eq(i).trigger('click');
	                        }

	                    },
						
						/**
						* 创建树对象
						*/
						run: function(){
							if( p.isSimple ){
								this.handleData();
							}
							this.createHtml();
							this.eventFn();
	                        if( p.check ){
	                            this.initCheckFn();
	                        }
						},
						
						/**
						* 初始化
						*/
						init: function(o){
				
							for(var key in o){
								if( o.hasOwnProperty(key) && o[key] !== undefined ){
									p[key] = o[key];
								}
							}
							
							p.target = $(p.target);
							
							if( p.ajax ){
								c.ajaxGetData(function(data){
									p.data = data;
									c.run();
									if( nic.base.isFunction(p.onLoad) ){
										p.onLoad(p.data, _cache.selected);
									}
								});
								return g;
							}
							
							c.run();
							if( p.data && nic.base.isFunction(p.onLoad) ){
								p.onLoad(p.data, _cache.selected);
							}
							return g;
						}
					};
			
			/**
			* 刷新树
			*/
			g.refresh = function(o){
				if( o ){
					for(var key in o){
						if( o.hasOwnProperty(key) && o[key] !== undefined ){
							if( p.ajax && o.ajax ){
								for(var key2 in o.ajax){
									p[key][key2] = o.ajax[key2];
								}
							}else{
								p[key] = o[key];
							}
						}
					}
				
	                if( p.ajax ){
	                    c.ajaxGetData(function(data){
	                        p.data = data;
	                        c.run();
	                        if( nic.base.isFunction(p.onLoad) ){
	                            p.onLoad(p.data, _cache.selected);
	                        }
	                    });
	                    return g;
	                }
	                
	                c.run();
	            }
				return g;
			};
	        
			/**
			* 获取选中数据，不能获取初始化选中数据
			*/
	        g.getSelected = function(){
	            if( p.check ){
	                var checkbox = p.target.find('.l-tree-checkbox'),
	                    len      = checkbox.length,
	                    i        = 0;

	                _cache.selected = [];
	                
	                for(; i<len; i++){
	                    var item = checkbox.eq(i);
	                    if( item.hasClass('l-tree-checkbox-checked') || item.hasClass('l-tree-checkbox-checked-part') ){
	                        var node = item.next('.l-tree-node'),
	                            id   = node.attr('data-id'),
	                            pid  = node.attr('data-pid'),
	                            name = node.attr('data-name'),
	                            obj  = {'pid':pid, 'id':id, 'name':name, 'checked':true};
								
	                        _cache.selected.push(obj);
	                    }
	                }
	            }
	            return _cache.selected;
	        };
			
			return c.init(o);
		};
		
	module.exports = function(o){
		if( !o ){
			return {};
		}
		return new Tree(o);
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nic       = __webpack_require__(1),
		BtnSwitch = function(o){
			
			var 
				/**
				* 默认配置
				*/
				p = {
					target: null,
					open: null,
					close: null
				},
				
				/**
				* 代码逻辑
				*/
				c = {
					init: function(o){
						for(var key in o){
							if( o.hasOwnProperty(key) && o[key] !== undefined && p[key] !== undefined ){
								p[key] = o[key];
							}
						}

						var isFunction    = nic.base.isFunction,
							onselectstart = nic.ui.onselectstart;
							
						$('body')
							.off('click', p.target)
							.on('click', p.target, function(e){
								var that    = onselectstart( $(e.currentTarget) ),
									isOpen  = that.hasClass('ui-btn-switch-open'),
									isError = false;

								if(isOpen){
									if( p.close ){
										if( p.close.url ){
											$.ajax({
												type: 'GET',
												url: p.close.url,
												data: p.close.data ? p.close.data : '',
												async: false,
												success: function(){
													if( isFunction(p.close.success) ){
														p.close.success();
													}
													isError = false;
												},
												error: function(){
													if( isFunction(p.close.error) ){
														p.close.error();
													}
													isError = true;
												}
											});
										}else{
											if( isFunction(p.close.success) ){
												p.close.success();
											}
										}
									}
									if( isError ) return;
									that.removeClass('ui-btn-switch-open')
										.addClass('ui-btn-switch-close')
										.find('em')
										.html('已关闭');
								}else{
									if( p.open ){
										if( p.open.url ){
											$.ajax({
												type: 'GET',
												url: p.open.url,
												data: p.open.data ? p.open.data : '',
												async: false,
												success: function(){
													if( isFunction(p.open.success) ){
														p.open.success();
													}
													isError = false;
												},
												error: function(){
													if( isFunction(p.open.error) ){
														p.open.error();
													}
													isError = true;
												}
											});
										}else{
											if( isFunction(p.open.success) ){
												p.open.success();
											}
										}
									}
									if( isError ) return;
									that.removeClass('ui-btn-switch-close')
										.addClass('ui-btn-switch-open')
										.find('em')
										.html('已开启');
								}
							});
					}
				};

			return c.init(o);
		};

	module.exports = function(o){
		if( !o ){
			return {};
		}
		return new BtnSwitch(o);
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.suggestion = factory();
	    }
	}(this, function (){

		'use strict';

		var oWindow = $(window),
			oHtml   = $('html, body'),
			_oCore  = {
						setFixed: function(oTarget, position){
							oTarget
								.css({
									position: 'fixed',
									top: position,
									zIndex: '999'
								});
						},
						removeFixed: function(oTarget){
							oTarget.removeAttr('style')
						},
						setCurrerClass: function(oTarget){
							oTarget
								.addClass('cur')
								.siblings()
								.removeClass('cur');
						}
				   }

		$.fn.anchorChain = function(options){
			
			var defaults = $.extend({}, {
								wrap:'',
								position: 0,
								isNav: true
							}, options);

			$(this).each(function(index){
				var	oWrap = defaults.isNav ? $(defaults.wrap) : $(defaults.wrap).eq(index),
					oTarget,
					nTargetOffSetTop,
					nTargetHeight,
					oTargetChlid,
					nWrapOffsetTop,
					nWrapParentHeight;
					
				if( !oWrap.length ) return ;
				
				oTarget           = $(this);
				nTargetOffSetTop  = oTarget.offset().top;
				nTargetHeight     = oTarget.outerHeight();
				oTargetChlid      = oTarget.children();
				nWrapOffsetTop    = oWrap.offset().top;
				nWrapParentHeight = oWrap.parent().outerHeight();
				
				
				if( defaults.isNav ){
					oTargetChlid
						.on('click', function(){
							var oSelf              = $(this),
								sIndex             = this.getAttribute('data-index'),
								oWrapItem          = oWrap.eq(sIndex),
								nWrapItemOffsetTop = oWrapItem.length && oWrapItem.offset().top - defaults.position;
							
							oWrapItem.length && oHtml.animate({scrollTop: nWrapItemOffsetTop}, 500);
						});
				};
				
				oWindow.on('scroll', function(e){

						var nWindowScrolltop = $(this).scrollTop(),
							nNeedNum         = defaults.isNav ? nWrapOffsetTop - nTargetHeight : nWrapOffsetTop;
						//		console.log(nWrapOffsetTop, nTargetHeight, nWindowScrolltop)
						oWrap.each(function(i){
							(nWindowScrolltop > $(this).offset().top - nTargetHeight + 1) &&
									_oCore.setCurrerClass( oTargetChlid.eq(i) );
						});
						
						(nWindowScrolltop >= nNeedNum) && 
						(nWindowScrolltop + nTargetHeight + defaults.position < nWrapParentHeight + nTargetOffSetTop) 
								? _oCore.setFixed(oTarget, defaults.position) : _oCore.removeFixed(oTarget);
			
					});
				});
		}
		
	}));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.suggestion = factory();
	    }
	}(this, function (){

	    var defaults      = null,
	        suggestion    = function(defaults, self, selfIndex){
	            var width          = defaults.width,
	                ajax           = defaults.ajax,
					isTouchRequest = defaults.isTouchRequest,
	                allData        = [],
	                filterData     = [],
	                isClose        = true,
					selfName       = self.attr('name'),
	                selfHeight     = self.outerHeight(),
	                selfWidth      = width ? width : self.outerWidth(),
					name           = defaults.name.length ? (defaults.name[selfIndex] ? defaults.name[selfIndex] : selfName + 'Hidden') : selfName + 'Hidden',
					value          = defaults.value.length ? (defaults.value[selfIndex] ? defaults.value[selfIndex] : '') : '',
	                parent         = self.wrap('<div class="l-suggestion fn-left"></div>')
										.parent()
										.append('<input type="hidden" name="'+ name +'" value="'+ value +'" /><ul class="l-suggestion-list" data-index="0" style="display:none"></ul>'),
	                listWrap       = parent.find('.l-suggestion-list'),
					hiddenInput    = parent.find('input:hidden'),
	                createList     = function(data){
										var html       = '',
											item       = null,
											itemNation = '',
											itemName   = '',
											itemLetter = '',
											itemId     = '';

										filterData = data;

										for(var i = 0, len = data.length; i < len && i < 10; i++){
											item       = data[i];
											itemNation = item.nation ?  '('+ item.nation +')' : '';
											itemName   = item.name ? item.name : '';
											itemLetter = item.letter ? item.letter : '';
											itemId     = item.id ? item.id : '';
											html += '<li class="fn-clear" data-index="'+ i +'" data-id="'+ itemId +'"><span class="fn-left">'+ item.name + itemNation +'</span><span class="fn-right">'+ itemLetter +'</span></li>'
										}

										listWrap
											.css({
												top: selfHeight + 'px',
												width: selfWidth - 2 + 'px',
												zIndex: 2
											})
											.html(html);
									},
	                keymove        = function(isDown){
										var item = listWrap.find('li'),
											len  = item.length;
										if( isDown ){
											var index = listWrap.attr('data-index') == len ? 0 : listWrap.attr('data-index');
											item.eq(index).addClass('cur');
											index ++;
											listWrap.attr('data-index', index);
										}else{
											var index = listWrap.attr('data-index') == 0 ? len : listWrap.attr('data-index');
											index --;
											item.eq(index).addClass('cur');
											listWrap.attr('data-index', index);
										}
									},
	                showFn         = function(e){
										var input = $(e.currentTarget),
											val   = input.val(),
											code  = e.keyCode,
											index = 0,
											data = [],
											item = null,
											str  = '';
										
										if( isTouchRequest ){
											data = allData;
										}else{
											for(var i = 0, len = allData.length; i<len; i++){
												item = allData[i];
												str  = (item.name ? item.name : '') + (item.letter ? item.letter : '') + (item.nation ? item.nation : '');
												if( str.indexOf(val) !== -1 ){
													data.push(item);
												}
											}
										}

										createList(data);
										listWrap.show();

										switch( code ){
											case 40: //向下
												keymove(true);
												e.preventDefault();
												break;

											case 38: //向上
												keymove(false);
												e.preventDefault();
												break;

											case 13: //回车
												index = listWrap.attr('data-index');
												index = index > 0 ? index - 1 : 0;
												enterEvent(data[index], input);
												e.preventDefault();
												closeFn();
												break;

											default:
												listWrap.attr('data-index', 0);
										}
									},
	                closeFn        = function(){
										listWrap
											.hide()
											.html('')
											.attr('index', 0)
											.css({
												zIndex: 1
											});
										isClose = true;
										
									},
					enterEvent     = function(data, target){
										hiddenInput.val(data.id);
										target.val(data.name ? data.name : '');
										defaults.touch.apply(self, [data]);
									},
	                init           = function(data, callback){
										if( isTouchRequest ){
											if(!ajax.data){
												ajax.data = {};
											}
											ajax.data.keyword = self.val();
											$.ajax({
												type: ajax.type,
												url: ajax.url,
												cache: false,
												dataType: 'json',
												data: ajax.data,
												beforeSend: function(){},
												success: function(data){
													callback();
													allData = data;
													createList(data);
												},
												error: function(data){}
											});
										}else if( !data && ajax){
											if( !allData.length ){
												$.ajax({
													type: ajax.type,
													url: ajax.url,
													cache: false,
													dataType: 'json',
													data: ajax.data,
													beforeSend: function(){},
													success: function(data){
														allData = data;
														createList(data);
													},
													error: function(data){}
												});
											}
										}else{
											allData = data;
											createList(data);
										}
									};

	            self.attr('autocomplete', 'off')
					.off()
	                .on('focus', function(e){
	                    if( isTouchRequest ){
							init(defaults.data, function(){
								showFn(e);
							});
							return;
						}else{
							init(defaults.data);
						}
	                    showFn(e);
	                })
	                .on('blur', function(){
	                    isClose && closeFn();
						if( !filterData.length && defaults.isResultNullBlurClear ) self.val('');
	                })
	                .on('keyup', function(e){
						var code = e.keyCode;
						if( isTouchRequest ){
							if( code !== 40 && code !== 38 && code !== 13 ){
								init(defaults.data, function(){
									showFn(e);
								});
							}else{
								showFn(e);
							}
							return;
						}
	                    showFn(e);
	                });

	            listWrap
	                .off()
	                .on('click', 'li', function(e){
	                    var index = listWrap.attr('data-index');
						enterEvent(filterData[index], self);
	                    closeFn();
	                })
	                .on('mouseover', 'li', function(){
	                    var that  = $(this)
	                    that.addClass('cur');
	                    isClose = false;
	                    listWrap.attr('data-index', that.attr('data-index'));
	                })
	                .on('mouseout', 'li', function(){
	                    var that  = $(this)
	                    that.removeClass('cur');
	                    isClose = true;
	                    listWrap.attr('data-index', that.attr('data-index'));
	                });
	        }

	    $.fn.refreshSuggestion = function(){
	        this.each(function() {
	            suggestion(defaults, $(this));
	        });
	    }

	    $.fn.suggestion = function(options){
	        defaults = $.extend({}, {
	            data: null,
	            width: 0,
	            name: [],
				value: [],
	            ajax: {
	                url: '',
	                type:'GET',
					data:{},
	                success: function(){}
	            },
				isTouchRequest: false,       //是否触发就请求数据，为true是时ajax.url必须存在。
				isResultNullBlurClear: true, //结果为空是否blur后清除。
	            touch: function(){}
	        }, options);

	        this.each(function(i) {
	            suggestion(defaults, $(this), i);
	        });
	    }

	}));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	* ZeroClipboard
	* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
	* Copyright (c) 2014 Jon Rohan, James M. Greene
	* Licensed MIT
	* http://zeroclipboard.org/
	* v1.3.5
	*/
	!function(a){"use strict";function b(a){return a.replace(/,/g,".").replace(/[^0-9\.]/g,"")}function c(a){return parseFloat(b(a))>=10}var d,e={bridge:null,version:"0.0.0",disabled:null,outdated:null,ready:null},f={},g=0,h={},i=0,j={},k=null,l=null,m=function(){var a,b,c,d,e="ZeroClipboard.swf";if(document.currentScript&&(d=document.currentScript.src));else{var f=document.getElementsByTagName("script");if("readyState"in f[0])for(a=f.length;a--&&("interactive"!==f[a].readyState||!(d=f[a].src)););else if("loading"===document.readyState)d=f[f.length-1].src;else{for(a=f.length;a--;){if(c=f[a].src,!c){b=null;break}if(c=c.split("#")[0].split("?")[0],c=c.slice(0,c.lastIndexOf("/")+1),null==b)b=c;else if(b!==c){b=null;break}}null!==b&&(d=b)}}return d&&(d=d.split("#")[0].split("?")[0],e=d.slice(0,d.lastIndexOf("/")+1)+e),e}(),n=function(){var a=/\-([a-z])/g,b=function(a,b){return b.toUpperCase()};return function(c){return c.replace(a,b)}}(),o=function(b,c){var d,e,f;return a.getComputedStyle?d=a.getComputedStyle(b,null).getPropertyValue(c):(e=n(c),d=b.currentStyle?b.currentStyle[e]:b.style[e]),"cursor"!==c||d&&"auto"!==d||(f=b.tagName.toLowerCase(),"a"!==f)?d:"pointer"},p=function(b){b||(b=a.event);var c;this!==a?c=this:b.target?c=b.target:b.srcElement&&(c=b.srcElement),K.activate(c)},q=function(a,b,c){a&&1===a.nodeType&&(a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c))},r=function(a,b,c){a&&1===a.nodeType&&(a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c))},s=function(a,b){if(!a||1!==a.nodeType)return a;if(a.classList)return a.classList.contains(b)||a.classList.add(b),a;if(b&&"string"==typeof b){var c=(b||"").split(/\s+/);if(1===a.nodeType)if(a.className){for(var d=" "+a.className+" ",e=a.className,f=0,g=c.length;g>f;f++)d.indexOf(" "+c[f]+" ")<0&&(e+=" "+c[f]);a.className=e.replace(/^\s+|\s+$/g,"")}else a.className=b}return a},t=function(a,b){if(!a||1!==a.nodeType)return a;if(a.classList)return a.classList.contains(b)&&a.classList.remove(b),a;if(b&&"string"==typeof b||void 0===b){var c=(b||"").split(/\s+/);if(1===a.nodeType&&a.className)if(b){for(var d=(" "+a.className+" ").replace(/[\n\t]/g," "),e=0,f=c.length;f>e;e++)d=d.replace(" "+c[e]+" "," ");a.className=d.replace(/^\s+|\s+$/g,"")}else a.className=""}return a},u=function(){var a,b,c,d=1;return"function"==typeof document.body.getBoundingClientRect&&(a=document.body.getBoundingClientRect(),b=a.right-a.left,c=document.body.offsetWidth,d=Math.round(b/c*100)/100),d},v=function(b,c){var d={left:0,top:0,width:0,height:0,zIndex:B(c)-1};if(b.getBoundingClientRect){var e,f,g,h=b.getBoundingClientRect();"pageXOffset"in a&&"pageYOffset"in a?(e=a.pageXOffset,f=a.pageYOffset):(g=u(),e=Math.round(document.documentElement.scrollLeft/g),f=Math.round(document.documentElement.scrollTop/g));var i=document.documentElement.clientLeft||0,j=document.documentElement.clientTop||0;d.left=h.left+e-i,d.top=h.top+f-j,d.width="width"in h?h.width:h.right-h.left,d.height="height"in h?h.height:h.bottom-h.top}return d},w=function(a,b){var c=null==b||b&&b.cacheBust===!0&&b.useNoCache===!0;return c?(-1===a.indexOf("?")?"?":"&")+"noCache="+(new Date).getTime():""},x=function(b){var c,d,e,f=[],g=[],h=[];if(b.trustedOrigins&&("string"==typeof b.trustedOrigins?g.push(b.trustedOrigins):"object"==typeof b.trustedOrigins&&"length"in b.trustedOrigins&&(g=g.concat(b.trustedOrigins))),b.trustedDomains&&("string"==typeof b.trustedDomains?g.push(b.trustedDomains):"object"==typeof b.trustedDomains&&"length"in b.trustedDomains&&(g=g.concat(b.trustedDomains))),g.length)for(c=0,d=g.length;d>c;c++)if(g.hasOwnProperty(c)&&g[c]&&"string"==typeof g[c]){if(e=E(g[c]),!e)continue;if("*"===e){h=[e];break}h.push.apply(h,[e,"//"+e,a.location.protocol+"//"+e])}return h.length&&f.push("trustedOrigins="+encodeURIComponent(h.join(","))),"string"==typeof b.jsModuleId&&b.jsModuleId&&f.push("jsModuleId="+encodeURIComponent(b.jsModuleId)),f.join("&")},y=function(a,b,c){if("function"==typeof b.indexOf)return b.indexOf(a,c);var d,e=b.length;for("undefined"==typeof c?c=0:0>c&&(c=e+c),d=c;e>d;d++)if(b.hasOwnProperty(d)&&b[d]===a)return d;return-1},z=function(a){if("string"==typeof a)throw new TypeError("ZeroClipboard doesn't accept query strings.");return a.length?a:[a]},A=function(b,c,d,e){e?a.setTimeout(function(){b.apply(c,d)},0):b.apply(c,d)},B=function(a){var b,c;return a&&("number"==typeof a&&a>0?b=a:"string"==typeof a&&(c=parseInt(a,10))&&!isNaN(c)&&c>0&&(b=c)),b||("number"==typeof N.zIndex&&N.zIndex>0?b=N.zIndex:"string"==typeof N.zIndex&&(c=parseInt(N.zIndex,10))&&!isNaN(c)&&c>0&&(b=c)),b||0},C=function(a,b){if(a&&b!==!1&&"undefined"!=typeof console&&console&&(console.warn||console.log)){var c="`"+a+"` is deprecated. See docs for more info:\n    https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md#deprecations";console.warn?console.warn(c):console.log(c)}},D=function(){var a,b,c,d,e,f,g=arguments[0]||{};for(a=1,b=arguments.length;b>a;a++)if(null!=(c=arguments[a]))for(d in c)if(c.hasOwnProperty(d)){if(e=g[d],f=c[d],g===f)continue;void 0!==f&&(g[d]=f)}return g},E=function(a){if(null==a||""===a)return null;if(a=a.replace(/^\s+|\s+$/g,""),""===a)return null;var b=a.indexOf("//");a=-1===b?a:a.slice(b+2);var c=a.indexOf("/");return a=-1===c?a:-1===b||0===c?null:a.slice(0,c),a&&".swf"===a.slice(-4).toLowerCase()?null:a||null},F=function(){var a=function(a,b){var c,d,e;if(null!=a&&"*"!==b[0]&&("string"==typeof a&&(a=[a]),"object"==typeof a&&"length"in a))for(c=0,d=a.length;d>c;c++)if(a.hasOwnProperty(c)&&(e=E(a[c]))){if("*"===e){b.length=0,b.push("*");break}-1===y(e,b)&&b.push(e)}},b={always:"always",samedomain:"sameDomain",never:"never"};return function(c,d){var e,f=d.allowScriptAccess;if("string"==typeof f&&(e=f.toLowerCase())&&/^always|samedomain|never$/.test(e))return b[e];var g=E(d.moviePath);null===g&&(g=c);var h=[];a(d.trustedOrigins,h),a(d.trustedDomains,h);var i=h.length;if(i>0){if(1===i&&"*"===h[0])return"always";if(-1!==y(c,h))return 1===i&&c===g?"sameDomain":"always"}return"never"}}(),G=function(a){if(null==a)return[];if(Object.keys)return Object.keys(a);var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b},H=function(a){if(a)for(var b in a)a.hasOwnProperty(b)&&delete a[b];return a},I=function(){try{return document.activeElement}catch(a){}return null},J=function(){var a=!1;if("boolean"==typeof e.disabled)a=e.disabled===!1;else{if("function"==typeof ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(a=!0)}catch(b){}!a&&navigator.mimeTypes["application/x-shockwave-flash"]&&(a=!0)}return a},K=function(a,b){return this instanceof K?(this.id=""+g++,h[this.id]={instance:this,elements:[],handlers:{}},a&&this.clip(a),"undefined"!=typeof b&&(C("new ZeroClipboard(elements, options)",N.debug),K.config(b)),this.options=K.config(),"boolean"!=typeof e.disabled&&(e.disabled=!J()),e.disabled===!1&&e.outdated!==!0&&null===e.bridge&&(e.outdated=!1,e.ready=!1,O()),void 0):new K(a,b)};K.prototype.setText=function(a){return a&&""!==a&&(f["text/plain"]=a,e.ready===!0&&e.bridge&&"function"==typeof e.bridge.setText?e.bridge.setText(a):e.ready=!1),this},K.prototype.setSize=function(a,b){return e.ready===!0&&e.bridge&&"function"==typeof e.bridge.setSize?e.bridge.setSize(a,b):e.ready=!1,this};var L=function(a){e.ready===!0&&e.bridge&&"function"==typeof e.bridge.setHandCursor?e.bridge.setHandCursor(a):e.ready=!1};K.prototype.destroy=function(){this.unclip(),this.off(),delete h[this.id]};var M=function(){var a,b,c,d=[],e=G(h);for(a=0,b=e.length;b>a;a++)c=h[e[a]].instance,c&&c instanceof K&&d.push(c);return d};K.version="1.3.5";var N={swfPath:m,trustedDomains:a.location.host?[a.location.host]:[],cacheBust:!0,forceHandCursor:!1,zIndex:999999999,debug:!0,title:null,autoActivate:!0};K.config=function(a){"object"==typeof a&&null!==a&&D(N,a);{if("string"!=typeof a||!a){var b={};for(var c in N)N.hasOwnProperty(c)&&(b[c]="object"==typeof N[c]&&null!==N[c]?"length"in N[c]?N[c].slice(0):D({},N[c]):N[c]);return b}if(N.hasOwnProperty(a))return N[a]}},K.destroy=function(){K.deactivate();for(var a in h)if(h.hasOwnProperty(a)&&h[a]){var b=h[a].instance;b&&"function"==typeof b.destroy&&b.destroy()}var c=P(e.bridge);c&&c.parentNode&&(c.parentNode.removeChild(c),e.ready=null,e.bridge=null)},K.activate=function(a){d&&(t(d,N.hoverClass),t(d,N.activeClass)),d=a,s(a,N.hoverClass),Q();var b=N.title||a.getAttribute("title");if(b){var c=P(e.bridge);c&&c.setAttribute("title",b)}var f=N.forceHandCursor===!0||"pointer"===o(a,"cursor");L(f)},K.deactivate=function(){var a=P(e.bridge);a&&(a.style.left="0px",a.style.top="-9999px",a.removeAttribute("title")),d&&(t(d,N.hoverClass),t(d,N.activeClass),d=null)};var O=function(){var b,c,d=document.getElementById("global-zeroclipboard-html-bridge");if(!d){var f=K.config();f.jsModuleId="string"==typeof k&&k||"string"==typeof l&&l||null;var g=F(a.location.host,N),h=x(f),i=N.moviePath+w(N.moviePath,N),j='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+i+'"/>         <param name="allowScriptAccess" value="'+g+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+h+'"/>         <embed src="'+i+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="'+g+'"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+h+'"           scale="exactfit">         </embed>       </object>';d=document.createElement("div"),d.id="global-zeroclipboard-html-bridge",d.setAttribute("class","global-zeroclipboard-container"),d.style.position="absolute",d.style.left="0px",d.style.top="-9999px",d.style.width="15px",d.style.height="15px",d.style.zIndex=""+B(N.zIndex),document.body.appendChild(d),d.innerHTML=j}b=document["global-zeroclipboard-flash-bridge"],b&&(c=b.length)&&(b=b[c-1]),e.bridge=b||d.children[0].lastElementChild},P=function(a){for(var b=/^OBJECT|EMBED$/,c=a&&a.parentNode;c&&b.test(c.nodeName)&&c.parentNode;)c=c.parentNode;return c||null},Q=function(){if(d){var a=v(d,N.zIndex),b=P(e.bridge);b&&(b.style.top=a.top+"px",b.style.left=a.left+"px",b.style.width=a.width+"px",b.style.height=a.height+"px",b.style.zIndex=a.zIndex+1),e.ready===!0&&e.bridge&&"function"==typeof e.bridge.setSize?e.bridge.setSize(a.width,a.height):e.ready=!1}return this};K.prototype.on=function(a,b){var c,d,f,g={},i=h[this.id]&&h[this.id].handlers;if("string"==typeof a&&a)f=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)a.hasOwnProperty(c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&this.on(c,a[c]);if(f&&f.length){for(c=0,d=f.length;d>c;c++)a=f[c].replace(/^on/,""),g[a]=!0,i[a]||(i[a]=[]),i[a].push(b);g.noflash&&e.disabled&&T.call(this,"noflash",{}),g.wrongflash&&e.outdated&&T.call(this,"wrongflash",{flashVersion:e.version}),g.load&&e.ready&&T.call(this,"load",{flashVersion:e.version})}return this},K.prototype.off=function(a,b){var c,d,e,f,g,i=h[this.id]&&h[this.id].handlers;if(0===arguments.length)f=G(i);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)a.hasOwnProperty(c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&this.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),g=i[a],g&&g.length)if(b)for(e=y(b,g);-1!==e;)g.splice(e,1),e=y(b,g,e);else i[a].length=0;return this},K.prototype.handlers=function(a){var b,c=null,d=h[this.id]&&h[this.id].handlers;if(d){if("string"==typeof a&&a)return d[a]?d[a].slice(0):null;c={};for(b in d)d.hasOwnProperty(b)&&d[b]&&(c[b]=d[b].slice(0))}return c};var R=function(b,c,d,e){var f=h[this.id]&&h[this.id].handlers[b];if(f&&f.length){var g,i,j,k=c||this;for(g=0,i=f.length;i>g;g++)j=f[g],c=k,"string"==typeof j&&"function"==typeof a[j]&&(j=a[j]),"object"==typeof j&&j&&"function"==typeof j.handleEvent&&(c=j,j=j.handleEvent),"function"==typeof j&&A(j,c,d,e)}return this};K.prototype.clip=function(a){a=z(a);for(var b=0;b<a.length;b++)if(a.hasOwnProperty(b)&&a[b]&&1===a[b].nodeType){a[b].zcClippingId?-1===y(this.id,j[a[b].zcClippingId])&&j[a[b].zcClippingId].push(this.id):(a[b].zcClippingId="zcClippingId_"+i++,j[a[b].zcClippingId]=[this.id],N.autoActivate===!0&&q(a[b],"mouseover",p));var c=h[this.id].elements;-1===y(a[b],c)&&c.push(a[b])}return this},K.prototype.unclip=function(a){var b=h[this.id];if(b){var c,d=b.elements;a="undefined"==typeof a?d.slice(0):z(a);for(var e=a.length;e--;)if(a.hasOwnProperty(e)&&a[e]&&1===a[e].nodeType){for(c=0;-1!==(c=y(a[e],d,c));)d.splice(c,1);var f=j[a[e].zcClippingId];if(f){for(c=0;-1!==(c=y(this.id,f,c));)f.splice(c,1);0===f.length&&(N.autoActivate===!0&&r(a[e],"mouseover",p),delete a[e].zcClippingId)}}}return this},K.prototype.elements=function(){var a=h[this.id];return a&&a.elements?a.elements.slice(0):[]};var S=function(a){var b,c,d,e,f,g=[];if(a&&1===a.nodeType&&(b=a.zcClippingId)&&j.hasOwnProperty(b)&&(c=j[b],c&&c.length))for(d=0,e=c.length;e>d;d++)f=h[c[d]].instance,f&&f instanceof K&&g.push(f);return g};N.hoverClass="zeroclipboard-is-hover",N.activeClass="zeroclipboard-is-active",N.trustedOrigins=null,N.allowScriptAccess=null,N.useNoCache=!0,N.moviePath="ZeroClipboard.swf",K.detectFlashSupport=function(){return C("ZeroClipboard.detectFlashSupport",N.debug),J()},K.dispatch=function(a,b){if("string"==typeof a&&a){var c=a.toLowerCase().replace(/^on/,"");if(c)for(var e=d&&N.autoActivate===!0?S(d):M(),f=0,g=e.length;g>f;f++)T.call(e[f],c,b)}},K.prototype.setHandCursor=function(a){return C("ZeroClipboard.prototype.setHandCursor",N.debug),a="boolean"==typeof a?a:!!a,L(a),N.forceHandCursor=a,this},K.prototype.reposition=function(){return C("ZeroClipboard.prototype.reposition",N.debug),Q()},K.prototype.receiveEvent=function(a,b){if(C("ZeroClipboard.prototype.receiveEvent",N.debug),"string"==typeof a&&a){var c=a.toLowerCase().replace(/^on/,"");c&&T.call(this,c,b)}},K.prototype.setCurrent=function(a){return C("ZeroClipboard.prototype.setCurrent",N.debug),K.activate(a),this},K.prototype.resetBridge=function(){return C("ZeroClipboard.prototype.resetBridge",N.debug),K.deactivate(),this},K.prototype.setTitle=function(a){if(C("ZeroClipboard.prototype.setTitle",N.debug),a=a||N.title||d&&d.getAttribute("title")){var b=P(e.bridge);b&&b.setAttribute("title",a)}return this},K.setDefaults=function(a){C("ZeroClipboard.setDefaults",N.debug),K.config(a)},K.prototype.addEventListener=function(a,b){return C("ZeroClipboard.prototype.addEventListener",N.debug),this.on(a,b)},K.prototype.removeEventListener=function(a,b){return C("ZeroClipboard.prototype.removeEventListener",N.debug),this.off(a,b)},K.prototype.ready=function(){return C("ZeroClipboard.prototype.ready",N.debug),e.ready===!0};var T=function(a,g){a=a.toLowerCase().replace(/^on/,"");var h=g&&g.flashVersion&&b(g.flashVersion)||null,i=d,j=!0;switch(a){case"load":if(h){if(!c(h))return T.call(this,"onWrongFlash",{flashVersion:h}),void 0;e.outdated=!1,e.ready=!0,e.version=h}break;case"wrongflash":h&&!c(h)&&(e.outdated=!0,e.ready=!1,e.version=h);break;case"mouseover":s(i,N.hoverClass);break;case"mouseout":N.autoActivate===!0&&K.deactivate();break;case"mousedown":s(i,N.activeClass);break;case"mouseup":t(i,N.activeClass);break;case"datarequested":if(i){var k=i.getAttribute("data-clipboard-target"),l=k?document.getElementById(k):null;if(l){var m=l.value||l.textContent||l.innerText;m&&this.setText(m)}else{var n=i.getAttribute("data-clipboard-text");n&&this.setText(n)}}j=!1;break;case"complete":H(f),i&&i!==I()&&i.focus&&i.focus()}var o=i,p=[this,g];return R.call(this,a,o,p,j)}; true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__,exports,module], __WEBPACK_AMD_DEFINE_RESULT__ = function(a,b,c){return k=c&&c.id||null,K}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports&&"function"==typeof a.require?(l=module.id||null,module.exports=K):a.ZeroClipboard=K}(function(){return this}());

/***/ }
/******/ ]);