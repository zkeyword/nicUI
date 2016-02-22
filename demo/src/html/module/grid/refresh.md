#### 说明

刷新表格的API是refresh，该API必须在表格对象生成之后才能使用，下面实例是将静态数据源刷新成ajax数据源。refresh的参数设置是跟表格的设置是一样的，没有设置的参数则保留原来的设置。刷新时要指定pageIndex，需把refreshIndex置为true。

#### 调用方式

html:

	<div id="grid"></div>
	<a href="#" class="ui-btn ui-btnMain" id="refresh">点击刷新表格</a>

js:

	var staticData = {
		/*json格式的数据行*/
		rows:[
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'},
			{id:1,name:'张三',type:'经理',sex:'男',tel:'13400000000',email:'zhangsan@a.com'}
		],
		/* 该数据源的总条数 */
		total:20 
	};
	
	var grid = nic.ui.grid({
		wrap:'#grid',
		data: staticData,
		columns: [
			{ display: '编码.', name: 'id', width: 50},
			{ display: '姓名', name: 'name', width: 50},
			{ display: '类别', name: 'type', width: 50},
			{ display: '性别', name: 'sex', width: 50},
			{ display: '电话', name: 'tel', width: 50},
			{ display: 'Email', name: 'email', width: 50}
		]
	});
	
	$('#refresh').click(function(){
		grid.refresh({
			pageAjax: {
				url: '/grid',
				data:'type=1&sex=man'
			}
		});
		return false;
	});