//网页初始化，主要包含导航栏的初始化
$(document).ready(function () {
    //根据用户是否登录显示页面
    isLogin();
    //为导航栏导航超链接标签设置点击监听
    setAClickListener();
    //为搜索表单注册验证和其他监听函数
    setSearchFormValidateLisener();
});


/**
 * 作者: lwh
 * 时间: 2020.8.20
 * 描述: 判断当前是否有用户登录
 */
function isLogin() {
    $.ajax({
        url: requestmap.user_isLogged,
        type: "get",
        async: false,
        success: function (data) {
            if (data.status === 1) {
                //保存用户信息
                userInfo = data.resultMap.loggedUserInfo;
                //隐藏登录、注册链接，显示用户信息
                $("nav.navbar ul.navbar-right:eq(1)").hide();
                $("nav.navbar ul.navbar-right:eq(0)").show();
                //设置用户信息
                $("#index-navbar-ualias").text(userInfo.ualias);
                $("#index-navbar-uavatar").attr("src", userInfo.uavatar);
            } else {
                //显示登录、注册链接，隐藏用户信息
                $("nav.navbar ul.navbar-right:eq(1)").show();
                $("nav.navbar ul.navbar-right:eq(0)").hide();
            }
            console.log("登陆的用户信息", userInfo);
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.20
 * 描述: 为搜索表单注册验证和其他监听函数
 */
function setSearchFormValidateLisener() {
    //开启bootstrapValidator进行表单验证
    $("#navbar-search-form").bootstrapValidator({
        message: "*输入不合法",
        container: "#none",
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            "navbar-search-form-keyword-input": {
                message: "*关键字不合法",
                validators: {
                    notEmpty: {
                        message: "*请输入关键字进行搜索"
                    }
                }
            }
        }
    }).on("success.form.bv", function (e) {
        //注册表单被提交后且验证成功的事件的监听函数以使用ajax提交表单数据
        //阻止正常提交表单
        e.preventDefault();
        //更改搜索按钮的登陆状态
        $("#navbar-search-form-submit-button").button("loading");

        searchKeywords = {
            name: $("#navbar-search-form-keyword-input").val()
        };

        console.log("保存搜索内容: " + searchKeywords);

        //使用ajax提交搜索内容
        $.get(requestmap.store_search_keywords, searchKeywords, function (data) {
            if (data.status === 1) {
                isSearchResult = true;
                console.log("搜索到相关信息进行显示:");
                console.log(data);
                showAllGame();
            } else
                myAlert("未找到相关游戏!");
            //更改搜索按钮的状态
            $("#navbar-search-form-submit-button").button("reset");
        })
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.20
 * 描述: 为超链接设置点击监听
 */
function setAClickListener() {
    //导航栏首页标签
    $("nav.navbar ul.navbar-nav:eq(0) > li:eq(0) > a").on("click", function () {
        $("nav.navbar ul.navbar-nav > li").removeClass("active");
        $(this).parent().addClass("active");
    });

    //导航栏游戏标签
    $("nav.navbar ul.navbar-nav:eq(0) > li:eq(1) > ul > li > a").on("click", function () {
        $("nav.navbar ul.navbar-nav > li").removeClass("active");
        $(this).parent().parent().parent().addClass("active");
        let type = $(this).text();
        $(this).parent().parent().prev().html(type + "<span class='caret'></span>");
        console.log("导航栏游戏标签-导航栏游戏标签类别：", type);
        //还原默认搜索条件
        restoreSearchConditonDefault();
        console.log("导航栏游戏标签-还原默认后的搜索条件：", searchCondition);
        //设置新的搜索条件
        switch (type) {
            case "免费游戏":
                searchCondition.minPrice = 0;
                searchCondition.maxPrice = 0;
                break;
            case "新游上线":
                searchCondition.tag = JSON.stringify(["newsale"]);
                break;
            case "即将上线":
                searchCondition.tag = JSON.stringify(["presale"]);
                break;
            case "促销游戏":
                searchCondition.sort = "discount";
                break;
            case "动作":
                searchCondition.category = JSON.stringify(["动作"]);
                break;
            case "射击":
                searchCondition.category = JSON.stringify(["射击"]);
                break;
            case "策略":
                searchCondition.category = JSON.stringify(["策略"]);
                break;
            case "模拟":
                searchCondition.category = JSON.stringify(["模拟"]);
                break;
            case "独立":
                searchCondition.category = JSON.stringify(["独立"]);
                break;
            case "角色扮演":
                searchCondition.category = JSON.stringify(["角色扮演"]);
                break;
            case "所有游戏":
                break;
            default:
                break;
        }
        console.log("导航栏游戏标签-展示所有游戏前的查询条件：", JSON.stringify(searchCondition));
        //展示游戏
        showAllGame();
    });

    //导航栏社区标签
    $("nav.navbar ul.navbar-nav:eq(0) > li:eq(2) > a").on("click", function () {
        $("nav.navbar ul.navbar-nav > li").removeClass("active");
        $(this).parent().addClass("active");
    });

    //导航栏登录注册导航标签
    $("nav.navbar ul.navbar-right:eq(1) > li > a").on("click", function () {
        $("nav.navbar ul.navbar-nav > li").removeClass("active");
        $(this).parent().addClass("active");
    });

    //导航栏用户标签
    $("nav.navbar ul.navbar-right:eq(0) > li > ul.dropdown-menu a.dropdown-item").on("click", function () {
        $("nav.navbar ul.navbar-nav > li").removeClass("active");
        let type = $(this).text();
        //设置要展示的用户信息界面
        console.log("要展示的用户信息界面种类", type);
        showUserPage = type;
        //展示用户信息界面
        showUserInfo();
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.22
 * 描述: 加载用户登录页面
 */
function user_login() {
    if ($("#" + static_components.component_user_login.cid).length === 0) {
        loadingAnimation("#body-container").then(function () {
            $.get(
                static_components.component_user_login.curl,
                function (data) {
                    if (data !== undefined || data !== "") {
                        $("#body-container").html(data);
                    } else
                        ajaxNoContent("#body-container");
                }
            ).fail(function () {
                ajaxFailed("#body-container")
            });
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.8.22
 * 描述: 加载用户注册页面
 */
function user_register() {
    if ($("#" + static_components.component_user_register.cid).length === 0) {
        loadingAnimation("#body-container").then(function () {
            $.get(
                static_components.component_user_register.curl,
                function (data) {
                    if (data !== undefined || data !== "") {
                        $("#body-container").html(data);
                    } else
                        ajaxNoContent("#body-container");
                }
            ).fail(function () {
                ajaxFailed("#body-container");
            });
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.8.25
 * 描述: 加载首页
 */
function index_body() {
    if ($("#" + static_components.component_index.cid).length === 0) {
        loadingAnimation("#body-container").then(function () {
            $.get(
                static_components.component_index.curl,
                function (data) {
                    if (data !== undefined || data !== "") {
                        $("#body-container").html(data);
                    } else
                        ajaxNoContent("#body-container");
                }
            ).fail(function () {
                ajaxFailed("#body-container");
            });
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.8.27
 * 描述: 加载所有游戏及分类的页面
 */
function showAllGame() {
    loadingAnimation("#body-container").then(function () {
        $.get(
            static_components.component_all_game.curl,
            function (data) {
                if (data !== undefined || data !== "") {
                    $("#body-container").html(data);
                } else
                    ajaxNoContent("#body-container");
            }
        ).fail(function () {
            ajaxFailed("#body-container");
        });
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.30
 * 描述: 展示用户信息界面
 */
function showUserInfo() {
    loadingAnimation("#body-container").then(function () {
        $.get(
            static_components.component_user_information.curl,
            function (data) {
                if (data !== undefined || data !== "") {
                    $("#body-container").html(data);
                } else
                    ajaxNoContent("#body-container");
            }
        ).fail(function () {
            ajaxFailed("#body-container");
        });
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.28
 * 描述: 用户退出登录
 */
function logout() {
    $.get(
        requestmap.user_logout,
        function (data) {
            if (data.status === 1) {
                clearUserInfo();
                myAlert("您已成功退出!", function () {
                    $(window).attr("location", "/");
                });
            } else
                myAlert("退出失败了，请稍后再试!");
        }
    ).fail(function () {
        ajaxFailed("#body-container");
    });
}