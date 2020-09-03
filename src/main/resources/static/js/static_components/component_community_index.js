var list;
var tempShowDiv = $("#community-index #show1")
var sortType = "time";
var thisUser;
$(document).ready(function () {

    function getUser(uid) {
        let user1 = null;
        $.ajax({
            url: '/person/getUserById?uid='.concat(uid),
            type: 'get',
            async: false,
            success: function (user) {
                user1 = user.resultMap.user;
                thisUser = user1;
            }
        });
        return user1;
    }

    //根据指定的帖子pid获取相关的评论内容
    function getComments(pid) {
        let commentList = null;
        let formData = {
            "idType": "pid",
            "idValue": parseInt(pid),
        }
        // console.log(formData)
        $.ajax({
            url: 'community/getCommentsById',
            data: formData,
            type: 'get',
            async: false,
            success: function (comments) {
                commentList = comments.resultMap.CommentBypid;
            }
        });
        return commentList;
    }

    //获取所有帖子的内容
    function getPostList() {
        $.get(
            "/community/allPosts",
            function (AllPosts) {
                list = AllPosts.resultMap.AllPost;
                console.log(list)
                setHeader();
                setPosts(sortType);
                setScreen()
            }
        )
    }

    function setScreen() {
        //$("#show-img").attr("src",gameList[0].chref);
        $("#community-index #show-msg").text("【" + list[0].ptheme + "】" + list[0].title);
        $("#community-index #link").attr("href", "community-talk.html?pid=1")
        for (var i = 2; i <= 5; i++) {
            //$("#show-img"+i).attr("src",gameList[i].chref);
            $("#community-index #show-msg" + i).text("【" + list[i].ptheme + "】" + list[i].title);
            $("#community-index #link").attr("href", "post_detail.html?pid=" + i);
            $("#community-index #link").attr("target", "_blank");
        }
    }

    //设置顶部“社区要闻”处的帖子内容
    function setHeader() {
        var html = "";
        $(".community-news-list").empty();
        for (var i = (4 < list.length ? 4 : list.length); i > 0; i--) {
            html +=
                "<li>" +
                "<a href='javascript:void(0)' onclick='showPostDetail(" + list[i - 1].pid + ")'><span class=" + "content-title" + "><span class=" + "text" + ">" + "【" + list[i - 1].ptheme + "】" + list[i - 1].title + "</span></span></a>" +
                "</li>"
        }
        $("#community-index .community-news-list").html(html);
    }

    //设置下方的帖子内容
    //type为对帖子进行排序的方式
    //time:按时间倒序
    //hot:按热度倒序
    //默认为time
    function setPosts(type) {
        var html = "";
        $("#community-index .community-post-detail").empty();
        if (type == "time") {
            list = list.sort(function (a, b) {
                var a1 = a.ptime.substring(0, 10);
                var b1 = b.ptime.substring(0, 10);
                var a2 = a.ptime.substring(11, 8);
                var b2 = b.ptime.substring(11, 8);
                var list_a = a1.split("-");
                var list_b = b1.split("-");
                var list_a2 = a2.split(":");
                var list_b2 = b2.split(":");
                if (parseInt(list_a[0]) > parseInt(list_b[0])) {
                    return 1;
                } else if (parseInt(list_a[0]) > parseInt(list_b[0])) {
                    return -1;
                } else {
                    if (parseInt(list_a[1]) > parseInt(list_b[1])) {
                        return 1;
                    } else if (parseInt(list_a[1]) < parseInt(list_b[1])) {
                        return -1;
                    } else {
                        if (parseInt(list_a[2]) > parseInt(list_b[2])) {
                            return 1;
                        } else if (parseInt(list_a[2]) < parseInt(list_b[2])) {
                            return -1;
                        } else {
                            if (parseInt(list_a2[0]) > parseInt(list_b2[0])) {
                                return 1;
                            } else if (parseInt(list_a2[0]) < parseInt(list_b2[0])) {
                                return -1;
                            } else {
                                if (parseInt(list_a2[1]) > parseInt(list_b2[1])) {
                                    return 1;
                                } else if (parseInt(list_a2[1]) < parseInt(list_b2[1])) {
                                    return -1;
                                } else {
                                    if (parseInt(list_a2[2]) > parseInt(list_b2[2])) {
                                        return 1;
                                    } else if (parseInt(list_a2[2]) < parseInt(list_b2[2])) {
                                        return -1;
                                    } else {
                                        return 0;
                                    }
                                }
                            }
                        }
                    }
                }

            })
        } else if (type == "hot") {
            list = list.sort(function (a, b) {
                return a.plikenum - b.plikenum;
            })
        }
        for (var i = list.length - 1; i >= 0; i--) {
            var curent = getUser(list[i].uid);
            var comments = getComments(list[i].pid);
            html +=
                "<div class=" + "item-wrap" + ">" +
                "<div class=" + "header" + "><div class=" + "btn" + "></div><a href='javascript:void(0)' onclick='showPostDetail(" + list[i].pid + ")'><h1 class=" + "h1-in-header" + ">" + "【" + list[i].ptheme + "】" + list[i].title + "</h1></a></div>" +
                "<h2 class=" + "h2-in-header" + ">" + list[i].content + "</h2>" +
                "<div class=" + "left" + ">" +
                "<img src=" + curent.uavatar + "><a class=" + "nick-name" + " " + "href='javascript:void(0)' onclick='showOtherProfile(" + list[i].uid + ")'>" + curent.ualias + "</a>" +
                "<span class=" + "time" + ">" + "&nbsp;&nbsp;" + "<span>发表于&nbsp;&nbsp;" + list[i].ptime.substring(0, 19) + "</span></span>" +
                "</div>" +
                "<div class=" + "btn-wrapper" + ">" +
                "<button class='up' " + "id=" + list[i].pid + "><a>" + "点赞" + list[i].plikenum + "</a></button>" +
                "<button class='reply'><a href='javascript:void(0)' onclick='showPostDetail(" + list[i].pid + ")'>" + "回复" + comments.length + "</a>" + "</button>" +
                "</div>" +
                "</div>" +
                "</div>"
        }
        $(".community-post-detail").html(html);
    }

    //切换帖子排序方式：点击事件
    $("#community-index .type1").click(function () {
        //样式修改
        var tempTie = $("#community-index .active1")
        var tag = $(this)
        tempTie.removeClass("active1")
        tag.addClass("active1")
        console.log($(this).val())
        //功能代码
        sortType = "time";
        setPosts(sortType);
    })
    $("#community-index .type2").click(function () {
        //样式修改
        var tempTie = $("#community-index .active1")
        var tag = $(this)
        tempTie.removeClass("active1")
        tag.addClass("active1")
        console.log($(this).val())
        //功能代码
        sortType = "hot";
        setPosts(sortType);
    })

    //点赞
    $(document).on("click", "#community-index .up", function () {
        if (userInfo.uid === undefined) {
            myAlert("请登录后进行操作!");
            return;
        }
        var thisPid = $(this).attr("id")
        //console.log("click")
        var thisPost;
        for (var i = 0; i < list.length; i++) {
            if (list[i].pid == thisPid) {
                thisPost = list[i];
                console.log(thisPost)
            }
        }
        var thisformData = new FormData();

        thisformData.append("pid", parseInt(thisPid));
        //console.log("pid Type: " + typeof parseInt(thisPid));
        thisformData.append("propName", "plikenum");
        let postValue = Number(thisPost.plikenum) + 1;
        //console.log("postValue: " + typeof postValue);
        thisformData.append("propValue", postValue);
        //console.log(thisPost.plikenum+1);

        JSON.stringify(thisformData);

        $.ajax({
            url: '/community/updatePostProp',
            data: thisformData,
            type: 'post',
            processData: false,
            contentType: false,
            cache: false,
            async: true,
            success: function (result) {
                getPostList();
            }
        });
    })
    $("#community-index #choose1").removeClass("close")
    $("#community-index #choose1").addClass("active")
    $("#community-index #tie1").addClass("active1")
    $("#community-index #show1").show()
    $("#community-index #show2").hide()
    $("#community-index #show3").hide()
    $("#community-index #show4").hide()
    $("#community-index #show5").hide()
    getPostList()
})

//根据鼠标位置显示不同的主页内容
$(".close").hover(function () {
    var tempChoose = $("#community-index .active")
    console.log(tempChoose.text());
    var tag = $(this)
    console.log("tag", tag.text());
    tempChoose.removeClass("active")
    tempChoose.addClass("close")
    tag.removeClass("close")
    tag.addClass("active")
    tempShowDiv.hide()
    $("#show" + tag.text()).show()
    tempShowDiv = $("#show" + tag.text())
})

