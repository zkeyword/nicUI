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

var nic  = require('./nic'),
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
