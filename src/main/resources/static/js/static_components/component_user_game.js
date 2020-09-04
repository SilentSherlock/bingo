var templateDiv = $("#choose1")
$(".close").click(function () {
    templateDiv.removeClass("active")
    templateDiv.addClass("close")
    $(this).removeClass("close")
    $(this).addClass("active")
    templateDiv = $(this)

})


$(document).ready(function () {
    $("#choose1").removeClass("close")
    $("#choose1").addClass("active")

    function getinfo() {
        var data = {
            uid: userInfo.uid
        }
        $.get(
            "/person/getUserById", data,
            function (userResult) {
                var gamelist = JSON.parse(userResult.resultMap.user.gamelist);
                console.log(gamelist);
                var gamel = gamelist.length, i = 0, html = "";
                console.log(gamel);
                for (; i < gamel; i++) {
                    html = "";
                    console.log("查找游戏的id:" + gamelist[i])
                    $.ajax({
                        url: "store/gameDetailShow" + "?id=" + gamelist[i],
                        type: 'get',
                        async: false,
                        success: function (gameResult) {
                            console.log(gameResult);
                            var game = gameResult.resultMap.game;
                            html += "<div class=\"myorder-elem\">\n" +
                                "        <div class=\"game-elem\">\n" +
                                "            <a href='javascript:void(0)' onclick='showGameDetail(" + gamelist[i] + ")'><img src=" + game.chref + " class=\"gameCover\">\n" +
                                "            <span class=\"elem-name\">" + game.gname + "</span></a>\n" +
                                /* "            <div class=\"condition\" onclick=\"javascript:void (0)\">\n" +
                                 "                <button class=\"condition\" id=\"showCode\">查看激活码</button>\n" +
                                 "            </div>\n" +*/
                                "        </div>\n" +
                                "    </div>";
                            $("#order-content").append(html);
                        }
                    })
                }
            })
    }

    getinfo()
})