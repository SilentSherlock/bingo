var gnum = [], price = [], num = 0, sumprice = 0;

function buy() {//购买，向后台发送插入订单请求
    var canBuy = 0;
    var gids = [];

    var shoppingcar = JSON.parse(localStorage.getItem("shoppingcar"));
    var i = 0, length = shoppingcar.length, html = "";
    //生成订单时间
    var myDate = new Date();
    //生成订单ID
    let oid = "";
    var charac = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678";
    var temp1 = Math.random() * 57;
    var temp2 = Math.random() * 57;
    var temp3 = Math.random() * 57;
    var temp4 = Math.random() * 57;
    var temp5 = Math.random() * 57;
    let temp6 = Math.random() * 57;
    let temp7 = Math.random() * 57;
    let temp8 = Math.random() * 57;
    let temp9 = Math.random() * 57;
    let temp10 = Math.random() * 57;
    oid += charac.charAt(temp1) + charac.charAt(temp2) + charac.charAt(temp3) + charac.charAt(temp4) + charac.charAt(temp5)
        + charac.charAt(temp6) + charac.charAt(temp7) + charac.charAt(temp8) + charac.charAt(temp9) + charac.charAt(temp10);
    console.log("生成的oid为: " + oid);
    for (; i < length; i++) {
        if ((JSON.parse(localStorage.getItem("shoppingcar")))[i] == null) ;
        else {
            canBuy = 1;
            console.log("i为:" + i);
            console.log("购买数量为:" + gnum[i]);
            var item = 0, keylist = [];
            for (; item < gnum[i]; item++) {
                var key = "";
                temp1 = Math.random() * 57;
                temp2 = Math.random() * 57;
                temp3 = Math.random() * 57;
                temp4 = Math.random() * 57;
                temp5 = Math.random() * 57;
                key += charac.charAt(temp1) + charac.charAt(temp2) + charac.charAt(temp3) + charac.charAt(temp4) + charac.charAt(temp5);
                keylist.push(key);
            }
            console.log("生成的keylist为: " + keylist);
            gids.push(shoppingcar[i].gid);
            var orderDetail = {
                oid: oid,
                uid: userInfo.uid,
                gid: shoppingcar[i].gid,
                knum: gnum[i],
                klist: JSON.stringify(keylist),
                discount: shoppingcar[i].discount,
                otime: myDate,
            }
            console.log("订单详情\n oid:" + orderDetail.oid + "\n uid:" + orderDetail.uid + "\n gid:" + orderDetail.gid + "\n knum:" + orderDetail.knum
                + "\n klist:" + orderDetail.klist + "\n discount:" + orderDetail.discount + "\n otime:" + orderDetail.otime)
            $.post(
                "store/insertOrderDetail",
                orderDetail,
                function (result) {
                    console.log(result);
                }
            )
            console.log("gids: " + gids);
        }
    }
    if (canBuy == 0) {
        myAlert("购物车为空，快去添加自己喜欢的游戏吧~~~");
        return;
    }
    console.log("当前用户ID:" + userInfo.uid)
    //更改user表的个人游戏列表数据
    var data = {
        uid: userInfo.uid,
        gid: JSON.stringify(gids),
        mode: 1
    }
    $.post(
        "/person/updateGameListById", data,
        function (result) {
            console.log(result);
        }
    );
    myAlert("购买成功！");
}

//删除总价
function pricesum(num) {
    console.log("更前后的数量:" + gnum[$(num).attr("id")]);
    sumprice += ($(num).val() - gnum[$(num).attr("id")]) * price[$(num).attr("id")];
    gnum[$(num).attr("id")] = parseInt($(num).val());
    console.log("更改后的数量:" + gnum[$(num).attr("id")]);
    console.log("单价:" + gnum[$(num).attr("id")]);
    $("#sumprice").text(sumprice);
}

var templateDiv = $("#choose1")
$(".close").click(function () {
    templateDiv.removeClass("active")
    templateDiv.addClass("close")
    $(this).removeClass("close")
    $(this).addClass("active")
    templateDiv = $(this)
    console.log(templateDiv);
})

//删除商品
function deleteCar(game) {
    var GAMEID = $(game).attr("id");
    var shoppingcar = JSON.parse(localStorage.getItem("shoppingcar"));
    var i = 0, length = shoppingcar.length;
    for (; i < length; i++)
        if (JSON.parse(shoppingcar[i] == null)) {
            shoppingcar.splice(i, 1);
        } else if (GAMEID == shoppingcar[i].gid) {//删除游戏
            shoppingcar.splice(i, 1);
            break;
        }
    localStorage.setItem("shoppingcar", JSON.stringify(shoppingcar));
    window.alert("删除商品成功！");
    window.location.reload();
}

//加入心愿单
function addWishList(game) {
    var GAMEID = $(game).attr("id");
    console.log("游戏ID:" + GAMEID);
    var data = {
        uid: userInfo.uid
    }
    $.get(
        "/person/getUserById", data,
        function (result) {
            console.log(result);
            wishlist = result.resultMap.wishList;
            console.log(wishlist);
            if (wishlist === null) ;
            else {
                var i = 0, length = wishlist.length, exist = 0;
                for (; i < length; i++) {
                    /*console.log(wishlist[i].gid);
                    console.log(GAMEID);*/
                    if (GAMEID == wishlist[i].gid) {
                        exist = 1;
                        break;
                    }
                }
            }
            if (exist == 1) {
                window.alert("已在心愿单中！请勿重复添加");
            } else {
                var data = {
                    uid: userInfo.uid,
                    gid: GAMEID,
                    mode: 1
                }
                $.post(
                    "/person/updateWishListById", data,
                    function (result) {
                        console.log(result);
                    }
                )
                window.alert("加入心愿单成功！");
            }
        }
    )
}

$(document).ready(function () {
    function setInfo() {
        if (localStorage.getItem("shoppingcar") == null || (
            (JSON.parse(localStorage.getItem("shoppingcar")))[0] == null
            && (JSON.parse(localStorage.getItem("shoppingcar")))[1] == null)) ;
        var shoppingcar = JSON.parse(localStorage.getItem("shoppingcar"));
        var i = 0, length = shoppingcar.length, html = "";
        for (; i < length; i++) {
            if ((JSON.parse(localStorage.getItem("shoppingcar")))[i] == null) ;
            else {
                gnum[i] = 1;
                price[i] = shoppingcar[i].price * shoppingcar[i].discount;
                //读取购物车
                console.log("读取购物车");
                console.log(shoppingcar[i]);
                html += "<div class=\"myorder-elem\">\n" +
                    "                <span class=\"column1\">\n" +
                    "                    <span class=\"game-title\" id=\"1-1\">\n" +
                    "                        <img class=\"column1-img\" src=" + shoppingcar[i].chref + "id=\"\">\n" +
                    "                        <span class=\"column1-txt\">" + shoppingcar[i].gname + "</span>\n" +
                    "                    </span>\n" +
                    "                </span>\n" +
                    "                <div class=\"price\" id=\"\">￥" + shoppingcar[i].price * shoppingcar[i].discount + "</div>\n" +
                    "                <div class=\"row3\" id=\"\">\n" +
                    "                    <input type=\"number\" step='1'  onchange='pricesum(this)'  class=\"num\" id=" + i + " onkeydown=\"return false;\" max=\"10\" min=\"1\" value=\"1\">" +
                    "                </div>\n" +
                    "<div class=\"operate\">\n" +
                    "                    <div class=\"sum1\"><button class=\"da btn-secondary\" onclick='deleteCar(this) 'id=" + shoppingcar[i].gid + ">删除</button></div>\n" +
                    "                    <div class=\"sum1\"><button class=\"da btn-info\" onclick='addWishList(this)' id=" + shoppingcar[i].gid + ">加入心愿单</button></div>\n" +
                    "                </div></div>";
                num++;
                sumprice += shoppingcar[i].price * shoppingcar[i].discount;
            }
        }
        $("#order-main").append(html);
        $("#num").text(num);
        $("#sumprice").text(sumprice);
    }

    $("#choose1").removeClass("close")
    $("#choose1").addClass("active")
    setInfo()
})