define(['./nic'], function(nic){
	
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
	var Pop = function(o){
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
							nic.ui.drag({
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
	
	return function(o){
		return new Pop(o);
	};
});