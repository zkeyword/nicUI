#### 调用方式 ####

html:

	<div id="grid" class="fn-clear"></div>
	
js:

	var gridFree = nic.ui.gridFree({
		template: 'grid',
		wrap:'grid',
		pageAjax:{
			url: '/grid',
			success:function(data){}
		}
	});
	
	/* 排序当前页 */
	$('body').on('click', '#name', function(){
		gridFree.sort({
			sort: 'name'
		})
	});
	
	/* 排序ajax */
	$('body').on('click', '#email', function(){
		gridFree.sort({
			isSortCurrent: false,
			sort: 'email'
		})
	});	
	
template:

	<table>
		<tr>
			<th>ID</th>
			<th id="name">名称(点击排序)</th>
			<th id="email">email(点击排序)</th>
			<th>姓名</th>
			<th>地址</th>
			<th>添加时间</th>
		</tr>
		{{each rows as item i}}
			<tr>
				<td>{{item.id}}</td>
				<td>{{item.name}}</td>
				<td>{{item.email}}</td>
				<td>{{item.address}}</td>
				<td>{{item.time}}</td>
			</tr>
		{{/each}}
	</table>
