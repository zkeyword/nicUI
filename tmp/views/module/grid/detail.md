## 功能未全...............

#### 说明

表格分组的API是detail，其中实现该功能必须在数据源有有一个children字段存放数据，而该API有两个值，一个是高度一个对detail进行渲染的事件。

#### 调用方式

html:

	<div id="grid" class="fn-clear"></div>

js:

	var grid = nic.ui.grid({
		wrap:'#grid',
		data:{
			rows:[
				{id:1,name:'xxx',children:[{id:1},{id:1},{id:1},{id:1}]},
				{id:1,name:'xxx2'},
				{id:1,name:'xxx3',children:[{id:1},{id:1},{id:1},{id:1}]},
				{id:1,name:'xxx4'},
				{id:1,name:'xxx5',children:[{id:1},{id:1},{id:1},{id:1}]},
				{id:1,name:'xxx6'},
				{id:1,name:'xxx7',children:[{id:1},{id:1},{id:1},{id:1}]},
				{id:1,name:'xxx8',children:[{id:1},{id:1},{id:1},{id:1}]},
				{id:1,name:'xxx9'},
				{id:1,name:'xxx10'},
				{id:1,name:'xxx11'},
				{id:1,name:'xxx12',children:[{id:1},{id:1},{id:1},{id:1}]},
				{id:1,name:'xxx13'},
				{id:1,name:'xxx14',children:[{id:1},{id:1},{id:1},{id:1}]},
				{id:1,name:'xxx15'},
				{id:1,name:'xxx16',children:[{id:1},{id:1},{id:1},{id:1}]},
				{id:1,name:'xxx17',children:[{id:1},{id:1},{id:1},{id:1}]},
				{id:1,name:'xxx18'},
				{id:1,name:'xxx19'}
			],
			total:20
		},
		columns: [
			{ display: '编码.', name: 'id', width: 50},
			{ display: '姓名', name: 'name', width: 50},
			{ display: '类别', name: 'type', width: 50},
			{ display: '性别', name: 'sex', width: 50},
			{ display: '电话', name: 'tel', width: 50},
			{ display: 'Email', name: 'email', width: 50}
		],
		detail:{
			height:'auto',
			render:function(rdata){
				if( rdata.children ){
					return rdata.children[0].id +'<br>sssssssssssss<br><br>';
				}
				return '暂无数据';
			}
		}
	});