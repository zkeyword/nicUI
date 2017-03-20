#### 说明

由于控件是用模板来表现表格的，所有并没有封装全选功能，但是利用该控件提供的api也可以实现该项需求，详细的请看调用方式的js部分。

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
		},
		// 表格请求数据成功后、DOM结构渲染前执行，返回选中数据
		before: function(){
			return gridFree.getRowSelected(); // 获取选中数据
		},
		// 表格DOM结构渲染后
		after: function(){
			var wrap        = $('#grid'),
				item        = wrap.find('input[name="id[]"]'),
				checked     = wrap.find('input[name="id[]"]:checked'),
				allCheckbox = wrap.find('input[name="all"]'),
				pageSize    = gridFree.getPageSize();

			// 当前页所有checkbox全部选中后
			if( checked.length === pageSize ) allCheckbox.prop('checked', true);

			// 单选
			item.on('change', function(){
				var that      = $(this),
					i         = Number( that.attr('data-index') ),
					isChecked = that.prop('checked');

				if( isChecked ){
					gridFree.setRowSelected( gridFree.getRowData(i) ); // 设置选中数据
				}else{
					gridFree.delRowSelected( gridFree.getRowData(i) ); // 删除选中数据
				}
			});

			// 全选
			allCheckbox.on('change', function(){
				var that      = $(this),
					isChecked = that.prop('checked');

				for (var i = 0; i < pageSize; i++) {
					if( isChecked ){
						gridFree.setRowSelected( gridFree.getRowData(i) ); // 设置选中数据
						item.prop('checked', true);
					}else{
						gridFree.delRowSelected( gridFree.getRowData(i) ); // 删除选中数据
						item.prop('checked', false);
					}
				};
			});
		}
	});
	
template:

	<table>
		<tr>
			<th><input type="checkbox" name="all" /></th>
			<th>ID</th>
			<th>姓名</th>
			<th>email</th>
			<th>地址</th>
			<th>添加时间</th>
		</tr>
		{{each rows as item i}}
			<tr>
				<td><input 
						type="checkbox" 
						name="id[]" 
						value="{{item.id}}" 
						data-index="{{i}}" 
						{{each selectedData as selected j}}
							{{if selected.id === item.id}}
								checked="checked"
							{{/if}}
						{{/each}}
					/>
				</td>
				<td>{{item.id}}</td>
				<td>{{item.name}}</td>
				<td>{{item.email}}</td>
				<td>{{item.address}}</td>
				<td>{{item.time}}</td>
			</tr>
		{{/each}}
	</table>