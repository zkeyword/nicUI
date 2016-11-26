#### 说明

html方式的API是html，只要是字符即可，若html标签不完整，会影响显示效果。

#### 调用方式

html:

	<a href="javascript:;" id="addPop">点击我，动态创建一个弹窗</a>

js:

	$('#addPop').on('click', function(){
		var html = '<div>这个是一个pop弹出框</div>';

		var pop = nic.ui.pop({
			title:'弹窗的标题',
			height:240,
			width:320,
			html:html,
			btns:[
				{
					text:'保存修改',
					closePop:false,
					onclick:function(id){
						alert('保存修改')
						pop.close(id);
					}
				},
				{
					text:'取消',
					onclick:function(){
			
					}
				}
			]
		});
	});	



