#### 说明

- isAuto 自动切换的api是isAuto，默认是false。

- autoTime 自动切换的时间间隔，默认是2s，isAuto为true时该设置才有效。


#### 调用方式

html:

	<ul id="tabUl" class="tab fn-clear">
		<li class="on"><a href="javascript:void(0);">选项一</a></li>
		<li><a href="javascript:void(0);">选项二</a></li>
		<li><a href="javascript:void(0);">选项三</a></li>
	</ul>
	<div id="tabWrap">
		<div class="tab-main">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
		<div class="tab-main fn-hide">内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2</div>
		<div class="tab-main fn-hide">内容3内容3内容3内容3内容3内容3内容3内容3内容3内容3内容3内容3内容3内容3</div>
	</div>

js:

	nic.ui.tab({
		tabItem:'#tabUl li',
		tabWrap:'#tabWrap .tab-main',
		isAuto:true,
		autoTime:500
	});