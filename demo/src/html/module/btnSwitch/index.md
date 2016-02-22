#### 调用方式 ####

html:

	<div class="fn-clear">
		<span class="ui-btn ui-btn-switch ui-btn-switch-open">
			<i></i>
			<em>已开启</em>
		</span>
		<span class="ui-btn ui-btn-switch ui-btn-switch-close">
			<i></i>
			<em>已关闭</em>
		</span>
	</div>
	
js:

	nic.ui.btnSwitch({
		target: '.ui-btn',
		open:{
			url: '/switch',
			data: {
				t:1
			},
			success: function(){
				alert('开启成功')
			},
			error: function(){
				alert('开启失败')
			}
		},
		close:{
			url: '/switch',
			data: {
				t:2
			},
			success: function(){
				alert('关闭成功')
			},
			error: function(){
				alert('关闭失败')
			}
		}
	});