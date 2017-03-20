
$.fn.groupCalendar = function(config) {
	
	var cncnERP = require('core/cncnERP');
	
	cncnERP.template = require('template');
	
	var now = new Date();
	now = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
	var _con = jQuery.extend({
		cur_date: $.merge([], now),
		day_data:"",
		lin_id:"",
		day_tpl:""
	}, config || {});
	return this.each(function() {
		var id = setTimeout(function() {}, 1);
		var date_select_id = 'group_calendar_' + id;
		var self = this;
		var $self = $(self);
		var date_select_dom = null;
		var con = jQuery.extend({}, _con);
		var new_date = function(arr) {
			var date = new Date();
			date.setUTCFullYear(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10));
			date.setUTCHours(0, 0, 0, 0);
			return date;
		};
		var stop_bubble = function(event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		};
		var day = function() {
			var from = new_date([con.select_year, con.select_month, 1]);
			var to = new_date([con.select_year, con.select_month + 1, 1]);
//			var max_date = null;
//
//			if (con.max_date && con.max_date.match(/\d{4}\-\d{1,2}\-\d{1,2}/)) {
//				max_date = new_date(con.max_date.split('-'));
//			}
//			var min_date = null;
//			if (con.min_date && con.min_date.match(/\d{4}\-\d{1,2}\-\d{1,2}/)) {
//				min_date = new_date(con.min_date.split('-'));
//			}
//			
//			
//			if(max_date<to){
//				$('.datashow_calendar_yymm i.next').hide();
//			}else{
//				$('.datashow_calendar_yymm i.next').show();
//			}
//			if(from<min_date){
//				$('.datashow_calendar_yymm i.prev').hide();
//			}else{
//				$('.datashow_calendar_yymm i.prev').show();
//			}
			
			var cur_date = new_date(con.cur_date);
			var html = '<table><tr class="week"><th class="col-red">\u65e5</th><th>\u4e00</th><th>\u4e8c\u000d\u000a</th><th>\u4e09</th><th>\u56db</th><th>\u4e94</th><th class="col-red">\u516d</th></tr>';
			var day_index = from.getDay();
			if (day_index === 0) {
				day_index = 7;
			}
			
			var cur_date_num = (new Date(Date.parse(new Date(to)) - 86400000)).getDate();  //当前月的天数
					//最多6行tr
			for(var i=1; i<=6; i++){
				html += '<tr>';
				//每行放置7天
				for (var k = 1; k <= 7; k++) {
					var differ =(i - 1) * 7 + k - day_index;	//(当前行数-1)*7+当前行中第几格-这个月的第一天星期几
					if(differ<1 || differ>cur_date_num){
						html += '<td class="disabled"><div class="box">&nbsp;</div></td>';
					}else{
						var class_name = '';
						var date_text = con.select_year+'-'+con.select_month+'-'+differ;
						date_text = date_text.replace(/\-(\d)(?!\d)/g,'-0$1');
						var differ_date=new_date([con.select_year,con.select_month,differ]);
						var differ_text=differ;
						
						if (cur_date.toString() === differ_date.toString()) {
							class_name += ' cur';
						}
						html += '<td data-day="'+differ+'" data-date_text="'+date_text+'" class="'+class_name+'"><div class="box"><i class="item">' + differ_text +'</i></div></td>';
					}
					
					
				}
				html += '</tr>';
			}
			html += '</table>';
			
			
			
			date_select_dom.find('.group_calendar_dd').html(html);
			con.date_doms = date_select_dom.find('.group_calendar_dd td:not(.disabled)');
			
		};
		var events = function(){
			
			con.date_doms.unbind().bind('click', function() {
				con.cur_date[0] = con.select_year;
				con.cur_date[1] = con.select_month;
				con.cur_date[2] = parseInt($(this).data('day'), 10);
				//day();
			}).bind("mouseenter", function(){
				var _this = $(this),
					_left = _this.offset().left,
					left = con.offset.left;
				
				$(this).find(".price_listbox").css({"left": left - _left}).show();
				$(this).addClass("active");
			}).bind("mouseleave", function(){
				$(this).find(".price_listbox").hide();
				$(this).removeClass("active");
			});
			
		}
		var get_day_data = function(date){
			var day_data = con.day_data;
			return day_data[date];
		}
		
		var get_day_dom = function(data){
			return data ? cncnERP.template(con.day_tpl,data) : "";
		}

		var get_day_dataset = function(){
			$.ajax({
				type:"post",
				url:"/line/ajax/get_tuans_bydate",
				data:{action:"ajax",line_id:con.line_id,date:con.select_year+"-"+con.select_month+"-"+con.select_day},
				dataType:"json",
				success:function(data){
					if(data.res == "1"){
						con.day_data = JSON.parse(data.msg);
						con.date_doms.each(function(){
							var _this=$(this),
								data_text=_this.data("date_text"),
								day_data=get_day_data(data_text),
								day_dom=get_day_dom(day_data);
							_this.append(day_dom);
							events();
						});	
					}else{
						
						return
					}
				}
			});
		}
		
		var num_to_cn_month = function(num) {
			num = parseInt(num);
			var month_arr = ['', '1\u6708', '2\u6708', '3\u6708', '4\u6708', '5\u6708', '6\u6708', '7\u6708', '8\u6708', '9\u6708', '10\u6708', '11\u6708', '12\u6708'];
			return month_arr[num];
		};
		var year_and_month = function() {
			date_select_dom.find('.group_calendar_yymm span').html(con.select_year + '\u5e74\u000d\u000a' + num_to_cn_month(con.select_month));
		};
		var prev_month = function() {
			con.select_month = parseInt(con.select_month,10) - 1;
			if (con.select_month === 0) {
				con.select_year = parseInt(con.select_year,10) - 1;
				con.select_month = 12;
			}
			year_and_month();
		};
		var next_month = function() {
			con.select_month = parseInt(con.select_month,10) + 1;
			if (con.select_month > 12) {
				con.select_year = parseInt(con.select_year,10) + 1;
				con.select_month = 1;
			}
			year_and_month();
		};
		
		var init = function() {
			var html = '' +
				'<div class="group_calendar" id="' + date_select_id + '"">' +
					'<div class="group_calendar_yymm">' +
						'<div class="group_calendar_yymm_wrap">' +
							'<i class="prev" title="\u4e0a\u4e2a\u6708\u000d\u000a">&lt;</i>' +
							'<i class="next" title="\u4e0b\u4e2a\u6708">&gt;</i>' +
							'<span></span>' +
						'</div>' +
					'</div>' +
					'<div class="group_calendar_dd"></div>' +
				'</div>';
			$self.append(html);
			date_select_dom = $('#' + date_select_id);
			con.offset = date_select_dom.offset();
			con.select_year = con.cur_date[0];
			con.select_month = con.cur_date[1];
			con.select_day = con.cur_date[2];
			date_select_dom.find('.group_calendar_yymm .prev').click(function() {
				prev_month();
				day();
				get_day_dataset();
			});
			date_select_dom.find('.group_calendar_yymm .next').click(function() {
				next_month();
				day();
				get_day_dataset();
			});
			
			year_and_month();
			day();
			get_day_dataset();
		};
		init();
	});
};
