!function(t){function i(e){if(s[e])return s[e].exports;var a=s[e]={exports:{},id:e,loaded:!1};return t[e].call(a.exports,a,a.exports,i),a.loaded=!0,a.exports}var s={};return i.m=t,i.c=s,i.p="/",i(0)}([function(t,i){"use strict";var s=function(t){this.cur=t.cur||1,this.total=void 0===t.total?10:t.total,this.len=t.len?t.len:5,this.prevText=t.prevText||"上一页",this.nextText=t.nextText||"下一页",this.target=t.target,this.callback=t.callback||function(){},"String"==typeof this.target&&(this.target=document.getElementById(this.target)),this.target&&(this.init(),this.click(this.callback))};s.prototype.init=function(){var t="",i='<a href="javascript:;" data-index="{{num}}">{{num}}</a>',s='<a href="javascript:;" class="prev" data-index="{{num}}">'+this.prevText+"</a>",e='<a href="javascript:;" class="next" data-index="{{num}}">'+this.nextText+"</a>",a='<span class="current">{{num}}</span>',r='<span class="ellipsis">...</span>',n=function(t,i){return t.replace(/{{num}}/g,i)},h=3;if(this.len>=3&&(h=Math.round(this.len/2)),this.cur>=2&&(t+=n(s,this.cur-1)),this.cur>=4&&this.total>=this.len+1&&(t+=n(i,1),t+=r),this.len>=this.total)for(var c=1;c<=this.total;c++)t+=n(c===this.cur?a:i,c);else for(var c=1,l=!1,o=0;c<=this.len;c++)this.cur<h?(c===this.cur&&(l=!0),o=c):this.total-this.cur<h?(this.len-(this.total-this.cur)===c&&(l=!0),o=this.total-this.len+c):(c===h&&(l=!0),o=this.cur-h+c),t+=n(l?a:i,o),l=!1;this.total-this.cur>=h&&this.total>=this.len+1&&this.cur+this.len-h!==this.total&&(t+=r,t+=n(i,this.total)),this.total-this.cur>=1&&(t+=n(e,this.cur+1)),this.target.innerHTML=t},s.prototype.click=function(t){for(var i=this,s=this.target.getElementsByTagName("a"),e=s.length-1;e>=0;e--)s[e].onclick=function(){i.cur=Number(this.getAttribute("data-index")),i.init(),i.click(t),t.apply(this,[i.cur,i.total])}},t.exports=function(t){return t?new s(t):{}}}]);