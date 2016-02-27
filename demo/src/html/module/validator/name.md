#### 使用场景

只要有一项目校验通过，其他的表单无错即可通过。

#### 调用方式 ####

html:

	<div id="formWrap">
		<div class="ui-form fn-clear">
			<label>
				<i class="ui-label ui-w400">多框单项校验(data-validate-name)：</i>
			</label>
			<label class="ui-pl10">
				<input type="text" class="ui-input" data-validate="required;number;floatNumber=2" data-validate-name="xxx" data-validate-requiredText="xxx,必填1"  />
			</label>
			<label class="ui-pl10">
				<input type="text" class="ui-input" data-validate="required;number;floatNumber=2" data-validate-name="xxx" data-validate-requiredText="xxx,必填2"  />
			</label>
			<label class="ui-pl10">
				<input type="text" class="ui-input" data-validate="required;number;floatNumber=2" data-validate-name="xxx" data-validate-requiredText="xxx,必填2"  />
			</label>
			<span class="ui-form-message"></span>
		</div>
		<div class="fn-clear">
			<a href="#" id="submitLink">提交</a>
			<a href="#" id="reset">重置</a>
		</div>
	</div>
	
js:

	var validator = nic.ui.validator({
		target:'#formWrap'
	});

	$('#formWrap')
		.on('click', '#submitLink', function(){
			console.log( validator.validatorAll() )
	        if( validator.validatorAll() ){
				alert('提交通过')
			}
		})
		.on('click', '#reset', function(){
			validator.reset();
		});
