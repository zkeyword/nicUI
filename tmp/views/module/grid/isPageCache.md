#### 说明

ajax翻页缓存的API是isPageCache，默认值为true，表格设计是考虑到ajax请求的效率，点击翻页的时候直接将改页的数据缓存，不需要时设置false即可。

#### 调用方式

	var grid = nic.ui.grid({
		wrap:'#grid',
		pageAjax: {
			url: '/grid'
		},
		isPageCache:true,
		columns: [
			{ display: '编码.', name: 'id', width: 50},
			{ display: '姓名', name: 'name', width: 50},
			{ display: '类别', name: 'type', width: 50},
			{ display: '性别', name: 'sex', width: 50},
			{ display: '电话', name: 'tel', width: 50},
			{ display: 'Email', name: 'email', width: 50}
		]
	});