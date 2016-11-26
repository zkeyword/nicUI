#### 说明

静态数据的API是data，如果有ajax数据源存在，这个API将无效，其中数据源的数据必须包含rows和total

#### 调用方式

html:

	<div id="grid"></div>

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