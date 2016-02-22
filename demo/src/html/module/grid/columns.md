#### 说明

- 可隐藏列
	
	可隐藏列的API是isHideColumns，由于isHideColumns用到cookie，需要用时请先给表格设置一个ID和columns的name不能重复，否则该功能将无效或异常。

- 重设列

	重设列的API是reSetColumns，其中，该接口的参数跟表格的columns的设置是一样的。

- 修改列名

	可隐藏列的API是changeHeaderText，其中该接口第一个参数为Number时Columns的引值，checkbox的不算；为string时是Columns的name，第二参数为要修改的文本。

- 获取列结构

	可隐藏列的API是getColumns，获取的结构与columns类似。