#### 调用方式 ####

html:
	<a href="javascript:;" id="refresh">刷新表格</a>
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
	
	$('#refresh').onclick(function(){
		gridFree.refresh({
			pageAjax:{
				data:{
					keyword: 'keyword'
				}
			}
		})
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