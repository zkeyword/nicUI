var Swiper = require('swiper.min');
var Base = require('base');
var html = require('./index.handlebars');
require('../../styles/base.styl');
require('../../styles/mixins.styl');
require('../../styles/common.styl');
require('./index.styl');

var ImgZoom = function(obj) {
    this.obj = obj ? obj : {};
    this.obj.zIndex = this.zIndex() + this._uid; //TODO
    this.obj.uid = this._uid;
    this.obj.width = 500;
    this.obj.height = 500;
    this.$ = null;

}

ImgZoom.prototype = new Base();

ImgZoom.prototype.open = function() {
    var self = this;
    self.lock();
    self.obj.item = function() {
        var items = self.obj.target.find('img'),
            len = items.length,
            i = 0,
            arr = [];
        for (; i < len; i++) {
            (function(i) {
                arr.push({
                    bigSrc: items.eq(i).attr('bigSrc')
                })
            })(i)
        }
        return arr;
    }();
    self.obj.activeIndex = self.obj.index + 1;
    self.$ = htmlHandle(self);
    return this;
}

ImgZoom.prototype.close = function() {
    this.$.remove();
    this.unlock();
    this.obj.close && this.obj.close(this);
};

function htmlHandle(self) {
    var wrap = self.wrap().append(html(self.obj)),
        uiWrap = wrap.find('.l-ui[data-uid="' + self.obj.uid + '"]'),
        close = uiWrap.find('.l-close'),
        btnsData = self.obj.btns,
        win = $(window),
        curImgNum = uiWrap.find('.curImgNum'),
        allImgNum = uiWrap.find('.allImgNum'),
        item = uiWrap.find('.l-imgZoom-item'),
        activeIndex = self.obj.index;

    close.on('click', function() {
        self.close();
    })

    resize(win, uiWrap);
    win.resize(function() {
        resize($(this), uiWrap);
    })

    // uiWrap
    //     .find('.pinch-img')
    //     .each(function() {
    //         this.pinch = new PinchZoom($(this), {});
    //     });

    var mySwiper = new Swiper('.swiper-container', {
        grabCursor: true,
        paginationClickable: true,
        onInit: function(h) {
            loadingImg(uiWrap.find('img').eq(activeIndex));
            $(".curImgNum").html(activeIndex + 1);

        },
        initialSlide: activeIndex,
        onSlideChangeStart: function(h) {
            loadingImg(uiWrap.find('img').eq(h.activeIndex));
            $(".curImgNum").html(h.activeIndex + 1);
        }
    });

    $('.arrow-left').on('click', function(e) {
        mySwiper.swipePrev()
    })
    $('.arrow-right').on('click', function(e) {
        mySwiper.swipeNext()
    })

    $('.l-ui-lock').on('click', function() {
        self.close();
    })

    return uiWrap;
};

function resize(win, uiWrap) {
    uiWrap.css({
        top: (win.height() - uiWrap.height()) / 2,
        left: (win.width() - uiWrap.width()) / 2
    })
}

function loadingImg(b) {
    if (!b.hasClass('loading')) return;
    var a = new Image();
    a.onload = function() {
        b.attr("src", a.src).removeClass("loading");
        if (a.width > a.height) {
            b.css({
                width: '100%',
                height: 'auto'
            })
        } else {
            b.css({
                width: 'auto',
                height: '100%'
            })
        }
    }
    a.src = b.attr('bigSrc');
}

module.exports = function(obj) {
    window.Swiper = Swiper;
    return new ImgZoom(obj)
}