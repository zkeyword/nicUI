#### 说明

render是html接口升级版，render会传鼠标当前经过的jquery对象。

#### 调用方式

html:

	<div id="lt-wrap">
		<div data-message="请速发货1！" class="buyerMessagePop">鼠标移动到此</div>
		<div data-message="请速发货2！" class="buyerMessagePop">鼠标移动到此</div>
		<div data-message="请速发货3！" class="buyerMessagePop">鼠标移动到此</div>
		<div data-message="请速发货4！" class="buyerMessagePop">鼠标移动到此</div>
		<div data-message="请速发货5！" class="buyerMessagePop">鼠标移动到此</div>
		<div data-message="请速发货6！" class="buyerMessagePop">鼠标移动到此</div>
		<div data-message="请速发货7！" class="buyerMessagePop">鼠标移动到此</div>
	</div>

js:

	nic.ui.tip({
		target:'.buyerMessagePop',
		targetWrap:'#lt-wrap',
		width:100,
		render:function(obj){
			var h = '';
			h += '<div>买家留言</div>';
							
			if($.trim(obj.attr("data-message"))!=''){
				h += '<div>'+obj.attr("data-message")+'</div>';
			}	
			else{
				h += '<div>暂无</div>';
			}
			return h;
		}
	}); 