var Base = require('base');
var html = require('./index.handlebars');
require('../../styles/base.styl');
require('../../styles/mixins.styl');
require('../../styles/common.styl');
require('./index.styl');

var Popup = function(obj) {
    obj.isMask = obj.isMask == undefined ? true : obj.isMask;
    obj.isClose = obj.isClose == undefined ? false : obj.isClose;
    obj.onloadFunc = obj.onloadFunc == undefined ? function() {} : obj.onloadFunc;

    this.obj = obj ? obj : {};
    this.obj.zIndex = this.zIndex() + this._uid;
    this.obj.uid = this._uid;
    this.$ = null;
}

Popup.prototype = new Base();

Popup.prototype.open = function() {
    var self = this,
        time = self.obj.time ? self.obj.time : 1500;

    self.lock();
    self.$ = htmlHandle(self);
};

Popup.prototype.close = function() {
    this.$.remove();
    this.unlock();
    this.obj.close && this.obj.close(this);
};

Popup.prototype.resize = function() {
    resize($(window), this.$);
}

function htmlHandle(self) {
    var wrap = self.wrap().append(html(self.obj)),
        uiWrap = wrap.find('.l-ui[data-uid="' + self.obj.uid + '"]'),
        btns = uiWrap.find('.l-btnItem'),
        close = uiWrap.find('.l-close'),
        btnsData = self.obj.btns,
        win = $(window);

    for (var i = 0, len = btns.length; i < len; i++) {
        (function(i) {
            var btn = btns.eq(i),
                btnData = btnsData[i];
            btn.on('click', function() {
                btnData.func && btnData.func.apply(self, [self, uiWrap]);
                btnData.close && self.close();
            });
        })(i)
    }

    self.obj.onloadFunc && self.obj.onloadFunc(self);

    close.on('click', function() {
        self.close();
    })

    resize(win, uiWrap);
    win.resize(function() {
        resize($(this), uiWrap);
    })

    return uiWrap;
};

function resize(win, uiWrap) {
    uiWrap.css({
        top: (win.height() - uiWrap.height()) / 2,
        left: (win.width() - uiWrap.width()) / 2
    })
}

module.exports = function(obj) {
    return new Popup(obj);
}