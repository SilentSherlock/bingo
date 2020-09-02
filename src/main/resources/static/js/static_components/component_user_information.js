var templateDiv = $("#choose1")
var thisUser
var uid = userInfo.uid
var haveError = false;
$(document).ready(function () {
    //获取用户信息
    function getUser() {
        $.ajax({
            url: '/person/getUserById?uid='.concat(uid),
            type: 'get',
            async: false,
            success: function (user) {
                thisUser = user.resultMap.user;
                //console.log("thisuser is "+thisUser)
            }
        })
    }

    //根据获取的个人信息进行显示
    function setUserMsg() {
        //console.log(thisUser)
        //console.log(thisUser.uprofile)
        $("#user-photo").attr("src", thisUser.uavatar)
        $(".user-describe").text(thisUser.uprofile);
        $("#user-true-name").text(thisUser.uname);
        $("#user-name").val(thisUser.ualias);
        $("#user-email").text(thisUser.umail);
        if (thisUser.usex === "男") {
            $("#select-sex").find("option[value='0']").attr("selected", true);
        } else if (thisUser.usex === "女") {
            $("#select-sex").find("option[value='1']").attr("selected", true);
        } else {
            $("#select-sex").find("option[value='2']").attr("selected", true);
        }
        var temp = thisUser.ubirthday;//获取用户生日
        var date = temp
        //console.log(date)
        var list = new Array();//得到年月日
        list.push(date.substring(0, 4));
        list.push(date.substring(5, 7));
        list.push(date.substring(8, date.length));
        //设置select的默认属性
        $("#select-year").find("option[value=" + list[0] + "]").attr("selected", true);
        $("#select-month").find("option[value=" + list[1] + "]").attr("selected", true);
        $("#select-date").find("option[value=" + list[2] + "]").attr("selected", true);
    }

    function getDateCount(year, month) {
        if (parseInt(year) % 4 == 0) {
            if (parseInt(month) == 1 || parseInt(month) == 3 || parseInt(month) == 5 || parseInt(month) == 7
                || parseInt(month) == 8 || parseInt(month) == 10 || parseInt(month) == 12) {
                date = 31;
            } else if (parseInt(month) == 2) {
                date = 29;
            } else {
                date = 30;
            }
        } else {
            if (parseInt(month) == 1 || parseInt(month) == 3 || parseInt(month) == 5 || parseInt(month) == 7
                || parseInt(month) == 8 || parseInt(month) == 10 || parseInt(month) == 12) {
                date = 31;
            } else if (parseInt(month) == 2) {
                date = 28;
            } else {
                date = 30;
            }
        }
        return date;
    }

    $(document).click(function () {
        if($("#user-name").val()==null){
            return;
        }
        var temp = $("#user-name").val().length
        if (temp > 10) {
            $(".form-error-msg").show()
            $(".form-right-msg").hide()
            $(".form-error-msg").text("不要超过10个字符")
            haveError = true;
        } else if (temp == 0) {
            $(".form-error-msg").show()
            $(".form-right-msg").hide()
            $(".form-error-msg").text("昵称不能为空")
            haveError = true;
        } else {
            $(".form-error-msg").hide()
            $(".form-right-msg").show()
            $(".form-right-msg").text("昵称符合要求")
            haveError = false;
        }
    })
    $("#select-month").click(function () {
        var year = document.getElementById("select-year");
        var month = document.getElementById("select-month");
        var dateCount = getDateCount(year.value, month.value)
        //console.log(dateCount + " " + year + " " + month)
        $("#select-date").empty();
        var html_d = "";
        for (var i = 1; i <= dateCount; i++) {
            html_d += "<option value=" + i + ">" + i + "</option>";
            j++;
        }
        $("#select-date").html(html_d)
    })

    $("#choose1").removeClass("close")
    $("#choose1").addClass("active")
    $(".form-error-msg").hide()
    $(".form-right-msg").hide()

    var date = new Date();
    var year = date.getFullYear();
    var j = 0;
    var html_y = "";
    var html_m = "";
    var html_d = "";
    for (var i = 1900; i <= year; i++) {
        html_y += "<option value=" + i + ">" + i + "</option>";
        j++;
    }
    j = 0;
    for (var i = 1; i < 13; i++) {
        if (i < 10) {
            html_m += "<option value=" + "0" + i + ">" + i + "</option>";
        } else {
            html_m += "<option value=" + i + ">" + i + "</option>";
        }
        j++;
    }
    j = 0;
    for (var i = 1; i <= 31; i++) {
        html_d += "<option value=" + i + ">" + i + "</option>";
        j++;
    }
    $("#select-year").html(html_y);
    $("#select-month").html(html_m);
    $("#select-date").html(html_d);
    getUser()
    setUserMsg()
})
$(".close").click(function () {
    templateDiv.removeClass("active")
    templateDiv.addClass("close")
    $(this).removeClass("close")
    $(this).addClass("active")
    templateDiv = $(this)

})
$(".submit").click(function () {
    let submitData = new FormData();
    let url;
    let files = $("#image").get(0).files[0];
    submitData.append("uname", thisUser.uname);
    submitData.append("umail", thisUser.umail);
    submitData.append("uprofile", $(".user-describe").val())
    submitData.append("ualias", $("#user-name").val())

    if (files == null) {
        url = '/person/updateUserNoPhoto';
        submitData.append("uavatar",$("#user-photo").attr("src"));
    } else {
        url = '/person/updateUser';
        submitData.append("avatar", files);
    }
    submitData.append("uid", thisUser.uid);
    let year = $("#select-year option:selected").val();
    let month = $("#select-month option:selected").val();
    let date = $("#select-date option:selected").val();
    // console.log(year)
    // console.log(month)
    // console.log(date)
    let birthday = year + "-" + month + "-" + date;
    submitData.append("ubirthday", birthday)
    //console.log(birthday)
    let sex = "";
    if ($("#select-sex option:selected").val() === "0") {
        sex = "男"
    } else if ($("#select-sex option:selected").val() === "1") {
        sex = "女"
    } else {
        sex = "保密"
    }
    //console.log(sex)
    submitData.append("usex", sex)
    submitData.append("password", thisUser.password);
    submitData.append("gamelist", thisUser.gamelist);
    submitData.append("wishlist", thisUser.wishlist);
    JSON.stringify(submitData)
    if (!haveError) {
        $.ajax({
            url: url,
            type: 'post',
            data: submitData,
            processData: false,
            contentType: false,
            cache: false,
            async: false,
            success: function (data) {
                console.log("因后端开发人员懒惰，不愿意修改代码，头像只能重新登陆后变更。")
                myAlert("修改成功，头像在重新登陆后变更。")
            }
        })
    } else {
        alert("请填写符合要求的昵称");
    }

})

function change_photo(file) {
    var fileSize = 0;
    var fileMaxSize = 2048;
    var filePath = file.value;
    if(filePath){
        fileSize = file.files[0].size;
        var size = fileSize/2048;
        console.log("图片的尺寸为"+size);
        if (size>fileMaxSize) {
            myAlert("文件的大小不要超过2M!");
            file.value="";
            return false;
        }else if(size<=0){
            myAlert("文件的大小不能为0M!");
            file.value="";
            return false;
        }else{
            var oFReader = new FileReader();
            var file = document.getElementById("image").files[0];
            oFReader.readAsDataURL(file);
            oFReader.onloadend = function (oFRevent) {
                var src = oFRevent.target.result;
                $("#user-photo").attr("src", src);
            }
        }
    }else{
        return false;
    }


}

// function getOriginalPhoto(){
//     var oFReader = new FileReader();
//     var file = document.getElementById("image").files[0];
//     oFReader.readAsDataURL(file);
//     var src;
//     oFReader.onloadend = function(oFRevent) {
//         src = oFRevent.target.result;
//         console.log("original is "+src);
//     }
//     return src;
// }

