#### 说明

该接口的是直接在tip容器中插入html，为了兼容原先的代码，还保留该接口，建议使用升级版render接口，更灵活。

#### 调用方式

html:

	<div id="lt-wrap">
		<div class="buyerMessagePop">鼠标移动到此</div>
	</div>

js:

	nic.ui.tip({
		target:'.buyerMessagePop',
		targetWrap:'#lt-wrap',
		width:100,
		html:'<div>这是一个提示！</div>'
	}); 