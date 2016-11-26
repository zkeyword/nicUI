#### 说明

获取已选的API是getSelectData，该接口获取到的数据和请求的数据格式是一直的，需要记住翻页已选的情况，请配合isMemory接口使用。

#### 调用方式

html:

	<div id="grid" class="fn-clear"></div>
	
js:

	var grid = nic.ui.grid({
		wrap:'#grid',
		pageAjax: {
			url: '/grid',
			data:'type=1&sex=man'
		},
		columns: [
			{ display: '编码.', name: 'id', width: 50},
			{ display: '姓名', name: 'name', width: 50},
			{ display: '类别', name: 'type', width: 50},
			{ display: '性别', name: 'sex', width: 50},
			{ display: '电话', name: 'tel', width: 50},
			{ display: 'Email', name: 'email', width: 50}
		]
	});

	$('#getSelectData').on('click', function(){
		console.log(grid.getSelectData());
	});