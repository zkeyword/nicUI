define(function(require){
	
	/**
	* 载入nic
	*/
	var cncnERP             = require('core/cncnERP');
	
	cncnERP.template        = require('template');
	cncnERP.ui.validator    = require('core/validator');
	nic.ui.drag         = require('core/drag');
	nic.ui.dialog       = require('core/dialog');
	nic.ui.pop          = require('core/pop');
	nic.ui.tab          = require('core/tab');
	nic.ui.upload       = require('core/upload');
	nic.ui.grid         = require('core/grid');
	nic.ui.gridFree     = require('core/gridFree');
	
	return cncnERP;
	
});