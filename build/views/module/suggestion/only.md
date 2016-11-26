#### 说明

一次性调用一般的数据也是较为固定，只有在页面但是只有在表单获取焦点后才会请求数据，适用于数据量较少的场景，由于筛选是在前端做的，这样可以减少多次请求而产生是的压力。

#### 调用方式 ####

HTML:

	<input type="text" name="" id="suggestion" />

js:	

	$('#suggestion').suggestion({
		 ajax:{
			url: '/common/search_travelagency',
			success: function(data){}
		},
		touch: function(data){}
	}); 