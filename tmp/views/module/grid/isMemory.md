#### 说明

- 复选框接接口isMemory

可以不写，值默认是false，这个记忆只能限于当前页面还没刷新时表格翻页，页面刷新之后之前记住的选项将失效。

- 获取已选的接口getSelectDat

该接口必须等表格对象生成之后才能使用，获取的数据格式与表格请求的数据格式是一直到

#### 调用方式

	var grid = nic.ui.grid({
		wrap:'#grid',
		pageAjax: {
			url: '/grid'
		},
		isMemory: true,
		columns: [
			{ display: '编码.', name: 'id', width: 50},
			{ display: '姓名', name: 'name', width: 50},
			{ display: '类别', name: 'type', width: 50},
			{ display: '性别', name: 'sex', width: 50},
			{ display: '电话', name: 'tel', width: 50},
			{ display: 'Email', name: 'email', width: 50}
		]
	});

	console.log(grid.getSelectData());
