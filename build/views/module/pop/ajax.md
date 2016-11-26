#### 说明

ajax方式的API是ajax，另外还有ajaxType、ajaxData、async等三个接口配合使用，分别是ajax的type、data、async。

#### 调用方式

html:

	<a href="javascript:;" id="addPop">点击我，动态创建一个弹窗</a>

js:

	$('#addPop').on('click', function(){
		var pop = nic.ui.pop({
			title:'弹窗的标题',
			height:240,
			width:320,
			ajax:'./ajax-inner.html',
			async:false,
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
	})