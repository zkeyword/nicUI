#### 说明

多次请求数据量比较大的时候，可以用这种方式调用，即每一次keyup后都会请求数据。

#### 调用方式 ####

HTML:

	<input type="text" name="" id="suggestion" />

js:	

	$('#suggestion').suggestion({
		 ajax:{
			url: '/common/search_travelagency',
			success: function(data){}
		},
		isTouchRequest: true,
		touch: function(data){}
	}); 