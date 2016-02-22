## 实例化前参数说明 ##

- id 弹出窗ID

- titleId 标题ID

- title 弹出框的标题

- width 弹出框内部的宽，不包括边框的宽度

- height 弹出框内部的高，不包括边框的高度

- top 弹出框的top

- left 弹出框的left

- cls 定义class

- url 用iframe方式加载

- ajax 用ajax方式加载

- ajaxType ajax请求类型

- ajaxData ajax请求条件

- async ajax同步方式

- html 用html方式加载

- onloadFn 载入完成后要触发的事件

- closeFn 关闭时要触发的事件

- btns 弹出框的按钮集合

- btns.onclick 点击按钮要执行的动作，如果要执行一些异步的动作，closePop必须是false

- btns.closePop 点击按钮之后是否直接关闭弹出框，默认直接关闭

- btns.cls 按钮自定义class

- btns.text 按钮文本

- isMask 是否允许遮罩,默认true

- isMaskClose 是否点击遮罩关闭,默认false

- allowClose 允许关闭,默认true

- allowEscClose 允许esc关闭,默认true

- isDrag 允许拖拽,默认true

#### 配置实例： ####
	
	var pop = nic.ui.pop({
		title:'弹窗的标题',
		height:240,
		width:320,
		html:'弹窗内容',
		btns:[
			{
				text:'保存修改',
				closePop:false,
				onclick:function(id){}
			},
			{
				text:'取消',
				onclick:function(){}
			}
		]
	});

## 实例化后 ##

#### object.close() 关闭弹窗 ####

参数：
	
	{String} id 要关闭弹窗的ID，非必填


#### object.modifyTitle() 修改标题

参数：
	
	{String} title 要修改的标题

返回值：Object 


#### object.modifyBtns() 修改按钮

参数：

	{Object} btns 要修改的按钮对象，格式和实例化前的配置一样

返回值：Object 


#### object.modifyWrap() 修改容器大小

参数：

	{Number} width 容器的宽度

	{Number} height 容器高度

返回值：Object 


