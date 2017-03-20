#### 说明

- 宽度自适应

	宽度自适应时，只要将width设置成'auto'或者不设置就可以了，其中，columns的width数值将是占比，表格外框的大小变化时，表格也会跟着变。

- 最小宽度
	
	表格最小宽度时，只要将width设置一个值，当columns的width总和小于表格外框的宽度或最小宽度大于表格外框的宽度时宽度将自适应，表格外框的大小变化时，表格也会跟着变，否则表格将根据columns的width设置，调整成为固定宽度。

- 固定宽度

	表格固定宽度的API是isFixedWidth，默认为false，为true时，width必须是数字。


<div class="block">
	<h2>应用代码(宽度自适应)：</h2>
<pre>
var grid = nic.ui.grid({
	wrap:'#grid1',
	pageAjax: {
		url: 'http://127.0.0.1/nic/doc/tmp/grid.php',
		data:'type=1&sex=man'
	},
	columns: [
		{ display: '编码.', name: 'id', width: 250},
		{ display: '姓名', name: 'name', width: 250},
		{ display: '类别', name: 'type', width: 250},
		{ display: '性别', name: 'sex', width: 250},
		{ display: '电话', name: 'tel', width: 250},
		{ display: 'Email', name: 'email', width: 250}
	]
});

</pre>
</div>

<div class="block">
	<h2>调用后效果(宽度自适应)：</h2>
	<div id="grid1"></div>
</div>

<div class="block">
	<h2>应用代码(最小宽度)：</h2>
<pre>
var grid = nic.ui.grid({
	wrap:'#grid1',
	pageAjax: {
		url: 'http://127.0.0.1/nic/doc/tmp/grid.php',
		data:'type=1&sex=man'
	},
	width:500,
	columns: [
		{ display: '编码.', name: 'id', width: 250},
		{ display: '姓名', name: 'name', width: 250},
		{ display: '类别', name: 'type', width: 250},
		{ display: '性别', name: 'sex', width: 250},
		{ display: '电话', name: 'tel', width: 250},
		{ display: 'Email', name: 'email', width: 250}
	]
});

</pre>
</div>

<div class="block">
	<h2>调用后效果(最小宽度)：</h2>
	<div id="grid2"></div>
</div>

<div class="block">
	<h2>应用代码(固定宽度)：</h2>
<pre>
var grid = nic.ui.grid({
	wrap:'#grid1',
	pageAjax: {
		url: 'http://127.0.0.1/nic/doc/tmp/grid.php',
		data:'type=1&sex=man'
	},
	width:500,
	isFixedWidth:true,
	columns: [
		{ display: '编码.', name: 'id', width: 250},
		{ display: '姓名', name: 'name', width: 250},
		{ display: '类别', name: 'type', width: 250},
		{ display: '性别', name: 'sex', width: 250},
		{ display: '电话', name: 'tel', width: 250},
		{ display: 'Email', name: 'email', width: 250}
	]
});

</pre>
</div>

<div class="block">
	<h2>调用后效果(固定宽度)：</h2>
	<div id="grid3"></div>
</div>
<script>
require(['app/main'], function(nic){

	var grid1 = nic.ui.grid({
		wrap:'#grid1',
		pageAjax: {
			url: 'http://127.0.0.1/nic/doc/tmp/grid.php',
			data:'type=1&sex=man'
		},
		columns: [
			{ display: '编码.', name: 'id', width: 250},
			{ display: '姓名', name: 'name', width: 250},
			{ display: '类别', name: 'type', width: 250},
			{ display: '性别', name: 'sex', width: 250},
			{ display: '电话', name: 'tel', width: 250},
			{ display: 'Email', name: 'email', width: 250}
		]
	});
	
	var grid2 = nic.ui.grid({
		wrap:'#grid2',
		pageAjax: {
			url: 'http://127.0.0.1/nic/doc/tmp/grid.php',
			data:'type=1&sex=man'
		},
		width:500,
		columns: [
			{ display: '编码.', name: 'id', width: 250},
			{ display: '姓名', name: 'name', width: 250},
			{ display: '类别', name: 'type', width: 250},
			{ display: '性别', name: 'sex', width: 250},
			{ display: '电话', name: 'tel', width: 250},
			{ display: 'Email', name: 'email', width: 250}
		]
	});
	
	var grid3 = nic.ui.grid({
		wrap:'#grid3',
		pageAjax: {
			url: 'http://127.0.0.1/nic/doc/tmp/grid.php',
			data:'type=1&sex=man'
		},
		width:500,
		isFixedWidth:true,
		columns: [
			{ display: '编码.', name: 'id', width: 250},
			{ display: '姓名', name: 'name', width: 250},
			{ display: '类别', name: 'type', width: 250},
			{ display: '性别', name: 'sex', width: 250},
			{ display: '电话', name: 'tel', width: 250},
			{ display: 'Email', name: 'email', width: 250}
		]
	});
});
</script>