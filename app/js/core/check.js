'use strict';
	
/**
check模拟
*/

var nic   = require('./nic'),
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
