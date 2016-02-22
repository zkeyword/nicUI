#### 使用场景

在校验控件调用的时候，校验对象已经生成，而后面生成DOM对象，并不在校验对象的目标范围内，这时我们需要在DOM对象生成之后重新reload一下校验对象，如：弹窗中的表单校验，ajax生成的表单校验。

#### 调用方式 ####
	
js:

	var validator = nic.ui.validator({
		target:'#test'
	});

	$('#addForm').click(function(){
		/*
			...
			动态创建表单的业务
			...
		*/
		validator.reload();
	});
