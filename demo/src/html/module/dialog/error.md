#### 说明

dialog confirm的API是confirm，需要注意的是该功能是模拟原生代码的confirm，不具备原生的confirm阻断代码的功能，如果要实现类似是功能，请在confirm的按钮回调函数里面实现。

#### 调用方式

html:

	<a href="javascript:;" id="addError">点击我，动态创建一个error对话框</a>

js:

	$('#addError').on('click', function(){
		nic.ui.dialog.error({
			title:"提示信息",
			text:"保存出错，请确认！",
			no:function(){
				alert('取消');
			}
		});
	});
