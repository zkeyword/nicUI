(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }
}(this, function ($) {
	
	'use strict';
	
	var oWindow = $(window),
		oHtml   = $('html, body'),
		_oCore  = {
					setFixed: function(oTarget, position){
						oTarget
							.css({
								position: 'fixed',
								top: position,
								zIndex: '999'
							});
					},
					removeFixed: function(oTarget){
						oTarget.removeAttr('style')
					},
					setCurrerClass: function(oTarget){
						oTarget
							.addClass('cur')
							.siblings()
							.removeClass('cur');
					}
			   }
	
	$.fn.anchorChain = function(options){
		
		var defaults = $.extend({}, {
							wrap:'',
							position: 0,
							isNav: true
						}, options);

		$(this).each(function(index){
			var	oWrap = defaults.isNav ? $(defaults.wrap) : $(defaults.wrap).eq(index),
				oTarget,
				nTargetOffSetTop,
				nTargetHeight,
				oTargetChlid,
				nWrapOffsetTop,
				nWrapParentHeight;
				
			if( !oWrap.length ) return ;
			
			oTarget           = $(this);
			nTargetOffSetTop  = oTarget.offset().top;
			nTargetHeight     = oTarget.outerHeight();
			oTargetChlid      = oTarget.children();
			nWrapOffsetTop    = oWrap.offset().top;
			nWrapParentHeight = oWrap.parent().outerHeight();
			
			
			if( defaults.isNav ){
				oTargetChlid
					.on('click', function(){
						var oSelf              = $(this),
							sIndex             = this.getAttribute('data-index'),
							oWrapItem          = oWrap.eq(sIndex),
							nWrapItemOffsetTop = oWrapItem.length && oWrapItem.offset().top - defaults.position;
						
						oWrapItem.length && oHtml.animate({scrollTop: nWrapItemOffsetTop}, 500);
					});
			};
			
			oWindow.on('scroll', function(e){
	
					var nWindowScrolltop = $(this).scrollTop(),
						nNeedNum         = defaults.isNav ? nWrapOffsetTop - nTargetHeight : nWrapOffsetTop;
					//		console.log(nWrapOffsetTop, nTargetHeight, nWindowScrolltop)
					oWrap.each(function(i){
						(nWindowScrolltop > $(this).offset().top - nTargetHeight + 1) &&
								_oCore.setCurrerClass( oTargetChlid.eq(i) );
					});
					
					(nWindowScrolltop >= nNeedNum) && 
					(nWindowScrolltop + nTargetHeight + defaults.position < nWrapParentHeight + nTargetOffSetTop) 
							? _oCore.setFixed(oTarget, defaults.position) : _oCore.removeFixed(oTarget);
		
				});
			});
	}
	
}));
