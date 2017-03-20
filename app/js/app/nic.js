define(function(require){
	
	/**
	* 载入nic
	*/
	var nic             = require('core/nic');
	nic.template        = require('template');
	nic.ui.drag         = require('core/drag');
	nic.ui.dialog       = require('core/dialog');
	nic.ui.pop          = require('core/pop');
	nic.ui.tip          = require('core/tip');
	nic.ui.tab          = require('core/tab');
	nic.ui.calendar     = require('core/calendar');
	nic.ui.validator    = require('core/validator');
	nic.ui.selectArea   = require('core/selectArea');
	nic.ui.grid         = require('core/grid');
	nic.ui.calendar     = require('core/calendar');
	nic.ui.tree         = require('core/tree');
	nic.ui.select2      = require('core/select');
	nic.ui.check        = require('core/check');
	nic.ui.btnDropdown  = require('core/btnDropdown');
	nic.ui.btnSwitch    = require('core/btnSwitch');
	
	return nic;
});