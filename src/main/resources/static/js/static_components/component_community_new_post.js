var thisUser;
$(document).ready(function () {
    function getUser() {
        thisUser = userInfo.uid;
    }

    function getPost() {
        if (localStorage.getItem("post") == null || localStorage.getItem("post")[0] == null) {
            return;
        } else {
            console.log("have")
            var postInfo = JSON.parse(localStorage.getItem('post'));
            console.log(postInfo)
            $("#theme-name").val(postInfo.ptheme);
            $(".edit-body").text(postInfo.content);
            $("#input-title").val(postInfo.title);
        }
    }

    getUser();
    getPost();
})

function publish() {
    let formData = new FormData();

    var date = new Date();
    console.log(date)
    formData.append("ptime", date);
    formData.append("ptheme", $("#theme-name").val());
    formData.append("plikenum", 0);
    formData.append("content", $(".edit-body").text());
    formData.append("title", $("#input-title").val())
    formData.append("uid", thisUser);
    JSON.stringify(formData);
    $.ajax({
        url: '/community/addPost',
        data: formData,
        type: 'post',
        processData: false,
        contentType: false,
        cache: false,
        async: true,
        success: function (result) {
            myAlert("发帖成功");
            window.location.reload();
        }
    });
    let localFormData;
    localFormData = {
        "ptheme": "",
        "content": "",
        "title": "",
    }
    localStorage.setItem("post", JSON.stringify(localFormData));
}

function save() {
    let formData;
    formData = {
        "ptheme": $("#theme-name").val(),
        "content": $(".edit-body").text(),
        "title": $("#input-title").val()
    }
    localStorage.setItem("post", JSON.stringify(formData));
    myAlert("保存成功");
}

function input() {
    var count = $("#input-title").val().length;
    $(".word-count").text(30 - count);
}