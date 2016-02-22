(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.suggestion = factory();
    }
}(this, function (){

    var defaults      = null,
        suggestion    = function(defaults, self, selfIndex){
            var width          = defaults.width,
                ajax           = defaults.ajax,
				isTouchRequest = defaults.isTouchRequest,
                allData        = [],
                filterData     = [],
                isClose        = true,
				selfName       = self.attr('name'),
                selfHeight     = self.outerHeight(),
                selfWidth      = width ? width : self.outerWidth(),
				name           = defaults.name.length ? (defaults.name[selfIndex] ? defaults.name[selfIndex] : selfName + 'Hidden') : selfName + 'Hidden',
				value          = defaults.value.length ? (defaults.value[selfIndex] ? defaults.value[selfIndex] : '') : '',
                parent         = self.wrap('<div class="l-suggestion fn-left"></div>')
									.parent()
									.append('<input type="hidden" name="'+ name +'" value="'+ value +'" /><ul class="l-suggestion-list" data-index="0" style="display:none"></ul>'),
                listWrap       = parent.find('.l-suggestion-list'),
				hiddenInput    = parent.find('input:hidden'),
                createList     = function(data){
									var html       = '',
										item       = null,
										itemNation = '',
										itemName   = '',
										itemLetter = '',
										itemId     = '';

									filterData = data;

									for(var i = 0, len = data.length; i < len && i < 10; i++){
										item       = data[i];
										itemNation = item.nation ?  '('+ item.nation +')' : '';
										itemName   = item.name ? item.name : '';
										itemLetter = item.letter ? item.letter : '';
										itemId     = item.id ? item.id : '';
										html += '<li class="fn-clear" data-index="'+ i +'" data-id="'+ itemId +'"><span class="fn-left">'+ item.name + itemNation +'</span><span class="fn-right">'+ itemLetter +'</span></li>'
									}

									listWrap
										.css({
											top: selfHeight + 'px',
											width: selfWidth - 2 + 'px',
											zIndex: 2
										})
										.html(html);
								},
                keymove        = function(isDown){
									var item = listWrap.find('li'),
										len  = item.length;
									if( isDown ){
										var index = listWrap.attr('data-index') == len ? 0 : listWrap.attr('data-index');
										item.eq(index).addClass('cur');
										index ++;
										listWrap.attr('data-index', index);
									}else{
										var index = listWrap.attr('data-index') == 0 ? len : listWrap.attr('data-index');
										index --;
										item.eq(index).addClass('cur');
										listWrap.attr('data-index', index);
									}
								},
                showFn         = function(e){
									var input = $(e.currentTarget),
										val   = input.val(),
										code  = e.keyCode,
										index = 0,
										data = [],
										item = null,
										str  = '';
									
									if( isTouchRequest ){
										data = allData;
									}else{
										for(var i = 0, len = allData.length; i<len; i++){
											item = allData[i];
											str  = (item.name ? item.name : '') + (item.letter ? item.letter : '') + (item.nation ? item.nation : '');
											if( str.indexOf(val) !== -1 ){
												data.push(item);
											}
										}
									}

									createList(data);
									listWrap.show();

									switch( code ){
										case 40: //向下
											keymove(true);
											e.preventDefault();
											break;

										case 38: //向上
											keymove(false);
											e.preventDefault();
											break;

										case 13: //回车
											index = listWrap.attr('data-index');
											index = index > 0 ? index - 1 : 0;
											enterEvent(data[index], input);
											e.preventDefault();
											closeFn();
											break;

										default:
											listWrap.attr('data-index', 0);
									}
								},
                closeFn        = function(){
									listWrap
										.hide()
										.html('')
										.attr('index', 0)
										.css({
											zIndex: 1
										});
									isClose = true;
									
								},
				enterEvent     = function(data, target){
									hiddenInput.val(data.id);
									target.val(data.name ? data.name : '');
									defaults.touch.apply(self, [data]);
								},
                init           = function(data, callback){
									if( isTouchRequest ){
										if(!ajax.data){
											ajax.data = {};
										}
										ajax.data.keyword = self.val();
										$.ajax({
											type: ajax.type,
											url: ajax.url,
											cache: false,
											dataType: 'json',
											data: ajax.data,
											beforeSend: function(){},
											success: function(data){
												callback();
												allData = data;
												createList(data);
											},
											error: function(data){}
										});
									}else if( !data && ajax){
										if( !allData.length ){
											$.ajax({
												type: ajax.type,
												url: ajax.url,
												cache: false,
												dataType: 'json',
												data: ajax.data,
												beforeSend: function(){},
												success: function(data){
													allData = data;
													createList(data);
												},
												error: function(data){}
											});
										}
									}else{
										allData = data;
										createList(data);
									}
								};

            self.attr('autocomplete', 'off')
				.off()
                .on('focus', function(e){
                    if( isTouchRequest ){
						init(defaults.data, function(){
							showFn(e);
						});
						return;
					}else{
						init(defaults.data);
					}
                    showFn(e);
                })
                .on('blur', function(){
                    isClose && closeFn();
					if( !filterData.length && defaults.isResultNullBlurClear ) self.val('');
                })
                .on('keyup', function(e){
					var code = e.keyCode;
					if( isTouchRequest ){
						if( code !== 40 && code !== 38 && code !== 13 ){
							init(defaults.data, function(){
								showFn(e);
							});
						}else{
							showFn(e);
						}
						return;
					}
                    showFn(e);
                });

            listWrap
                .off()
                .on('click', 'li', function(e){
                    var index = listWrap.attr('data-index');
					enterEvent(filterData[index], self);
                    closeFn();
                })
                .on('mouseover', 'li', function(){
                    var that  = $(this)
                    that.addClass('cur');
                    isClose = false;
                    listWrap.attr('data-index', that.attr('data-index'));
                })
                .on('mouseout', 'li', function(){
                    var that  = $(this)
                    that.removeClass('cur');
                    isClose = true;
                    listWrap.attr('data-index', that.attr('data-index'));
                });
        }

    $.fn.refreshSuggestion = function(){
        this.each(function() {
            suggestion(defaults, $(this));
        });
    }

    $.fn.suggestion = function(options){
        defaults = $.extend({}, {
            data: null,
            width: 0,
            name: [],
			value: [],
            ajax: {
                url: '',
                type:'GET',
				data:{},
                success: function(){}
            },
			isTouchRequest: false,       //是否触发就请求数据，为true是时ajax.url必须存在。
			isResultNullBlurClear: true, //结果为空是否blur后清除。
            touch: function(){}
        }, options);

        this.each(function(i) {
            suggestion(defaults, $(this), i);
        });
    }

}));