#### 说明

修改窗体大小的API的modifyWrap，使用时需要传入width、height。

#### 调用方式

htm:
	
	<a href="javascript:;" id="addPop">点击我，动态创建一个弹窗</a>

js:

	$('#addPop').on('click', function(){
		var html = '<div>这个是一个pop弹出框，<a href="javascript:;" id="modifyWrap">点击弹框大小</a></div>';

		var pop = nic.ui.pop({
			title: '弹窗的标题',
			height: 240,
			width: 320,
			html: html,
			onloadFn: function(){
				$('#modifyWrap').on('click', function(){
					pop.modifyWrap(400, 400);
				});
			},
			btns:[
				{
					text:'确定',
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