#### 调用方式

html:

	<div id="grid" class="fn-clear"></div>

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
		checkbox:true,
		columns: [
			{ display: '编码.', name: 'id', width: 50},
			{ display: '姓名', name: 'name', width: 50},
			{ display: '类别', name: 'type', width: 50},
			{ display: '性别', name: 'sex', width: 50},
			{ display: '电话', name: 'tel', width: 50},
			{ display: 'Email', name: 'email', width: 50}
		]
	});