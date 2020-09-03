//所有游戏页面初始化
$(document).ready(function () {
    formData = searchCondition;

    let sort;
    let order = "desc";
    let pageIndex = 0;
    let price_sort = 0;//初始为从高到低
    let category = [];
    let tag = [];
    let minPrice;
    let maxPrice;
    let area;
    let language;

    function getGameList() {
        console.log("查询条件：", formData);
        console.log("issearchResult", isSearchResult);
        if (isSearchResult === true) {
            $.post(
                requestmap.store_search,
                searchCondition,
                function (gameList) {
                    console.log("gameList:", gameList);
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
                            //console.log(languagelist[j])
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
                            //console.log(languagelist[j])
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

    function setPage(pageNumber) {
        //console.log("pagenumber= "+pageNumber);
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

    //为页码设置事件 -> 分页切换
    $(document).on("click", ".page-item", function () {
        console.log($(this).text())
        pageIndex = (parseInt($(this).text()) - 1) * 10
        console.log("pageIndex is " + pageIndex)
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
        JSON.stringify(thisFormData)
        //console.log(thisFormData)
        formData = thisFormData;
        getGameList()
        //分页栏的切换
        //将原有属性为 active 的 a 改为默认
        $(".active-button").removeClass("active-button")
        //将当前 a 的属性添加 active
        $(this).addClass("active-button")
    })
    $(document).on("click", ".game-sort-order", function () {
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
            console.log("价格的排序方法是" + price_sort)
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
            JSON.stringify(thisFormData)
            //console.log(thisFormData)
            formData = thisFormData;
            getGameList()
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
            JSON.stringify(thisFormData)
            //console.log(thisFormData)
            formData = thisFormData;
            getGameList()
        }


        $(".condition .active").removeClass("active")
        //将当前 a 的属性添加 active
        $(this).addClass("active")
    })
    // * category: 类别
    // * tag: presale, newsale, promotion
    // * minPrice: Float
    // * maxPrice: Float
    $(document).on("click", ".tags-block-wrapper", function () {
        pageIndex = 0;
        var thisString = $(this).text()
        var first = thisString[0];

        if (first == "√") {
            var str = thisString
            $(this).text((str != null ? str.substring(1, str.length) : ""))
            category.splice($.inArray($(this).text(), category), 1)
            console.log("category= " + $(this).text())
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
        JSON.stringify(thisFormData)
        // console.log(thisFormData)
        formData = thisFormData;
        getGameList()
    })
    $(document).on("click", ".tags-block-wrapper1", function () {
        pageIndex = 0;
        var thisString = $(this).text()
        var unchangeString = thisString;
        var first = thisString[0];

        if (first == "√") {
            var str = thisString
            $(this).text((str != null ? str.substring(1, str.length) : ""))
            tag.splice($.inArray($(this).text(), tag), 1)
            console.log("tag= " + $(this).text())
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
        // JSON.stringify(thisFormData)
        //console.log(thisFormData)
        formData = thisFormData;
        getGameList()
    })
    $(document).on("click", ".tags-block-wrapper2", function () {
        pageIndex = 0;
        console.log("page is " + pageIndex)
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
        JSON.stringify(thisFormData)
        // console.log(thisFormData)
        formData = thisFormData;
        getGameList()
    })
    //语言是3 area:China,other
    // ，地区是4 language:Chinese,other
    $(document).on("click", ".tags-block-wrapper4", function () {
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
        JSON.stringify(thisFormData)
        //console.log(thisFormData)
        formData = thisFormData;
        getGameList()
    })
    $(document).on("click", ".tags-block-wrapper3", function () {
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
        JSON.stringify(thisFormData)
        //console.log(thisFormData)
        formData = thisFormData;
        getGameList()
    })
    getGameList();
})
