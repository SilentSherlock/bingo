//网页初始化，主要包含导航栏的初始化
$(document).ready(function () {
    //根据用户是否登录显示页面
    isLogin();
    //为导航栏导航超链接标签设置点击监听
    setAClickListener();
    //为搜索表单注册验证和其他监听函数
    setSearchFormValidateLisener();
    //还原刷新前的页面
    reloadBeforePage();
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

        searchCondition.name = $("#navbar-search-form-keyword-input").val();

        console.log("保存搜索内容: " + searchCondition.name);

        //使用ajax提交搜索内容
        $.get(requestmap.store_search, searchCondition, function (data) {
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
        //还原默认搜索条件
        restoreSearchConditonDefault();
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
        showUserPage = type.toString().replace(/\s/g, "");
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
    //记录用户当前访问的页面
    savePage("登录");
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
    //记录用户当前访问的页面
    savePage("注册");
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
    //记录用户当前访问的页面
    savePage("首页");
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
    //记录用户当前访问的页面
    savePage("所有游戏");
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
 * 时间: 2020.9.1
 * 描述: 加载社区
 */
function community_index() {
    //记录用户当前访问的页面
    savePage("社区");
    loadingAnimation("#body-container").then(function () {
        $.get(
            static_components.component_community_index.curl,
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
 * 时间: 2020.9.1
 * 描述: 加载发布帖子
 */
function community_new_post() {
    if(userInfo.uid === undefined){
        myAlert("请登录后再执行操作!");
        return;
    }
    //记录用户当前访问的页面
    savePage("发布帖子");
    loadingAnimation("#body-container").then(function () {
        $.get(
            static_components.component_community_new_post.curl,
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
function showUserInfo(type) {
    type = type || 0;
    if (type !== 0) {
        let temp = $(type).text();
        //设置要展示的用户信息界面
        showUserPage = temp.toString().replace(/\s/g, "");
    }
    //记录用户当前访问的页面
    savePage(showUserPage);

    loadingAnimation("#body-container").then(function () {
        let showComponent;
        switch (showUserPage) {
            case "我的信息":
                showComponent = static_components.component_user_information;
                break;
            case "我的购物车":
                showComponent = static_components.component_user_shopping_cart;
                break;
            case "我的愿望单":
                showComponent = static_components.component_user_wish_list;
                break;
            case "我的订单":
                showComponent = static_components.component_user_order_list;
                break;
            case "我的点评":
                showComponent = static_components.component_user_evaluation;
                break;
            case "我的游戏":
                showComponent = static_components.component_user_game;
                break;
            default:
                return;
        }
        $.get(
            showComponent.curl,
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
                    savePage("首页");
                    $(window).attr("location", "/");
                });
            } else
                myAlert("退出失败了，请稍后再试!");
        }
    ).fail(function () {
        ajaxFailed("#body-container");
    });
}

/**
 * 作者: lwh
 * 时间: 2020.9.1
 * 描述: 还原刷新前的页面 尽量
 */
function reloadBeforePage() {
    let nowPage = location.href;
    let lastPage = window.sessionStorage.getItem("lastPage");

    //首次访问页面,转到主页
    if (lastPage === null) {
        $("nav.navbar ul.navbar-nav:eq(0) > li:eq(0) > a").click();
        return;
    }

    //打开了新的标签页,根据内容激活对应标签
    if (lastPage !== nowPage) {
        if (nowPage.includes("game_detail")) {
            $("nav.navbar ul.navbar-nav:eq(0) > li:eq(1)").addClass("active");
            return;
        } else if (nowPage.includes("other_profile")) {
            return;
        } else if (nowPage.includes("post_detail")) {
            $("nav.navbar ul.navbar-nav:eq(0) > li:eq(2)").addClass("active");
        } else
            return;
    }

    //当前页内的跳转
    if (nowPage === lastPage) {
        let type = window.sessionStorage.getItem("lastType");

        switch (type) {
            case "首页":
                $("nav.navbar ul.navbar-nav:eq(0) > li:eq(0) > a").click();
                break;
            case "登录":
                $("nav.navbar ul.navbar-right:eq(1) > li:eq(0) > a").click();
                break;
            case "注册":
                $("nav.navbar ul.navbar-right:eq(1) > li:eq(1) > a").click();
                break;
            case "所有游戏":
                $("nav.navbar ul.navbar-nav:eq(0) > li:eq(1) > ul > li:last-of-type > a").click();
                break;
            case "社区":
                $("nav.navbar ul.navbar-nav:eq(0) > li:eq(2) > a").click();
                break;
            case "发布帖子":
                $("nav.navbar li.active").removeClass("active");
                $("nav.navbar ul.navbar-nav:eq(0) > li:eq(2)").addClass("active");
                community_new_post();
                break;
            default:
                showUserPage = type;
                showUserInfo();
                break;
        }
    }
}

/**
 * 作者: lwh
 * 时间: 2020.9.1
 * 描述: 存储当前页面
 */
function savePage(type) {
    let data = {
        lastType: type,
        lastPage: location.href
    };
    saveData2Ses(data);
}