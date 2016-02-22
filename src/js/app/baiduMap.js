(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.baiduMap = factory();
	}
}(this, function (){
	
	var BaiduMap = function(options){
		
		// 百度地图API功能	
		var map        = new BMap.Map(options.target),
			data       = options.point,
			opts       = options.pointWindow,
			pointClick = options.pointClick ? options.pointClick : null,
			markerArr  = [],
			pointArr   = [],
			contentArr = [],
			fnInfo 	   = function(map, content, marker, point, i){
							marker.addEventListener("click", function(e){
								map.openInfoWindow(new BMap.InfoWindow(content, opts), point); //开启信息窗口
								if( Object.prototype.toString.call(pointClick) === "[object Function]" ){
									pointClick(i);
								}
							});
						}
					
		map.centerAndZoom(new BMap.Point(options.basePoint[0], options.basePoint[1]), options.zoom);

		for(var i=0; i<data.length; i++){
			var point   = new BMap.Point( data[i][0], data[i][1] ),
				myIcon  = new BMap.Icon( '/static/asset/dest/img/map/'+ (i+1) +'.png', new BMap.Size(18,26) ),
				marker  = new BMap.Marker( point, {icon:myIcon, width:300} ),  // 创建标注
				content = data[i][2];
				
			map.addOverlay(marker); // 将标注添加到地图中
			
			markerArr.push(marker);
			pointArr.push(point);
			contentArr.push(content);
			
			fnInfo(map, content, marker, point, i);
		}
		
		this.map     = map;
		this.marker  = markerArr;
		this.point   = pointArr;
		this.opts    = opts;
		this.content = contentArr;
	};
	
	BaiduMap.prototype.setAnimation = function(i){
		var map        = this.map,
			markerArr  = this.marker,
			pointArr   = this.point,
			contentArr = this.content,
			marker     = markerArr[i],
			point      = pointArr[i],
			content    = contentArr[i],
			opts       = this.opts,
			show       = false,
			stop       = function(){
							for(var i = 0,len = markerArr.length; i<len; i++){
								markerArr[i].setAnimation();
								show = false;
							}
							map.closeInfoWindow();
						},
			animation   = function(){
							if( !show ){
								show = true;
								stop();
								marker.setAnimation(BMAP_ANIMATION_BOUNCE);
							}else{
								marker.setAnimation();
								show = false;
							}
							
							//setTimeout(stop, 5000);
							
							//map.openInfoWindow(new BMap.InfoWindow(content, opts), point); //开启信息窗口
						};
		return animation();
	};
	
	BaiduMap.prototype.setZoom = function(lat, lng, num){
		this.map.setCenter( new BMap.Point(lat, lng) );
		this.map.setZoom(num);
	};
	
	BaiduMap.prototype.click = function(dom, i){
		var that = this;
		dom.onclick = function(){
			that.setAnimation(i);
		};
	};

	return function(o){
		return o ? new BaiduMap(o) : {};
	};
	
}));