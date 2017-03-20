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

	$.fn.wordsNumber = function(options){
		
		var self       = this,
			textNum    = self.parent().find(options.textNum),
			selfLength = self.val().length;
			//num        = options.num;

			var sheng = parseInt(self.attr("maxlength"), 10) - self.val().length;
            textNum.html(sheng);

        self.each(function(index){
			
            var That = $(this); 
            
            //匹配包含给定属性的元素，keyup在按键释放时发生  
            That.keyup(function () {
                  //parseInt 方法返回与保存在 numString 中的数字值相等的整数。如果 numString 的前缀不能解释为整数，则返回 NaN（而不是数字）。  
                var max = parseInt(That.attr("maxlength"), 10); //获取maxlength的值 转化为10进制，将输入到textarea的文本长度  
                  //这个判断可知max得到的是不是数字，设定的大小是多少  
                if (max > 0) {  

                    if (That.val().length > max) { //textarea的文本长度大于maxlength   
                        That.val(That.val().substr(0, max)); //截断textarea的文本重新赋值   
                    }

                    //var yishu = self.val().length;
                    var sheng = max - That.val().length;
                    //$("#lyishu").html(yishu);  
                    textNum.html(sheng);
                }
            });  

            That.blur(function () {
                var max = parseInt(That.attr("maxlength"), 10); //获取maxlength的值 转化为10进制，将输入到textarea的文本长度  
                //这个判断可知max得到的是不是数字，设定的大小是多少  
                if (max > 0) {  

                    if (That.val().length > max) { //textarea的文本长度大于maxlength   
                        That.val(That.val().substr(0, max)); //截断textarea的文本重新赋值   
                    }

                    //var yishu = self.val().length;
                    var sheng = max - That.val().length;
                    //$("#lyishu").html(yishu);  
                    textNum.html(sheng);
                } 
            });

        });

	}

}));