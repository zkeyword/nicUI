#### 调用方式 ####

html:

	<div id="grid" class="fn-clear"></div>
	
js:

	var gridFree = nic.ui.gridFree({
		template: 'gridHtml',
		wrap:'grid',
		pageAjax:{
			url: '/grid',
			success:function(data){}
		}
	});
	
template:

	<table>
		<tr>
			<th>ID</th>
			<th>姓名</th>
			<th>email</th>
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
	
