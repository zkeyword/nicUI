'use strict';
	
/**
* nic.ui.select 下拉框控件
* @class nic.ui.select
* @author norion.z
* @blog http://zkeyword.com/
* @param {Object} o 下拉框参数
* @param {String} o.id 下拉框id
* @return {Object} select对象
*/

var nic    = require('./nic'),
	Select = function(o){
		
		var 
			/**
			* 当前对象
			*/
			g = this,
			
			/**
			* 默认配置
			*/
			p = {
					id           : 'l-select-'+(new Date()).valueOf(),
					data         : null,
					selectedData : null,
					ajax         : null,
					//isSimple     : true,   //是否是简单的数据格式
					target       : null,
					wrap         : null,   //target外框，一般不设置
					width        : 200,
					height       : 'auto',
					type         : 'single', //multiple、single、tree
					checkbox     : false,  //multiple时设置有效，与radio互斥
					radio        : false,  //multiple时设置有效，与checkbox互斥
					isArrow      : true,
					name         : '',
					onClick      : null,
					onRightClick : null,
					onMouseOver  : null,
					onMouseOut   : null,
					onLoad       : null,
					onDel        : null,
					isAllowEnter : true,
                    check        : null
				},
				
			/**
			* 缓存池
			*/
			t = {
				data:[], //临时数据
				selectedData:[]  //选中的数据
			},
			
			/**
			* 代码逻辑
			*/
			c = {
					//TODO
					move:function(obj, item, index){
						var objOrigin      = obj[0],
							scrollHeight   = objOrigin.scrollHeight,
							//offsetHeight  = objOrigin.offsetHeight,
							clientHeight   = objOrigin.clientHeight,
							offsetTop      = objOrigin.offsetTop,
							itemOffsetTop  = item[0].offsetTop,
							itemHeight     = item.outerHeight(),
							itemOffsetTop2 = item.offset().top - obj.offset().top;           
							
						//console.log(itemOffsetTop,clientHeight,offsetTop, item.offset().top - obj.offset().top );
						console.log( itemOffsetTop,itemOffsetTop2,clientHeight, Math.ceil(scrollHeight / clientHeight) );
						
						if( item.offset().top - obj.offset().top > clientHeight ){
							//scrollTop = ;
							//obj.scrollTop(obj.scrollTop() + itemHeight);
						}
						if( item.offset().top - obj.offset().top > itemOffsetTop - clientHeight ){
							//scrollTop = obj.scrollTop() + itemHeight;
						}
						
						if( itemOffsetTop + itemHeight > clientHeight ){
							obj.scrollTop(obj.scrollTop() + itemHeight);
						}
						if( itemOffsetTop2 < itemHeight ){
							console.log(obj.scrollTop(),itemHeight);
							obj.scrollTop(obj.scrollTop() - itemHeight);
						}
						
					},
					
					show:function(obj){
						var allDownWrap = $('.l-select-down'),
							downWrap    = obj.find('.l-select-down'),
							wrap        = $('.l-select-wrap');

						allDownWrap.addClass('fn-hide');
						downWrap.removeClass('fn-hide');
						wrap.css({'z-index':''});
						obj.css({'z-index':'10'});
					},
					
					close:function(){
						var downWrap = $('.l-select-down'),
							wrap     = $('.l-select-wrap');
						
						downWrap.addClass('fn-hide');
						wrap.css({'z-index':''});
					},
					
					/**
					* 创建single html
					*/
					createSingleHtml: function(){
						var target  = p.target,
							isArrow = p.isArrow,
							len     = p.target.length,
							i       = 0;
						
						/*遍历多个target*/						
						for(; i<len; i++){
                            var selectItem      = target.eq(i);
                            
                            if( selectItem.parent().hasClass('l-select-wrap') ){
                                continue;
                            }
                            
							var selectItemWidth = selectItem.outerWidth(),
								selectItemClass = selectItem[0].className,
								selectItemVal   = selectItem.wrap('<div class="l-select-wrap"></div>')
															.after('<div class="l-select-single"><div class="l-select-single-init '+ selectItemClass +'"></div><div class="l-select-down fn-hide"><ul class="l-select-single-ul"></ul></div></div>')
															.val(),
								selectedItem    = selectItem.find('option:selected'),
								option          = selectItem.find('option'),
								optionLen       = option.length,
								h               = 0,
								single          = selectItem.next('.l-select-single'),
								singleInit      = single.find('.l-select-single-init'),
								singleInitHtml  = selectedItem.html(),
								singleUl        = single.find('.l-select-single-ul'),
								singleUlHtml    = '';
								
							if( isArrow ){
								single.append('<div class="l-select-single-arrow"></div>');
								singleInit.addClass('l-select-single-init-arrow');
							}
							
							/*遍历select中的option*/
							for(; h<optionLen; h++){
								var optionItem     = option.eq(h),
									optionItemVal  = optionItem.val(),
									optionItemHtml = optionItem.html();
									
								if( optionItemVal === selectItemVal && optionItemVal !== '' ){
									singleUlHtml += '<li class="l-select-single-li on" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}else{
									singleUlHtml += '<li class="l-select-single-li" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}
							}
							
							//selectItem.hide();
							singleInit
								.html(singleInitHtml)
								.width(selectItemWidth);
								
							singleUl
								.html(singleUlHtml)
								.width(singleInit.outerWidth()-2);
								
							p.wrap = p.target.parent();
						}
					},
					
					/**
					* 刷新single html
					*/
					refreshSingleHtml:function(){
						var target  = p.target,
							len     = p.target.length,
							i       = 0;
						
						/*遍历多个target*/						
						for(; i<len; i++){
							var selectItem      = target.eq(i),
                                selectItemWidth = selectItem.outerWidth(),
								selectItemVal   = selectItem.val(),
								selectedItem    = selectItem.find('option:selected'),
								option          = selectItem.find('option'),
								optionLen       = option.length,
								h               = 0,
								single          = selectItem.next('.l-select-single'),
								singleInit      = single.find('.l-select-single-init'),
								singleInitHtml  = selectedItem.html(),
								singleUl        = single.find('.l-select-single-ul'),
								singleUlHtml    = '';
							
							/*遍历select中的option*/
							for(; h<optionLen; h++){
								var optionItem     = option.eq(h),
									optionItemVal  = optionItem.val(),
									optionItemHtml = optionItem.html();
									
								if( optionItemVal === selectItemVal && optionItemVal !== '' ){
									singleUlHtml += '<li class="l-select-single-li on" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}else{
									singleUlHtml += '<li class="l-select-single-li" data-index="'+ h +'">'+ optionItemHtml +'</li>';
								}
							}
							
							singleInit
								.html(singleInitHtml)
								.width(selectItemWidth);
								
							singleUl
								.html(singleUlHtml);
								//.width(singleInit.outerWidth()-2);
								//console.log(singleInit.outerWidth()-2,selectItemWidth)
								
							p.wrap = p.target.parent();
						}
					},
					
					/**
					* single事件处理
					*/
					singleFn: function(){
						var that   = this,
							wrap   = p.wrap,
							item   = null,
							win    = $('body'),
							isShow = false;
							
						nic.ui.onselectstart(wrap);
						
						wrap
							.on('click', '.l-select-single-li', function(e){
								var self          = $(e.currentTarget),
									index         = self.attr('data-index'),
									html          = self.html(),
									select        = self.parents('.l-select-wrap').find('select'),
									option        = select.find('option'),
									optionCurrent = option.eq(index),
									singleInit    = self.parent().prev();
								
								isShow = false;
								singleInit.html(html);
								option.attr('selected', false);
								optionCurrent.attr('selected', true);
								that.close();
								select.trigger('change');
							})
							.on('mouseover', '.l-select-single-li', function(e){
								var self     = $(e.currentTarget),
									siblings = self.siblings();
									
								self.addClass('on');
								siblings.removeClass('on');
							})
							.on('click','.l-select-single-init',function(e){
								var self    = $(e.currentTarget),
									parents = self.parents('.l-select-wrap'),
									width   = self.outerWidth(),
									singleUl= parents.find('.l-select-single-ul');
									
								singleUl.width(width-2); //修复refreshSingleHtml时获取宽度有误
									
								isShow = true;
								item   = self;  //点击后获取对象
								that.show(parents);
								e.stopPropagation();
								return false;
							})
							.on('change','select',function(){
								that.refreshSingleHtml();
							})
                            .on('click','.l-select-single-arrow',function(e){
                                var self       = $(e.currentTarget),
                                    singleInit = self.siblings('.l-select-single-init');
									
                                singleInit.trigger('click');
                                e.stopPropagation();
                            });

						win
							.on('click',function(){
								if( isShow ){
									that.close();
									isShow = false;
								}
							})
							.on('keydown',function(e){
								if(isShow && item){
									var down   = item.next().find('.l-select-single-ul'),
										li     = down.find('.l-select-single-li'),
										len    = li.length,
										index  = down.find('.on').attr('data-index');

									e.stopPropagation();
									switch(e.keyCode){
										case 13:
											item.html(li.eq(index).html());
											that.close();
											isShow = false;
										break;
										case 38:
											if(index > 0){
												index --;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down, down.find('.on'), index);
											}
											e.preventDefault();
										break;
										case 40:
											if(index < len-1){
												index++;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down, down.find('.on'), index);
											}
											e.preventDefault();
										break;
									}
								}
							});
					},
					
					/**
					* 创建multiple html
					*/
					createMultipleHtml: function(){
						var target = p.target,
							wrap   = target.parent(),
							width  = p.width,
							name   = p.name,
							html   = '<div class="l-select-multiple-selected fn-clear" style="width:'+ width +'px">'+
										'<ul>'+
											'<li class="l-select-multiple-selected-input">'+
												'<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="l-select-multiple-input" />'+
											'</li>'+
										'</ul>'+
									'</div>'+
									'<div class="l-select-down fn-hide"><ul class="l-select-multiple-down" style="width:'+ (width-2) +'px"></ul></div>';
								
						$.each(target, function(i, item){
							var oItem = $(item),
								oWrap = oItem.parent();
							if( !oWrap.hasClass('l-select-wrap') ){
								oWrap = oItem.wrap('<div class="l-select-wrap" data-index="'+ i +'"></div>').parent();
							}
							if( !oWrap.find('.l-select-multiple').length ){
								if( name ){
									oWrap.append('<input type="hidden" name="'+ name +'">');
								}
								oWrap.append('<div class="l-select-multiple" data-index="'+ i +'">'+ html +'</div>');
							}else{
								oWrap.find('.l-select-multiple').html(html);
							}
						});

						p.wrap = target.parent(); 
					},
					
					/**
					* 刷新multiple 选项html
					*/
					refreshMultipleHtml: function(index){
						var wrap        = p.wrap.eq(index),
							down        = wrap.find('.l-select-multiple-down'),
							nameObj     = wrap.find('input[name="'+ p.name +'"]'),
							checkbox    = p.checkbox,
							radio       = p.radio,
							input       = wrap.find('.l-select-multiple-input'),
							val         = input.val(),
							isHasVal    = val === '' || val === undefined,
							data        = ( checkbox || radio ) ? ( isHasVal ? p.data : t.data[index] ) : t.data[index],
							dataLen     = data ? data.length : 0,
							i           = 0,
							str         = '',
							textWidth   = p.width - 48;
							
						//console.log('aa', t.data)
							
						if( checkbox ){
							str += '<li class="fn-clear"><span class="l-checkbox l-checkbox-all fn-left"></span><span class="fn-left">全选</span></li>';
							for(; i<dataLen; i++){
								str += '<li class="l-select-multiple-down-li'+ (i === 0 ? ' on' : '') +' fn-clear" data-id="'+ data[i].id +'" data-val="'+ data[i].val +'" data-index="'+ i +'">'+ 
											'<span class="l-checkbox fn-left l-checkbox-'+ i +'"></span>' +
											'<span class="fn-left" style="width:'+ textWidth +'px">' +
												data[i].name +
											'</span>' +
										'</li>';
							}
						}else if( radio ){
							for(; i<dataLen; i++){
								str += '<li class="l-select-multiple-down-li'+ (i === 0 ? ' on' : '') +' fn-clear" data-id="'+ data[i].id +'" data-val="'+ data[i].val +'" data-index="'+ i +'">'+ 
											'<span class="l-radio fn-left l-radio-'+ i +'"></span>' +
											'<span class="fn-left" style="width:'+ textWidth +'px">' +
												data[i].name +
											'</span>' +
										'</li>';
							}
						}else{
							for(; i<dataLen; i++){
								str += '<li class="l-select-multiple-down-li l-select-multiple-down-li-'+ i + (i === 0 ? ' on' : '') +'" data-id="'+ data[i].id +'" data-val="'+ data[i].val +'">'+ data[i].name +'</li>';
							}
						}
						down.html( dataLen ? str : '' );
						nameObj.val( !dataLen ? val : '' );
					},
					
					/**
					* multiple修改已选数据
					*/
					modifyMultipleSelectedData: function(index, input){
						var inputVal     = input.val(),
							checkbox     = p.checkbox,
							radio        = p.radio;
							
						if( ( checkbox || radio ) && inputVal === '' ){ return; }
						
						t.data[index] = dataHandle(t.selectedData[index], input);
						
						return;
						
						function dataHandle(selectedData, input){
							
							var data         = p.data,
								dataLen      = data ? data.length :0,
								y            = 0,
								isSelected   = false,
								tmp          = [],
								len          = selectedData ? selectedData.length : 0,
								inputVal     = input.val(),
								reg          = new RegExp((inputVal?inputVal:'').toLowerCase()),
								name         = null;
								
							for(; y<dataLen; y++){
						
								//val        = reg.test( (data[y].val ? data[y].val + '' : '').toLowerCase() );
								name       = reg.test( (data[y].name ? data[y].name + '' : '').toLowerCase() );
								isSelected = false;
								
								//过滤已选数据
								for(var h = 0; h<len; h++){
									if( selectedData[h] && selectedData[h].name === data[y].name ){
										isSelected = true;
									}
								}
								
								if( /*val || */ name && ( !isSelected || ( checkbox || radio ) ) ){
									tmp.push(data[y]);
								}
							}
							
							return tmp;
						}
					},

					/**
					* multiple事件处理
					*/
					multipleFn: function(){
						var that      = this,
							target    = p.target,
							wrap      = p.wrap,
							checkbox  = p.checkbox,
							radio     = p.radio,
							selected  = wrap.find('.l-select-multiple-selected'),
							input     = wrap.find('.l-select-multiple-input'),
							down      = wrap.find('.l-select-multiple-down'),
							data      = p.data,
							dataLen   = data ? data.length :0,
							win       = $('body'),
							isShow    = false,
							coreFn    = {
							
								/*修改input*/
								setInputSize: function(index, selected, input, down){
									var last           = selected.find('.l-select-multiple-selected-li:last'),
										lastWidth      = last.outerWidth(),
										lastOffset     = last.offset(),
										lastLeft       = lastOffset ? lastOffset.left : 0,
										selectedOffset = selected.offset(),
										selectedLeft   = selectedOffset ? selectedOffset.left : 0,
										width          = p.width,
										isHidden       = selected.is(':hidden');
									
									if( input.width() <= width || width < 10 ){
										width = width - (lastLeft + lastWidth - selectedLeft + 5);
									}
									
									if( !last.length ){
										width = p.width;
									}
									
									input
										.focus()
										.width(width);
									down.css({
										top: function(){
											if( isHidden ){
												var parents = selected
																.parents(':hidden')
																.filter(function(){
																	var oStyle = this.currentStyle ? this.currentStyle : window.getComputedStyle(this, false);
																	return oStyle.display === 'none';
																})
																.show(),
													height  = selected.outerHeight();
												parents.hide();
												return height;
											}
											return selected.outerHeight();
										}
									});
									
								},
								
								/*设置已选id，并已字符串返回*/
								setSelectedInput: function(index, selected, input, down){
									var item     = selected.find('.l-select-multiple-selected-li'),
										len      = item.length,
										h        = 0,
										idArr    = [],
										nameArr  = [],
										valArr   = [];
										
									for(; h<len; h++){
										var oItem = item.eq(h);
										idArr.push(oItem.attr('data-id'));
										nameArr.push(oItem.attr('data-name'));
										valArr.push(oItem.attr('data-val'));
									}
									
									target
										.eq(index)
										.val(idArr.join())
										.attr({
											'data-name' : nameArr.join(),
											'data-val' : valArr.join()
										});
								},
								
								/*添加已选*/
								addSelectItem: function(obj, isAll){
									var id        = obj.attr('data-id'),
										parents   = obj.parents('.l-select-wrap'),
										index     = parents.attr('data-index'),
										i         = 0,
										inputVal  = input.eq(index).val(),
										checkbox  = p.checkbox,
										isRefresh = true;
									
									if( !t.selectedData[index] ){
										t.selectedData[index] = [];
									}
									
									if( isAll ){
										t.selectedData[index] = t.selectedData[index].concat(data); //浅拷贝
									}else{
										for(; i<dataLen; i++){
											if( Number(data[i].id) === Number(id) ){
												if( radio ){
													t.selectedData[index] = [];
												}
												t.selectedData[index].push(data[i]);
											}
										}
									}
									
									if( checkbox || radio ){
										isRefresh = false;
									}
									
									coreFn.initSelected(inputVal, isRefresh, index);
								},
								
								/*删除已选*/
								removeSelectItem: function(obj, isAll){
									var id           = obj.attr('data-id'),
										parents      = obj.parents('.l-select-wrap'),
										index        = parents.attr('data-index'),
										selectedData = t.selectedData[index],
										len          = selectedData.length,
										i	         = 0,
										inputVal     = input.val(),
										isRefresh    = true;
										
									//删除已选
									if( checkbox && isAll ){
										t.selectedData[index] = [];
									}else{
										for(; i<=len; i++){
											if(selectedData[i] && Number(selectedData[i].id) === Number(id)){
												t.selectedData[index].splice(i, 1);
											}
										}
									}
									
									if( checkbox ){
										isRefresh = false;
									}

									coreFn.initSelected(inputVal, isRefresh, index);
								},
								
								/*选中处理*/
								initSelected: function(inputVal, isRefresh, index){

									var data          = p.data,
										dataLen       = data.length,
										selectedData  = t.selectedData[index],
										len           = selectedData ? selectedData.length : 0,
										i             = 0,
										selectedClass = '',
										selectedIndex = '',
										str           = '',
										checkbox      = p.checkbox,
										itemMaxWidth  = p.width - 34, //XXX 暂时写死
										itemStyleStr  = 'style="max-width:'+ itemMaxWidth +'px"',
										selectedObj   = selected.eq(index),
										inputIObj     = input.eq(index),
										downObj       = down.eq(index);

									isRefresh = isRefresh === undefined ? true : isRefresh;

									//重获数据
									if( isRefresh ){
										that.modifyMultipleSelectedData(index, inputIObj);
									}
									that.refreshMultipleHtml(index);
									
									for(; i<len; i++){

										if( checkbox || radio ){
											var downAllItem = downObj.find('.l-select-multiple-down-li'),
												downItemLen = downAllItem.length;
											
											for(var j = 0; j<dataLen; j++){
												var downItem = downAllItem.eq(j);
	
												if( Number(downItem.attr('data-id')) === Number(selectedData[i].id) ){
													downItem
														.find('.l-checkbox')
														.addClass('l-checkbox-selected')
														.end()
														.find('.l-radio')
														.addClass('l-radio-selected');
													selectedClass = ' l-select-multiple-selected-li-'+j;
													selectedIndex = ' data-index="'+ j +'"';
												}
											}
											
											if( len === dataLen || (downAllItem && downAllItem.find('.l-checkbox-selected').length === downItemLen) ){
												downObj.find('.l-checkbox-all').addClass('l-checkbox-selected');
											}
										}
										
										str += '<li class="l-select-multiple-selected-li'+ 
														selectedClass +'" data-id="'+ 
														selectedData[i].id +'" data-val="'+ 
														selectedData[i].val +'" data-name="'+ 
														selectedData[i].name +'"'+ 
														itemStyleStr +
														selectedIndex +
												'>'+ 
													selectedData[i].name +
													'<span class="l-select-multiple-selected-del">x</span>'+
												'</li>';
												
									}//end for
									

									
									selectedObj
										.find('.l-select-multiple-selected-li')
										.remove()
										.end()
										.find('.l-select-multiple-selected-input').before(str); 
									inputIObj
										.eq(index)
										.val(inputVal);

									coreFn.setInputSize(index, selectedObj, inputIObj, downObj);
									coreFn.setSelectedInput(index, selectedObj, inputIObj,  downObj);
									
								}//end initSelected
								
							};//end coreFn
						
						/* 初始化 */
						if( p.data ){
							if( p.selectedData ){
								t.selectedData[0] = p.selectedData;
							}
							$.each(wrap, function(i){
								coreFn.initSelected('', true, i);
							});
							
	
							nic.ui.onselectstart(wrap);
						}
						
						/*给 wrap容器对象 绑定相关事件*/
						wrap
							.on('click','.l-select-multiple-selected',function(e){
								var parents = $(e.currentTarget).parents('.l-select-wrap'),
									index   = parents.attr('data-index');
								e.stopPropagation();
								input.eq(index).focus();
								isShow = true;
								that.show(parents);
							})
							.off('click', '.l-select-multiple-down-li')
							.on('click', '.l-select-multiple-down-li', function(e){
								e.stopPropagation();
								isShow = true;
								
								var self = $(e.currentTarget);
								
								if( checkbox ){
									self.find('.l-checkbox').trigger('click');
								}else{
									if(radio){
										down.find('.l-radio')
											.removeClass('l-radio-selected');
										self.find('.l-radio').addClass('l-radio-selected');
									}
									coreFn.addSelectItem(self);
								}
								if( nic.base.isFunction( o.onClick ) ){
									o.onClick.apply(self, [self]);
								}
							})
							.on('mouseover', '.l-select-multiple-down-li', function(e){
								var self     = $(e.currentTarget),
									siblings = self.siblings();
								self.addClass('on');
								siblings.removeClass('on');
							})
							.off('click', '.l-checkbox')
							.on('click', '.l-checkbox', function(e){
								e.stopPropagation();
								var self        = $(e.currentTarget),
									index       = self.parents('.l-select-multiple').attr('data-index'),
									downItem    = down.find('.l-select-multiple-down-li'),
									allCheckbox = down.find('.l-checkbox');
									
								if( self.hasClass('l-checkbox-selected') ){
									if( self.hasClass('l-checkbox-all') ){
										allCheckbox.removeClass('l-checkbox-selected');
										coreFn.removeSelectItem(downItem, true);
									}else{
										allCheckbox
											.eq(0)
											.removeClass('l-checkbox-selected');
										self.removeClass('l-checkbox-selected');
										coreFn.removeSelectItem(self.parent());
									}
								}else{
									if( self.hasClass('l-checkbox-all') ){
										t.selectedData[index] = [];
										coreFn.addSelectItem(downItem, true);
									}else{
										self.addClass('l-checkbox-selected');
										coreFn.addSelectItem(self.parent());
									}
								}
								
							})
							.on('click', '.l-select-multiple-selected-li', function(e){
								$(e.currentTarget).find('.l-select-multiple-selected-del').trigger('click');
							})
							.on('click','.l-select-multiple-selected-del', function(e){
								var selectedItem  = $(e.currentTarget).parent(),
									selectedIndex = selectedItem.attr('data-index'),
									checkbox      = down.find('.l-checkbox-'+selectedIndex),
									allCheckbox   = down.find('.l-checkbox-all');
								
								checkbox.removeClass('l-checkbox-selected');
								allCheckbox.removeClass('l-checkbox-selected');
								coreFn.removeSelectItem(selectedItem);
								
								if( nic.base.isFunction( o.onDel ) ){
									o.onDel.apply(selectedItem, [selectedItem]);
								}
							})
							.on('click', '.l-select-multiple-input', function(e){
								var parents = $(e.currentTarget).parents('.l-select-wrap');
									
								e.stopPropagation();
								isShow = true;
								that.show(parents);
							})
							.off('keyup', '.l-select-multiple-input')
							.on('keyup', '.l-select-multiple-input', function(e){
								var self            = $(e.currentTarget),
									parents         = self.parents('.l-select-wrap'),
									index           = parents.attr('data-index'),
									code            = e.keyCode,
									val             = self.val(),
									//i               = 0,
									//selectedData    = t.selectedData,
									//selectedDataLen = selectedData.length,
									valReg          = /\\|\[|\]|\*|\(|\)|\+|\?/,
									itemLast        = selected.eq(index).find('.l-select-multiple-selected-li:last');

								if( code !== 38 || code !== 40 || code !== 13 ){
									t.data[index] = [];
									isShow = true;
									that.show(parents);
									
									//过滤特殊符号
									if( valReg.test(val) ){
										val = val.replace(valReg, '');
									}
									
									if( code === 8 && val === '' && itemLast.length ){
										return false;
									}
									coreFn.initSelected(val, true, index);
								}
							})
							.off('keydown', '.l-select-multiple-input')
							.on('keydown', '.l-select-multiple-input', function(e){
								if( !p.isAllowEnter ){return false;}
								var self     = $(e.currentTarget),
									parents  = self.parents('.l-select-wrap'),
									index    = parents.attr('data-index'),
									code     = e.keyCode,
									val      = self.val(),
									itemLast = selected.eq(index).find('.l-select-multiple-selected-li:last');
								
								if( code === 8 ){
									if( val === '' ){
										if( itemLast.hasClass('on') ){
											coreFn.removeSelectItem(itemLast);
										}else{
											itemLast.addClass('on');
										}
										return false;
									}else{
										/*val只有一个字符时，删除并刷新*/
										if( val && val.length ){
											self.val('');
											coreFn.initSelected(val, true, index);
										}
									}
								}else if(code === 38 || code === 40){
									self.blur();
									isShow = true;
									that.show(parents);
								}else if(code === 13 && val === ''){
									return false;
								}
							});//end wrap
							
						//TODO: 键盘上下键功能未实现
						/*给 window对象 绑定相关事件*/
						win
							.on('click', function(){
								if( isShow ){
									isShow = false;
									that.close();
								}
							});
							/*.on('keydown', function(e){
								if(isShow){
									var li    = down.find('.l-select-multiple-down-li'),
										len   = li.length,
										index = down.find('.on').attr('data-index');

									e.stopPropagation();
									switch(e.keyCode){
										case 13:
											input.focus();
											coreFn.addSelectItem(li.eq(index));
											isShow = false;
											that.close();
											return false;
										break;
										case 38:
											if(index > 0){
												index --;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down,li,index);
											}
											e.preventDefault();
										break;
										case 40:
											if(index < len-1){
												index++;
												li.eq(index).addClass('on').siblings().removeClass('on');
												that.move(down,li,index);
											}
											e.preventDefault();
										break;
									}
							});}//end win*/
					},
					
					/**
					* 创建树形Html
					*/
					createTreeHtml: function(){
                        var target = p.target,
							wrap   = target.parent(),
                            name   = target.attr('name'),
							width  = p.width,
							html   = '';
							
						if( !wrap.hasClass('l-select-wrap') ){
							wrap = target.wrap('<div class="l-select-wrap"></div>').parent();
						}
                        
						html += '<div class="l-select-tree-selected fn-clear">';
						html += '		<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="l-select-tree-input" name="'+ name +'-name"  />';
						html += '</div>';
						html += '<div class="l-select-down fn-hide"><div class="l-select-tree-down" style="width:'+ width +'px"></div></div>';
						
						if( !wrap.find('.l-select-tree').length ){
							wrap.append('<div class="l-select-tree" style="width:'+ width +'px">'+ html +'</duv>');
						}else{
							wrap.find('.l-select-tree').html(html);
						}
						p.wrap = wrap; 
					},
					
					/**
					* 树形相关事件
					*/
					treeFn: function(){

						var that     = this,
							wrap     = p.wrap,
							target   = p.target,
							win      = $('body'),
							isShow   = false,
							input    = wrap.find('.l-select-tree-input'),
							selected = null,
                            isArray  = nic.base.isArray,
							tree     = nic.ui.tree({
										target: wrap.find('.l-select-tree-down'),
										data: p.data,
										selected: p.selectedData,
                                        check: p.check,
										onClick: function(obj, data){

											if( nic.base.isFunction(p.onClick) ){
												var isFalse = p.onClick(obj, data);
												if( !( isFalse === undefined ? true : isFalse ) ){
													return false;
												}
											}
											if( isArray(data) ){
                                                var dataLen = data.length,
                                                    i       = 0,
                                                    idArr   = [],
                                                    nameArr = [];
                                                for(; i<dataLen; i++){
                                                    idArr[i]   = data[i].id;
                                                    nameArr[i] = data[i].name;
                                                }
                                                input.val(nameArr.join());
                                                target.val(idArr.join());
                                            }else{
                                                input.val(data.name);
                                                target.val(data.id);
                                            }
											
											isShow = false;
											that.close();
                                            
										},
										onLoad: p.onLoad
									});
								
						selected = tree.getSelected();
						
						var tmpNameArr = [],
							tmpIdArr   = [];
						for(var i = 0; i<selected.length; i++){
							tmpNameArr[i] = selected[i].name;
							tmpIdArr[i]   = selected[i].id;
						}
						
						input.val(tmpNameArr.join(','));
						target.val(tmpIdArr.join(','));
                        
						wrap
							.off('click', input)
							.on('click', input, function(e){
								e.stopPropagation();
								isShow = true;
								that.show(wrap);
							})
                            .on('keyup', input, function(){
                                target.val('');
								tree.refresh({
                                    selected:[]
                                });
							});
									
						/*给 window对象 绑定相关事件*/
						win.on('click', function(){
								if( isShow ){
									isShow = false;
									that.close();
								}
							});
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
							//async: false,
							dataType: "json",
							data: ajax.data,
							beforeSend: function(){
								if( nic.base.isFunction(ajax.beforeSend) ){
									ajax.beforeSend();
								}
							},
							success: function(data){
								if( nic.base.isFunction(ajax.success) ){
									ajax.success(data);
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
					* 运行select
					*/
					run: function(){
						var that = this,
							type = p.type;
							
						switch (type){
							case 'single':
								that.createSingleHtml();
								if( !p.wrap ){ break; }
								that.singleFn();
								break;
							case 'multiple':
								that.createMultipleHtml();
								if( !p.wrap ){ break; }
								that.multipleFn();
								break;
							case 'tree':
								if( nic.base.isFunction(nic.ui.tree) ){
									that.createTreeHtml();
									if( !p.wrap ){ break; }
									that.treeFn();
								}
								break;
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
						
						if( !p.data  && !p.ajax ){
							p.data = [];
						}
					
						if( p.ajax ){
							c.ajaxGetData(function(data){
								p.data = data;
								c.run();
								if( nic.base.isFunction(p.onLoad) ){
									p.onLoad();
								}
							});
							return g;
						}
						
						c.run();
						if( p.data && nic.base.isFunction(p.onLoad) ){
							p.onLoad();
						}
						return g;
					}//end init
				};
		
		/**
		* 刷新下拉框
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
		
		/**
		* 代码重载
		*/
		g.reload = function(){
			t.selectedData = [];
			c.init(o);
		};
		
		return c.init(o);
	};
	
module.exports = function(o){
	if( !o ){
		return {};
	}
	return new Select(o);
};
