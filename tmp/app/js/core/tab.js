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
var nic = require('./nic'),
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