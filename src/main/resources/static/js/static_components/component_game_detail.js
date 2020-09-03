var game, systemReq
var systemResult
var GAMEID
var GAMEINFO
var videohref

/**
 * 作者: lwh
 * 时间: 2019.12.10
 * 描述: 转换日期格式(时间戳转换为datetime格式yyyy:mm:dd hh:mm:ss)
 */
function timestampToTime(timestamp) {
    //时间戳为10位(s)需*1000，时间戳为13位(ms)的话不需乘1000，默认时间戳单位为ms
    let date = new Date(parseInt(timestamp));
    //yyyy
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
}


//
function change(typp) {
    console.log("点击元素:" + $(typp).attr("id"));
    if ($(typp).attr("id") === "video" || $(typp).attr("id") === "videochild") {
        document.getElementById("show").innerHTML = "<video class=\"videoPlayer\" src=" + game.vhref + " id=\"videoPlayer\" controls=\"controls\"  autobuffer muted >\n" +
            "</video>"
    } else {
        document.getElementById("show").innerHTML = "<img src=" + $(typp).attr("src") + " class='default-height' />";
    }
}

//根据分数显示星星
function star(score, string) {
    var sc = 9, i, item = 5;
    for (i = score; i >= 2; i -= 2) {
        string = "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-star-fill star\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path  d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>\n" +
            "</svg>" + string;
        item -= 1;
    }
    for (item; item > 0; item--) {
        string = string + "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-star star\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path fill-rule=\"evenodd\" d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z\"/>\n" +
            "</svg>";
    }
    return string;
}

function addCar() {//加入购物车
    if (userInfo.uid === undefined) {
        myAlert("请登录后进行操作!");
        return;
    }
    /* num = window.prompt("输入购买数量");
     if(isNaN(buynum=parseInt(num,10))){
         window.alert("请输入整数!!!");
     }
     else{
         sessionStorage.getItem("shoppingcar");
         //加入购物车
         var i=0,keylist = [];
         var charac = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678";
         for(; i<buynum;i++){
             var key = "";
             var temp1= Math.random()*57;
             var temp2= Math.random()*57;
             var temp3= Math.random()*57;
             var temp4= Math.random()*57;
             var temp5= Math.random()*57;
             key += charac.charAt(temp1) + charac.charAt(temp2)+ charac.charAt(temp3)+ charac.charAt(temp4)+ charac.charAt(temp5);
             keylist.push(key);
         }
         console.log("key为: "+keylist);*/
    var item = {
        "gid": parseInt(GAMEID),
        "discount": game.discount,
        "price": game.gprice,
        "gname": game.gname,
        "chref": game.chref
    }
    var shoppingcar = [], exist = 0;
    //判断购物车是否为空或购物车不存在
    if (localStorage.getItem("shoppingcar") == null || (JSON.parse(localStorage.getItem("shoppingcar")))[0] == null) ;
    else {
        exist = 1;//购物车存在，但商品不在购物车中;
        console.log("购物车存在")
        shoppingcar = JSON.parse(localStorage.getItem("shoppingcar"));
        var i = 0, length = shoppingcar.length;
        for (; i < length; i++) {
            if (JSON.parse(shoppingcar[i] == null)) {
                delete shoppingcar[i];
            } else if (GAMEID == shoppingcar[i].gid) {
                exist = 2;
                console.log("购物车存在，商品在购物车中")
                window.alert("已加入购物车，请勿重复添加！");
                break;
            }
        }
    }
    if (exist == 0 || exist == 1) {//购物车中没有该商品
        shoppingcar.push(item);
        localStorage.setItem("shoppingcar", JSON.stringify(shoppingcar));
        /*car = localStorage.getItem("shoppingcar");
        carContent = JSON.parse(car);
        console.log(carContent);
        console.log(carContent[0]);*/
        window.alert("加入购物车成功！");
    }
}

function buy() {//购买，向后台发送插入订单请求
    if (userInfo.uid === undefined) {
        myAlert("请登录后进行操作!");
        return;
    }
    var num, gnum = 1, buynum;
    num = window.prompt("输入购买数量(1~10的整数)");
    if (num === null)
        return;
    if (isNaN(buynum = parseInt(num, 10))) {
        window.alert("请输入整数!!!");
    } else if (buynum > 10 || buynum <= 0 || num != buynum) {
        window.alert("无效输入,请输入1~10之间的整数!!!");
        return;
    } else {
        console.log("购买数量为: " + buynum);
        //插入订单
        var i = 0, keylist = [];
        var charac = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678";
        for (; i < buynum; i++) {
            var key = "";
            var temp1 = Math.random() * 57;
            var temp2 = Math.random() * 57;
            var temp3 = Math.random() * 57;
            var temp4 = Math.random() * 57;
            var temp5 = Math.random() * 57;
            key += charac.charAt(temp1) + charac.charAt(temp2) + charac.charAt(temp3) + charac.charAt(temp4) + charac.charAt(temp5);
            keylist.push(key);
            console.log("生成的key为: " + key)
        }

        //生成订单ID
        let oid = "";
        temp1 = Math.random() * 57;
        temp2 = Math.random() * 57;
        temp3 = Math.random() * 57;
        temp4 = Math.random() * 57;
        temp5 = Math.random() * 57;
        let temp6 = Math.random() * 57;
        let temp7 = Math.random() * 57;
        let temp8 = Math.random() * 57;
        let temp9 = Math.random() * 57;
        let temp10 = Math.random() * 57;
        oid += charac.charAt(temp1) + charac.charAt(temp2) + charac.charAt(temp3) + charac.charAt(temp4) + charac.charAt(temp5)
            + charac.charAt(temp6) + charac.charAt(temp7) + charac.charAt(temp8) + charac.charAt(temp9) + charac.charAt(temp10);
        console.log("生成的oid为: " + oid);

        var myDate = new Date();
        var orDetails = {
            oid: oid,
            uid: userInfo.uid,
            gid: GAMEID,
            knum: buynum,
            klist: JSON.stringify(keylist),
            discount: game.discount,
            otime: myDate,
        }
        console.log(orDetails);
        $.post(
            "store/insertOrderDetail",
            orDetails,
            function (result) {
                console.log(result);
            }
        )
        var gids = [];
        gids.push(parseInt(GAMEID));
        var data = {
            uid: userInfo.uid,
            gid: JSON.stringify(gids),
            mode: 1
        }
        console.log(JSON.stringify(gids));
        $.post(
            "/person/updateGameListById", data,
            function (result) {
                console.log(result);
            }
        );
        window.alert("购买成功！");
    }
}

function addWishList() {
    if (userInfo.uid === undefined) {
        myAlert("请登录后进行操作!");
        return;
    }
    var data = {
        uid: userInfo.uid
    }
    $.get(
        "/person/getUserById", data,
        function (result) {
            console.log(result);
            wishlist = result.resultMap.wishList;
            console.log(wishlist);
            var i = 0, exist = 0;
            if (wishlist == null) ;
            else {
                var length = wishlist.length;
                for (; i < length; i++) {
                    console.log(wishlist[i].gid);
                    console.log(GAMEID);
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
                $(".bi-heart").hide();
                $(".bi-heart-fill").show();
            }
        }
    )
}

$(document).ready(function () {
    //获取游戏ID
    var loc = location.href;
    var n1 = loc.length;
    var n2 = loc.indexOf('=');
    GAMEID = game_detail_gid;

    function getinfo() {
        var data = {
            id: GAMEID
        };
        //更改游戏信息
        $.get("store/gameDetailShow", data,
            function (result) {
                game = result.resultMap.game;
                //
                console.log(result);
                document.getElementById("title").innerText = game.gname;
                document.getElementById("detail").innerText = game.detail;
                document.getElementById("cover").src = game.chref;
                videohref = game.vhref;
                console.log(videohref);
                //显示视频
                document.getElementById("show").innerHTML = "<video class=\"videoPlayer\" src=\"" + game.vhref + "\" " + "id=\"videoPlayer\"  controls=\"controls\"  autobuffer muted >\n" + "</video>";

                //截取第一帧做封面
                var canvas = document.createElement("canvas");
                video = document.getElementById("videoPlayer");
                canvas.width = 145;
                canvas.height = 82;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                console.log();
                document.getElementById("video").src = canvas.toDataURL("image/png");
                console.log("图片源: " + canvas.toDataURL("image/png"));

                document.getElementById("elem1").src = game.phref;
                document.getElementById("elem2").src = game.phref;
                document.getElementById("elem3").src = game.phref;
                document.getElementById("elem4").src = game.phref;
                document.getElementById("elem5").src = game.phref;
                document.getElementById("elem6").src = game.phref;
                document.getElementById("developer").innerText = game.developer;
                document.getElementById("publisher").innerText = game.publisher;
                document.getElementById("realeasedate").innerText = game.realeasedate.substr(0, 10);

                var temp = JSON.parse(game.platform);
                document.getElementById("platform").innerText = temp;
                temp = JSON.parse(game.language);
                document.getElementById("language").innerText = temp;
                temp = JSON.parse(game.gtype);
                document.getElementById("gtype").innerText = temp;

                var time = game.realeasedate;
                console.log("发行时间:" + time);
                console.log(typeof game.realeasedate);

                if (new Date(game.realeasedate).getTime() > new Date().getTime()) {
                    $("#discount").text("发售日期：" + game.realeasedate);
                    $("#gprice").hide();
                    $("#realPrice").hide();
                    $(".box-buy").hide();
                } else {
                    console.log("discount", game.discount);
                    if (game.discount !== 1) {
                        document.getElementById("discount").innerText = "-" + ((1 - game.discount) * 100).toFixed() + "%";
                        document.getElementById("gprice").innerText = "￥" + game.gprice;
                    } else {
                        $(".off-discount").hide();
                        $("#gprice").hide();
                        $(".shoopingcat").css("margin-top", "32px");
                    }
                    document.getElementById("realPrice").innerText = "￥" + game.discount * game.gprice;
                }

                //提取游戏配置信息
                systemReq = JSON.parse(game.systemreq);
                //显示游戏评分
                if (game.gscore === null || game.gscore === "")
                    $("#gscore").text("0");
                else
                    $("#gscore").text(game.gscore);
                var score = parseInt(game.gscore);
                var html = "";
                html = star(score, html);
                $("#gstar").html(html);

                //显示最低配置
                function getsystem1() {
                    if (systemReq === "" || systemReq === null)
                        return;
                    var data = {
                        id: systemReq[0]
                    };
                    $.get("store/systemReqShow", data,
                        function (sysResult) {
                            systemResult = sysResult.resultMap.systemReq;
                            // console.log(systemResult);
                            document.getElementById("cpu1").innerText = systemResult.cpu;
                            document.getElementById("gpu1").innerText = systemResult.gpu;
                            document.getElementById("os1").innerText = systemResult.os;
                            document.getElementById("ram1").innerText = systemResult.ram;
                            document.getElementById("harddisk1").innerText = systemResult.harddisk;
                        })
                }

                //显示推荐配置
                function getsystem2() {
                    if (systemReq === "" || systemReq === null)
                        return;
                    var data = {
                        id: systemReq[1]
                    };
                    $.get("store/systemReqShow", data,
                        function (sysResult) {
                            systemResult = sysResult.resultMap.systemReq;
                            // console.log("查询配置2")
                            // console.log(systemResult);
                            document.getElementById("cpu2").innerText = systemResult.cpu;
                            document.getElementById("gpu2").innerText = systemResult.gpu;
                            document.getElementById("os2").innerText = systemResult.os;
                            document.getElementById("ram2").innerText = systemResult.ram;
                            document.getElementById("harddisk2").innerText = systemResult.harddisk;
                        })
                }

                getsystem1()
                getsystem2()
            }
        )
    }

    //显示评测信息
    function getEvaluation() {
        var data = {
            idType: "gid",
            idValue: GAMEID
        }
        $.get(
            "store/evaluationShow", data,
            function (evaList) {
                if (evaList.resultMap.evaluationList_gid === "查询评测为空")
                    return;
                console.log("evaList", evaList.resultMap.evaluationList_gid);
                var conList = evaList.resultMap.evaluationList_gid;
                var i = 0, item = 0;//item控制显示评论数目
                var html = "", html1 = "", html2 = "", html3 = "";
                $.each(conList, function (key, value) {
                    //先行添加头像和昵称，然后加载评论内容
                    $.get(
                        "/person/getUserById" + "?uid=" + value.uid,
                        function (userResult) {
                            // var html="";
                            // console.log(value);
                            var user = userResult.resultMap.user;
                            html1 = "<div class=\"sElem\"><div class=\"score-1-3-1\">\n" +
                                "                            <div class=\"Avatar\">\n" +
                                "                                <img class=\"uAvatar\" src=" + user.uavatar + ">\n" +
                                "                            </div>\n" +
                                "                            <div class=\"uname\">" + user.ualias + "</div>\n" +
                                "                        </div>"
                            //加载评论
                            html1 += "<div class=\"score-1-3-2\">\n" +
                                "                            <div class=\"score1\">\n";
                            //加载星星
                            html2 = star(value.score, "");
                            html3 =
                                "\n" +
                                "                            </div>\n" +
                                "                            <div class=\"score2\">发布于<span>" + value.etime.substr(0, 19) + "</span></div>\n" +
                                "                            <div class=\"score3\">" + value.content + "</div>\n" +
                                "                        </div></div>";
                            html = html1 + html2 + html3;
                            // console.log("加载一条评论");
                            var tempID = "#scoreElem" + (key + 1);
                            // console.log(tempID);
                            $("#scoreElem").append(html);
                        }
                    )
                })
            }
        )
    }

    //设定是否显示评测入口，只在用户有游戏且未评价的情况下显示入口
    function setEvaluation() {
        console.log("evaluation userInfo", userInfo);
        if (userInfo.uid === undefined)
            return;
        var data = {
            uid: userInfo.uid
        };
        //查询是否有此游戏
        $.get("/person/getUserById", data,
            function (result) {
                //获取游戏ID
                var loc = location.href;
                var n1 = loc.length;
                var n2 = loc.indexOf('=');
                var txt = decodeURI(loc.substr(n2 + 1, n1 - n2));

                console.log("游戏ID: " + txt);
                gamelist = JSON.parse(result.resultMap.user.gamelist);
                console.log(gamelist);
                var i = 0, j = gamelist.length, ok = 0;
                for (; i < j; i++) {
                    console.log("查找到的游戏ID: " + gamelist[i])
                    if (txt == gamelist[i]) {
                        ok = 1;//用户拥有此游戏
                        console.log("用户拥有此游戏");
                        break;
                    }
                }
                if (ok == 1) {
                    //查找用户是否评论过
                    var data = {
                        gid: txt,
                        uid: userInfo.uid
                    }
                    $.get(
                        "store/searchEvaluationByUidAndGid", data,
                        function (result) {
                            console.log("evaluation result", result);
                            if (result.status == 0) {
                                //添加入口
                                console.log("用户暂未评论");
                                $("#addContent").show();
                            }
                        })
                }
            })
    }

    $("#submit").click(function () {
        //获取游戏ID
        var loc = location.href;
        var n1 = loc.length;
        var n2 = loc.indexOf('=');
        var txt = decodeURI(loc.substr(n2 + 1, n1 - n2));

        var myDate = new Date();
        if ($("#content-txt").val() != "" && $("#content-score").val() != "") {
            console.log(myDate);
            var data = {
                uid: userInfo.uid,
                gid: txt,
                content: $("#content-txt").val(),
                score: $("#content-score").val(),
                etime: timestampToTime(myDate.getTime())
            }
            $.post(
                "store/evaluationAddHandle", data,
                function (result) {
                    console.log(result);
                }
            )
            window.location.reload();
        }
    })
    getinfo()
    getEvaluation()
    setEvaluation()
})