//pid和uid获取
//pid和uid获取
//pid和uid获取
//pid和uid获取
//获取帖子ID
var loc = location.href;
var n1 = loc.length;
var n2 = loc.indexOf('=');
var POSTID = decodeURI(loc.substr(n2 + 1, n1 - n2));

//实时监测还剩余多少字可以输入
function change() {
    txt = $("#content-txt").val();
    var length = 150 - txt.length;
    document.getElementById("limit").innerText = length;
}

//增加帖子的评论
function addComment() {
    var txt = $("#content-txt").val();
    if (txt.length == 0) {
        alert("评论内容不可以为空！");
    } else {
        var myDate = new Date();
        console.log(myDate);
        var data = {
            uid: userInfo.uid,
            pid: POSTID,
            content: txt,
            ctime: myDate,
            ctype: 0,
            tocid: -1,
            touid: -1
        }
        $.post(
            "/community/addComment", data,
            function (result) {
                // console.log("插入结果:" + result);
            }
        )
    }
    window.location.reload();
}

function Reply1(comment) {
    var txt = window.prompt("输入回复内容");
    if (txt.length == 0) {
        alert("评论内容不可以为空！");
    } else {
        var myDate = new Date();
        console.log(myDate);

        console.log("postid", POSTID);
        var data = {
            uid: userInfo.uid,
            pid: POSTID,
            content: txt,
            ctime: myDate,
            ctype: 1,
            tocid: $(comment).attr("id"),
            touid: -1
        }
        $.post(
            "/community/addComment", data,
            function (result) {
                // console.log("插入结果:" + result);
            }
        )
    }
    window.location.reload();
}

function Reply2(comment) {
    var txt = window.prompt("输入回复内容");
    if (txt.length == 0) {
        alert("评论内容不可以为空！");
    } else {
        var myDate = new Date();
        console.log(myDate);
        var data = {
            uid: userInfo.uid,
            pid: POSTID,
            content: txt,
            ctime: myDate,
            ctype: 1,
            tocid: $(comment).attr("id"),
            touid: $(comment).attr("name")
        }
        console.log("发送的数据tocid" + data.tocid + " touid" + data.touid)
        $.post(
            "/community/addComment", data,
            function (result) {
                // console.log("插入结果:" + result);
            }
        )
    }
    window.location.reload();
}

$(document).ready(function () {
    function getPost(id) {
        let postData = {
            "idType": "pid",
            "idValue": parseInt(id),
        }
        //console.log(typeof parseInt(id));
        $.ajax({
            url: 'community/getPostsById',
            data: postData,
            type: 'get',
            async: false,
            success: function (post) {
                thisPost = post.resultMap.postBypid;
            }
        });
        let commentData = {
            "idType": "pid",
            "idValue": id,
        }
        $.ajax({
            url: 'community/getCommentsById',
            data: commentData,
            type: 'get',
            async: false,
            success: function (comment) {
                postReply = comment.resultMap.CommentBypid.length;
                //console.log(postReply);
            }
        });
        setPost();
    }

    function setPost() {
        //console.log(thisPost)
        $(".post-theme").text("【" + thisPost[0].ptheme + "】" + thisPost[0].title);
        $(".post-date").text("发表于" + thisPost[0].ptime);
        $(".repost").text("点赞" + thisPost[0].plikenum);
        $(".views").text("评论" + postReply);
        $(".content").text(thisPost[0].content);
        $(".up-count").text(thisPost[0].plikenum);
    }

    //判断是否登录
    function UnlockComment() {
        //if(userInfo.uid === undefined)
        if (userInfo.uid === undefined)
            return;
        else {
            var data = {
                uid: userInfo.uid
            }
            $.get(
                "/person/getUserById", data,
                function (result) {
                    console.log(result);
                    var user = result.resultMap.user;
                    document.getElementById("user-Avatar").src = user.uavatar;
                }
            )
            $("#user-Avatar").show();
            $(".textarea-block-wrapper").css("width", "90%");
            var html = "";
            html += "<textarea style=\"width: 100%\"  id=\"content-txt\" maxlength=\"150\" oninput=\"change()\">输入评论内容</textarea>";
            $("#textarea-block").html(html)
        }
    }

    //加载评论区和当前用户头像
    function loadComment() {

        var data = {
            idType: "pid",
            idValue: POSTID
        }
        $.get(
            "/community/getCommentsById", data,
            function (result) {
                var commemtList = result.resultMap.CommentBypid;
                console.log(commemtList);
                //未找到评论则不加载
                if (commemtList === undefined)
                    return;
                var html = "", i = commemtList.length, j = 1;
                //加载回复帖子的评论
                for (; j <= i; j++) {
                    if (commemtList[j - 1].ctype == 0) {
                        var data = {
                            uid: commemtList[j - 1].uid
                        }
                        $.ajax({
                            url: "/person/getUserById",
                            data: data,
                            type: 'get',
                            async: false,
                            success: function (userResult) {
                                html += "<div class=\"community-talk-item\" >\n" +
                                    "                        <div class=\"avatar-wrapper\">\n" +
                                    "                            <a target=\"_blank\" href=\"other_profile.html?uid=" + commemtList[j - 1].uid + "\">\n";
                                html += "<img src=" + userResult.resultMap.user.uavatar + ">\n" +
                                    "                            </a>\n" +
                                    "                        </div>\n" +
                                    "                        <div class=\"comment-content\" id=" + "F" + commemtList[j - 1].cid + ">\n" +
                                    "                            <div class=\"user-name\">\n" +
                                    "                                <a target=\"_blank\" href=\"other_profile.html?uid=" + commemtList[j - 1].uid + "\">" + userResult.resultMap.user.ualias + "</a>\n"
                                html += "<span>发表于" + commemtList[j - 1].ctime.substr(0, 19) + "</span>\n" +
                                    "                            </div>\n" +
                                    "                            <div class=\"content\">" + commemtList[j - 1].content + "</div>\n" +
                                    "                            <div class=\"action\">\n" +
                                    "                                <button class=\"reply\" id=" + commemtList[j - 1].cid + " " + "name=" + commemtList[j - 1].uid + " " + "onclick=Reply1(this)" + ">回复</button>\n" +
                                    "                            </div>\n" +
                                    "                        </div>\n" +
                                    "                    </div>";
                            }
                        })
                    }
                }
                $("#content").append(html);

                i = commemtList.length, j = 1;
                for (; j <= i; j++) {
                    if (commemtList[j - 1].ctype == 1) {
                        //加载回复帖子的评论的回复
                        if (commemtList[j - 1].touid == -1) {
                            html = "";
                            var data = {
                                uid: commemtList[j - 1].uid
                            }
                            $.ajax({
                                url: "/person/getUserById",
                                data: data,
                                type: 'get',
                                async: false,
                                success: function (userResult) {
                                    html += "<div class=\"community-talk-item-child\">\n" +
                                        "                            <div class=\"avatar-wrapper\">\n" +
                                        "                                <a target=\"_blank\" href=\"other_profile.html?uid=" + commemtList[j - 1].uid + "\">\n" +
                                        "<img src=" + userResult.resultMap.user.uavatar + ">\n" +
                                        "                                </a>\n" +
                                        "                            </div>\n" +
                                        "                            <div class=\"comment-content\">\n" +
                                        "                                <div class=\"user-name\">\n" +
                                        "                                    <a target=\"_blank\" href=\"other_profile.html?uid=" + commemtList[j - 1].uid + "\">" + userResult.resultMap.user.ualias + ":</a>" +
                                        "                                    <span class=\"content\">" + commemtList[j - 1].content + "</span>\n" +
                                        "                                </div>\n" +
                                        "                                <div class=\"action\">\n" +
                                        "                                    <span>发表于" + commemtList[j - 1].ctime.substr(0, 19) + "</span>\n" +
                                        "                                    <button class=\"reply\" id=" + commemtList[j - 1].tocid + " " + "name=" + commemtList[j - 1].uid + " " + "onclick='Reply2(this)'>回复</button>\n" +
                                        "                                </div>\n" +
                                        "                            </div>\n" +
                                        "                        </div>";
                                }
                            })
                            var fid = "#F" + commemtList[j - 1].tocid;
                            $(fid).append(html);
                        }
                        //加载回复帖子的评论的回复的回复
                        else {
                            html = "";
                            var data = {
                                uid: commemtList[j - 1].uid
                            }
                            $.ajax({
                                url: "/person/getUserById",
                                data: data,
                                type: 'get',
                                async: false,
                                success: function (userResult) {
                                    html += "<div class=\"community-talk-item-child\">\n" +
                                        "                            <div class=\"avatar-wrapper\">\n" +
                                        "                                <a target=\"_blank\" href=\"other_profile.html?uid=" + commemtList[j - 1].uid + "\">\n" +
                                        "<img src=" + userResult.resultMap.user.uavatar + ">\n" +
                                        "                                </a>\n" +
                                        "                            </div>\n" +
                                        "                            <div class=\"comment-content\">\n" +
                                        "                                <div class=\"user-name\">\n" +
                                        "                                    <a target=\"_blank\" href=\"other_profile.html?uid=" + commemtList[j - 1].uid + "\">" + userResult.resultMap.user.ualias + ":</a>" +
                                        "                                    <span class=\"content\">" + "回复@";
                                    var dataChild = {
                                        uid: commemtList[j - 1].touid
                                    }
                                    $.ajax({
                                        url: "/person/getUserById",
                                        data: dataChild,
                                        type: 'get',
                                        async: false,
                                        success: function (uResult) {
                                            html += uResult.resultMap.user.ualias + ":";
                                        }
                                    })
                                    html += commemtList[j - 1].content + "</span>\n" +
                                        "                                </div>\n" +
                                        "                                <div class=\"action\">\n" +
                                        "                                    <span>发表于" + commemtList[j - 1].ctime.substr(0, 19) + "</span>\n" +
                                        "                                    <button class=\"reply\" id=" + commemtList[j - 1].tocid + " " + "name=" + commemtList[j - 1].uid + " " + "onclick='Reply2(this)'>回复</button>\n" +
                                        "                                </div>\n" +
                                        "                            </div>\n" +
                                        "                        </div>";
                                }
                            })
                            var fid = "#F" + commemtList[j - 1].tocid;
                            $(fid).append(html);
                        }
                    }
                }
            }
        )
    }

    getPost(POSTID);
    UnlockComment()
    loadComment();
    change();
})

function thumb_up() {
    if (userInfo.uid === undefined) {
        myAlert("请登录后进行操作!");
        return;
    }
    thisPost[0].plikenum=$(".up-count").text();
    let upFormData = new FormData();

    upFormData.append("pid", parseInt(POSTID));
    upFormData.append("propName", "plikenum");
    let postValue = Number(thisPost[0].plikenum) + 1;
    upFormData.append("propValue", postValue);

    JSON.stringify(upFormData);

    $.ajax({
        url: '/community/updatePostProp',
        data: upFormData,
        type: 'post',
        processData: false,
        contentType: false,
        cache: false,
        async: true,
        success: function (result) {
            //location.reload();
            $(".up-count").text(parseInt($(".up-count").text())+1);
            console.log($(".up-count").text());
            $(".repost").text("点赞"+parseInt($(".up-count").text()));
        }
    });

}

function to_user_login() {
    $("nav.navbar ul.navbar-right:eq(1) > li:first-of-type > a").click();
}