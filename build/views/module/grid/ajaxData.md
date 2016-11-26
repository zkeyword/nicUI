#### 说明

ajax数据源的API是pageAjax，pageAjax是一个对象，里面有的属性跟jquery ajax的属性是一致的，其中data属性暂时不支持对象参数，只能支持字符串型的参数。

其中，pageIndex、pageSize各种的默认值是1，10，如果pageAjax存在，那么这两个参数也是pageAjax中data的一部分，直接传给服务器，不用在data重复设置，ajax发送到服务端的数据，效果示意图如下：

![ajax发送到服务器的数据](images/ajax_form_data.jpg)


#### 调用方式：

html:

	<div id="grid" class="fn-clear"></div>

js:

	var grid = nic.ui.grid({
		wrap:'#grid',
		pageAjax: {
			url: '/grid',
			data:'type=1&sex=man',
			//type: 'post',
			//beforeSend: function(){},
			//success: function(){},
			//error: function(){}
		},
		//pageIndex:1,
		//pageSize:10,
		columns: [
			{ display: '编码.', name: 'id', width: 50},
			{ display: '姓名', name: 'name', width: 50},
			{ display: '类别', name: 'type', width: 50},
			{ display: '性别', name: 'sex', width: 50},
			{ display: '电话', name: 'tel', width: 50},
			{ display: 'Email', name: 'email', width: 50}
		]
	});