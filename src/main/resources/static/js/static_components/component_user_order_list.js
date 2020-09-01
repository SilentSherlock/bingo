var templateDiv = $("#choose1")
$(".close").click(function () {
    templateDiv.removeClass("active")
    templateDiv.addClass("close")
    $(this).removeClass("close")
    $(this).addClass("active")
    templateDiv = $(this)
})

var aCode = [];//保存激活码的数组
var pageNum, nowPage = 1;//记录当前页码和总页码
//显示游戏名称
function on(typp) {
    $("#txt" + $(typp).attr("id")).show();
}

function leave(typp) {
    $("#txt" + $(typp).attr("id")).hide();
}

//显示激活码
function showCode(order) {
    for (let key in aCode) {
        if (aCode[key].orderoid == order.id) {
            //window.alert(aCode[key].key);
            myAlert(aCode[key].key);
            break;
        }
    }
}

function change(num) {
    if ($(num).attr("id") == -1) {
        if (nowPage == 1) {
        } else {
            nowPage -= 1;
            setinfo(nowPage);
        }
        console.log("上一页")
    } else if ($(num).attr("id") == 0) {
        if (nowPage + 1 > pageNum) {
        } else {
            nowPage += 1;
            setinfo(nowPage);
        }
        console.log("下一页")
    } else {
        nowPage = $(num).attr("id");
        setinfo(nowPage);
        console.log("跳转到指定页")
    }
}

function setinfo(defaultNum) {
    $("#content").html("                <div class=\"order-title\">\n" +
        "                    <div class=\"row1\">商品名称</div>\n" +
        "                    <div class=\"row2\">购买日期</div>\n" +
        "                    <div class=\"row3\">订单号</div>\n" +
        "                    <div class=\"row3\">总计</div>\n" +
        "                </div>");
    $("#Pages").html("");
    var data = {
        uid: userInfo.uid,
        pageIndex: defaultNum - 1,
        pageCount: 10
    }
    $.post(
        "store/getOrderListByUid", data,//查询用户订单
        function (result) {
            pageNum = result.resultMap.allPageNum; // 页码总数
            var order = result.resultMap.orderList;//订单数组
            for (let key in order) {
                var activeCode = "";//临时保存激活码数组
                //处理一行订单列表
                let oid = order[key].oid;
                //订单html代码头部
                var html = "<div class=\"myorder-elem\">\n" +
                    "                    <span class=\"column1\">";
                $.ajax({
                    url: "store/getOrderDetailByOid",
                    data: {
                        oid: oid
                    },
                    type: 'post',
                    async: false,
                    success: function (res) {
                        for (let key in res.resultMap.orderDetail) {
                            $.ajax({
                                url: "store/gameDetailShow" + "?id=" + res.resultMap.orderDetail[key].gid,
                                type: 'post',
                                async: false,
                                success: function (gameResult) {
                                    // console.log(gameResult);
                                    var gameitem = gameResult.resultMap.game;
                                    //加载游戏封面和名称
                                    html += "                        <span class=\"column1-elem\" id=" + oid + "-" + gameitem.gid + " onmouseover=\"on(this)\" onmouseout=\"leave(this)\">\n" +
                                        "                            <img src=" + gameitem.chref + ">\n" +
                                        "                            <span class=\"column1-elem-txt\" id=" + "txt" + oid + "-" + gameitem.gid + ">" + gameitem.gname + "</span>\n" +
                                        "                        </span>";
                                    //为激活码记录游戏名称
                                    activeCode += gameitem.gname + "的激活码:  " + res.resultMap.orderDetail[key].klist;
                                }
                            })
                            //activeCode += "\n";//每个游戏换行一次
                            activeCode += "<br/><br/>";//每个游戏换行一次
                        }
                    }
                })
                //订单html代码尾部
                html += " </span>\n" +
                    "                <div class=\"row2\">" + order[key].otime.substr(0, 19) + "</div>\n" +
                    "                <div class=\"row3\">" + order[key].oid + "</div>\n" +
                    "                <div class=\"row3\">"
                console.log("换行");
                //填写价格
                html += "￥" + order[key].allprice;
                html += "</div>\n" +
                    "                <div class=\"condition\" id=\"showCode\">\n" +
                    "                    <button class=\"condition btn-info\"  id=" + order[key].oid + " onclick=\"showCode(this)\">查看激活码</button>\n" +
                    "                </div>\n" +
                    "            </div>";
                $("#content").append(html);
                var code = {
                    orderoid: order[key].oid,
                    key: activeCode
                }
                aCode.push(code);
                console.log("加入激活码列表" + aCode);
            }
            //设置页码总数
            var html = "            <nav aria-label=\"Page navigation\">\n" +
                "                <ul class=\"pagination\">\n" +
                "                    <li>\n" +
                "                        <a href=\"#\" aria-label=\"Previous\" id=" + -1 + " " + "onclick='change(this)'>\n" +
                "                            <span aria-hidden=\"true\">&laquo;</span>\n" +
                "                        </a>\n" +
                "                    </li>\n"
            console.log("pageNum:" + pageNum);
            var i = 1;
            for (; i <= pageNum; i++) {
                if (i == nowPage) {
                    html += "<li class='active'><a href=\"#\" id=" + i + " " + "onclick='change(this)'>" + i + "</a></li>\n"
                } else {
                    html += "<li><a href=\"#\" id=" + i + " " + "onclick='change(this)'>" + i + "</a></li>\n"
                }
            }
            html +=
                "                    <li>\n" +
                "                        <a href=\"#\" aria-label=\"Next\" id=" + 0 + " " + "onclick='change(this)'>\n" +
                "                            <span aria-hidden=\"true\" >&raquo;</span>\n" +
                "                        </a>\n" +
                "                    </li>\n" +
                "                </ul>\n" +
                "            </nav>\n"
            $("#Pages").append(html);
        }
    )
}

$(document).ready(function () {
    $("#choose1").removeClass("close")
    $("#choose1").addClass("active")
    setinfo(1)
})