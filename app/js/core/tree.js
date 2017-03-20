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

var nic  = require('./nic'),
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
