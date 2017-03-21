module.exports = {
    zIndex: function() {
        return 999 + $('.l-ui').length;
    },

    /**
     * 需要ui元素需要绝对定位的容器
     * @return {Object} ui元素jquery对象
     */
    wrap: function() {
        if (!$('#l-ui-wrap').length) {
            $('body').append('<div id="l-ui-wrap"></div>');
        }
        return $('#l-ui-wrap');
    },

    /**
     * 去除滚动条
     */
    noScroll: function() {
        var html = $('html');
        html.addClass('html-noScroll');
    },

    /**
     * 设置遮罩
     * @return {Object} 遮罩元素jquery对象
     */
    lock: function() {
        var win = $(window),
            body = $('body'),
            lock = $('.l-ui-lock'),
            self = this,
            _setSize = function() {
                if (!lock.length) {
                    lock = body
                        .append('<div class="l-ui-lock" style="z-index:' + self.zIndex() + '"></div>')
                        .find('.l-ui-lock')
                }
                // lock.css({
                //     width: '100%',
                //     height: body[0].scrollHeight
                // });
            };

        this.noScroll();
        _setSize();
        win.resize(_setSize);
        lock.show();
        return lock;
    },

    /**
     * 删除遮罩
     */
    unlock: function() {
        $('html').removeClass('html-noScroll');
        $('.l-ui-lock').hide();
    },

    /**
     * onselectstart 选中处理
     * @method nic.ui.onselectstart
     * @param {Object} jquery 对象
     */
    onselectstart: function(obj){
        if( !obj || !obj.length ){ return false; }
        if( document.onselectstart !== undefined ){
            obj[0].onselectstart = function(){return false;};
        }else{
            obj.css({'-moz-user-select':'none'});
        }
        return obj;
    }
}