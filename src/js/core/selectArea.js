'use strict';

/**
* nic.ui.selectArea 地区控件
* @class nic.ui.selectArea
* @author norion.z
* @blog http://zkeyword.com/
* @param {Object} options selectArea参数
* @param {Object} options.data 数据源
* @param {Object} options.initValue 初始值
* @param {String} options.initValue.province 省级初始值
* @param {String} options.initValue.city 市级初始值
* @param {String} options.initValue.county 区、县级初始值
* @param {String} options.province 省级对象选择器
* @param {String} options.city 市级对象选择器
* @param {String} options.county 区、县级对象选择器
*/
var nic        = require('./nic'),
	selectArea = function(options){
		var data         = options.data ? options.data : [],
			initValue    = options.initValue ? options.initValue : {province:'',city:'',county:''},
			provinceWrap = $(options.province),
			cityWrap     = $(options.city),
			countyWrap   = $(options.county),
			html         = '<option value="">不限</option>',
			g            = this,
			_core        = {
				getProvince: function(){
					var i = 0,
						l = data.length,
						s = '',
						o = this;
					
					s += html;
					
					for(; i < l; i++){
						if( data[i].Province === initValue.province ){
							s += '<option selected value="'+ data[i].Province +'" data-index="'+ i +'">'+ data[i].ProvinceName +'</option>';
							o.getCity(i);
						}else{
							s += '<option value="'+ data[i].Province +'" data-index="'+ i +'">'+ data[i].ProvinceName +'</option>';
						}
					}
					provinceWrap.html(s);
					provinceWrap.on('change', function(e){
						var that     = $(this),
							val      = that.val(),
							selected = that.find('option:selected'),
							text     = selected.text(),
							index    = selected.attr('data-index');

						o.getCity(Number(index));
						o.getcounty();
					});
				},
				
				getCity: function(index){
					if( data[index] !== undefined ){
						var s        = '',
							cityData = data[index],
							o        = this,
							i        = 0, 
							c 		 = cityData.CityArray ? cityData.CityArray.length : 0;

						s += html;
						for(; i < c; i++){
							if( cityData.CityArray[i].City === initValue.city ){
								s += '<option selected value="'+cityData.CityArray[i].City+'" data-index="'+ i +'">'+ cityData.CityArray[i].CityName +'</option>';
								o.getcounty(cityData.CityArray[i]);
							}else{
								s += '<option value="'+cityData.CityArray[i].City+'" data-index="'+ i +'">'+ cityData.CityArray[i].CityName +'</option>';
							}
						}
						cityWrap.html(s);
						cityWrap.on('change', function(e){
							var that     = $(this),
								val      = that.val(),
								selected = that.find('option:selected'),
								text     = selected.text(),
								index    = selected.attr('data-index');
							o.getcounty(cityData.CityArray[Number(index)]);
						});
					}else{
						cityWrap.html(html);
					}
				},
				
				getcounty: function(data){
					if( data !== undefined ){
						var s = '',
							o = this,
							i = 0,
							c = data.CountyArray ? data.CountyArray.length : 0;
						
						s += html;
					    for(; i < c; i++){
					    	if( data.CountyArray[i].County === initValue.county ){
							    s += '<option selected value="'+data.CountyArray[i].County+'" data-index="'+ i +'">'+ data.CountyArray[i].CountyName +'</option>';
					    	}else{
							    s += '<option value="'+data.CountyArray[i].County+'" data-index="'+ i +'">'+ data.CountyArray[i].CountyName +'</option>';
					    	}
					    }
					    countyWrap.html(s);
					}else{
						countyWrap.html(html);
					}
				},
				
				init: function(){
					provinceWrap.html(html);
					cityWrap.html(html);
					countyWrap.html(html);
				},
				
				run: function(){
					this.init();
					this.getProvince();
					return g;
				}
			};
		
		_core.run();
		
		/**
		* selectArea 重置
		* @method nic.ui.selectArea.reset
		* @return {Object} 
		*/
		g.reset = function(){
			cityWrap.html(html);
			countyWrap.html(html);
			provinceWrap.find('option').eq(0).attr('selected', true);
			cityWrap.find('option').eq(0).attr('selected', true);
			countyWrap.find('option').eq(0).attr('selected', true);
			
			return g;
		};
		
	};
	
module.exports = function(o){
	if( !o ){
		return {};
	}
	return new selectArea(o);
};

