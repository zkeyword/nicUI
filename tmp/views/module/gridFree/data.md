#### 调用方式 ####

html:

	<div id="grid" class="fn-clear"></div>
	
js:

	var gridFree = nic.ui.gridFree({
		template: 'gridHtml',
		templateRender: [{
			name: 'dateFormat',
			handle: function(date, format){
				return new Date(date*1000).format(format);
			}
		}],
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
			<th>名称</th>
			<th>email</th>
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