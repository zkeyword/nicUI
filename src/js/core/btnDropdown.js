define(['./nic'], function(nic){

	var btnDropdown = function(options){
		
		var isShow = false,
			target = options.target,
			menu   = $(options.menu);
		
		$('body').on('click', target, function(e){
			var that = $(this),
				menu = $(options.menu);
			e.stopPropagation();
			nic.ui.onselectstart( that.parent() );
			if( !isShow ){
				menu.addClass('fn-hide');
				that.next(options.menu).removeClass('fn-hide');
				isShow = true;
			}else{
				menu.addClass('fn-hide');
				isShow = false;
			}
		}).on('mouseout', target, function(){
			isShow = false;
		}).on('click', options.menu + ' li', function(e){
			$(options.menu).addClass('fn-hide');
		});
		
		$(window).on('click', function(){
			if( !isShow ){
				$(options.menu).addClass('fn-hide');
			}
		});
		
	};

	return btnDropdown;

});