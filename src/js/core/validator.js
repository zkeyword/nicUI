'use strict';
	
/**
* TODO
* nic.ui.validator
* @class nic.ui.validator
* @author norion.z
* @blog http://zkeyword.com/
* @param {Object} o 
* @param {String} o.id 
* @return {Object} select对象
*/

var nic       = require('./nic'),
    Validator = function(o){
	
    	var 
    		/**
    		* 当前对象
    		*/
    		g = this,
    		
    		/**
    		* 默认配置
    		*/
    		p = {
    			target: null,
    			//label: null,
                text: {
                    check: '必须勾选！',
                    required: '不能为空！',
    				select: '请选择！',
                    length: '输入字符长度等于{{param}}个字符',
                    minLength: '输入字符长度不小于{{param}}个字符',
                    maxLength: '输入字符长度大小于{{param}}个字符',
    				minValue: '请输入不能小于{{param}}',
                    maxValue: '请输入不能大于{{param}}',
                    integer: '请输入一个正确的整数值',
                    digits: '请输入一个正确的正整数',
                    floatNumber: '请输入一个精确到{{param}}位小数的数值',
                    number: '请输入一个正确的数字',
                    email: '邮箱格式不正确，请检查！',
                    mobile: '手机号码不正确，请检查！如：13412345678',
                    phone: '电话号码不正确，请检查！如：0592-1234567或13412345678',
                    url: '请输入正确的网址，比如:http://www.example.com',
                    date: '',
                    format: '',
                    ajax: ''
                },
                rules:null,
                ajax:null,
    			position: null
    		},
    			
    		/**
    		* 缓存池
    		*/
    		t = {
    			//submit: false
    		},
    		
    		/**
    		* XXX
    		* 代码逻辑
    		*/
    		c = {
                
                rule: {

                    /* 强制勾选 */
                    check: function(sVal, oItem, sParam){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
    					
    					// XXX
                        
                        if( oItem[0].type === 'checkbox' && !$("input:checkbox[name='"+ oItem[0].name +"']:checked").length ){
                            return c.handleText(oItem, 'check');
                        }

                        if(  oItem[0].type === 'radio' && !$("input:radio[name='"+ oItem[0].name +"']:checked").length ){
                            return c.handleText(oItem, 'check');
                        }
                    },
    				
    				/* 强制选择 */
    				select: function(sVal, oItem, sParam){
                        if(sVal === sParam){
                            return c.handleText(oItem, 'select', sParam);
                        }
    				},
                    
                    /* 非空 */
    				//TODO
                    required: function(sVal, oItem){
                        if( !sVal.trims() ){
    						return c.handleText(oItem, 'required');
                        }
                    },
                    
                    /* 固定长度 */
                    length: function(sVal, oItem, sParam){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( sVal.length !== Number(sParam) ){
                            return c.handleText(oItem, 'length', sParam);
                        }
                    },
                    
                    /* 最小长度 */
                    minLength: function(sVal, oItem, sParam){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if(sVal.length < sParam){
                            return c.handleText(oItem, 'minLength', sParam);
                        }
                    },
                    
                    /* 最大长度 */
                    maxLength: function(sVal, oItem, sParam){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if(sVal.length > sParam){
                            return c.handleText(oItem, 'maxLength', sParam);
                        }
                    },
    				
    				/* 最小值 */
                    minValue: function(sVal, oItem, sParam){
                        
                    	sVal   = Number(sVal);
                    	sParam = Number(sParam);
                    	
                        if( sVal >= sParam ){
                            return false;
                        }
                        
                        return c.handleText(oItem, 'minValue', sParam);
                    },
                    
                    /* 最大值 */
                    maxValue: function(sVal, oItem, sParam){
                        
                    	sVal   = Number(sVal);
                    	sParam = Number(sParam);
                        
                        if( sVal <= sParam ){
                            return false;
                        }
                        
                        return c.handleText(oItem, 'maxValue', sParam);
                    },
                    
                    /* 整数 */
                    integer: function(sVal, oItem){
                        var f = parseFloat(sVal);
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if(!(!isNaN(f) && f.toString() === sVal && Math.round(f) === f)){
                            return c.handleText(oItem, 'integer');
                        }
                    },
                    
                    /* 正整数 */
                    digits: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( Number(sVal) === 0 ){
                            return c.handleText(oItem, 'digits');
                        }
                        
                        if( !/^\d+$/.test(sVal) ){
                            return c.handleText(oItem, 'digits');
                        }
                    },
                    
                    /* 浮点数 */
                    floatNumber: function(sVal, oItem, sParam){
                        var reg = new RegExp('^[0-9]+[\.][0-9]{'+ sParam +'}$');
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !reg.test(sVal) ){
                            return c.handleText(oItem, 'floatNumber', sParam);
                        }
                    },
                    
                    /* 数字 */
                    number: function(sVal, oItem, sParam){
                    	var sParamArr = [],
                    		reg       = '';
                    	
                        sVal = sVal.trims();

                        if( isNaN(Number(sVal)) ){
                            return c.handleText(oItem, 'number');
                        }
                        
                        if( sParam ){
                        	sParamArr = sParam.split(':');
                        	if( sParamArr[0] === 'float' ){
                        		reg = new RegExp('^[0-9]([\.][0-9]{1,'+ sParamArr[1] +'})?$');
                        		if( !reg.test(sVal) ){
                                    return c.handleText(oItem, 'floatNumber', sParamArr[1]);
                                }
                        	}
                        }
                    },
                    
                    /* 邮箱 */
                    email: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(sVal) ){
                            return c.handleText(oItem, 'email');
                        }
                    },
                    
                    /* 手机 */
                    mobile: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !/1[34578]{1}\d{9}$/.test(sVal) ){
                            return c.handleText(oItem, 'mobile');
                        }
                    },
                    
                    /* 电话 */
                    phone: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !/(1[34578]{1}\d{9}$)|(0\d{2,3}-\d{7,8}(-\d{2,3})?$)/.test(sVal) ){
                            return c.handleText(oItem, 'phone');
                        }
                    },
    				
    				/* 身份证 */
    				idCard: function(sVal, oItem){
                        sVal = sVal.trims();

                        if( !sVal.length ){
                            return false;
                        }

                        if( !/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(sVal) ){
                            return c.handleText(oItem, 'idCard');
                        }
                    },
                    
                    /* 网址 */
                    url: function(sVal, oItem){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(sVal) ){
                            return c.handleText(oItem, 'url');
                        }
                    },
                    
                    //FIXME 
                    /* 日期 */
                    date: function(sVal, oItem, sParam){
                        var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
                        if (!regex.test(sVal)) return false;
                        var d = new Date(sVal.replace(regex, '$2/$1/$3'));
                        return ( parseInt(RegExp.$2, 10) === (1 + d.getMonth()) ) && (parseInt(RegExp.$1, 10) === d.getDate()) && (parseInt(RegExp.$3, 10) === d.getFullYear() );
                    },
                    
                    format: function(sVal, oItem, sParam){
                        var reg = new RegExp(sParam);
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        if( !reg.test(sVal) ){
                            return c.handleText(oItem, 'format');
                        }
                    },
                    
                    ajax: function(sVal, oItem, sParam){
                        
                        sVal = sVal.trims();
                        
                        if( !sVal.length ){
                            return false;
                        }
                        
                        oItem.addClass('l-form-error');
                        
                        $.ajax({
                            type: 'POST',
                            url: sParam,
                            cache: false,
                            dataType: "json",
                            beforeSend: function(){
                                
                            },
                            success: function(data){
                                if( !data ){
                                    oItem.addClass('l-form-error');
    								c.handleMessage(oItem, c.handleText(oItem, 'ajax'));
                                }else{
                                    oItem.removeClass('l-form-error');
                                }
                            },
                            error: function(data){
                                console.log(data);
                            }
                        });
                    }
                
                },
    			
    			handlePositionStr: function(s){
    				if( !s ) return;
    				var sStr    = s.replace(/\{|\}/g, ''),
    					oArr    = sStr.split(','),
    					len     = oArr.length,
    					i       = 0,
    					oReturn = {}
    					
    				for(; i<len; i++){
    					var oChlid = oArr[i].split(':');
    					oReturn[oChlid[0]] = Number(oChlid[1]);
    				}
    				return oReturn;
    			},
    			
    			route: function(oItem){
    				
    				if( !oItem.length ){ return; }
    				
    				var oThat      = this,
    					sVal       = oItem.val(),
    					aRule      = oItem.attr('data-validate').split(';'),
    					len        = aRule.length,
    					i          = 0,
    					rCode      = /\=/,
    					rFormat    = /format\=|ajax\=/,
    					rPosition  = /\|/,
    					isFunction = nic.base.isFunction;
    					
    				for(; i<len; i++){
    					var fRule     = null,
    						sText     = '',
    						sType     = '',
    						sTypeVal  = '',
    						sPosition = '';
    					
    					if( rCode.test(aRule[i]) ){
    						var aChild = aRule[i].split('=');
    						
    						if( rFormat ){
    							if( aChild[0] === 'format' ){
    								aChild = ['format', aRule[i].replace(rFormat,'')];
    							}else{
    								var tmpVal = '';
    								tmpVal = aRule[i].replace(rFormat,'');
    								tmpVal = tmpVal.replace(/{{value}}/, sVal);
    								aChild = ['ajax', tmpVal];
    							}
    						}else if( aChild[0] === 'position' ){
    							console.log(1)
    						}
    						
    						fRule    = oThat.rule[aChild[0]];
    						sType    = aChild[0];
    						sTypeVal = aChild[1];
    						
    						if( fRule && isFunction(fRule) ){
    							sText = fRule(sVal, oItem, aChild[1]);
    						}
    						
    					}else{
    						
    						if( rPosition.test(aRule[i]) ){
    							var aRuleChild = aRule[i].split('|');
    							fRule     = oThat.rule[aRuleChild[0]];
    							sType     = aRuleChild[0];
    							sPosition = aRuleChild[1];
    							if( !/\{.*\}/g.test(sPosition) ){
    								sPosition = '';
    								console.log('定位的格式不正确');
    							}
    						}else{
    							fRule = oThat.rule[aRule[i]];
    							sType = aRule[i];
    						}
    						
    						if( fRule && isFunction(fRule) ){
    							sText = fRule(sVal, oItem);
    						}
    					}

    					if( sText ){
    						return {
    							html: sText,
    							type: sType,
    							typeVal: sTypeVal,
    							position: oThat.handlePositionStr(sPosition)
    						};
    					}
    				}
    				
    				return null;
    			},
    			
                handleText: function(oItem, sMark, sParam){
                    var arrtText    = oItem.attr('data-validate-'+ sMark +'Text'),
                        defaultText = p.text[sMark],
                        text        = arrtText ? arrtText : defaultText,
                        reg         = /{{param}}/;
    				oItem.attr('data-validate-'+ sMark +'Text', text);
                    return text.replace(reg, sParam);
                },
    			
    			handleMessage: function(oSelf, sContents, sType, sTypeVal, position){
    				var oThat     = this,
    					parents   = oSelf.parents('.ui-form'),
    					message   = parents.find('.ui-form-message'),
    					error     = parents.find('.l-form-error'),
    					oItems    = parents.find('[data-validate]'),
    					oTarget   = p.target,
    					oPosition = oThat.handlePositionStr( oItems.attr('data-validate-position') ),
    					html      = '<span class="error"><i></i>'+ sContents +'</span>',
    					fPosition = function(position){
    						message
    							.attr('style', '')
    							.css(position)
    							.css({position:'absolute'})
    							.addClass('ui-form-message-absolute')
    						parents.css({position:'relative'});
    						
    						message.append('<i class="ui-form-message-arrow"></i>');

    						message
    							.append(function(){
    								if( !message.find('.ui-form-message-arrow').length ) return '<i class="ui-form-message-arrow"></i>';
    							})
    							.find('.ui-form-message-arrow')
    							.addClass(function(){
    								if( position.top ) return 'arrowTop';
    								if( position.bottom ) return 'arrowBottom';
    							});
    					}
    					
    				if( !message.length ){
    					if( oSelf.next('.ui-form-message').length ){
    						message = oSelf.next('.ui-form-message');
    					}else if( message.length === 0 ){
    						message = oTarget.find('.ui-form-message');
    						message.length === 1 && message.html( html );
    						if(!g.getStatus()){
    							return;
    						}
    					}
    				}

    				if( !sContents ){
    					message.empty();
    					return false;
    				}
    				if( oItems.length !== 1 && error.length && sType ){
    					html = '<span class="error"><i></i>'+ oThat.handleText(error.eq(0), sType, sTypeVal) +'</span>';
    	 			}
    				
    				message.html( html );
    				
    				if( position ){
    					fPosition(position);
    				}else if(oPosition){
    					fPosition(oPosition);
    				}else if( p.position ){
    					fPosition(p.position);
    				}
    			},
    			
    			handleError: function(oSelf, oRoute){
    				var oThat      = this,
    					sHideError = oSelf.attr('data-ishideValidte'),
    					errorCls   = (sHideError === "true" && sHideError) ? 'l-form-error l-form-hideError' :'l-form-error',
    					type       = oRoute ? oRoute.type : null,
    					html       = oRoute ? oRoute.html : null,
    					typeVal    = oRoute ? oRoute.typeVal : null,
    					position   = oRoute ? oRoute.position : null;

    				if( html ){
    					oSelf
    						.addClass(errorCls)
    						.attr('data-validate-result', 'false')
    						.parents('.l-select-wrap')
    						.find('.l-select-single-init')
    						.addClass(errorCls);
    					oThat.handleMessage(oSelf, html, type, typeVal, position);
    				}else{
    					oSelf
    						.removeClass(errorCls)
    						.attr('data-validate-result', 'true')
    						.parents('.l-select-wrap')
    						.find('.l-select-single-init')
    						.removeClass(errorCls);
    					oThat.handleMessage(oSelf);
    				}
    				
    				return html;
    			},
    			
    			run: function(){
    				var oThat      = this,
    					oTarget    = p.target,
                        fRules     = p.rules,
                        fAjax      = p.ajax,
    					fAction    = function(oSelf){
    									var sVal     = oSelf.val(),
    										sRule    = oSelf.attr('data-validate'),
    										name     = oSelf.attr('data-validate-name'),
    										allName  = oTarget.find('[data-validate-name="'+ name +'"]'),
    										errorLen = oSelf.parents('.ui-form').find('.l-form-error').length,
    										oRoute   = null;

                                        if( nic.base.isFunction(fRules) && sRule === 'process' ){
                                            return processHandle(sRule, fRules(oSelf), true );
                                        }
                                        
                                        if( nic.base.isFunction(fAjax) && sRule === 'ajax' ){
                                            processHandle(sRule);
                                            fAjax(oSelf, function(status, isShow){
                                                processHandle(sRule, status, isShow);
                                            });
                                            return true;
                                        }

    									oRoute = oThat.route(oSelf);
    									
    									if( name ){
    										
    										if( oRoute ){
    											if( oRoute.type !== 'required' ){
    												return sVal && oThat.handleError(oSelf, oRoute);
    											}
    											
    											return allNameHandle();
    										}
    										
    										return oThat.handleError(allName);
    									}
    									
    									return oRoute ? 
    												oThat.handleError(oSelf, oRoute) : 
    												oThat.handleError(oSelf);
    									
    									function allNameHandle(){
    										
    										var obj     = allName.filter(function(){
    															return this.value;
    														}),
    											nullObj = allName.filter(function(){
    															return !this.value;
    														}),
    											okObj   = allName.filter(function(){
    															return this.getAttribute('data-validate-result') === 'true';
    														}),
    											noObj   = allName.filter(function(){
    															return this.getAttribute('data-validate-result') === 'false';
    														})
    										/*				
    										console.log(
    											errorLen, 
    											nullObj.length, 
    											okObj.length, 
    											!sVal, 
    											oSelf, 
    											noObj, 
    											oSelf.hasClass('l-form-error')
    										)*/			
    										
    										if( errorLen ){
    											
    											//全部不通过
    											if( errorLen === allName.length ){
    												return ;
    											}
    											
    											//当前无值且当前不通过、不是全部空值
    											if( !sVal && oSelf.hasClass('l-form-error') && nullObj.length !== allName.length ){
    												return oThat.handleError(oSelf);
    											}
    											
    											//当前无值且有不通过
    											if( !sVal && noObj.length ){
    												return ;
    											}
    											
    											//当前无值且有通过
    											if( !sVal && okObj.length ){
    												return ;
    											}

    											return oThat.handleError(oSelf, oRoute);
    										}
    										
    										//全部空值
    										if( nullObj.length === allName.length ){
    											return oThat.handleError(allName, oRoute);
    										}
    										
    										//无错且无空值
    										if( !nullObj.length ){
    											return ;
    										}
    										
    										//无错且当前是空值
    										if( !sVal ){
    											return ;
    										}
    										
    										return oThat.handleError(allName, oRoute);
    									}

                                        function processHandle(type, status, isShow){
    										return !status ?
    													oThat.handleError(
    														oSelf, 
    														type, 
    														isShow ? oSelf.attr('data-validate-'+ type +'Text') : ''
    													):
    													oThat.handleError(oSelf);
                                        }
    								},
    					fUnAction  = function(oSelf){
    									var sHideError   = oSelf.attr('data-ishideValidte'),
    										hideErrorCls = sHideError === "true" && sHideError ?
    															'l-form-error l-form-hideError' :
    															'l-form-error',
    										name         = oSelf.attr('data-validate-name'),
    										allName      = oTarget.find('[data-validate-name="'+ name +'"]'),
    										errorLen     = allName.parents('.ui-form').find('.l-form-error').length;

                                        if( oSelf[0].type === 'checkbox' || oSelf[0].type === 'radio' ){
                                            $("input[name='"+ oSelf[0].name +"']").removeClass(hideErrorCls);
                                        }
    									
    									if( allName.length && errorLen ){
    										return ;
    									}
    									
    									if( allName.length ){
    										oThat.handleError(allName);
    									}else{
    										oThat.handleError(oSelf);
    									}
    								},
    					fActionAll = function(){
    									var oItem = oTarget.find('[data-validate]'),
    										len   = oItem.length,
    										i     = 0;
    										
    									for(; i<len; i++){
    										if( !fAction( oItem.eq(i) ) ){
    											fUnAction( oItem.eq(i) );
    										}
    									}
    									return g.getStatus();
    								};
    				
    				oTarget
    					.on('blur', '[data-validate]', function(e){
    						fAction( $(e.currentTarget) );
    					})
    					.on('focus', '[data-validate]', function(e){
    						fUnAction( $(e.currentTarget) );
    					})
    					.on('change', 'select[data-validate]', function(e){
    						fAction( $(e.currentTarget) );
    					})
    					.on('submit', function(){
    						return fActionAll();
    					})
    					.on('all', function(){
    						return fActionAll();
    					});
    					
    				/*oTarget.on('blur', '.l-select-single-init', function(e){
    					var obj = $(this).parents('.l-select-wrap').find('[data-validate]');
    					if( obj.length ){
    						fAction( obj );
    					}
    				});
    				
    				oTarget.on('focus', '.l-select-single-init', function(e){
    					var obj = $(this).parents('.l-select-wrap').find('[data-validate]');
    					if( obj.length ){
    						fUnAction( $(e.currentTarget) );
    					}
    				});*/
    			},
    			
    			init: function(o){
    				for(var key in o){
    					if( o.hasOwnProperty(key) && o[key] !== undefined && p[key] !== undefined ){
    						p[key] = o[key];
    					}
    				}
    				
    				p.target = $(p.target);
    				
    				if( !p.target.length ){
    					console.log('target not find');
    				}
    				
    				c.run();
    			}
    		};
    		
    	g.reset = function(){
    		var oTarget  = p.target,
                oItem    = oTarget.find('[data-validate]'),
                oMessage = oTarget.find('.ui-form-message'),
                len      = oItem.length,
                i        = 0;
            
            for(; i<len; i++){
                oItem
                    .eq(i)
                    .val('')
                    .removeClass('l-form-error')
                    .next('.l-select-single')
                    .find('.l-select-single-init')
                    .removeClass('l-form-error');
                oMessage.eq(i).empty();
            }
    	};
    	
    	g.getStatus = function(){
    		var oTarget         = p.target,
    			oError          = oTarget.find('.l-form-error'),
    			oVisibleError   = oError.filter(function(){
    									var that = $(this);
    									return that.filter(':visible').length && ( that.filter(':enabled').length || that.hasClass('l-select-single-init') );
    								}),
    			oHideError      = oError.filter('.l-form-hideError'),
    			len             = oVisibleError.length + oHideError.length,
    			nErrorOffsetTop = oVisibleError.length ? oVisibleError.offset().top : 0;
    		
    		if( oVisibleError.length && $(window).height() < nErrorOffsetTop ){
    			$('html, body').animate({scrollTop:nErrorOffsetTop}, 500);
    			//oVisibleError.focus();
    		}

    		return !len;
    	};
    	
    	g.validatorAll = function(){
            return p.target.triggerHandler('all');
    	};
    	
    	g.reload = function(){
    		console.log('target overloaded');
    		c.init(o);
    	};

    	return c.init(o);
    };

module.exports = function(o){
	return o ? new Validator(o) : {};
};
