#### 说明

静态数据的可以直接在页面上输出也可以通过文件，一般数据较为固定可以用这种方式，并减少请求。

#### 调用方式 ####

HTML:

	<input type="text" name="" id="suggestion" />

js:	

	$('#suggestion').suggestion({
		data:[{"id":978,"name":"韦斌谦"},{"id":944,"name":"唐青"}],
		touch: function(data){}
	}); 