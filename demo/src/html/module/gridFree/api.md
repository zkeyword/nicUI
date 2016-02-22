## 依赖 ##

gridFree的模板引擎是依赖于artTemplate，具体语法请参照 http://aui.github.io/artTemplate/

## 实例化前参数说明 ##

- template 模板ID默认为null，必填参数
 
- nullTemplate 数据为空时的模板ID默认为null
 
- wrap 表格实例化后插入位置
 
- pageIndex 初始化页码默认为1
 
- pageSize 每页显示的条数默认为10
 
- pageSizeOptions 可选择设定的每页结果数默认为[10, 20, 50, 100, 200] 
 
- pageAjax ajax数据源配置用法和jquery的ajax api一样
 
- isShowLoading 是否显示loading效果默认为true
 
- onRowFn 点击行事件

- bottomBtns 底部按钮

- before 模板渲染前

- after 模板渲染后

#### 配置实例： ####
	
	var gridFree = nic.ui.gridFree({
		template: 'gridHtml',
		templateRender: [{
			name: 'addPre',
			handle: function(str, pre){
				return pre + str;
			}
		}],
		wrap:'grid',
		pageAjax:{
			url: '/grid',
			success:function(data){}
		}
	});


## 实例化后 ##

#### object.refresh() 刷新表格数据 ####

参数：
	
	{String} name 要比较的的字段
	{String} sortType 排序裂隙

返回值：Object

	
#### object.sort() 排序 ####

参数：
	
	{String} options.sort 要比较的的字段
	{String} options.sortType 排序类型
	{Boolean} options.isSortCurrent 是否排序当前页的数据，默认为true，只按字符串大小排序，设置为false时，这进行ajax排序
	{Function} options.callback 排序后的回调函数

返回值：Object

	
#### object.getPageIndex() 获取页码 ####

返回值：Number 


#### object.getPageSize() 获取每页最多显示数量 ####

返回值：Number 


#### object.getCurrentData() 获取当前页数据 ####

返回值：Object 


### object.getRowData() 获取行数据 ###

参数：Number 当前页的行索引

返回值：Object 


#### object.getRowSelected() 获取选中数据

返回值：Array 


#### object.delRowSelected() 删除选中数据

参数：

	{Object} 需要删除的行对象数据

返回值：Array 


#### object.setRowSelected() 设置选中数据

参数：{Object} 需要设置的行对象数据

返回值：Array



