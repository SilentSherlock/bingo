//首页初始化，主要包含导航栏的初始化
$(document).ready(function () {
    //根据用户是否登录显示页面
    isLogin();
    //为超链接设置点击监听
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
    $.get(requestmap.isLogged, function (data) {
        console.log(data);
        if (data.code === 200) {
            //保存用户信息
            userInfo = data.result;
            //隐藏登录、注册链接，显示用户信息
            $("nav.navbar ul.navbar-right:eq(1)").hide();
            $("nav.navbar ul.navbar-right:eq(0)").show();
            //设置用户信息
            $("#index-navbar-ualias").text(userInfo.ualias);
            $("#index-navbar-uavatar").attr("src", userInfo.uavatar);
        } else {
            //显示登录、注册链接，隐藏用户信息
            //$("nav.navbar ul.navbar-right:eq(1)").show();
            //$("nav.navbar ul.navbar-right:eq(0)").hide();
            $("nav.navbar ul.navbar-right:eq(1)").hide();
            $("nav.navbar ul.navbar-right:eq(0)").show();
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
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            "navbar-search-form-keyword-input": {
                message: "*关键字不合法",
                validators: {
                    callback: {
                        callback: function () {
                            return true;
                        }
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
        //获取bootstrapValidator实例
        //let bv = $(e.target).data("bootstrapValidator");
        let keywords = $("#navbar-search-form-keyword-input").val();
        keywords = keywords || "";
        console.log("保存搜索内容: " + keywords);
        //使用ajax提交搜索内容
        $.get(requestmap.search, {keywords: keywords}, function (data) {
            if (data.code === 200) {
                console.log("搜索到相关信息进行显示");
            } else if (data.code === 404) {
                console.log("搜索结果为空");
            } else {
            }
            //更改搜索按钮的登陆状态
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
    //导航栏主要导航标签
    $("nav.navbar ul.navbar-nav:eq(0) > li > a").on("click", function () {
        $("nav.navbar ul.navbar-nav > li").removeClass("active");
        $(this).parent().addClass("active");
        if ($(this).text() !== "首页")
            uposition[0] = $(this).text();
        updateBreadcrumb();
    });

    //导航栏登录注册导航标签
    $("nav.navbar ul.navbar-right:eq(1) > li > a").on("click", function () {
        $("nav.navbar ul.navbar-nav > li").removeClass("active");
        $(this).parent().addClass("active");
        uposition[0] = $(this).text();
        updateBreadcrumb();
    });

    //导航栏用户标签
    $("nav.navbar ul.navbar-right:eq(0) > li > ul.dropdown-menu a.dropdown-item").on("click", function () {
        $("nav.navbar ul.navbar-nav > li").removeClass("active");
        uposition[0] = "我的信息";
        updateBreadcrumb();
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.20
 * 描述: 更新面包屑导航地址
 */
function updateBreadcrumb() {
    console.log("更新面包屑导航地址");
}

/**
 * 作者: lwh
 * 时间: 2020.8.21
 * 描述: 清空面包屑导航地址
 */
function cleanBreadcrumb() {
    console.log("清空面包屑导航地址");
}

/**
 * 作者: lwh
 * 时间: 2020.8.21
 * 描述: 展示指定游戏信息
 */
function showGameDetail(ginfo) {

}

/**
 * 作者: lwh
 * 时间: 2020.8.21
 * 描述: 展示所有游戏
 */
function showAllGame() {

}