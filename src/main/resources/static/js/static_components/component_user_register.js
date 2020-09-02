//用户注册组件初始化
$(document).ready(function () {
//重置按钮的点击事件监听函数注册
    $("#user-register-form-reset-button").click(function () {
        $("#user-register-form").data("bootstrapValidator").resetForm(true);
        //更改注册按钮的登陆状态
        $("#user-register-form-submit-button").button("reset");
    });

    //为表单添加校验器
    $("#user-register-form").bootstrapValidator({
        message: "*输入不合法",
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            "user-register-form-uname-input": {
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
                    },
                    remote: {
                        delay: 3000,
                        message: "*当前用户名已被使用",
                        type: "post",
                        url: requestmap.user_register_validate_uname,
                        data: function (validator) {
                            return {
                                name: validator.getFieldElements("user-register-form-uname-input").val(),
                                type: 1
                            };
                        },
                    }
                }
            },
            "user-register-form-password-input": {
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
                        field: "user-register-form-uname-input",
                        message: "*密码不能和用户名相同"
                    }
                }
            },
            "user-register-form-email-input": {
                message: "*邮箱地址不合法",
                validators: {
                    notEmpty: {
                        message: "*邮箱不能为空"
                    },
                    //邮箱地址合法性验证
                    regexp: {
                        regexp: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                        message: "*邮箱格式不正确"
                    }
                }
            },
            "user-register-form-code-input": {
                message: "*验证码不合法",
                validators: {
                    notEmpty: {
                        message: "*验证码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 6,
                        message: "*验证码长度为6位"
                    },
                    remote: {
                        delay: 3000,
                        message: "*验证码不正确",
                        type: "post",
                        url: requestmap.user_register_validate_code,
                        data: function (validator) {
                            return {
                                code: validator.getFieldElements("user-register-form-code-input").val()
                            };
                        },
                    }
                }
            }
        }//注册表单被提交后且验证成功的事件的监听函数以使用ajax提交表单数据
    }).on("success.form.bv", function (e) {
        //阻止正常提交表单
        e.preventDefault();
        //更改登录按钮的登陆状态
        $("#user-register-form-submit-button").button("loading");
        //获取信息
        let uname = $("#user-register-form-uname-input").val();
        let password = $("#user-register-form-password-input").val();
        let email = $("#user-register-form-email-input").val();
        //使用md5进行加密
        password = md5(password);
        let data = {
            uname: uname,
            password: password,
            umail: email
        };
        //使用ajax提交表单验证用户名密码
        $.post(requestmap.user_register, data, function (data) {
            if (data.status === 1) {
                //注册成功,跳转到登录页面
                myAlert("注册成功!");
                //点击登录导航
                $("nav.navbar ul.navbar-right:eq(1) > li > a:eq(0)").click();
            } else {
                myAlert("啊欧，竟然注册失败了!");
                $("#user-login-form-submit-button").button("reset");
            }
        });
    });

    //为发送验证码按钮添加监听事件
    $("#user-register-form-code-button").on("click", function () {
        //获取验证实例和邮箱输入框实例
        let validator = $("#user-register-form").data("bootstrapValidator");
        let uemail_input = $("#user-register-form-email-input");
        //手动验证邮箱
        validator.validateField(uemail_input);
        //判断邮箱是否正确
        if (validator.isValidField(uemail_input)) {
            //修改验证码发送状态
            $(this).button("loading");
            let umail = $("#user-register-form-email-input").val();
            $.post(requestmap.user_register_send_code, {umail: umail}, function (data) {
                if (data.status === 1) {
                    //发送成功
                    $("#user-register-form-code-button").text("发送成功!");
                    let cd = 60;
                    //设置cd
                    let intervalId = setInterval(function () {
                        if (cd === 0)
                            //cd结束
                            $("#user-register-form-code-button").button("reset");
                        else
                            $("#user-register-form-code-button").text("发送成功!(" + cd-- + "s)");
                    }, 1000);
                    //cd之后清楚间断触发函数
                    setTimeout(function () {
                        clearInterval(intervalId);
                    }, 61000);
                } else
                    myAlert("验证码发送失败，请稍后再试!");
            });
        }
    });
});