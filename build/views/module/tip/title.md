#### 说明

该接口的是直接在tip容器中插入鼠标经过的对象的自定义字符data-tip。

#### 调用方式

html:

	<div id="lt-wrap">
		<div data-tip="请速发货1！" class="buyerMessagePop">鼠标移动到此</div>
		<div data-tip="请速发货2！" class="buyerMessagePop">鼠标移动到此</div>
	</div>

js:

	nic.ui.tip({
		target:'.buyerMessagePop',
		targetWrap:'#lt-wrap',
		width:100
	}); 