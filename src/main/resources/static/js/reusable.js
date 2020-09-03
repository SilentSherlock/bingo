/**
 * 作者: lwh
 * 时间: 2020.8.27
 * 描述: 自定义提示框
 */
function myAlert(message, hideEventHandler) {
    hideEventHandler = hideEventHandler || null;
    //判断是否已经加载提示框modal
    let alert = $("#alert");
    if ($(alert).length === 0) {
        $.get(static_components.component_alert.curl, function (data) {
            $("body").append(data);
            //显示模态框
            $("#alert").modal();
            //更改提示信息
            $("#alert-message").text(message);
            $("#alert").on("hide.bs.modal", hideEventHandler);
        });
    }
    //显示模态框
    $(alert).modal();
    //更改提示信息
    $("#alert-message").text(message);
    $(alert).on("hide.bs.modal", hideEventHandler);
}

/**
 * 作者: lwh
 * 时间: 2020.8.27
 * 描述: 在指定位置显示内容加载失败
 *
 * 加载失败和内容为空之后不进行任何操作，所以直接异步请求即可
 */
function ajaxFailed(errorShowTagId) {
    //请求失败
    $.get(static_components.component_load_error.curl, function (data) {
        $(errorShowTagId).html(data);
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.27
 * 描述: 在指定位置显示内容为空
 */
function ajaxNoContent(noContentShowTagId) {
    //请求内容为空
    $.get(static_components.component_none_result.curl, function (data) {
        $(noContentShowTagId).html(data);
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.27
 * 描述: 在指定位置显示加载动画
 *
 * 因为加载动画的同时或者之后有其他操作，所以将动画加载操作封装到一个promise对象中，让其
 * 成为微任务
 */
function loadingAnimation(showTagId) {
    //加载动画
    return new Promise(function (resolve) {
        $.get(
            static_components.component_loading_animation.curl,
            function (data) {
                //显示加载动画
                $(showTagId).html(data);
                resolve();
            });
    });
}

/**
 * 作者: lwh
 * 时间: 2020.2.26
 * 描述: 设置或者删除cookie
 */
function setCookie(cname, cvalue, exhours) {
    /* ----------Cookie属性项说明----------
     * NAME=VALUE	键值对，可以设置要保存的 Key/Value，注意这里的 NAME 不能和其他属性项的名字一样
     * Expires	    过期时间，在设置的某个时间点(ms)后该 Cookie 就会失效（不指定该属性值或者属性值
     *              小于0时，cookie生命周期为会话周期；指定为0时，cookie无效，代表立即删除该cookie）
     * Domain	    生成该 Cookie 的域名，如 domain="www.baidu.com"
     * Path	        该 Cookie 是在当前的哪个路径下生成的，如 path=/wp-admin/
     * Secure	    如果设置了这个属性，那么只会在 SSH 连接时才会回传该 Cookie
     */
    let cookieStr = cname + "=" + cvalue;
    //当hours>0时，该cookie存在指定时间；等于0时代表立即删除该cookie；小于0时该cookie会存在至会话结束
    if (exhours === 0) {
        cookieStr += "; expires=0";
    } else if (exhours < 0) {
        cookieStr += "; expires=-1";
    } else {
        //设置到期时间
        let expires = new Date();
        expires.setTime(expires.getTime() + exhours * 60 * 60 * 1000);
        cookieStr += "; expires=" + expires.toUTCString();
    }
    //设置cookie
    document.cookie = cookieStr;
}

/**
 * 作者: lwh
 * 时间: 2020.2.26
 * 描述: 获取指定名称的cookie的value值,失败返回null
 */
function getCookie(cname) {
    //读取cookie时cookie的字符串结构为“name1=value1; name2=value2”
    let reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
    let cookieStr = document.cookie;
    if (cookieStr !== "") {
        let arr = cookieStr.match(reg);
        if (arr === null) {
            return null;
        }
        if (arr[2] !== "") {
            return arr[2];
        }
    }
    return null;
}

/**
 * 作者: lwh
 * 时间: 2020.4.11
 * 描述: 将信息存入session(所给信息为JSON对象，存储格式也为键值对模式)
 */
function saveData2Ses(jsonObj) {
    //遍历json对象并进行存储
    $.each(jsonObj, function (key, value) {
        //将键值对存入sessionStorage
        if (value instanceof Object)
            window.sessionStorage.setItem(key, JSON.stringify(value));
        else
            //将键值对存入sessionStorage
            window.sessionStorage.setItem(key, value);
    });
}


/**
 * 作者: lwh
 * 时间: 2020.8.28
 * 描述: 搜索函数
 */
function searchGame(formData) {
    let defaultSearchCondition = {
        pageIndex: 0,
    };

    formData = formData || defaultSearchCondition;

    return new Promise(function (resolve, reject) {
        $.post(
            requestmap.store_search,
            formData,
            function (data) {
                resolve(data);
            }
        ).fail(function () {
            reject();
        });
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.28
 * 描述: 一键还原搜索默认值
 */
function restoreSearchConditonDefault() {
    $.each(searchCondition, function (key, value) {
        if (key === "pageIndex")
            searchCondition[key] = 0;
        else
            searchCondition[key] = undefined;
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.30
 * 描述: 一键清空用户信息
 */
function clearUserInfo() {
    $.each(userInfo, function (key, value) {
        searchCondition[key] = undefined;
    });
}