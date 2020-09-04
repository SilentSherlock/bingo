var templateDiv = $("#choose1")
var uid = userInfo.uid;
var list;
var thisUser;
$(document).ready(function () {
    function getUser() {
        // $.get(
        //     "/person/getUserById?uid=".concat(1),
        //     function (user) {
        //         console.log(user)
        //         thisUser = user.resultMap.user;
        //         list = user.resultMap.wishList;
        //         $(".wish-list-owner").text(thisUser.ualias + "的心愿单");
        //     }
        // )
        $.ajax({
            url: '/person/getUserById?uid='.concat(uid),
            type: 'get',
            async: false,
            success: function (user) {
                console.log(user)
                thisUser = user.resultMap.user;
                list = user.resultMap.wishList;
                $(".wish-list-owner").text(thisUser.ualias + "的心愿单");
            }
        })
    }

    function getWishList() {
        if (list == null || list.status == 0) {
            $(".count").text("0");
            return;
        }
        $(".count").text(list.length);
        var html = "";
        for (var i = 0; i < list.length; i++) {
            var wish = list[i]
            var temp = (parseFloat(wish.gprice) * (parseFloat(wish.discount))).toString();
            if (temp.length > 6) {
                temp.substr(0, 6);
            }
            var typelist = wish.gtype;
            typelist = typelist.substring(1, typelist.length - 1);
            //console.log(typelist)
            typelist = typelist.split(",")

            html +=
                "<div class=" + "wish-list-block" + ">" +
                "<span class=" + "image-wrapper" + ">" +
                "<img src=" + wish.chref + ">" +
                "</span>" +
                //下面a的href为game_detail?gid=wish.gid
                "<a class=" + "title" + " " + "href='javascript:void(0)' onclick='showGameDetail(" + wish.gid + ")'>" + wish.gname + "</a>" +

                "<div class=" + "shopping-operator" + ">" +
                "<ul>"
            if (new Date(wish.realeasedate) < new Date()) {
                html +=
                    "<li><button id=" + wish.gid + "-1" + " " + "class=" + "button1" + ">加入购物车</button></li>"
            }
            html +=
                "<li><button id=" + wish.gid + "-2" + " " + "class=" + "button2" + ">移出心愿单</button></li>" +


                "</ul>" +
                "</div>" +
                "<div class=" + "sale-price" + ">" +
                "<span>￥" + temp + "</span>" +
                "</div>" +
                "</div>"
        }
        $(".wish-list-content").html(html)
    }

    $(".close").click(function () {
        console.log("click 1")
        templateDiv.removeClass("active")
        templateDiv.addClass("close")
        $(this).removeClass("close")
        $(this).addClass("active")
        templateDiv = $(this)
    })
    $(document).on("click", ".close", function () {
        templateDiv.removeClass("active")
        templateDiv.addClass("close")
        $(this).removeClass("close")
        $(this).addClass("active")
        templateDiv = $(this)
    })

    $("#choose1").removeClass("close")
    $("#choose1").addClass("active")
    getUser()
    getWishList()

})

function reload() {
    location.reload();
}

$(document).on("click", ".button1", function () {
    console.log("click 1")
    var wish;
    var temp = $(this).attr("id")
    temp = temp.substring(0, temp.length - 2)
    console.log(temp)
    for (var i = 0; i < list.length; i++) {
        if (list[i].gid == temp) {
            wish = list[i];
        }
    }
    var item = {
        "gid": wish.gid,
        "discount": wish.discount,
        "price": wish.gprice,
        "gname": wish.gname,
        "chref": wish.chref,
    }
    $("#choose1").removeClass("close")
    $("#choose1").addClass("active")
    console.log(item)
    addCar(item)
})

function addCar(item) {//加入购物车
    console.log(item.gid)
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
            } else if (parseInt(item.gid) == shoppingcar[i].gid) {
                exist = 2;
                console.log("购物车存在，商品在购物车中")
                myAlert("已加入购物车，请勿重复添加！");
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
        myAlert("加入购物车成功！");
    }

}

$(document).on("click", ".button2", function () {
    console.log("click 2")
    var temp = $(this).attr("id")
    temp.substring(0, temp.length - 2)
    console.log(temp)
    let submitData = new FormData();
    submitData.append("uid", thisUser.uid)
    submitData.append("gid", parseInt(temp))
    submitData.append("mode", 0)
    JSON.stringify(submitData)
    $.ajax({
        url: '/person/updateWishListById',
        type: 'post',
        data: submitData,
        processData: false,
        contentType: false,
        cache: false,
        async: false,
        success: function (data) {
            console.dir(data)
            myAlert("删除成功")
        }
    })
    location.reload();
    //提交到后端
    //移出心愿单
})

$(".close").click(function () {
    templateDiv.removeClass("active")
    templateDiv.addClass("close")
    $(this).removeClass("close")
    $(this).addClass("active")
    templateDiv = $(this)

})