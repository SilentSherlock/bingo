var thisUser;
$(document).ready(function () {
    function getUser() {
        var loc = location.href;
        var n1 = loc.length;
        var n2 = loc.indexOf('=');
        var userId = decodeURI(loc.substr(n2 + 1, n1 - n2));
        var data = {
            uid: other_profile_uid
        };
        $.ajax({
            url: '/person/getUserById',
            type: 'get',
            data: data,
            async: false,
            success: function (user) {
                console.log(user);
                thisUser = user.resultMap.user;
            }
        })
    }

    function setUser() {
        $("#user-photo").attr("src", thisUser.uavatar);
        $(".user-describe").text(thisUser.uprofile);
        $("#user-name").text(thisUser.ualias);
        $("#user-email").text(thisUser.umail);
        $("#user-sex").text(thisUser.sex);
        var birthday = "";
        var temp1 = thisUser.ubirthday;
        temp1 = temp1.substring(0, 10);
        console.log(temp1);
        var temp = temp1.split("-");
        birthday += temp[0] + "年" + temp[1] + "月" + temp[2] + "日";
        $("#user-birthday").text(birthday);
    }

    getUser();
    setUser();
})