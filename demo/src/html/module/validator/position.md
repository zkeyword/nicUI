#### 调用方式 ####

html:

	<div class="ui-form fn-clear">
		<label>
			<i class="ui-label ui-w400">类型指定浮动位置：</i>
			<input class="ui-input" type="text" data-validate="required|{left:110,top:-20};number|{left:110,bottom:-20}" />
			<span class="ui-form-message"></span>
		</label>
	</div>
	
	<div class="ui-form fn-clear">
		<label>
			<i class="ui-label ui-w400">html属性指定浮动位置：</i>
			<input class="ui-input" type="text" data-validate="required;number" data-validate-position="{left:135,top:-20}" />
			<span class="ui-form-message"></span>
		</label>
	</div>
	
	<div class="ui-form fn-clear">
		<label>
			<i class="ui-label ui-w400">js实例化指定浮动位置：</i>
			<input class="ui-input" type="text" data-validate="required;number" />
			<span class="ui-form-message"></span>
		</label>
	</div>
	
js:

	var validator = nic.ui.validator({
		target:'#test',
		position:{left:135,top: -20}
	});
