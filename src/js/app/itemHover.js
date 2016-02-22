define(function(require){
	
	var ItemHover = function(options){

		var target  = $(options.target),
			title   = $(options.title),
			content = $(options.content),
			num     = options.num ? options.num : 40;

	
		// $(target).hover(function(){
		// 	$(this).addClass('on').siblings('item').removeClass('on');
		// },function(){
		// 	$(this).removeClass('on');
		// });


		target.hover(function(){
			var self         = $(this),
				childTitle   = self.find(title),
				childContent = self.find(content);
			
			if( title.length ){
				childTitle.animate({bottom:-num},100);	
			}
			
			childContent.animate({bottom:"0"},300);
		},function(){
			var self         = $(this),
				childTitle   = self.find(title),
				childContent = self.find(content);
			
			if( title.length ){
				childTitle.animate({bottom:"0"},300);
			}
			childContent.stop().animate({bottom:-num-50},300);
		});


	}
	
	return function(o){
		return new ItemHover(o);
	}

});
