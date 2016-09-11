'use strict';

var nic       = require('./nic'),
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
