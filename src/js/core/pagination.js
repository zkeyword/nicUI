/*

pagination({
	cur:17,
	total:20,
	target: 'wrap',
	prevText: 'prev',
	nextText: 'next',
	len:8,
	callback: function(cur, total){
		console.log(cur, total)
	}
});

*/


'use strict';

var Pagination = function(options){

	this.cur      = options.cur || 1;
	this.total    = options.total === undefined ? 10 : options.total;
	this.len      = options.len ? options.len : 5;
	this.prevText = options.prevText || '上一页';
	this.nextText = options.nextText || '下一页';
	this.target   = options.target;
	this.callback = options.callback || function(){};
	
	if( typeof this.target === 'String' ){
		this.target = document.getElementById(this.target);
	}
	if( !this.target ) return;
	
	this.init();
	this.click(this.callback);
}

Pagination.prototype.init = function() {

	var tmp      = '',
		link     = '<a href="javascript:;" data-index="{{num}}">{{num}}</a>',
		prev     = '<a href="javascript:;" class="prev" data-index="{{num}}">'+ this.prevText +'</a>',
		next     = '<a href="javascript:;" class="next" data-index="{{num}}">'+ this.nextText +'</a>',
		cur      = '<span class="current">{{num}}</span>',
		ellipsis = '<span class="ellipsis">...</span>',
		haddle   = function(src, num){
						return src.replace(/{{num}}/g, num);
					},
		showNum  = 3;
	
	/* 显示的长度 */			
	if( this.len >= 3 ){
		showNum = Math.round(this.len/2);
	}
	
	/* 上一页 */
	if( this.cur >= 2 ){
		tmp += haddle(prev, this.cur - 1)
	}
	
	/* 前置省略号 */
	if( this.cur >= 4 && this.total >= this.len + 1 ){
		tmp += haddle(link, 1);
		tmp += ellipsis;
	}
	
	/* 连接 */
	if( this.len >= this.total ){
		for(var i = 1; i<=this.total; i++){
			tmp += haddle(i === this.cur ? cur : link, i);
		}
	}else{
		for(var i = 1, isCur = false, num = 0; i<=this.len; i++){

			if( this.cur < showNum ){
				if( i === this.cur ){
					isCur = true;
				}
				num = i;
			}else if(this.total - this.cur < showNum){
				if( this.len - (this.total - this.cur) === i ){
					isCur = true;
				}
				num = this.total - this.len + i;
			}else{
				if( i === showNum ){
					isCur = true;
				}
				num = this.cur - showNum + i;
			}

			tmp += haddle(isCur ? cur : link, num);
			isCur = false;
		}
	}
	
	/* 后置省略号 */
	if( this.total - this.cur >= showNum && this.total >= this.len + 1 && this.cur + this.len - showNum !== this.total  ){
		tmp += ellipsis;
		tmp += haddle(link, this.total)
	}
	
	/* 下一页 */
	if( this.total - this.cur >= 1 ){
		tmp += haddle(next, this.cur + 1)
	}

	this.target.innerHTML = tmp;
};

Pagination.prototype.click = function(fn){
	var that = this,
		oA   = this.target.getElementsByTagName('a');

	for (var i = oA.length - 1; i >= 0; i--) {
		oA[i].onclick = function(){
			that.cur = Number(this.getAttribute('data-index'));
			that.init();
			that.click(fn);
			fn.apply(this, [that.cur, that.total]);
		}
	};
}
	
module.exports = function(o){
	return o ? new Pagination(o) : {};
};
