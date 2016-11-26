#### 说明

修改窗体标题的API的modifyTitle，使用时需要传入要修改的字符。


#### 调用方式

html:

	<a href="javascript:;" id="addPop">点击我，动态创建一个弹窗</a>

js:

	$('#addPop').on('click', function(){
		var html = '<div>这个是一个pop弹出框，<a href="javascript:;" id="modifyTitle">点击弹框标题</a></div>';

		var pop = nic.ui.pop({
			title: '弹窗的标题',
			height: 240,
			width: 320,
			html: html,
			onloadFn: function(){
				$('#modifyTitle').on('click', function(){
					pop.modifyTitle('改过后的标题');
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