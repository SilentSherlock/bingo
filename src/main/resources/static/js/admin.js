let currentPage = 1;
let currentIndex = 0;
let countpage = 0;
let updategid;

let search_game_name;
let game_order = "desc";
let sort_types;

let uerCurrentPage = 1;
let userCurrentIndex = 0;
let userCountPage = 0;

let dataCurrentPage = 1;
let dataCurrentIndex = 0;
let dataCountPage = 0;
let curSearch = null;
let curOrder = 'asc';
let curSort = 0;

let check_language;
let check_types;
let search_types;

let search_orderUid = null;
let search_orderPage = 1;
let search_orderIndex = 0;
let search_orderCountPage = 0;


let PostCurrentPage = 1;
let PostCurrentIndex = 0;
let PostCountPage = 0;
/*页面初始化*/
$(document).ready(function () {
    $.ajax({
        url: "/person/isAdminLogin",
        type: "get",
        async: false,
        success: function (data) {
            if (data.status === 0)
                $(window).attr("location", "/admin_login.html");

        }
    }).fail(function () {
        $(window).attr("location", "/admin_login.html");
    });


    ui_control();
    setJumpListener();

    setPaddingListener();

    setBaseListener();

    let cname = "savedAccInfoAdmin";
    let base64_accInfo = getCookie(window.btoa(cname));
    if (base64_accInfo !== null) {
        //存在记住的账号密码
        let arr = base64_accInfo.split("_");
        //解码获取账号密码
        let userName = window.atob(arr[0]);
        //自动填充
        console.dir(userName);
        $("#admin").html(userName);
    }

});


function admin_logout() {
    $.ajax({
        url: "/person/adminLogout",
        type: "get",
        async: false,
        success: function (data) {
            if (data.status === 1)
                $(window).attr("location", "/admin_login.html");
            else {
                alert("退出失败！");
            }
        }
    });
}

function ui_control() {
    $("#home-content").show();
    $("#edit-query-game").hide();
    $("#add-game-content").hide();
    $("#user-info").hide();
    $("#other-operator").hide();
    $(".contain-des").hide();
    $("#posts-manage").hide();
    $("#orderList-info").hide();
    $("#announce").hide();
}

function setJumpListener() {
    /*跳转至首页*/
    $("#home").on("click", function () {
        let bread_html = "";
        bread_html +=
            "<li class='active'>首页</li>";
        $(".breadcrumb").html(bread_html);

        $("#home-content").show();
        $("#add-game-content").hide()
        $("#edit-query-game").hide();
        $("#user-info").hide();
        $("#other-operator").hide();
        $("#orderList-info").hide();
        $(".contain-des").hide();
        $("#posts-manage").hide();
        $("#announce").hide();
    })
    /*跳转至编辑查询游戏页面*/
    $("#search-edit-game").on("click", function () {
        let bread_html = "";
        bread_html +=
            "<li><a href=>首页</a></li>" +
            "<li><a href=>游戏</a></li>" +
            "<li class='active'>查询编辑游戏</li>";
        $(".breadcrumb").html(bread_html);
        let html_title = "";
        html_title +=
            "<h2>查询编辑游戏</h2>" +
            "<h5>一些与游戏相关的信息</h5>";
        $(".contain-des").html(html_title);
        ChangePage(currentIndex);
        $("#other-operator").hide();
        $("#user-info").hide();
        $("#home-content").hide();
        $("#add-game-content").hide();
        $("#posts-manage").hide();
        $("#orderList-info").hide();
        $("#announce").hide();
        $("#edit-query-game").show();
        $(".contain-des").show();
    })
    /*跳转至添加游戏页面*/
    $("#add-game").on("click", function () {
        let bread_html = "";
        bread_html +=
            "<li><a href=>首页</a></li>" +
            "<li><a href=>游戏</a></li>" +
            "<li class='active'>添加游戏</li>";
        $(".breadcrumb").html(bread_html)
        let html_title = "";
        html_title +=
            "<h2>添加游戏</h2>" +
            "<h5>一些与游戏相关的信息</h5>";
        $(".contain-des").html(html_title);
        $("#add-game-content").show();
        $(".contain-des").show();
        $("#home-content").hide();
        $("#edit-query-game").hide();
        $("#user-info").hide();
        $("#other-operator").hide();
        $("#posts-manage").hide();
        $("#announce").hide();
    })
    /*跳转到查看用户信息界面*/
    $("#query-user").on("click", function () {
        let bread_html = "";
        bread_html +=
            "<li><a href=>首页</a></li>" +
            "<li><a href=>用户</a></li>" +
            "<li class='active'>查看用户信息</li>";
        $(".breadcrumb").html(bread_html)
        let html_title = "";
        html_title +=
            "<h2>查看用户信息</h2>" +
            "<h5>一些与用户相关的信息</h5>";
        $(".contain-des").html(html_title);
        ChangeUserPage(userCurrentIndex);
        $("#add-game-content").hide();
        $("#home-content").hide();
        $("#edit-query-game").hide();
        $("#user-info").show();
        $(".contain-des").show();
        $("#other-operator").hide();
        $("#posts-manage").hide();
        $("#orderList-info").hide();
        $("#announce").hide();
    })
    /*跳转到查询订单界面*/
    $("#query-orderList").on("click", function () {
        let bread_html = "";
        bread_html +=
            "<li><a href=>首页</a></li>" +
            "<li><a href=>订单</a></li>" +
            "<li class='active'>查看订单信息</li>";
        $(".breadcrumb").html(bread_html)
        let html_title = "";
        html_title +=
            "<h2>查看订单信息</h2>" +
            "<h5>一些与订单相关的信息</h5>";
        ChangeOrderPage(search_orderIndex,null);
        $(".contain-des").html(html_title);
        $("#add-game-content").hide();
        $("#home-content").hide();
        $("#edit-query-game").hide();
        $("#user-info").hide();
        $("#other-operator").hide();
        $("#posts-manage").hide();
        $("#announce").hide();
        $("#orderList-info").show();
        $(".contain-des").show();

    })
    /*跳转到帖子管理界面*/
    $("#post-manage").on("click", function () {
        let bread_html = "";
        bread_html +=
            "<li><a href=>首页</a></li>" +
            "<li><a href=>论坛</a></li>" +
            "<li class='active'>帖子管理</li>";
        $(".breadcrumb").html(bread_html)
        let html_title = "";
        html_title +=
            "<h2>查看帖子信息</h2>" +
            "<h5>一些与帖子相关的信息</h5>";

        ChangePostPage(PostCurrentIndex);
        $(".contain-des").html(html_title);
        $("#add-game-content").hide();
        $("#home-content").hide();
        $("#edit-query-game").hide();
        $("#user-info").hide();
        $("#other-operator").hide();
        $("#orderList-info").hide();
        $("#announce").hide();
        $("#posts-manage").show();
        $(".contain-des").show();
    })
    /*跳转到发布公告界面*/
    $("#announcement").on("click", function () {
        let bread_html = "";
        bread_html +=
            "<li><a href=>首页</a></li>" +
            "<li><a href=>论坛</a></li>" +
            "<li class='active'>广告管理</li>";
        $(".breadcrumb").html(bread_html)
        let html_title = "";
        html_title +=
            "<h2>广告管理</h2>" +
            "<h5>管理一些与广告相关的信息</h5>";
        $(".contain-des").html(html_title);
        advertise_show();
        $("#add-game-content").hide();
        $("#home-content").hide();
        $("#edit-query-game").hide();
        $("#user-info").hide();
        $("#other-operator").hide();
        $("#orderList-info").hide();
        $("#posts-manage").hide();
        $("#announce").show();
        $(".contain-des").show();
    })

}


function advertise_show() {
    let html = "";
    $.ajax({
        url: '/store/getAllAdvertise',
        type: 'get',
        dataType: 'json',
        success: function (Result) {
            console.dir(Result);
            html += "<table class=\"table\" >\n" +
                "                        <tr>\n" +
                "                            <th scope=\"col\">游戏ID</th>\n" +
                "                            <th scope=\"col\">游戏名称</th>\n" +
                "                            <th scope=\"col\">广告</th>\n" +
                "                            <th scope=\"col\">广告插图</th>\n" +
                "                            <th colspan=\"2\">操作</th>" +
                "                        </tr>";
            for (let key in Result.resultMap.gameList) {
                html +=
                    "<tr class='rows'>" +
                    "<td scope='col'>" + Result.resultMap.gameList[key].gid + "</td>" +
                    "<td scope='col'>" + Result.resultMap.gameList[key].gname + "</td>" +
                    "<td scope='col'><textarea class='form-control'readonly='readonly' rows='3' cols='20' >" + Result.resultMap.gameList[key].detail + "</textarea></td>" +
                    "<td scope='col'><img width='100px'height='70px' src='" + Result.resultMap.picList[key] + "'></td>" +
                    "<td scope='col'><a class='delete-advertise'role='button' data-toggle='modal' id='advertise-" + Result.resultMap.gameList[key].gid + "'>删除</td>" +
                    "</tr>"
            }
            html += "</table>";
            $(".object-show").html(html);
        }
    })
}

function setPaddingListener() {
    /**
     *填充复选框中修改的内容
     */
    /*添加时的填充内容*/
    $("input[name=types-add]").click(function () {
        let arr = new Array();
        $("input[name=types-add]:checked").each(function (key, value) {
            arr[key] = $(value).val();
        });
        check_types = JSON.stringify(arr);
        let str = new String();

        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                str = str + arr[i];
            } else {
                str = str + arr[i] + ","
            }
        }
        $("#game-types-add").val(str);
        /*$("#game-types").val(arr.join(","));*/
    })
    $("input[name=languages-add]").click(function () {
        let arr = new Array();
        $("input[name=languages-add]:checked").each(function (key, value) {
            arr[key] = $(value).val();
        });
        check_language = JSON.stringify(arr);
        let str = new String();

        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                str = str + arr[i];
            } else {
                str = str + arr[i] + ","
            }
        }
        $("#game-language-add").val(str);

    })
    /*编辑时的填充内容*/
    $("input[name=types]").click(function () {
        let arr = new Array();
        $("input[name=types]:checked").each(function (key, value) {
            arr[key] = $(value).val();
        });
        check_types = JSON.stringify(arr);
        let str = new String();

        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                str = str + arr[i];
            } else {
                str = str + arr[i] + ","
            }
        }
        $("#game-types").val(str);
        /*$("#game-types").val(arr.join(","));*/
    })
    $("input[name=languages]").click(function () {
        let arr = new Array();
        $("input[name=languages]:checked").each(function (key, value) {
            arr[key] = $(value).val();
        });
        check_language = JSON.stringify(arr);
        let str = new String();

        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                str = str + arr[i];
            } else {
                str = str + arr[i] + ","
            }
        }
        $("#game-language").val(str);

    })


    /**
     *编辑框填充内容
     */
    $(document).on("click", ".edit", function () {
        console.dir(this.id);
        $.ajax({
            url: "/store/gameDetailShow",
            type: 'post',
            data: {
                id: this.id,
            },
            dataType: 'json',
            success: function (Result) {

                let str = new String();
                str = Result.resultMap.game.realeasedate;
                let times = new Array();

                times = str.split(' ');
                $("#game-name").val(Result.resultMap.game.gname);
                $("#game-types").val(Result.resultMap.game.gtype);
                check_types = Result.resultMap.game.gtype;
                $("#game-devoloper").val(Result.resultMap.game.developer);
                $("#game-publisher").val(Result.resultMap.game.publisher);
                $("#game-releasedate").val(times[0]);
                $("#game-price").val(Result.resultMap.game.gprice);
                $("#game-discount").val(Result.resultMap.game.discount);
                $("#game-score").val(Result.resultMap.game.gscore);
                $("#game-language").val(Result.resultMap.game.language);
                check_language = Result.resultMap.game.language;
                $("#game-detail").val(Result.resultMap.game.detail);
                $("#game-video").val(Result.resultMap.game.vhref);
                $("#game-picture").val(Result.resultMap.game.phref);
                $("#game-face").val(Result.resultMap.game.chref)
                $("#game-systemreq").val(Result.resultMap.game.systemreq);
                $("#game-dlclist").val(Result.resultMap.game.dlclist);
                updategid = Result.resultMap.game.gid;
            }
        })

    })

    $(document).on("click", ".more", function () {
        console.dir(this.id);
        let str_id = new String();
        str_id = this.id;
        let arr = new Array();
        arr = str_id.split("-");
        console.dir(arr[1]);
        $.ajax({
            url: '/person/getUserById',
            type: 'post',
            data: {
                uid: arr[1],
            },
            dataType: 'json',
            success: function (Result) {
                console.dir(Result);
                console.dir(Result.resultMap.user.uname);
                if (Result.status == 1) {
                    $("#user-name").val(Result.resultMap.user.uname);

                    $("#user-mail").val(Result.resultMap.user.umail);
                    $("#user-avator").attr("src", Result.resultMap.user.uavatar);

                    $("#user-alias").val(Result.resultMap.user.ualias);
                    $("#user-sex").val(Result.resultMap.user.usex);
                    $("#user-birthday").val(Result.resultMap.user.ubirthday);
                    $("#user-profile").val(Result.resultMap.user.uprofile);
                }
            }
        })

    })


    $("#many-person").on("click", function () {
        $("#game-type").val("多人");
    })
    $("#action").on("click", function () {
        $("#game-type").val("动作");
    })
    $("#venture").on("click", function () {
        $("#game-type").val("冒险");
    })
    $("#first").on("click", function () {
        $("#game-type").val("第一人称");
    })

    $(function () {
        $('[data-toggle="popover"]').popover()
    })
}

function setBaseListener() {
    /*通过游戏折扣价排序*/
    $(document).on("click", "#sail-id", function () {
        if (sort_types != "price") {
            sort_types = "price";
            game_order = "desc";
        } else {
            if (game_order == "desc") {
                game_order = "asc";
            } else {
                game_order = "desc";
            }
            sort_types = "price";
        }
        ChangePage(currentIndex, search_game_name, search_types, game_order, sort_types);
    })
    /*通过游戏id排序*/
    $(document).on("click", "#unique-id", function () {
        console.dir(game_order);
        if (game_order == "desc") {
            game_order = "asc";
        } else {
            game_order = "desc";
        }
        sort_types = "";
        console.dir(game_order);
        ChangePage(currentIndex, search_game_name, search_types, game_order);
    })
    /*查询游戏*/
    $("#search-btn").on("click", function () {
        currentPage = 1;
        currentIndex = 0;
        search_game_name = $("#search-game").val();
        console.dir($("#game-type").val());
        let str = new String();
        str = "[\"" + $("#game-type").val() + "\"]";
        search_types = str;
        if (search_types == "[\"\"]") {
            ChangePage(currentIndex, search_game_name);
        } else {
            ChangePage(currentIndex, search_game_name, search_types);
        }

    })
    /*查询用户信息*/
    $("#search-user-btn").on("click",function () {
        let html="";
        let search_user_id;
        search_user_id = $("#search-user").val();
        if(search_user_id == "" || search_user_id == null || search_user_id == undefined){
            $("#query-user").trigger("onclick");
            alert("id不能为空");
        }else {
            $.ajax({
                url:"/person/getUserById",
                type:'post',
                data:{
                    uid:search_user_id,
                },
                success:function (Result) {
                    console.dir(Result);
                    if(Result.status == 1){
                        $("#user-name").val(Result.resultMap.user.uname);
                        $("#user-avator").attr("src",Result.resultMap.user.uavatar);
                        $("#user-mail").val(Result.resultMap.user.umail);
                        $("#user-alias").val(Result.resultMap.user.ualias);
                        $("#user-sex").val(Result.resultMap.user.usex);
                        $("#user-birthday").val(Result.resultMap.user.ubirthday);
                        $("#user-profile").val(Result.resultMap.user.uprofile);
                        $("#user-Modal").modal("show");
                    }else {
                        alert("该用户不存在");
                    }


                }
            });
        }

    })
    /*添加游戏*/
    $("#add-btn").on("click", function () {
        let str = new String();
        str = $("#game-releasedate-add").val()
        let str_array = new Array();
        str_array = str.split('-');
        let date = new String();
        date = str_array[0] + "/" + str_array[1] + "/" + str_array[2];
        $.ajax({
            url: '/store/gameAddHandle',
            type: 'post',
            data: {
                gname: $("#game-name-add").val(),
                gtype: check_types,
                developer: $("#game-devoloper-add").val(),
                publisher: $("#game-publisher-add").val(),
                realeasedate: date,
                gprice: $("#game-price-add").val(),
                discount: $("#game-discount-add").val(),
                language: check_language,
                detail: $("#game-detail-add").val(),
                vhref: $("#game-video-add").val(),
                phref: $("#game-picture-add").val(),
                chref: $("#game-face-add").val(),
                systemreq: $("#game-systemreq-add").val(),
                dlclist: $("#game-dlclist-add").val(),
            },
            dataType: 'json',
            success: function (Result) {
                console.dir(Result);
                if (Result.status == 1) {
                    $("#add-model").modal("show");
                    $("#search-edit-game").trigger('click');
                }

            }
        })
    })
    /*添加广告*/
    $("#add_advertise").on("click", function () {
        let formData = new FormData();
        let files = $("#advertise_game_picture").get(0).files[0];
        formData.append("advertise_game_picture", files);
        formData.append("gid", $("#advertise_game_id").val());

        $.ajax({
            url: '/store/addAdvertise',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            dataType: 'json',
            success: function (Result) {
                console.dir(Result);
                if (Result.status == 1) {
                    advertise_show();
                } else {
                    $("#add-model-fail").modal("show");
                }
            }
        })
    })
    /**
     *保存修改内容
     */
    $("#save").on("click", function () {
        let str = new String();
        str = $("#game-releasedate").val()
        let str_array = new Array();
        str_array = str.split('-');
        let date = new String();
        date = str_array[0] + "/" + str_array[1] + "/" + str_array[2];
        $.ajax({
            url: "/store/gameUpdateHandle",
            type: 'post',
            data: {
                gid: updategid,
                gname: $("#game-name").val(),
                gtype: check_types,
                developer: $("#game-devoloper").val(),
                publisher: $("#game-publisher").val(),
                realeasedate: date,
                gprice: $("#game-price").val(),
                discount: $("#game-discount").val(),
                gscore: $("#game-score").val(),
                language: check_language,
                detail: $("#game-detail").val(),
                vhref: $("#game-video").val(),
                phref: $("#game-picture").val(),
                chref: $("#game-face").val(),
                systemreq: $("#game-systemreq").val(),
                dlclist: $("#game-dlclist").val(),
            },
            dataType: 'json',
            success: function (Result) {
                console.dir(Result);
                if (Result.status == 1) {
                    $("#update-model").modal("show");
                    $("#close-editor").trigger('click');
                    console.dir(currentIndex);
                    console.dir(search_game_name);
                    console.dir(search_types);
                    check_language = "";
                    check_types = "";
                    ChangePage(currentIndex, search_game_name, search_types);
                }

            }

        })
    })

    /**
     *翻页
     */
    /*游戏翻页*/
    $(document).on("click", ".to-page", function () {
        /*console.dir(currentPage)
        console.dir(this.innerText)*/
        if (this.innerText == "»") {
            currentPage++;
            if (currentPage > countpage) {
                currentPage = countpage;
            } else {
                currentPage = currentPage;
            }
        } else if (this.innerText == "«") {
            currentPage--;
            if (currentPage == 0) {
                currentPage = 1;
            } else {
                currentPage = currentPage;
            }
        } else {
            currentPage = this.innerText
        }
        currentIndex = 12 * (currentPage - 1);
        ChangePage(currentIndex, search_game_name, search_types, game_order, sort_types);
    })
    /*用户翻页*/
    $(document).on("click", ".to-page-user", function () {
        if (this.innerText == "»") {
            uerCurrentPage++;
            if (uerCurrentPage > userCountPage) {
                uerCurrentPage = userCountPage;
            } else {
                uerCurrentPage = uerCurrentPage;
            }
        } else if (this.innerText == "«") {
            uerCurrentPage--;
            if (uerCurrentPage == 0) {
                uerCurrentPage = 1;
            } else {
                uerCurrentPage = uerCurrentPage;
            }
        } else {
            uerCurrentPage = this.innerText
        }
        userCurrentIndex = 12 * (uerCurrentPage - 1);
        ChangeUserPage(userCurrentIndex);
    })
    /*订单翻页*/
    $(document).on("click", ".to-page-order", function () {
        if (this.innerText == "»") {
            search_orderPage++;
            if (search_orderPage > search_orderCountPage) {
                search_orderPage = search_orderCountPage;
            } else {
                search_orderPage = search_orderPage;
            }
        } else if (this.innerText == "«") {
            search_orderPage--;
            if (search_orderPage == 0) {
                search_orderPage = 1;
            } else {
                search_orderPage = search_orderPage;
            }
        } else {
            search_orderPage = this.innerText
        }
        search_orderIndex = 12 * (search_orderPage - 1);

        ChangeOrderPage(search_orderIndex, search_orderUid);
    })
    /*帖子翻页*/
    $(document).on("click", ".to-page-post", function () {
        if (this.innerText == "»") {
            PostCurrentPage++;
            if (PostCurrentPage > PostCountPage) {
                PostCurrentPage = PostCountPage;
            } else {
                PostCurrentPage = PostCurrentPage;
            }
        } else if (this.innerText == "«") {
            PostCurrentPage--;
            if (PostCurrentPage == 0) {
                PostCurrentPage = 1;
            } else {
                PostCurrentPage = PostCurrentPage;
            }
        } else {
            PostCurrentPage = this.innerText
        }
        PostCurrentIndex = 12 * (PostCurrentPage - 1);
        ChangePostPage(PostCurrentIndex);
    })

    /**
     * 删除
     */
    /*删除游戏*/
    $(document).on("click", ".delete", function () {
        let arr = new Array();
        let str = new String();
        str = this.id;
        arr = str.split("-");
        console.dir(arr[1]);

        $.ajax({
            url: '/store/gameDeleteHandle',
            type: 'post',
            data: {
                gid: arr[1],
            },
            dataType: 'json',
            success: function (Result) {
                console.dir(Result);
                if (Result.status == 1) {
                    $("#delete-model").modal("show");
                    ChangePage(currentIndex, search_game_name, search_types);
                }
            }
        })

    })
    /*删除帖子*/
    $(document).on("click", ".delete-post", function () {
        let arr = new Array();
        let str = new String();
        str = this.id;
        arr = str.split("-");
        console.dir(arr[1]);
        $.ajax({
            url: '/community/deletePostsById',
            type: 'post',
            data: {
                idType: "pid",
                idValue: arr[1],
            },
            success: function (Result) {
                if (Result.status == 1) {
                    $("#delete-model").modal("show");
                    ChangePostPage(PostCurrentIndex);
                }

            }
        })
    })
    /*删除广告*/
    $(document).on("click", ".delete-advertise", function () {
        let arr = new Array();
        let str = new String();
        str = this.id;
        arr = str.split("-");
        console.dir(arr[1]);
        $.ajax({
            url: "/store/deleteAdvertise",
            type: 'post',
            data: {
                gid: arr[1],
            },
            success: function (Result) {
                if (Result.status == 1) {
                    $("#delete-model").modal("show");
                    advertise_show();
                }

            }
        })
    })
    /**
     * 查询
     */
    /*查询订单*/
    $("#search-orderList-btn").on("click", function () {
        search_orderPage = 1;
        search_orderIndex = 0;
        search_orderUid = $("#search-orderList").val();

        ChangeOrderPage(search_orderIndex, search_orderUid);
    })
    /*查看订单详细内容*/
    $(document).on("click", ".detail", function () {
        let html = "";
        let arr = new Array();
        let str = new String();
        str = this.id;
        arr = str.split("-");
        console.dir(arr[1]);
        $.ajax({
            url: '/store/getOrderDetailByOid',
            type: 'post',
            data: {
                oid: arr[1],
            },
            success: function (Result) {
                console.dir(Result);
                let user_names = new String();
                $.ajax({
                    url: "/person/getUserById",
                    type: 'post',
                    data: {
                        uid: Result.resultMap.orderDetail[0].uid,
                    },
                    success: function (Result2) {
                        user_names = Result2.resultMap.user.uname;
                        console.dir(user_names);
                        getValueFromAjax(user_names, arr[1], html, Result);
                    },
                });

            }
        })
    })
}

/*实现详细页面写入*/
function getValueFromAjax(Value, number, html, Result) {

    html +=
        "<table class='table'>" +
        "<tr>" +
        "<td colspan='2' nowrap='nowrap'>用户名：" + Value + "</td>" +
        "<td colspan='3' nowrap='nowrap'>订单编号：<span>" + number + "</span></td>" +
        "</tr>" +
        "<tr class=\"rows\">\n" +
        "    <td scope=\"col\">已购买游戏</td>\n" +
        "    <td scope=\"col\">购买数量</td>\n" +
        "    <td scope=\"col\">游戏折扣</td>\n" +
        "    <td scope=\"col\">购买时间</td>\n" +
        "    <td scope=\"col\">游戏激活码</td>\n" +
        "</tr>";
    for (let key in Result.resultMap.orderDetail) {
        let game_name = "";
        $.ajax({
            url: "/store/gameDetailShow",
            type: 'post',
            data: {
                id: Result.resultMap.orderDetail[key].gid,
            },
            async: false,
            success: function (Result3) {
                game_name = Result3.resultMap.game.gname;
            },
        });
        html +=
            "<tr class='rows'>" +
            "<td scope='col'>" + game_name + "</td>" +
            "<td scope='col'>" + Result.resultMap.orderDetail[key].knum + "</td>" +
            "<td scope='col'>" + Result.resultMap.orderDetail[key].discount + "</td>" +
            "<td scope='col'>" + Result.resultMap.orderDetail[key].otime + "</td>" +
            "<td scope='col'>" + Result.resultMap.orderDetail[key].klist + "</td>" +
            "</tr>";
    }
    html += "</table>";
    $(".order-detail-table").html(html);
}

/*实现分页*/

/*游戏分页*/
function ChangePage(index, search_name, gtype, games_order, sort_type) {
    let html = "";
    let pageHtml = "";
    $.ajax({
        url: "/store/search",
        type: "post",
        data: {
            name: search_name,
            category: gtype,
            pageIndex: index,
            pageCount: 12,
            order: games_order,
            sort: sort_type,
        },
        dataType: 'json',
        success: function (Result) {

            if (Result.status == 1) {

                html += "<table class='table '>" +
                    "<tr class='table-head'>" +
                    "<th scope='col'><a class='unique-code' id='unique-id' role='button'>唯一识别码&nbsp;<svg id='id-down' width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-caret-down-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "  <path d=\"M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\"/>\n" +
                    "</svg><svg id = 'id-up'width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-caret-up-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "  <path d=\"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z\"/>\n" +
                    "</svg></a></th>" +
                    "<th scope='col'>游戏名称</th>" +
                    "<th scope='col'>游戏类型</th>" +
                    "<th scope='col'><a class='unique-code' id='sail-id' role='button'>售价(折扣价)&nbsp;<svg id='sail-down' width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-caret-down-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "  <path d=\"M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\"/>\n" +
                    "</svg><svg id = 'sail-up'width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-caret-up-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "  <path d=\"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z\"/>\n" +
                    "</svg></a></th>" +
                    "<th colspan='2'>操作</th>" +
                    "</tr>"
                for (let key in Result.resultMap.searchList) {
                    html +=
                        "<tr class='rows'>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].gid + "</td>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].gname + "</td>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].gtype + "</td>" +
                        "<td scope='col'>" + (Result.resultMap.searchList[key].gprice * Result.resultMap.searchList[key].discount).toFixed(2) + "</td>" +
                        "<td scope='col'> <a class='edit'   role='button' data-toggle='modal' href='#myModal' id='" + Result.resultMap.searchList[key].gid + "'>编辑</a></td>" +
                        "<td scope='col'> " +
                        "<a class='delete' role='button' data-toggle='modal' id='delete_btn-" + Result.resultMap.searchList[key].gid + "'>" +
                        "<svg width=\"1.5em\" height=\"1.5em\" viewBox=\"0 0 16 16\" class=\"bi bi-trash\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                        "  <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n" +
                        "  <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n" +
                        "</svg>" +
                        "</a>" + "</td>" +
                        "</tr>"
                }
                html += "</table>";
                $(".object-show").html(html);
                if (sort_types == "price") {
                    $("#id-down").hide();
                    $("#id-up").hide();
                    if (game_order == "desc") {
                        $("#sail-down").show();
                        $("#sail-up").hide();
                    } else {
                        $("#sail-down").hide();
                        $("#sail-up").show();
                    }
                } else {
                    $("#sail-down").hide();
                    $("#sail-up").hide();
                    if (game_order == "desc") {
                        $("#id-down").show();
                        $("#id-up").hide();
                    } else {
                        $("#id-down").hide();
                        $("#id-up").show();
                    }
                }

            } else {
                $(".object-show").html("<table class='table '>" +
                    "<tr class='table-head'>" +
                    "<th scope='col'>唯一识别码</th>" +
                    "<th scope='col'>游戏名称</th>" +
                    "<th scope='col'>游戏类型</th>" +
                    "<th scope='col'>售价</th>" +
                    "<th colspan='2'>操作</th>" +
                    "</tr>");
            }
            console.dir(Result);
            pageHtml +=
                "<nav aria-label=\"Page navigation\">\n" +
                "  <ul class=\"pagination \">\n" +
                "    <li>\n" +
                "      <a class='to-page' href=\"#\" aria-label=\"Previous\">\n" +
                "        <span aria-hidden=\"true\">&laquo;</span>\n" +
                "      </a>\n" +
                "    </li>"
            countpage = Result.resultMap.allSearchNum;
            let pages = new Array();
            if (currentPage > 3) {
                if (currentPage < countpage - 3) {
                    pages.push(currentPage - 3);
                    pages.push(currentPage - 2);
                    pages.push(currentPage - 1);
                    pages.push(currentPage * 1);
                    pages.push(currentPage * 1 + 1);
                    pages.push(currentPage * 1 + 2);
                } else {
                    for (let i = countpage - 6; i < countpage; i++) {
                        pages.push(i + 1);
                    }
                }
            } else {
                for (let i = 0; i < 6; i++) {
                    pages.push(i + 1);
                }
            }
            for (let i = 0; i < pages.length; i++) {
                let page = i;
                if (pages[page] > countpage) {
                    break;
                }
                if (pages[page] == currentPage) {
                    pageHtml += "<li class='active'><a class='to-page' href=\"#\">" + pages[page] + "</a></li>"
                } else {
                    pageHtml += "<li ><a class='to-page' href=\"#\">" + pages[page] + "</a></li>"
                }
            }
            pageHtml +=
                "<li>\n" +
                "      <a class='to-page' href=\"#\" aria-label=\"Next\">\n" +
                "        <span aria-hidden=\"true\">&raquo;</span>\n" +
                "      </a>\n" +
                "    </li>\n" +
                "  </ul>\n" +
                "</nav>"
            $(".pages").html(pageHtml);
        }
    })
}

/*用户分页*/
function ChangeUserPage(index) {
    let html = "";
    let pageHtml = "";
    $.ajax({
        url: "/person/getUserPage",
        type: "post",
        data: {
            pageIndex: index,
            pageCount: 12,
        },
        dataType: 'json',
        success: function (Result) {
            console.dir(Result);
            if (Result.status == 1) {

                html += "<table class='table '>" +
                    "<tr class='table-head'>" +
                    "<th scope='col'><a class='unique-code' id='unique-id' role='button'>唯一识别码" +
                    "<th scope='col'>用户名</th>" +
                    "<th scope='col'>用户昵称</th>" +
                    "<th scope='col'><a class='unique-code' id='sail-id' role='button'>性别" +
                    "<th colspan='2'>操作</th>" +
                    "</tr>"
                for (let key in Result.resultMap.searchList) {
                    html +=
                        "<tr class='rows'>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].uid + "</td>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].uname + "</td>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].ualias + "</td>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].usex + "</td>" +
                        "<td scope='col'> <a class='more' role='button' data-toggle='modal' href='#user-Modal' id='more-" + Result.resultMap.searchList[key].uid + "'>更多</a></td>" +
                        "</tr>"
                }
                html += "</table>";
                $(".object-show").html(html);
            } else {
                $(".object-show").html("<table class='table '>" +
                    "<tr class='table-head'>" +
                    "<th scope='col'>唯一识别码</th>" +
                    "<th scope='col'>用户名</th>" +
                    "<th scope='col'>用户昵称</th>" +
                    "<th scope='col'>性别</th>" +
                    "<th colspan='2'>操作</th>" +
                    "</tr>");
            }
            pageHtml +=
                "<nav aria-label=\"Page navigation\">\n" +
                "  <ul class=\"pagination \">\n" +
                "    <li>\n" +
                "      <a class='to-page-user' href=\"#\" aria-label=\"Previous\">\n" +
                "        <span aria-hidden=\"true\">&laquo;</span>\n" +
                "      </a>\n" +
                "    </li>"
            userCountPage = Result.resultMap.allSearchNum;
            let pages = new Array();
            if (uerCurrentPage > 3) {
                if (uerCurrentPage < userCountPage - 3) {
                    pages.push(uerCurrentPage - 3);
                    pages.push(uerCurrentPage - 2);
                    pages.push(uerCurrentPage - 1);
                    pages.push(uerCurrentPage * 1);
                    pages.push(uerCurrentPage * 1 + 1);
                    pages.push(uerCurrentPage * 1 + 2);
                } else {
                    for (let i = userCountPage - 6; i < userCountPage; i++) {
                        pages.push(i + 1);
                    }
                }
            } else {
                for (let i = 0; i < 6; i++) {
                    pages.push(i + 1);
                }
            }
            for (let i = 0; i < pages.length; i++) {
                let page = i;
                if (pages[page] > userCountPage) {
                    break;
                }
                if (pages[page] == uerCurrentPage) {
                    pageHtml += "<li class='active'><a class='to-page-user' href=\"#\">" + pages[page] + "</a></li>"
                } else {
                    pageHtml += "<li ><a class='to-page-user' href=\"#\">" + pages[page] + "</a></li>"
                }
            }
            pageHtml +=
                "<li>\n" +
                "      <a class='to-page-user' href=\"#\" aria-label=\"Next\">\n" +
                "        <span aria-hidden=\"true\">&raquo;</span>\n" +
                "      </a>\n" +
                "    </li>\n" +
                "  </ul>\n" +
                "</nav>"
            $(".pages").html(pageHtml);
        }
    })
}

/*订单分页*/
function ChangeOrderPage(index, user_id) {
    let html = "";
    let pageHtml = "";

        $.ajax({
            url: "/store/getOrderListByUid",
            type: "post",
            data: {
                pageIndex: index,
                uid: user_id,
                pageCount: 12,
            },
            dataType: 'json',
            success: function (Result) {
                console.dir(Result);
                if (Result.status == 1) {

                    html += "<table class='table '>" +
                        "<tr class='table-head'>" +
                        "<th scope='col'>唯一识别码" +
                        "<th scope='col'>用户id</th>" +
                        "<th scope='col'>订单生成时间</th>" +
                        "<th scope='col'>总价" +
                        "<th colspan='2'>操作</th>" +
                        "</tr>"
                    for (let key in Result.resultMap.orderList) {
                        html +=
                            "<tr class='rows'>" +
                            "<td scope='col'>" + Result.resultMap.orderList[key].oid + "</td>" +
                            "<td scope='col'>" + Result.resultMap.orderList[key].uid + "</td>" +
                            "<td scope='col'>" + Result.resultMap.orderList[key].otime + "</td>" +
                            "<td scope='col'>" + Result.resultMap.orderList[key].allprice + "</td>" +
                            "<td scope='col'> <a class='detail' role='button' data-toggle='modal' href='#order-Modal' id='deatil-" + Result.resultMap.orderList[key].oid + "'>更多</a></td>" +
                            "</tr>"
                    }
                    html += "</table>";
                    $(".object-show").html(html);
                    pageHtml +=
                        "<nav aria-label=\"Page navigation\">\n" +
                        "  <ul class=\"pagination \">\n" +
                        "    <li>\n" +
                        "      <a class='to-page-order' href=\"#\" aria-label=\"Previous\">\n" +
                        "        <span aria-hidden=\"true\">&laquo;</span>\n" +
                        "      </a>\n" +
                        "    </li>"
                    search_orderCountPage = Result.resultMap.allPageNum;
                    let pages = new Array();
                    if (search_orderPage > 3) {
                        if (search_orderPage < search_orderCountPage - 3) {
                            pages.push(search_orderPage - 3);
                            pages.push(search_orderPage - 2);
                            pages.push(search_orderPage - 1);
                            pages.push(search_orderPage * 1);
                            pages.push(search_orderPage * 1 + 1);
                            pages.push(search_orderPage * 1 + 2);
                        } else {
                            for (let i = search_orderCountPage - 6; i < search_orderCountPage; i++) {
                                pages.push(i + 1);
                            }
                        }
                    } else {
                        for (let i = 0; i < 6; i++) {
                            pages.push(i + 1);
                        }
                    }
                    for (let i = 0; i < pages.length; i++) {
                        let page = i;
                        if (pages[page] > search_orderCountPage) {
                            break;
                        }
                        if (pages[page] == search_orderPage) {
                            pageHtml += "<li class='active'><a class='to-page-order' href=\"#\">" + pages[page] + "</a></li>"
                        } else {
                            pageHtml += "<li ><a class='to-page-order' href=\"#\">" + pages[page] + "</a></li>"
                        }
                    }
                    pageHtml +=
                        "<li>\n" +
                        "      <a class='to-page-order' href=\"#\" aria-label=\"Next\">\n" +
                        "        <span aria-hidden=\"true\">&raquo;</span>\n" +
                        "      </a>\n" +
                        "    </li>\n" +
                        "  </ul>\n" +
                        "</nav>"
                    $(".pages").html(pageHtml);
                } else {
                    $(".object-show").html("<table class='table '>" +
                        "<tr class='table-head'>" +
                        "<th scope='col'>唯一识别码</th>" +
                        "<th scope='col'>用户ID</th>" +
                        "<th scope='col'>订单生成时间</th>" +
                        "<th scope='col'>总价</th>" +
                        "<th colspan='2'>操作</th>" +
                        "</tr>");
                    $(".pages").html("");
                }
            }
        })


}

/*帖子分页*/
function ChangePostPage(index) {

    let html = "";
    let pageHtml = "";

    $.ajax({
        url: '/community/getPostPage',
        type: 'post',
        data: {
            pageIndex: index,
            pageCount: 12,
        },
        success: function (Result) {
            console.dir(Result);
            if (Result.status == 1) {

                html += "<table class='table '>" +
                    "<tr class='table-head'>" +
                    "<th scope='col'>唯一识别码" +
                    "<th scope='col'>用户名</th>" +
                    "<th scope='col'>帖子主题</th>" +
                    "<th scope='col'>主要内容" +
                    "<th scope='col'>标题</th>" +
                    "<th scope='col'>发帖时间</th>" +
                    "<th scope='col'>操作</th>" +
                    "</tr>"
                for (let key in Result.resultMap.searchList) {
                    html +=
                        "<tr class='rows'>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].pid + "</td>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].uid + "</td>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].ptheme + "</td>" +
                        "<td scope='col'><textarea readonly='readonly' rows='1' cols='30' >" + Result.resultMap.searchList[key].content + "</textarea></td>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].title + "</td>" +
                        "<td scope='col'>" + Result.resultMap.searchList[key].ptime + "</td>" +
                        "<td scope='col'> <a class='delete-post' role='button' id='postDelete-" + Result.resultMap.searchList[key].pid + "'>删除</a></td>" +
                        "</tr>"

                }
                html += "</table>";
                $(".object-show").html(html);

                pageHtml +=
                    "<nav aria-label=\"Page navigation\">\n" +
                    "  <ul class=\"pagination \">\n" +
                    "    <li>\n" +
                    "      <a class='to-page-post' href=\"#\" aria-label=\"Previous\">\n" +
                    "        <span aria-hidden=\"true\">&laquo;</span>\n" +
                    "      </a>\n" +
                    "    </li>"
                PostCountPage = Result.resultMap.allSearchNum;
                let pages = new Array();
                if (PostCurrentPage > 3) {
                    if (PostCurrentPage < PostCountPage - 3) {
                        pages.push(PostCurrentPage - 3);
                        pages.push(PostCurrentPage - 2);
                        pages.push(PostCurrentPage - 1);
                        pages.push(PostCurrentPage * 1);
                        pages.push(PostCurrentPage * 1 + 1);
                        pages.push(PostCurrentPage * 1 + 2);
                    } else {
                        for (let i = PostCountPage - 6; i < PostCountPage; i++) {
                            pages.push(i + 1);
                        }
                    }
                } else {
                    for (let i = 0; i < 6; i++) {
                        pages.push(i + 1);
                    }
                }
                for (let i = 0; i < pages.length; i++) {
                    let page = i;
                    if (pages[page] > PostCountPage) {
                        break;
                    }
                    if (pages[page] == PostCurrentPage) {
                        pageHtml += "<li class='active'><a class='to-page-post' href=\"#\">" + pages[page] + "</a></li>"
                    } else {
                        pageHtml += "<li ><a class='to-page-post' href=\"#\">" + pages[page] + "</a></li>"
                    }
                }
                pageHtml +=
                    "<li>\n" +
                    "      <a class='to-page-post' href=\"#\" aria-label=\"Next\">\n" +
                    "        <span aria-hidden=\"true\">&raquo;</span>\n" +
                    "      </a>\n" +
                    "    </li>\n" +
                    "  </ul>\n" +
                    "</nav>"
                $(".pages").html(pageHtml);
            } else {
                $(".object-show").html("<table class='table '>" +
                    "<tr class='table-head'>" +
                    "<th scope='col'>唯一识别码</th>" +
                    "<th scope='col'>用户名</th>" +
                    "<th scope='col'>用户昵称</th>" +
                    "<th scope='col'>性别</th>" +
                    "<th colspan='2'>操作</th>" +
                    "</tr>");
                $(".pages").html("");
            }

        },
    })

}











