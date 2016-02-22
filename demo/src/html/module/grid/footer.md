#### 说明

- 下拉选项

	下拉选项的接口pageSizeOptions可选择设定的每页结果数，默认[10, 20, 50, 100, 200]，不显示时可设置null

- 统计文字描述

	统计文字的接口是countFont，默认设置为：每页显示：{{size}}条，当前显示从{{start}}到{{end}}，总{{count}}条 。

	其中，{{size}}为数据显示条数；{{start}}数据的开始索引；{{end}}数据的结束索引；{{count}}数据的总数。文字可以只有组合，但是大括号里面的不能修改，否则不能正确显示。

- 翻页事件

	翻页事件的接口是onPageFn

- 底部开关

	表格底部的开关接口是isPage，默认为true，为false以上设置都无效。

#### 调用方式

html:

	<div id="grid"></div>

js:

	var grid = nic.ui.grid({
		wrap:'#grid',
		data:{
			rows:[
				{
					id:1,
					name:'张三',
					type:'经理',
					sex:'男',
					tel:'13400000000',
					email:'zhangsan@a.com'
				},
			],
			total:1
		},
		pageSizeOptions:[10, 20, 50],
		countFont:'每页{{size}}条，从{{start}}到{{end}}，共{{count}}条 。',
		onPageFn:function(pageIndex, pageSize){
			console.log(pageIndex, pageSize)
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