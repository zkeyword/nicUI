define(function(require){
	
	'use strict';
	
	var isShow = false;
	
	$('.nav_dl .link')
        .on('click', function(){
            var oSelf = $(this),
                thatDt  = oSelf.parent('dt');
            thatDt.siblings('dd').slideToggle();
            oSelf.parents('dl').addClass('cur').siblings().children('dd').slideUp();
            oSelf.parents('dl').siblings().removeClass('cur');
        });
	
	$(".subLink").each(function() {
		var self   = $(this),
			parent = null;
		
        if( !self.hasClass('cur') ) return ;
        
    	parent = self.parent('dd')
    	parent.show();
    	parent.parent().addClass('cur');
    	
    	if( self.attr('href') === location.pathname && parent.find('.cur').length > 1 ){
			parent.find('.cur').removeClass('cur');
			self.addClass('cur')
    	}
    	
    });
	
	$('.lt-right')
		.off('click', '.ertong')
		.on('click', '.ertong', function(e){
			$('.alertBox .tip').hide();
			$(this).find('.tip').show();
			isShow = true;
			e.stopPropagation();
		});
	
	$(window)
		.on('click', function(){
			if( isShow ){
				$('.alertBox .tip').hide();
				isShow = false;
			}
		});
	
	
    $(document).on('click', '.integer_number,.float_number', function() {
        $(this).data('default_value', $(this).val());
    });
    $(document).on('keyup', '.integer_number', function() {
        if ($(this).val() != '' && ! /^[\d]+$/.test($(this).val())) {
            $(this).val($(this).data('default_value'));
            return false;
        }
    });
    $(document).on('keyup', '.float_number', function() {
        if ($(this).val() != '' && isNaN($(this).val())) {
            $(this).val($(this).data('default_value'));
            return false;
        }
    });
});