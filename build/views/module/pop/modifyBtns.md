#### 说明

修改按钮的API是modifyBtns，只要传入和原来的弹窗框的按钮数据格式一致即可。

#### 调用方式

html:

	<a href="javascript:;" id="addPop">点击我，动态创建一个弹窗</a>

js:


	$('#addPop').on('click', function(){
		var html = '<div>这个是一个pop弹出框，<a href="javascript:;" id="modifyBtns">点击修改按钮名称</a></div>';

		var pop = nic.ui.pop({
			title: '弹窗的标题',
			height: 240,
			width: 320,
			html: html,
			onloadFn: function(){
				$('#modifyBtns').on('click', function(){
					pop.modifyBtns([
						{
							text:'保存',
							closePop:false,
							onclick:function(id){
								alert('保存')
								pop.close(id);
							}
						},
						{
							text:'关闭',
							onclick:function(){

							}
						}
					]);
				});
			},
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