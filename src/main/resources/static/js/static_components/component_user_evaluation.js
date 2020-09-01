var templateDiv = $("#choose1")
$(".close").click(function () {
    templateDiv.removeClass("active")
    templateDiv.addClass("close")
    $(this).removeClass("close")
    $(this).addClass("active")
    templateDiv = $(this)

})

function star(score, string) {
    var sc = 9, i, item = 5;
    //根据分数显示星星
    for (i = score; i >= 2; i -= 2) {
        string = "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-star-fill star\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path  d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>\n" +
            "</svg>" + string;
        item -= 1;
    }
    for (item; item > 0; item--) {
        string = string + "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-star star\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path fill-rule=\"evenodd\" d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z\"/>\n" +
            "</svg>";
    }
    return string;
}

$(document).ready(function () {
    $("#choose1").removeClass("close")
    $("#choose1").addClass("active")
    function getinfo() {
        var data = {
            idType: "uid",
            idValue: userInfo.uid
        }
        $.get(
            "store/evaluationShow", data,
            function (userResult) {
                var conList = userResult.resultMap.evaluationList_uid;
                //设置页面内容
                $.each(conList, function (key, value) {
                    //查找并加载游戏封面和游戏名称，然后加载评论内容
                    console.log("Key: " + key);
                    $.ajax(
                        {
                            url: "store/gameDetailShow" + "?id=" + value.gid,
                            type: 'get',
                            async: false,
                            success: function (gameResult) {
                                var html, html1, html2, html3;
                                var game = gameResult.resultMap.game;
                                console.log("game type : " + typeof game);
                                console.log(game.gid);
                                html1 = "<div class=\"content-elem-main\" id=" + "content" + (key + 1) + ">\n" +
                                    "            <div class=\"left\">\n" +
                                    "                <div class=\"game-elem\">\n" +
                                    "                    <img  class=\"game-chref\" src=" + game.chref + ">\n" +
                                    "                    <span class=\"elem-name\">" + game.gname + "</span>\n" +
                                    "                </div>"
                                //加载评论
                                html1 += "</div>\n" +
                                    "                                    <div class=\"right\">\n" +
                                    "                                    <div class=\"score\">\n" +
                                    "                                    <div class=\"score1\">";
                                //加载星星
                                html2 = star(value.score, "");
                                html3 = "</div>\n" +
                                    "                    <div class=\"score2\">发布于<span>" + value.etime.toString().substring(0, 19) + "</span></div>\n" +
                                    "                    <div class=\"score3\">" + value.content + "</div>\n" +
                                    "                </div>\n" +
                                    "            </div>\n" +
                                    "            <div class=\"condition\" onclick=\"javascript:void (0)\">\n" +
                                    "                <button>已点评</button>\n" +
                                    "            </div>";
                                html = html1 + html2 + html3;
                                $("#content").append(html);
                            }
                        }
                    )
                })
            }
        )
    }

    getinfo()
})