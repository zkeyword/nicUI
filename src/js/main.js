var nic;

/* 第三方插件 */
window.$             = require('jquery');
window.ZeroClipboard = require('./app/ZeroClipboard.min');


/* nic */
nic              = require('./core/nic');
nic.ui.grid      = require('./core/grid');
nic.ui.gridFree  = require('./core/gridFree');
nic.ui.validator = require('./core/validator');

nic.ui.drag      = require('./core/drag');
nic.ui.pop       = require('./core/pop');
nic.ui.dialog    = require('./core/dialog');


nic.ui.check     = require('./core/check');
nic.ui.tab       = require('./core/tab');
nic.ui.tip       = require('./core/tip');
nic.ui.tree      = require('./core/tree');
nic.ui.btnSwitch = require('./core/btnSwitch');


/* 其他插件 */
require('./core/anchorChain');
require('./core/jquery.suggestion');

module.exports = window.nic = nic;