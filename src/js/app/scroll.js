(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.scroll = factory();
	}
}(this, function (){
	
	'use strict';
	
	var tool = {
			
			append: function(el, html, fn){
				var tmp      = document.createElement('div'), 
					fragment = document.createDocumentFragment();
				 
				tmp.innerHTML = html;
	
				for(var i = 0, children = tmp.children, len = children.length; i<len; i++){
					fragment.appendChild(children[i]);
				}
	
				el.appendChild(fragment);
	
				children = null;
				fragment = null;
				tmp      = null;
				
				fn.apply(el, []);
	
				return el;
			},
			
			/* 获取绝对定位 */
			getOffset: function( node ) {
				var nTop  = 0,
					nLeft = 0;
				
			    //var curtopscroll = 0;
			    if (node.offsetParent) {
			        do {
			        	nTop += node.offsetTop;
			        	nLeft += node.offsetLeft;
			            //curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
			        } while (node = node.offsetParent);
			    }
			    
		        return {
		        	top: nTop,
		        	left: nLeft
	        	}
			},
			
			/* 获取鼠标位置 */
			getMousePosition: function(e){
				var x,y;
				
				e = e || window.event;
				x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
				y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);   //具有 DTD 时用 document.documentElement.scrollTop 代替 document.body.scrollTop
				
				return{
					positionX : x,
					positionY : y
				}
			},
			
			/* 获取左边兄弟 */
			getPrevSibling: function(el){
				return el.previousElementSibling ? el.previousElementSibling : el.previousSibling;
			},
			
			/* 设置禁用选中 */
			setOnselectstart: function(e){
				document.all ? e.returnValue = false : e.preventDefault();
				document.onselectstart = function(){return false;};
			}
			
		};
	
	/*var SuperScroll = function(){};
	
	SuperScroll.prototype.init = function(){
		
	};*/
	
	var Scroll = function(options){
		
		var bMove          = false,
			//nSpeed         = options.speed,
			oDoc           = document,
			oScrollWrap    = oDoc.getElementById(options.scrollWrap),
			oScrollBtnWrap = tool.append(oScrollWrap, '<div class="l-scroll-btnWrap"><div class="l-scroll-btn"></div></div>', function(){
								oScrollWrap.className = 'l-scroll-wrap ' + oScrollWrap.className;
							}).lastChild,
			oScrollBtn     = oScrollBtnWrap.lastChild,
			oScrollContent = tool.getPrevSibling(oScrollBtnWrap),
			nWrapHeight	   = oScrollWrap.offsetHeight - 2, //border的高度
			nBtnHeight     = oScrollBtn.offsetHeight,
			nBtnDiff       = nWrapHeight - nBtnHeight,
			nContentHeight = oScrollContent.offsetHeight,
			nContentDiff   = nContentHeight - nWrapHeight,
			fScrll         = function(y){
								oScrollBtn.style.top = y + 'px';
								oScrollContent.style.marginTop = - (y/nBtnDiff)*nContentDiff +'px';
							},
			fMove          = function(e){
								var y = tool.getMousePosition(e).positionY - tool.getOffset(oScrollBtnWrap).top - nBtnHeight/2;

								fScrll(y>=nBtnDiff ? nBtnDiff : y<=1 ? 0 : y);
							},
			fWheel         = function(e){
								var wheelDelta,nDistance,nDistances;
								
								e          = e || window.event;
								wheelDelta = e.wheelDelta || e.detail;
								nDistance  = nBtnDiff*0.1;  //滚动基数
								nDistances = oScrollBtn.offsetTop;

								if( wheelDelta == -120 || wheelDelta == 3 ){
									nDistances = nDistances + nDistance;
									nDistances = nDistances >= nBtnDiff ? nBtnDiff : nDistances;
								}else if( wheelDelta == 120 || wheelDelta == -3 ){
									nDistances = nDistances - nDistance;
									nDistances = nDistances <= 1 ? 0 : nDistances
								}
								
								fScrll( nDistances );
								
								if( nDistances === 0 || nDistances === nBtnDiff ) return true;
								
								tool.setOnselectstart(e);
								return false;
							};
		
		oScrollContent.className    = 'l-scroll-contentWrap ' + oScrollContent.className;
		oScrollContent.style.width  = (oScrollWrap.offsetWidth - 15) + 'px';  //XXX: 短暂的滚动bug
		oScrollBtnWrap.style.height = nWrapHeight + 'px';
		
		if(nWrapHeight > nContentHeight){
			oScrollBtnWrap.style.display = 'none';
			return;
		}

		oScrollBtnWrap.onclick = function(e){
			fMove(e);
		}
		
		oScrollBtn.onmousedown = function(e){
			bMove = true;
			e = e || window.event;
			tool.setOnselectstart(e);
		}
		
		oDoc.onmouseup = function(){
			bMove = false;
		}

		oDoc.onmousemove = function(e){
			if(bMove) fMove(e);
		}
		
		oDoc.onmousewheel === undefined ? oScrollWrap.addEventListener('DOMMouseScroll', fWheel, true) : oScrollWrap.onmousewheel = fWheel;

	};
	
	Scroll.prototype.setHeight = function(){
		
	};
	
	Scroll.prototype.setWidth = function(){
		
	};

	return function(o){
		return o ? new Scroll(o) : {};
	};
	
}));