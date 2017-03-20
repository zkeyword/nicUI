##待优化


#### 使用场景


#### 调用方式 ####

html:

	<form name="formWrap" id="formWrap" class="fn-clear">
		<div class="ui-form fn-clear">
			<label>
				<i class="ui-label">ajax：</i>
				<input id="ajax" class="ui-input" type="text" data-validate="ajax" data-validate-ajaxText="请按照条件填写" />
				<span class="ui-form-message"></span>
			</label>
		</div>
		<div class="fn-clear">
			<a href="#" id="submitLink">提交</a>
			<a href="#" id="reset">重置</a>
		</div>
	</form>
	
js:

	var validator = nic.ui.validator({
		target:'#formWrap',
		ajax:function(obj, fn){
            if( obj[0].id === "ajax" ){
                $.ajax({
                    type: 'POST',
                    url: '/validate',
                    data: {name:obj.val()},
                    cache: false,
                    dataType: "json",
                    beforeSend: function(){},
                    success: function(data){
                        if( data ){
                            fn(true)
                        }else{
                            fn(false, true)
                        }
                    },
                    error: function(data){
                        console.log(data);
                    }
                });
            }
        }
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
		})