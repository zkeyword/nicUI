var Base = require('base');
var html = require('./index.handlebars');
require('../../styles/base.styl');
require('../../styles/mixins.styl');
require('../../styles/common.styl');
require('./index.styl');

var Dialog = function(obj) {
    this.obj = obj ? obj : {};
    this.obj.zIndex = this.zIndex() + this._uid; //TODO
    this.obj.uid = this._uid;
    this.$ = null;
}

Dialog.prototype = new Base();

Dialog.prototype.open = function() {
    this.lock();
    this.$ = htmlHandle(this);
    return this;
}

Dialog.prototype.close = function() {
    this.$.remove();
    this.unlock();
}

Dialog.prototype.reSize = function() {
    this.$.width();
}

Dialog.prototype.refresh = function(obj) {
    var self = this;
    self.obj.text = obj.text ? obj.text : self.obj.text;
    self.obj.btns = obj.btns ? obj.btns : self.obj.btns;
    self.$.remove();
    self.$ = htmlHandle(self);
}


function htmlHandle(self) {
    var wrap = self.wrap().append(html(self.obj)),
        uiWrap = wrap.find('.l-ui[data-uid="' + self.obj.uid + '"]'),
        btns = uiWrap.find('.l-btnItem'),
        close = uiWrap.find('.l-close'),
        btnsData = self.obj.btns;
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

    resize(win, uiWrap);
    win.resize(function() {
        resize($(this), uiWrap);
    })

    return uiWrap;

}

function resize(win, uiWrap) {
    uiWrap.css({
        top: (win.height() - uiWrap.height()) / 2,
        left: (win.width() - uiWrap.width()) / 2
    })
}

module.exports = function(obj) {
    return new Dialog(obj);
}