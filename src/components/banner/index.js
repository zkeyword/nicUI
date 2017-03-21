define(function(require){

    require('./index.styl')
    
    var banner = function(options){

        var target  = $(options.target),
            ulSelf  = $(options.ulSelf),
            liSelf  = $(options.liSelf),
            num     = liSelf.length,//获取焦点图的个数
            fwidth  = liSelf.width(),//获取每个焦点图的宽度
            sec     = 4000;//时间切换间隔
            btn     = '<ul class="btn"><li class="cur">1+</li>',//缩略图 轮播按钮第一个
            btnend  = '</ul>';
        
        for(i=0;i<=num-2;i++){btn += '<li>'+(i+2)+'</li>';};//缩略图 轮播按钮其他
        
        btn += btnend;
        
        if(num == 1){btn = null};
        
        target.append(btn);//自动根据焦点图个数，添加切换按钮，如果只有一张图片则不显示切换按钮。
        
        ulSelf.css("width",fwidth*num);//设定大图集合的宽度，也就是所有焦点图宽度的和。
        
        // target.hover(function(){
        //     $('.leftPre,.rightNext').show();
        // },function(){
        //     $('.leftPre,.rightNext').hide();
        // });
        
        $(".btn li").bind("click",function(){
            $(this).addClass("cur").siblings().removeClass("cur");
            var i=$(".btn li").index(this),
                marginL=fwidth*i;
            ulSelf.animate({"left":-marginL},500);}
        );//鼠标指向按钮，焦点图切换到对应位置，按钮样式改变。mouseover是鼠标经过时，这里也可以改成click，通过点击切换焦点图。
        
        $(".btn li").html();
        
        picTimer = setInterval(timeset,sec); //指定sec毫秒后执行一次timeset函数。
        
        function timeset(){//向右侧滚动一个
        
            var j = $(".btn li").index($(".btn .cur"));//取得 当前焦点图的位置，即class为cur的序号。
            
            var timew = fwidth*(j+1);
            
            if(j == num-1){
                $(".btn li").eq(0).addClass("cur").siblings().removeClass("cur");$(".bigPic").animate({"left":0},200);
            }else{
                $(".btn li").eq(j+1).addClass("cur").siblings().removeClass("cur");
                ulSelf.animate({"left":-timew},500);
            };
        
        };
        function timesetl(){//像左侧滚动
        
            var j = $(".btn li").index($(".btn .cur"));//取得 当前焦点图的位置，即class为cur的序号。j由0开始 最后一个j=num-1
            
            var timew = fwidth*(j-1);//
            
            if(j == 0){
                $(".btn li")
                      .eq(num-1)
                      .addClass("cur")
                      .siblings()
                      .removeClass("cur");
                $(".bigPic").animate({"left":-fwidth*(num-1)},200);
                console.log(fwidth)
            }else{
                $(".btn li")
                    .eq(j-1)
                    .addClass("cur")
                    .siblings()
                    .removeClass("cur");
                ulSelf.animate({"left":-timew},200);
                console.log(timew, j)
            };
        
        };
         
        
        target.mouseover(function(){clearInterval(picTimer);});
        
        target.bind("mouseout",function(){picTimer = setInterval(timeset,sec);});//当鼠标指向焦点图或者是切换按钮时，定时器清除，即不在执行自动切换，鼠标离开则恢复自动切换。
        
        $(".rightNext").click(function(){//左右滚动按钮执行函数
            timeset();
        });
        $(".leftPre").click(function(){//左右滚动按钮执行函数
            timesetl();
            console.log(1)
        });


    }

        

    
    return function(o){
        return new banner(o);
    }

});