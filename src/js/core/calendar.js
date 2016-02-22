define(['./nic'], function(nic){
	
	var calendar = function(options){
		var o = options || {};
		if(!o.trigger){return;}
		var trigger    = $(o.trigger).wrap('<div class="l-ui-calendarWrap"></div>'),
			wrap       = trigger.parent(),
			top        = o.top || trigger.outerHeight(),
			left       = o.left || 0,
			main       = wrap.append('<div class="l-ui-calendarMain" style="top:'+ top +'px;left:'+ left +'px"></div>')
							 .find('.l-ui-calendarMain'),
			callback   = o.callback,
			beginYear  = Number(o.beginYear) || 1980,
			endYear    = Number(o.endYear) ||  2050,
			language   = o.language || {
											next: '上个月',
											prev: '下个月',
											submit: '提交',
											year: '年',
											month: '月',
											time: '时间',
											weeks: ['日', '一', '二', '三', '四', '五', '六']
										},
			days       = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			weeks      = language.weeks,
			months     = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			dateFormat = o.dateFormat || 'yyyy-MM-dd hh:mm:ss',
			date       = o.date || new Date(),
			globalDate = date,
			isShowTime = /(h+)/.test(dateFormat),
			_core      = {
							/*格式化日期*/
							format: function(year, month, day, hour, minute, second, week, quarter, millisecond){
								var o = {
										// "M+" : month + 1 || date.getMonth() + 1,                                       //month
										// "d+" : day || date.getDate(),                                                  //day
										// "h+" : hour || date.getHours(),                                                //hour
										// "m+" : minute || date.getMinutes(),                                            //minute
										// "s+" : second || date.getSeconds(),                                            //second
										// "w+" : weeks[week] || weeks[date.getDay()],                                    //week
										// "q+" : Math.floor((quarter + 3) / 3) || Math.floor((date.getMonth() + 3) / 3), //quarter
										// "S"  : millisecond || date.getMilliseconds()                                   //millisecond
										'M+': month + 1,
										'd+': day,
										'h+': hour,
										'm+': minute,
										's+': second,
										'w+': weeks[week],
										'q+': Math.floor((quarter + 3) / 3),
										'S' : millisecond
									},
									str  = dateFormat;
								
								year = year.toString();
								
								if( /(y+)/.test(str) ){
									str = str.replace(/(y+)/, year.substr(4 - Math.min(4, RegExp.$1.length)));
								}
								for( var k in o ){
									if(	new RegExp("("+ k +")").test(str) ){
										if(	o[k] !== undefined && !isNaN(o[k]) ){
											str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
										}else{
											str = str.replace(/\s[^\d](.)*/, '');
										}
									}
								}
								return str;
							},
						
							/*判断闰年*/
							isLeapYear: function(y){
								if((y % 400 === 0) || (y % 100 !== 0) && (y % 4 === 0)){
									return true;
								}
								return false;
							},
							
							/*获取月份天数*/
							getDayCount: function(y, m){
								if( _core.isLeapYear(y, m) ){
									days[1] = 29;
								}else{
									days[1] = 28;
								}
								return days[m];
							},
							
							/*获取新date*/
							getNewDate: function(y, m, d) {
								var newDate = new Date();
								newDate.setFullYear(y, m, d);
								// !isNaN(y) && newDate.setFullYear(y);
								// !isNaN(m) && newDate.setMonth(m);
								// !isNaN(d) && newDate.setDate(d);
								return newDate;
							},
							
							/*获取上下月*/
							getPrevNextMonth: function(poor){
								var y = globalDate.getFullYear(),
									m = globalDate.getMonth() + poor;
								if(m < 0){
									y -= 1;
									m = 11;
								}else if(m > 11){
									y += 1;
									m = 0;
								}
								return _core.getNewDate(y, m, 1);
							},
							getPrevDate: function(){
								return _core.getPrevNextMonth(-1);
							},
							getNextDate: function(){
								return _core.getPrevNextMonth(1);
							},
							
							/*创建头部*/
							createHeader: function(){
								var html     = '',
									yearLen  = endYear - beginYear,
									i        = 0,
									monthLen = 12,
									n        = 0;
									
								html += '<a class="l-ui-calendarHeader-btn l-ui-calendarHeader-prev" href="javascript:;" title="'+ language.prev +'"></a>';
								html += '<div class="l-ui-calendarHeader-text">';
								html += '<select class="l-ui-calendarHeader-year">';
								for(; i < yearLen; i++){
									var year = beginYear + i;
									if( year === globalDate.getFullYear() ){
										html += '<option value="'+ year +'" selected>'+ year +'</option>';
									}else{
										html += '<option value="'+ year +'">'+ year +'</option>';
									}
								}
								html += '</select>' + language.year;
								html += '<select class="l-ui-calendarHeader-month">';
								for(; n < monthLen; n++){
									var month = months[n];
									if( n === globalDate.getMonth() ){
										html += '<option value="'+ n +'" selected>'+ month +'</option>';
									}else{
										html += '<option value="'+ n +'">'+ month +'</option>';
									}
								}
								html += '</select>' + language.month;
								html += '</div>';
								html += '<a class="l-ui-calendarHeader-btn l-ui-calendarHeader-next" href="javascript:;" title="'+ language.next +'"></a>';
								
								return '<div class="l-ui-calendarHeader fn-clear">'+ html +'</div>';
							},
							
							/*创建周*/
							createWeeks: function(){
								var html = '',
									i    = 0;
								html += '<div class="l-ui-calendarWeeks fn-clear">';
								for(; i < 7; i++){
									if( i === 0 ){
										html += '<span class="l-ui-calendarWeek l-ui-calendarWeek-sunday">'+ weeks[i] +'</span>';
									}else if( i === 6 ){
										html += '<span class="l-ui-calendarWeek l-ui-calendarWeek-saturday">'+ weeks[i] +'</span>';
									}else{
										html += '<span class="l-ui-calendarWeek">'+ weeks[i] +'</span>';
									}
								}
								html += '</div>';
								return html;
							},
							
							/*创建天*/
							createDays: function(){
								var //year       = date.getFullYear(),
									//month      = date.getMonth(),
									day        = date.getDate(),
									curYear    = globalDate.getFullYear(),              //当前全局date对象
									curMonth   = globalDate.getMonth(),
									curDay     = globalDate.getDate(),
									curDayNum  = _core.getDayCount(curYear, curMonth),
									prevDate   = _core.getPrevDate(),                    //获取上月的date
									prevYear   = prevDate.getFullYear(),
									prevMonth  = prevDate.getMonth(),
									prevDayNum = _core.getDayCount(prevYear, prevMonth),
									nextDate   = _core.getNextDate(),                    //获取下月的date
									nextYear   = nextDate.getFullYear(),
									nextMonth  = nextDate.getMonth(),
									lastWeek   = new Date(curYear, curMonth, 1).getDay(), //获取本月1号的星期数
									html       = '',
									p          = prevDayNum - lastWeek +1,               //上月剩余天数(礼拜从礼拜日算起)
									nextDayNuM = 42 - lastWeek - curDayNum,              //下月剩余天数
									i          = 1,
									n          = 1;

								for(; p <= prevDayNum; p++) {
									var prevDayStr =  _core.format(prevYear, prevMonth, p);
									html += '<a href="javascript:;" class="l-ui-calendarDay l-ui-calendarDay-prev l-ui-calendarDay-disable" title="'+ prevDayStr +'" year="'+ prevYear +'" month="'+ prevMonth +'">'+ p +'</a>';
								}
								
								for(; i <= curDayNum; i++){
									var cls       = '',
										curDayStr = _core.format(curYear, curMonth, i);
									if( day === i ){
										cls = ' l-ui-calendarDay-current';
									}
									html += '<a href="javascript:;" class="l-ui-calendarDay'+ cls +'" title="'+ curDayStr +'" year="'+ curYear +'" month="'+ curMonth +'">'+ i+'</a>';
								}
								
								for(; n <= nextDayNuM; n++) {
									var nextDayStr =  _core.format(nextYear, nextMonth, n);
									html += '<a href="javascript:;" class="l-ui-calendarDay l-ui-calendarDay-next l-ui-calendarDay-disable" title="'+ nextDayStr +'" year="'+ nextYear +'" month="'+ nextMonth +'">'+ n +'</a>';
								}
												
								return '<div class="l-ui-calendarDays fn-clear">'+ html +'</div>';
							},
							
							/*创建时分秒*/
							createTime: function(){
								var hour       = date.getHours(),
									minute     = date.getMinutes(),
									second     = date.getSeconds(),
									hourHtml   = '',
									minuteHtml = '',
									secondHtml = '',
									h          = 0,
									m          = 0,
									s          = 0;
									
								hour   = hour < 10 ? '0' + hour  : hour;
								minute = minute < 10 ? '0' + minute  : minute;
								second = second < 10 ? '0' + second  : second;
								
								for(; h < 24; h++){
									hourHtml += '<a href="javascript:;">'+ (h < 10 ? '0' + h  : h) +'</a>';
								}
								
								for(; m < 60; m++){
									minuteHtml += '<a href="javascript:;">'+ (m < 10 ? '0' + m  : m) +'</a>';
								}
								
								for(; s < 60; s++){
									secondHtml += '<a href="javascript:;">'+ (s < 10 ? '0' + s  : s) +'</a>';
								}
									
								return  '<div class="l-ui-calendarTime fn-clear">' +
											'<div class="l-ui-calendarTimeTitle">'+ language.time +':</div>' + 
											'<div class="l-ui-calendarTimeWrap fn-clear">' +
												'<div class="l-ui-calendarTime-timeWrap l-ui-calendarTime-hourWrap">' +
													'<input type="text" class="l-ui-calendarTime-hourInput" value="'+ hour +'" /><span>:</span>' +
													'<div class="l-ui-calendarTime-hour">'+ hourHtml +'</div>' +
												'</div>' + 
												'<div class="l-ui-calendarTime-timeWrap l-ui-calendarTime-minuteWrap">' + 
													'<input type="text" class="l-ui-calendarTime-minuteInput" value="'+ minute +'" /><span>:</span>' + 
													'<div class="l-ui-calendarTime-minute">'+ minuteHtml +'</div>' + 
												'</div>' + 
												'<div class="l-ui-calendarTime-timeWrap l-ui-calendarTime-secondWrap">'  +
													'<input type="text" class="l-ui-calendarTime-secondInput" value="'+ second +'" />' + 
													'<div class="l-ui-calendarTime-second">'+ secondHtml +'</div>' + 
												'</div>'  +
											'</div>' + 
											'<a href="javascript:;" class="l-ui-calendarTimeBtn">'+ language.submit +'</a>' +
										'</div>';
							},
							
							/*点击下个月*/
							clickNext: function(){
								globalDate = _core.getPrevNextMonth(1);
								_core.init();
							},
							
							/*点击上个月*/
							clickPrev: function(){
								globalDate = _core.getPrevNextMonth(-1);
								_core.init();
							},
							
							/*年月选择*/
							clickYearMonth: function(year, month){
								globalDate = new Date(year, month, 1);
								_core.init();
							},
							
							/*关闭日历*/
							close: function(val){
								trigger.val(val);
								main.hide();
								if( nic.base.isFunction(callback) ){
									callback(val);
								}
							},
				 
							/*初始化函数*/
							init: function(){
								main.html(_core.createHeader() + _core.createWeeks() + _core.createDays());
								
								main.find('.l-ui-calendarHeader-prev').click(function(){
									_core.clickPrev();
								});
								main.find('.l-ui-calendarHeader-next').click(function(){
									_core.clickNext();
								});

								main.find('.l-ui-calendarHeader-month').change(function(){
									var year  = main.find('.l-ui-calendarHeader-year').val(),
										month = $(this).val();
									_core.clickYearMonth(year, month);
								});
								main.find('.l-ui-calendarHeader-year').change(function(){
									var year  = $(this).val(),
										month = main.find('.l-ui-calendarHeader-month').val();
									_core.clickYearMonth(year, month);
								});
								
								main.find('.l-ui-calendarDay').each(function(i){
									var saturday = i%7 === 6 ? ' l-ui-calendarDay-saturday' : '',
										sunday   = i%7 === 0 ? ' l-ui-calendarDay-sunday' : '';
									$(this).addClass(saturday+sunday);
								}).click(function(){
									var self = $(this),
										val  = self.attr('title');
										
									self.addClass('l-ui-calendarDay-current')
										.siblings()
										.removeClass('l-ui-calendarDay-current');
										
									if( !isShowTime ){
										_core.close(val);
									}else{
										var curYear  = self.attr('year'),
											curMonth = self.attr('month'),
											curDay   = self.text();
										
										globalDate = _core.getNewDate(curYear, curMonth, curDay);
									}
								}).dblclick(function(){
									if( isShowTime ){
										var hour     = hourInput.val(),
											minute   = minuteInput.val(),
											second   = secondInput.val(),
											curYear  = globalDate.getFullYear(),  //当前全局date对象
											curMonth = globalDate.getMonth(),
											curDay   = globalDate.getDate(),
											val      = _core.format(curYear, curMonth, curDay, hour, minute, second);
										
										_core.close(val);
									}
								}).mouseover(function(){
									var self = $(this);
									if( !self.hasClass('l-ui-calendarDay-current') ){
										self.addClass('l-ui-calendarDay-on')
									}
								}).mouseout(function(){
									var self = $(this);
									self.remove('l-ui-calendarDay-on')
								});
								
								if( isShowTime ){
									if( !main.find('.l-ui-calendarTime').length ){
										main.append(_core.createTime());
									}
				 
									var hourInput   = main.find('.l-ui-calendarTime-hourInput'),
										minuteInput = main.find('.l-ui-calendarTime-minuteInput'),
										secondInput = main.find('.l-ui-calendarTime-secondInput'),
										inputTime   = function( o ){
														o.siblings('div')
														 .show()
														 .find('a')
														 .click(function(){
															o.val( $(this).text() )
															 .siblings('div')
															 .hide();
														 });
														o.parent().siblings().find('div').hide();
													};
									
									hourInput.click(function(){
										inputTime( $(this) );
									});
									minuteInput.click(function(){
										inputTime( $(this) );
									});
									secondInput.click(function(){
										inputTime( $(this) );
									});
									main.find('.l-ui-calendarTimeBtn').click(function(){
										var hour     = hourInput.val(),
											minute   = minuteInput.val(),
											second   = secondInput.val(),
											curYear  = globalDate.getFullYear(),  //当前全局date对象
											curMonth = globalDate.getMonth(),
											curDay   = globalDate.getDate(),
											val      = _core.format(curYear, curMonth, curDay, hour, minute, second);
										
										_core.close(val);
									});
								}
							}
						};//end code
		
		_core.init();
		trigger.click(function(){
			main.show();
		});
	};
	
	return calendar;
});