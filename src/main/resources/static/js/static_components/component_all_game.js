var name;
var sort;
var order;
var pageIndex;
var price_sort = 0;//初始为从高到低
var category;
var tag;
var minPrice;
var maxPrice;
var area;
var language;

//所有游戏页面初始化
$(document).ready(function () {
    name = searchCondition.name;
    sort = searchCondition.sort;
    order = searchCondition.order;
    pageIndex = searchCondition.pageIndex;
    price_sort = 0;//初始为从高到低

    if (searchCondition.category !== undefined)
        category = JSON.parse(searchCondition.category);
    else
        category = [];

    if (searchCondition.tag !== undefined)
        tag = JSON.parse(searchCondition.tag);
    else
        tag = [];

    minPrice = searchCondition.minPrice;
    maxPrice = searchCondition.maxPrice;
    area = searchCondition.area;
    language = searchCondition.language;

    getGameList(searchCondition);
});

function setPage(pageNumber) {
    var html = ""
    if (pageNumber === 0) {
        $(".pagination").html("")
        return
    }


    for (var i = 0; i < pageNumber; i++) {
        if (i === parseInt(pageIndex / 10)) {
            html +=
                "<button class=\"page-item active-button\">" + parseInt(i + 1).toString() + "</button>"
        } else {
            html +=
                "<button class=\"page-item\">" + parseInt(i + 1).toString() + "</button>"
        }
    }
    $(".page-list").empty()
    $(".page-list").html(html)

}

function getGameList(formData) {
    if (isSearchResult === true) {
        $.post(
            requestmap.store_search,
            searchCondition,
            function (gameList) {
                let gamel = gameList.resultMap.searchList;
                let html = "";

                $('#game-list').empty();

                if (gameList.status === 0)
                    return;
                for (let i = 0; i < gamel.length; i++) {

                    let game = gamel[i]
                    let temp = (parseFloat(game.gprice) * (parseFloat(game.discount))).toString();
                    if (temp.length > 6) {
                        temp.substr(0, 6);
                    }
                    //得到游戏类别数组
                    let typelist = game.gtype;
                    typelist = (typelist != null ? typelist.substring(1, typelist.length - 1) : "");

                    typelist = typelist.split(",")
                    //得到游戏语言数组
                    let languagelist = game.language;
                    languagelist = (languagelist != null ? languagelist.substring(1, languagelist.length - 1) : "")

                    languagelist = languagelist.split(",")
                    for (let j = 0; j < languagelist.length; j++) {
                        languagelist[j].substring(1, languagelist[j].length - 1)
                    }


                    html +=
                        "<li>" +
                        "<a href=" + "/game_detail.html?gid=" + game.gid + " class=" + "game-click" + " target=" + "_black>" +
                        "<div class=" + "left" + "><img src=" + game.chref + "></div>" +
                        "<div class=" + "right" + ">"
                    if (game.discount != 1 && game.discount != null) {
                        html +=
                            "<span class=" + "game-discount" + ">" + "-" + ((1 - game.discount) * 100).toFixed() + "%</span>" +
                            "<span class=" + "game-origin-price" + ">￥" + game.gprice + "</span>"
                    }
                    html +=
                        "<span class=" + "game-sale-price" + ">￥" + temp + "</span>" +
                        "</div>" +
                        "<div class=" + "middle" + ">" +
                        "<p class=" + "title" + ">" +
                        game.gname

                    if (game.discount != 1) {
                        html += "<span class=" + "title-tag" + ">促销</span>"
                    }
                    var china = false;
                    for (var start = 0; start < languagelist.length; start++) {
                        if (languagelist[start] === "\"中文\"" && languagelist.length == 1) {
                            html += "<span class=" + "title-area" + ">中国站</span>";
                            china = true;
                            break;
                        }
                    }
                    if (!china) {

                        html += "<span class=" + "title-area" + ">国际站</span>"
                    }

                    html += "</p>" +
                        "<p class='date'>发行于" + (game.realeasedate != null ? game.realeasedate.substring(0, 10) : ' ') + "</p>" +
                        "<p class='tags'>"
                    for (j = 0; j < typelist.length; j++) {
                        html +=
                            "<span class=" + "tag-block" + ">" + (typelist[j] != null ? typelist[j].substring(1, typelist[j].length - 1) : ' ') + "</span>"
                    }
                    html += "</p>" +
                        "</div>" +
                        "</a>" +
                        "</li>"
                }
                $("#game-list").html(html)
            });
        isSearchResult = false;
    } else {
        $.post(
            requestmap.store_search,
            formData,
            function (gameList) {
                let gamel = gameList.resultMap.searchList;
                let page = gameList.resultMap.allSearchNum;
                let html = "";

                $('#game-list').empty();

                if (gameList.status === 0)
                    return;
                for (let i = 0; i < gamel.length; i++) {

                    let game = gamel[i]
                    let temp = (parseFloat(game.gprice) * (parseFloat(game.discount))).toString();
                    if (temp.length > 6) {
                        temp.substr(0, 6);
                    }
                    //得到游戏类别数组
                    let typelist = game.gtype;
                    typelist = (typelist != null ? typelist.substring(1, typelist.length - 1) : "");

                    typelist = typelist.split(",")
                    //得到游戏语言数组
                    let languagelist = game.language;
                    languagelist = (languagelist != null ? languagelist.substring(1, languagelist.length - 1) : "")

                    languagelist = languagelist.split(",")
                    for (let j = 0; j < languagelist.length; j++) {
                        languagelist[j].substring(1, languagelist[j].length - 1)
                    }


                    html +=
                        "<li>" +
                        "<a href=" + "/game_detail.html?gid=" + game.gid + " class=" + "game-click" + " target='_blank'>" +
                        "<div class=" + "left" + "><img src=" + game.chref + "></div>" +
                        "<div class=" + "right" + ">"
                    if (game.discount != 1 && game.discount != null) {
                        html +=
                            "<span class=" + "game-discount" + ">" + "-" + ((1 - game.discount) * 100).toFixed() + "%</span>" +
                            "<span class=" + "game-origin-price" + ">￥" + game.gprice + "</span>"
                    }
                    html +=
                        "<span class=" + "game-sale-price" + ">￥" + temp + "</span>" +
                        "</div>" +
                        "<div class=" + "middle" + ">" +
                        "<p class=" + "title" + ">" +
                        game.gname

                    if (game.discount != 1) {
                        html += "<span class=" + "title-tag" + ">促销</span>"
                    }
                    var china = false;
                    for (var start = 0; start < languagelist.length; start++) {
                        if (languagelist[start] === "\"中文\"" && languagelist.length == 1) {
                            html += "<span class=" + "title-area" + ">中国站</span>";
                            china = true;
                            break;
                        }
                    }
                    if (!china) {

                        html += "<span class=" + "title-area" + ">国际站</span>"
                    }

                    html += "</p>" +
                        "<p class='date'>发行于" + (game.realeasedate != null ? game.realeasedate.substring(0, 10) : ' ') + "</p>" +
                        "<p class='tags'>"
                    for (j = 0; j < typelist.length; j++) {
                        html +=
                            "<span class=" + "tag-block" + ">" + (typelist[j] != null ? typelist[j].substring(1, typelist[j].length - 1) : ' ') + "</span>"
                    }
                    html += "</p>" +
                        "</div>" +
                        "</a>" +
                        "</li>"
                }
                $("#game-list").html(html)
                setPage(page)
            }
        )
    }

}

//为页码设置事件 -> 分页切换
$(document).on("click", ".page-item", function () {
    pageIndex = (parseInt($(this).text()) - 1) * 10;
    let thisFormData = {
        sort: sort,
        pageIndex: pageIndex,
        order: order,
        category: JSON.stringify(category),
        tag: JSON.stringify(tag),
        minPrice: minPrice,
        maxPrice: maxPrice,
        area: area,
        language: language,
    }
    getGameList(thisFormData)
    //分页栏的切换
    //将原有属性为 active 的 a 改为默认
    $(".active-button").removeClass("active-button")
    //将当前 a 的属性添加 active
    $(this).addClass("active-button")
});
$(".game-sort-order").on("click", function () {
    pageIndex = 0
    if (this.innerText === "全部") {
        sort = "";
    } else if (this.innerText === "折扣") {
        sort = "discount"
    } else if (this.innerText === "最新") {
        sort = "new"
    } else if (this.innerText === "评分") {
        sort = "score"
    } else {
        sort = "price"
    }
    if (sort === "price") {
        if (price_sort == 0) {
            price_sort = 1;
        } else {
            price_sort = 0;
        }
        if (price_sort == 1) {
            order = "desc";
            $(".fa").text("▲")
        } else {
            order = "asc";
            $(".fa").text("▼")
        }
        let thisFormData = {
            sort: sort,
            pageIndex: pageIndex,
            order: order,
            category: JSON.stringify(category),
            tag: JSON.stringify(tag),
            minPrice: minPrice,
            maxPrice: maxPrice,
            area: area,
            language: language,
        }
        getGameList(thisFormData)
    } else {
        let thisFormData = {
            sort: sort,
            pageIndex: pageIndex,
            order: order,
            category: JSON.stringify(category),
            tag: JSON.stringify(tag),
            minPrice: minPrice,
            maxPrice: maxPrice,
            area: area,
            language: language,
        }
        getGameList(thisFormData)
    }


    $(".condition .active").removeClass("active")
    //将当前 a 的属性添加 active
    $(this).addClass("active")
});
$(".tags-block-wrapper").on("click", function () {
    pageIndex = 0;
    var thisString = $(this).text()
    var first = thisString[0];

    if (first == "√") {
        var str = thisString
        $(this).text((str != null ? str.substring(1, str.length) : ""))
        category.splice($.inArray($(this).text(), category), 1)
    } else {
        category.push(thisString)
        thisString = "√" + thisString;
        $(this).text(thisString);
    }
    let thisFormData = {
        sort: sort,
        pageIndex: pageIndex,
        order: order,
        category: JSON.stringify(category),
        tag: JSON.stringify(tag),
        minPrice: minPrice,
        maxPrice: maxPrice,
        area: area,
        language: language,
    }
    getGameList(thisFormData)
});
$(".tags-block-wrapper1").on("click", function () {
    pageIndex = 0;
    var thisString = $(this).text()
    var unchangeString = thisString;
    var first = thisString[0];

    if (first == "√") {
        var str = thisString
        $(this).text((str != null ? str.substring(1, str.length) : ""))
        tag.splice($.inArray($(this).text(), tag), 1)
    } else {
        if (thisString == "预售游戏") {
            thisString = "presale";
        } else if (thisString == "新品游戏") {
            thisString = "newsale";
        } else {
            thisString = "promotion";
        }
        tag.push(thisString)
        thisString = "√" + unchangeString;
        $(this).text(thisString);
    }
    let thisFormData = {
        sort: sort,
        pageIndex: pageIndex,
        order: order,
        category: JSON.stringify(category),
        tag: JSON.stringify(tag),
        minPrice: minPrice,
        maxPrice: maxPrice,
        area: area,
        language: language,
    }
    getGameList(thisFormData)
});
$(".tags-block-wrapper2").on("click", function () {
    pageIndex = 0;
    var temp = $(this).text()
    if (temp[0] != "√") {
        for (var i = 17; i <= 20; i++) {
            var tempinner = $("#fa" + i).text()
            if (tempinner[0] == "√") {
                $("#fa" + i).text(tempinner.substring(1, tempinner.length))
            }
        }
        $(this).text("√" + temp);
    } else {
        $(this).text(temp.substring(1, temp.length));
    }

    switch ($(this).text()) {
        case "√￥0-10":
            minPrice = 0;
            maxPrice = 10;
            break;
        case "√￥11-50":
            minPrice = 11;
            maxPrice = 50;
            break;
        case "√￥51-100":
            minPrice = 51;
            maxPrice = 100;
            break;
        case "√>=￥101":
            minPrice = 100;
            maxPrice = 10000;
            break;
        default:
            minPrice = null;
            maxPrice = null;
            break;
    }
    let thisFormData = {
        sort: sort,
        pageIndex: pageIndex,
        order: order,
        category: JSON.stringify(category),
        tag: JSON.stringify(tag),
        minPrice: minPrice,
        maxPrice: maxPrice,
        area: area,
        language: language,
    }
    getGameList(thisFormData)
});
//语言是3 area:China,other
// ，地区是4 language:Chinese,other
$(".tags-block-wrapper4").on("click", function () {
    pageIndex = 0;
    var temp = $(this).text()
    if (temp[0] != "√") {
        for (var i = 21; i <= 22; i++) {
            var tempinner = $("#fa" + i).text()
            if (tempinner[0] == "√") {
                $("#fa" + i).text(tempinner.substr(1, tempinner.length))
            }
        }
        $(this).text("√" + temp);
    } else {
        $(this).text(temp.substring(1, temp.length));
    }

    switch ($(this).text()) {
        case "√中国站":
            area = "China";
            break;
        case "√国际站":
            area = "other";
            break;
        default:
            area = null;
            break;
    }
    let thisFormData = {
        sort: sort,
        pageIndex: pageIndex,
        order: order,
        category: JSON.stringify(category),
        tag: JSON.stringify(tag),
        minPrice: minPrice,
        maxPrice: maxPrice,
        area: area,
        language: language,
    }
    getGameList(thisFormData)
});
$(".tags-block-wrapper3").on("click", function () {
    pageIndex = 0;
    var temp = $(this).text()
    if (temp[0] != "√") {
        for (var i = 15; i <= 16; i++) {
            var tempinner = $("#fa" + i).text()
            if (tempinner[0] == "√") {
                $("#fa" + i).text(tempinner.substring(1, tempinner.length))
            }
        }
        $(this).text("√" + temp);
    } else {
        $(this).text(temp.substring(1, temp.length));
    }

    switch ($(this).text()) {
        case "√中文":
            language = "Chinese";
            break;
        case "√英文":
            language = "other";
            break;
        default:
            language = null;
            break;
    }
    let thisFormData = {
        sort: sort,
        pageIndex: pageIndex,
        order: order,
        category: JSON.stringify(category),
        tag: JSON.stringify(tag),
        minPrice: minPrice,
        maxPrice: maxPrice,
        area: area,
        language: language,
    }
    getGameList(thisFormData)
});
