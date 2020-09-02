//用户登录组件初始化
$(document).ready(function () {
    //用来保存账号密码的cookie名称变量
    let cname = "savedAccInfo";
    //用来判断是否已设置cookie
    let isSaved = false;
    let savedUname = "";

    //查询cookie是否存在记住的账号密码
    let accInfo = getCookie(window.btoa(cname));
    if (accInfo !== null) {
        //存在记住的账号密码
        let arr = accInfo.split("_");
        //解码获取账号密码
        let uname = window.atob(arr[0]);
        let password = window.atob(arr[1]);
        //自动填充
        $("#user-login-form-uname-input").val(uname);
        $("#user-login-form-password-input").val(password);
        //记录已经有存在的cookie
        isSaved = true;
        savedUname = arr[0];
    }

    //开启bootstrap工具提示插件
    $("[data-toggle='tooltip']").tooltip();

    //重置按钮的点击事件监听函数注册
    $("#user-login-form-reset-button").click(function () {
        $("#user-login-form").data("bootstrapValidator").resetForm(true);
        //取消记住密码的选择，因为记住密码的checkbox未添加bootstrapValidator验证
        $("#user-login-form-remember-checkbox").prop("checked", false);
        //更改登录按钮的登陆状态
        $("#user-login-form-submit-button").button("reset");
    });

    //为表单添加校验器
    $("#user-login-form").bootstrapValidator({
        message: "*输入不合法",
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            "user-login-form-uname-input": {
                message: "*用户名不合法",
                validators: {
                    notEmpty: {
                        message: "*用户名不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: "*用户名长度为6-16（包含）"
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_.]+$/,
                        message: "*用户名只能包含字母、数字、下划线和点"
                    }
                }
            },
            "user-login-form-password-input": {
                message: "*密码不合法",
                validators: {
                    notEmpty: {
                        message: "*密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: "*密码长度为6-16（包含）"
                    },
                    //不能和指定输入域值相同
                    different: {
                        field: "user-login-form-uname-input",
                        message: "*密码不能和用户名相同"
                    }
                }
            }
        }
    }).on("success.form.bv", function (e) {
        //注册表单被提交后且验证成功的事件的监听函数以使用ajax提交表单数据
        //阻止正常提交表单
        e.preventDefault();
        //更改登录按钮的登陆状态
        $("#user-login-form-submit-button").button("loading");
        //获取用户名和密码
        let uname = $("#user-login-form-uname-input").val();
        let password = $("#user-login-form-password-input").val();
        //使用md5进行加密
        let md5_password = md5(password);
        let data = {
            uname: uname,
            password: md5_password
        };
        //使用ajax提交表单验证用户名密码
        $.post(requestmap.user_login, data, function (data) {
            if (data.status === 1) {
                //登陆成功
                if ($("#user-login-form-remember-checkbox").prop("checked")) {
                    //需要记住密码,判断是否已经设置cookie，有的话不必设置cookie
                    if (!isSaved) {
                        //没有已保存到cookie中的账户信息，设置cookie
                        let base64_cname = window.btoa(cname);
                        let base64_cvalue = window.btoa(uname) + "_" + window.btoa(password);
                        setCookie(base64_cname, base64_cvalue, 72);
                    } else if (savedUname !== uname) {
                        //当前输入的账户信息与已保存到cookie中的账户信息不符，重新设置cookie保存新的账户信息
                        let base64_cname = window.btoa(cname);
                        let base64_cvalue = window.btoa(uname) + "_" + window.btoa(password);
                        setCookie(base64_cname, base64_cvalue, 72);
                    } else {
                        //当前输入的账户信息与已保存到cookie中的账户信息相同，不必进行保存
                    }
                }
                //跳转到首页
                savePage("首页");
                $(window).attr("location", "/");
            } else {
                myAlert("用户名或密码错误!");
                $("#user-login-form-submit-button").button("reset");
            }
        });
    });
});