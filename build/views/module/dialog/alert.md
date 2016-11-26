#### 说明

dialog alert的API是alert，需要注意的是该功能是模拟原生代码的alert，不具备原生的alert阻断代码的功能，如果要实现类似是功能，请在alert的按钮回调函数里面实现。

#### 调用方式

html:

	<a href="javascript:;" id="addAlert">点击我，动态创建一个alert对话框</a>

js:

	$('#addAlert').on('click', function(){
		nic.ui.dialog.alert({
			title:"提示信息",
			text:"保存成功!",
			ok:function(){
			}
		});
	});	
