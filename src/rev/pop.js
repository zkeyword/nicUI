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

	'use strict';

	/**
	* nic.ui.pop 弹出窗控件
	* @class nic.ui.pop
	* @author norion.z
	* @blog http://zkeyword.com/
	* @param {Object} o 弹出窗参数
	* @param {String} o.id 弹出窗ID
	* @param {String} o.titleId 标题ID
	* @param {String} o.title 弹出框的标题
	* @param {Number} o.width 弹出框内部的宽，不包括边框的宽度
	* @param {Number} o.height 弹出框内部的高，不包括边框的高度
	* @param {Number} o.top 弹出框的top
	* @param {Number} o.left 弹出框的left
	* @param {String} o.cls 定义class
	* @param {String} o.url 用iframe方式加载
	* @param {String} o.ajax 用ajax方式加载pop.js
	* @param {String} o.ajaxType ajax请求类型
	* @param {String|Object} o.ajaxData ajax请求条件
	* @param {String} o.async ajax同步方式
	* @param {String} o.html 用html方式加载
	* @param {Function} o.onloadFn 载入完成后要触发的事件
	* @param {Function} o.closeFn 关闭时要触发的事件
	* @param {Object} o.btns 弹出框的按钮集合
	* @param {Function} o.btns.onclick 点击按钮要执行的动作，如果要执行一些异步的动作，closePop必须是false
	* @param {Function} o.btns.closePop 点击按钮之后是否直接关闭弹出框，默认直接关闭
	* @param {Function} o.btns.cls 按钮自定义class
	* @param {Function} o.btns.text 按钮文本
	* @param {Boolean} o.isMask 是否允许遮罩,默认true
	* @param {Boolean} o.isMaskClose 是否点击遮罩关闭,默认false
	* @param {Boolean} o.allowClose 允许关闭,默认true
	* @param {Boolean} o.allowEscClose 允许esc关闭,默认true
	* @param {Boolean} o.isDrag 允许拖拽,默认true
	* @return {Object} pop对象
	*/
	var nic  = __webpack_require__(1),
		drag = __webpack_require__(3),
		Pop  = function(o){
			var g      = this,
				
				/**
				* 默认配置
				* @private
				*/
				p      = {
					id            : 'l-pop-'+(new Date()).valueOf(),
					titleId       : 'l-pop-title-'+(new Date()).valueOf(),
					title         : '',                                     //弹出框的标题
					width         : 500,                                    //弹出框内部的宽，不包括边框的宽度
					height        : 300,                                    //弹出框内部的高，不包括边框的高度
					top           : null,                                   //弹出框的top
					left          : null,                                   //弹出框的left
					cls           : '',                                     //定义class
					url           : '',                                     //用iframe方式加载
					ajax          : '',                                     //用ajax方式加载
					ajaxType      : 'GET',
					ajaxData      : '',
					ajaxSuccess   : null,
					async         : false,
					html          : '',                                      //用html方式加载
					onloadFn      : null,                                    //载入时要触发的事件
					closeFn       : null,                                    //关闭时要触发的事件
					btns          : '',                                      //弹出框的按钮集合
					isMask        : true,                                    //是否允许遮罩,默认true
					isMaskClose   : false,                                   //是否点击遮罩关闭,默认true
					allowClose    : true,                                    //允许关闭,默认true
					allowEscClose : true,                                    //允许esc关闭,默认true
					isDrag        : true                                     //允许拖拽,默认true
				},
				
				/**
				* 临时对象
				* @private
				*/
				_cache = {
					popTitle: $(),
					popContent: $(),
					btnWrap: $(),
					mask: $()
				},
				
				/**
				* 内部处理
				* @private
				*/
				_core  = {
					
					/**
					* 创建遮罩
					*/
					createMask: function(){
						var isMask      = p.isMask,
							isMaskClose = p.isMaskClose;
						
						if( isMask ){
							var mask = nic.ui.lock();
							
							if( isMaskClose && allowClose ){
								lock.click(function(){
									g.close();
								});
							}
							
							_cache.mask = mask;
							
							p.popWrap.addClass('l-ui-mask');
						}
					},
					
					/**
					* 创建标题
					*/
					createTitle: function(){
						var id         = p.id,
							title      = p.title,
							titleId    = p.titleId,
							popMain    = p.popMain,
							isDrag     = p.isDrag,
							allowClose = p.allowClose;
						
						if( title ){
							
							var popTitle = popMain.append('<div class="l-pop-title" id="'+ titleId +'"></div>')
												  .find('.l-pop-title')
												  .html(title);
							
							if( isDrag ){
								drag({
									dragItem:'#'+titleId,
									dragWrap:'#'+id
								});
							}
							
							if( allowClose ){
								/*添加关闭按钮*/
								if( !popMain.find('.l-pop-close').length ){
									popMain.prepend('<div class="l-pop-close"><i class="icon icon-close" title="关闭"></i></div>');
								}
								
								popMain.find('.l-pop-close')
									   .click(function(){
											g.close();
										});
							}
							
							_cache.popTitle = popTitle;
						}
					},
					
					/**
					* 创建内容
					*/
					createContent: function(){
						var popMain     = p.popMain.append('<div class="l-pop-content"></div>'),
							url         = p.url,
							ajax        = p.ajax,
							ajaxType    = p.ajaxType,
							ajaxData    = p.ajaxData,
							async       = p.async,
		                    ajaxSuccess = p.ajaxSuccess,
							html        = p.html,
							popContent  = popMain.find('.l-pop-content');
						
						if( url ){
							popContent.append('<iframe src="'+ url +'" frameborder="no" border="0"></iframe>').addClass('l-pop-contentIframe');
						}else if( ajax ){
							$.ajax({
								url     : ajax,
								type    : ajaxType,
								data    : ajaxData,
								cache   : false,
								async   : async,
								success : function(data){
		                            if( nic.base.isFunction(ajaxSuccess) ){
		                                ajaxSuccess(data);
		                            }
									popContent.append(data);
								}
							}); 
						}else if( html ){
							popContent.append(html);
						}
						
						_cache.popContent = popContent;
					},
					
					/**
					* 创建按钮
					*/
					createBtn: function(){
						var id      = p.id,
							btns    = p.btns,
							popMain = p.popMain;
							
						if( btns ){
							if( !popMain.find('.l-pop-btnWrap').length ){
								popMain.append('<div class="ui-floatCenter l-pop-btnWrap"><div class="ui-sl-floatCenter"></div></div>');
							}
							
							var i       = 0,
								len     = btns.length,
								html    = '',
							    btnWrap = popMain.find('.ui-floatCenter'),
							    btnMain = popMain.find('.ui-sl-floatCenter').html('');
								
							for(; i<len; i++){
								var item = btns[i],
									cls  = 'ui-btn ui-floatCenter-item ui-btn-primary'+ (item.cls ? ' ' + item.cls :'');
								html += '<a href="javascript:;" data-index="'+ i +'" class="'+ cls +'"><span>'+item.text+'</span></a>';
							}
							
							btnMain
								.append(html)
								.on('click', 'a', function(){
									var that    = $(this),
										i       = Number( this.getAttribute('data-index') ),
										item    = btns[i],
										isClose = item.closePop === undefined || item.closePop === false;
										
									nic.base.isFunction(item.onclick) && item.onclick.apply(this, [id, i, item, that]);
									isClose && g.close(id);
								});
							
							_cache.btnWrap = btnWrap;
						}
					},
					
					/**
					* esc关闭函数
					*/
					escCloseFn: function(){
						var allowClose    = p.allowClose,
							allowEscClose = p.allowEscClose,
							popMain       = p.popMain;

						if( allowClose && allowEscClose ){

							var _modalKey = function(e){
								e = e || event;
								var code = e.which || event.keyCode;
								if(code === 27){
									g.close();
								}
							};
							
							if(document.attachEvent){
								document.attachEvent('onkeydown', _modalKey);
							}else{
								document.addEventListener('keydown', _modalKey, true);
							}
						}
					},
					
					/**
					* 设置显示
					*/
					setShowFn:function(){
						var win         = $(window),
							popWrap     = p.popWrap,
							popContent  = _cache.popContent,
							titleHeight = _cache.popTitle.outerHeight(),
							btnHeight   = _cache.btnWrap.outerHeight(),
							otherHeight = titleHeight + btnHeight + 30 + 40, //30是popContent的padding的和，40是top、bottom的和
							_setSize    = function(){
								var winHeight = win.height(),
									winWidth  = win.width(),
									height    = p.height,
									width     = p.width;

								if( winHeight - otherHeight < height ){
									height = winHeight - otherHeight;
									if( p.url ){
										popContent
											.find('iframe')
											.height(height)
											.width(width);
									}
								}

								popContent.css({height:height,width:width});
									
								popWrap.css({
									top: p.top || ( winHeight - popWrap.height() )/2,
									left: p.left || ( winWidth - popWrap.width() )/2
								});
							};

						_setSize();
						win.resize(_setSize);
						
						popContent
							.css({opacity:0.1})
							.animate({ 
								opacity: 1
							}, 800);


						/*popContent.css({width:300,height:300,opacity:0.5});

						var popWrap = p.popWrap,
							top     = win.height()/2 - popWrap.height()/2,
							left    = ( win.width() - popWrap.width() )/2;
						
						popWrap.css({top:top, left:left});
						
						
						popContent.animate({ 
							width: width,
							height: height,
							opacity: 1,
						}, 500, function(){
							
							top  = p.top || win.height()/2 - popWrap.height()/2,
							left = p.left || ( win.width() - popWrap.width() )/2;
							
							popWrap.animate({ 
									top: top,
									left: left, 
								}, 500);
						});*/

					},
					
					/**
					* 设置层级
					*/
					setZIndex: function(){
						if( p.isMask ){
							var obj        = $('.l-ui'),
								i          = 0,
								len        = obj.length,
								zIndex     = nic.ui.zIndex(),
								mask       = _cache.mask,
								maskZindex = Number( mask.css('z-index') ),
								popWrap	   = p.popWrap;
							
							if( popWrap.hasClass('l-ui-current') ){
												
								for(; i<len; i++){
									obj.eq(i).css({'z-index':maskZindex - i});
								}
								
								obj.removeClass('l-ui-current');
								popWrap.css({'z-index':zIndex});
							}else{
								for(; i<len; i++){
									obj.eq(i).css({'z-index':maskZindex + len - i});
								}
							}
						}
					},
					
					/**
					* 载入时要触发的事件
					*/
					loadFn: function(){
						if( nic.base.isFunction(p.onloadFn) ){
							p.onloadFn(p.id, p.popMain);
						}
					},
					
					/**
					* 运行 pop
					*/
					run: function(){
						this.createMask();
						this.createTitle();
						this.createContent();
						this.createBtn();
						this.escCloseFn();
						this.setShowFn();
						this.setZIndex();
						this.loadFn();
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
						
						var h = '';
							h += '<div class="l-ui l-pop-wrap l-ui-current" id="'+ p.id +'">';
							h += '	<table class="l-pop-table">';
							h += '		<tr><td colspan="3" class="l-pop-border l-pop-border-top"></th></tr>';
							h += '		<tr>';
							h += '			<td class="l-pop-border l-pop-border-left"></td>';
							h += '			<td class="l-pop-main"></td>';
							h += '			<td class="l-pop-border l-pop-border-right"></td>';
							h += '		</tr>';
							h += '		<tr><td colspan="3" class="l-pop-border l-pop-border-bottom"></td></tr>';
							h += '	</table>';
							h += '</div>';
							
						/*载入容器*/
						var wrap = nic.ui.wrap();
						wrap.prepend(h);
						
						
						/*给默认配置项添加popWrap和popMain成员*/
						p.popWrap = $('#'+p.id);
						p.popMain = p.popWrap.find('.l-pop-main');
						
						p.popWrap.attr('tabindex', '1');
						p.popWrap.focus();
						
						this.run();
						
						return g;					
					}
				};
			
			/**
			* 关闭弹窗
			* @method nic.ui.pop.close
			* @param {String} [id] - pop的id
			*/
			g.close = function(id){
				
				var closeFn = p.closeFn;
				
				p.popWrap.remove();
				
				_core.setZIndex();
						
				p.popWrap.find('.l-select-wrap').addClass('fn-hide');
				
				/*如果没有其他需要遮罩的的ui*/
				if( !$('.l-ui-mask').length ){
					nic.ui.unlock();
				}
				
				/*关闭时要触发的事件*/
				if( nic.base.isFunction(closeFn) ){
					id = id !== undefined ? id : p.id;
					p.closeFn(id);
				}
				
			};
			
			/**
			* 修改标题
			* @method nic.ui.pop.modifyTitle
			* @param {String} title 标题
			*/
			g.modifyTitle = function(title){
				_cache.popTitle.html(title);
				return g;
			};
			
			/**
			* 修改按钮
			* @method nic.ui.pop.modifyBtns 
		    * @param {Object} btns 弹出框的按钮集合
		    * @param {Function} btns.onclick 点击按钮要执行的动作，如果要执行一些异步的动作，closePop必须是false
		    * @param {Function} btns.closePop 点击按钮之后是否直接关闭弹出框，默认直接关闭
		    * @param {Function} btns.cls 按钮自定义class
		    * @param {Function} btns.text 按钮文本
			*/
			g.modifyBtns = function(btns){
				p.btns = btns;
				_core.createBtn();
				return g;
			};
			
			/**
			* 修改窗体大小
			* @method nic.ui.pop.modifyWrap 
			* @param {Number} width 
			* @param {Number} height
			*/
			g.modifyWrap = function(width, height){
				p.width  = width;
				p.height = height;
				_core.setShowFn();
				
				return g;
			};
			
			return _core.init(o);
		};

	module.exports = function(o){
		return new Pop(o);
	};


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

/***/ }
/******/ ]);