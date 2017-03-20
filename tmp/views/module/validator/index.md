#### 调用方式 ####

html:

	<div id="validator">
		<div class="ui-form fn-clear">
			<label>
				<i class="ui-label">精确到小数点2位必填的数字：</i>
				<input 
					class="ui-input" 
					type="text" 
					data-validate="required;number;floatNumber=2" 
					data-validate-requiredText="不能为空！" 
					data-validate-numberText="请输入正确的数值" 
					data-validate-requiredText="请输入一个精确到{{param}}位小数的数值" 
				/>
			</label>
			<span class="ui-form-message"></span>
		</div>
	</div>
	
js:

	var validator = nic.ui.validator({
		target:'#validator',
	});
