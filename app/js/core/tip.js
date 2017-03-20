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