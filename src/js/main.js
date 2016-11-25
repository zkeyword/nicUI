var nic;

/* 基本依赖 */
nic               = require('./core/nic');
nic.ui.drag       = require('./core/drag');
nic.ui.pagination = require('./core/pagination');

/* 一般组件 */
nic.ui.grid       = require('./core/grid');
nic.ui.gridFree   = require('./core/gridFree');
nic.ui.validator  = require('./core/validator');
nic.ui.pop        = require('./core/pop');
nic.ui.dialog     = require('./core/dialog');
nic.ui.check      = require('./core/check');
nic.ui.tab        = require('./core/tab');
nic.ui.tip        = require('./core/tip');
nic.ui.tree       = require('./core/tree');
nic.ui.btnSwitch  = require('./core/btnSwitch');

nic.ui.picker  = require('./core/picker');


/* 其他$.fn插件 */
require('./core/jquery.anchorChain');
require('./core/jquery.suggestion');

/* 第三方插件 */
window.ZeroClipboard = require('./app/ZeroClipboard.min');

module.exports = window.nic = nic;