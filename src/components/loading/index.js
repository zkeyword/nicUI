var Base = require('base');
var html = require('./index.handlebars');
require('../../styles/base.styl');
require('../../styles/mixins.styl');
require('../../styles/common.styl');
require('./index.styl');

var Loading = function(obj) {
    this.obj = obj ? obj : {};
    this.obj.zIndex = this.zIndex() + this._uid;
    this.obj.uid = this._uid;
    this.obj.isMask = this.obj.isMask === undefined ? true : this.obj.isMask;
    this.$ = null;
}

Loading.prototype = new Base();

Loading.prototype.open = function() {
    this.obj.isMask && this.lock();
    this.$ = htmlHandle(this);
}
Loading.prototype.close = function() {
    this.$.remove();
    this.unlock();
    this.obj.close && this.obj.close();
}

Loading.prototype.refresh = function(obj) {
    this.obj.text = obj.text;
    this.$ = htmlHandle(this);
    return this;
}

function htmlHandle(self) {
    var wrap = self.wrap().append(html(self.obj)),
        uiWrap = wrap.find('.l-ui[data-uid="' + self.obj.uid + '"]'),
        win = $(window)

    self.setZIndex();
    resize(win, uiWrap);
    win.resize(function() {
        resize($(this), uiWrap);
    });

    return uiWrap;
}

function resize(win, uiWrap) {
    uiWrap.css({
        top: (win.height() - uiWrap.height()) / 2,
        left: (win.width() - uiWrap.width()) / 2
    })
}

module.exports = function(obj) {
    return new Loading(obj);
}