(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.Upload = factory(root.jQuery);
    }
}(this, function ($) {
	
	'use strict';
	
	var Upload = function(options){
		
		var g           = this,
			domFragment = {
							file: '<input type="file" name="{{name}}" />',
							params: '<input type="hidden" name="{{name}}" value="{{value}}" />',
							iframe: '<iframe name="iframe_{{name}}"></iframe>',
							form: '<form method="post" enctype="multipart/form-data" name="form_{{name}}" target="iframe_{{name}}" action="{{url}}"></form>'
						},
			c           = {
							/* 简单模板替换 */ 
							_tpl: function (tpl, data) {
								return tpl.replace(/{{(.*?)}}/g, function ($1, $2) {
									return data[$2] === undefined ? '' : data[$2];
								});
							},
							/* 简单的遍历 */
							_each: function (tpl, data){
								var html = '';
								for(var i = 0, len = data ? data.length : 0; i<len; i++){
									data[i].index = i;
									html += c._tpl(tpl, data[i]);
								}
								return html;
							},
							init:function(){
								var target  = g.target,
									url     = g.url,
									name    = g.name,
									obj     = {},
									html    = ''
									
								if( !url ){
									return console.log('url is not define');
								}
								if( !target ){
									return console.log('target is not define');
								}
								
								obj = {
									url: url + '?v=' + Math.random(),
									name: name
								}

								if( !target.prev('.l-upload-wrap').length ){
									target.before('<div class="l-upload-wrap" style="display:none;">'+ c._tpl(domFragment.form, obj) +'</div>');
								}
								
								html = c._each(domFragment.params, g.params) + c._tpl(domFragment.file, obj);
								
								target
									.off('click')
									.on('click', function(){
										var target   = $(this),
											wrap     = target.prev('.l-upload-wrap'),
											form     = wrap.find('form').html(html),
											file     = wrap.find('input[type="file"]'),
											iframe   = null;
										
										/*文件框提交动作*/
										file.click()
											.change(function() {
												form.submit();
											});

										/*iframe 在提交完成之后*/
										iframe = wrap
													.append( c._tpl(domFragment.iframe, obj) )
													.find('iframe')
													.load(function() {
														var data = $(this).contents().find('body').html().match(/\{.*\}/g)[0];
														if( g.dataType === 'json' && typeof data === 'string' ){
															data = $.parseJSON(data);
														}
														if( Object.prototype.toString.call(g.onComplate) === "[object Function]" && data ){
															g.onComplate.apply(target, [data]);
														}
														iframe.remove();
													});
									});
							}
						}
						
		g.target     = $(options.trigger);
		g.url        = options.url || '';
		g.name       = options.name || 'filedata';
		g.params     = options.params || {};
		g.dataType   = options.dataType || 'json';
		g.onSend     = options.onSend || '';
		g.onComplate = options.onComplate || ''; 
		g.run        = c.init;

	};

	Upload.prototype = {
		
		constructor: Upload,
		
		setParams: function(options){
			this.params = options;
		},
		
		load: function(options){
			this.target = $(options.trigger);
			this.url    = options.url || '';
			this.run();
		}
	};

	return function(o){
		return o ? new Upload(o) : {};
	};
}));