//日期转化
function DateToTime(date) {
    //时间戳为10位(s)需*1000，时间戳为13位(ms)的话不需乘1000，默认时间戳单位为ms
    //yyyy
    let Y = date.getFullYear() + '/';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    let D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate());
    return Y + M + D;
}

//锚点相关
//toTop为上升按钮id
//jump为超链接标签id
function anchorPointJump(toTop, jump){
    $(window).on('scroll',function(){
        "use strict";
        var scrolled = $(window).scrollTop();
        if(scrolled > 0){
            document.getElementById(toTop).removeAttribute("hidden");
        }else{
            document.getElementById(toTop).setAttribute("hidden", true);
        }
    });
    //锚点配置动画
    $('#' + jump).click(function(){
        //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减50px（这里根据需要自由设置）
        $('html,body').animate({scrollTop: ($($(this).attr('href')).offset().top - 50 )},500);
    });
}