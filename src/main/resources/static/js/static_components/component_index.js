//首页组件初始化
$(document).ready(function () {
    //显示加载动画
    loadingAnimation(".recommendation-body-container").then(function () {
        //获取游戏展示所需的模板
        getRecommendationGameCardHtml().then(function (value) {
            //首页初始化
            index_init(value);
        });
    });
});

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 初始化
 */
function index_init(game_recommendation_card_html) {

    /*对首页幻灯片相关的初始化可以在这里完成*/

    $.get(
        requestmap.store_index_carousel,
        function (data) {
            if (data.status === 0)
                $("#index-carousel-container").hide();
            else {
                let picList = data.resultMap.picList;
                let gameList = data.resultMap.gameList;

                let html_indicators = "";
                let html_inner = "";

                $.each(picList, function (key, value) {
                    //轮播图片设置
                    html_inner += "<div class='item'>\n" +
                        "              <a target='_blank' href='game_detail.html?gid=" + gameList[key].gid + "'>" +
                        "                   <img src='" + "/" + value + "' alt='" + gameList[key].gname + "'>" +
                        "               </a>" +
                        "              <div class='carousel-caption'>" + gameList[key].gname + "</div>" +
                        "          </div>";

                    //轮播指示设置
                    html_indicators += "<li data-target='#index-carousel' data-slide-to='" + key + "'></li>";
                });

                //添加内容
                $(".carousel-indicators").html(html_indicators);
                $(".carousel-inner").html(html_inner);

                //首次轮播
                $(".carousel-inner .item:eq(0)").addClass("active");
                $(".carousel-indicators li:eq(0)").addClass("active");
            }
        }
    ).fail(function () {
        $("#index-carousel-container").hide();
    });

    //还原搜索条件
    restoreSearchConditonDefault();

    //首页的所有查询页码和一页显示数量都固定
    searchCondition.pageIndex = index_pageIndex;
    searchCondition.pageCount = index_pageCount;

    //展示推荐的促销游戏
    showGameByPromotion(game_recommendation_card_html);
    //展示高评价游戏
    showGameByScore(game_recommendation_card_html);
    //展示推荐的免费游戏
    showFreeGame(game_recommendation_card_html);
    //展示新游戏
    showNewGame(game_recommendation_card_html);
    //展示即将上线游戏
    showPreGame(game_recommendation_card_html);

    //为更多超链接注册监听
    setListenerForMoreA();

    //还原默认查询条件
    searchCondition.pageIndex = 0;
    searchCondition.pageCount = undefined;
}

/**
 * 作者: lwh
 * 时间: 2020.8.28
 * 描述: 为更多超链接设置监听
 */
function setListenerForMoreA() {
    $(".recommendation-title-container > span:last-of-type > a").on("click", function () {
        let type = $(this).parent().prev().text().split("】")[1];
        //恢复默认搜索条件
        restoreSearchConditonDefault();
        //设置搜索条件
        switch (type) {
            case "正在促销":
                searchCondition.sort = "discount";
                break;
            case "高评价":
                searchCondition.sort = "score";
                break;
            case "免费游戏":
                searchCondition.minPrice = 0;
                searchCondition.maxPrice = 0;
                break;
            case "新上线":
                searchCondition.tag = JSON.stringify(["newsale"]);
                break;
            case "即将上线":
                searchCondition.tag = JSON.stringify(["presale"]);
                break;
            default:
                break;
        }
        $("nav.navbar ul.navbar-nav:eq(0) > li:eq(0)").removeClass("active");
        $("nav.navbar ul.navbar-nav:eq(0) > li:eq(1) > a").html(type + "<span class='caret'></span>");
        $("nav.navbar ul.navbar-nav:eq(0) > li:eq(1)").addClass("active");
        showAllGame();
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取推荐游戏展示html模板
 *
 * 游戏的展示必须在获取到游戏模板之后才能进行
 */
function getRecommendationGameCardHtml() {
    return new Promise(function (resolve) {
        $.get(
            dynamic_components.component_game_recommendation_card.curl,
            function (data) {
                resolve(data);
            }
        );
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示促销游戏
 */
function showGameByPromotion(game_recommendation_card_html) {
    //设置特殊搜索条件
    searchCondition.sort = "discount";

    searchGame(searchCondition).then(
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);
                    //设置点击事件
                    html.find(".index-game-card-cover-container > a").attr("href", "/game_detail.html?gid=" + value.gid);
                    //设置封面
                    html.find(".index-game-card-cover-container img").attr("src", value.chref);
                    //设置游戏名称
                    html.find(".index-game-card-info-container > p").text(value.gname);
                    //设置折扣
                    let save = ((1 - value.discount) * 100).toFixed();
                    html.find(".index-game-card-info-price-container > span").text("-" + save + "%");
                    //设置原价
                    html.find(".index-game-card-info-price-container > div > span:first-of-type").text("￥" + value.gprice);
                    //设置现价
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").css("color", "rgb(255, 105, 0)");
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").text("￥" + value.gprice * value.discount);

                    finalHtml += html.html();
                });

                $("#recommendation-promotion").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-promotion");
            }
        },
        function () {
            ajaxFailed("#recommendation-promotion");
        }
    );

    //恢复默认搜索条件
    searchCondition.sort = undefined;
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示高评价游戏
 */
function showGameByScore(game_recommendation_card_html) {
    searchCondition.sort = "score";

    searchGame(searchCondition).then(
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);
                    //设置点击事件
                    html.find(".index-game-card-cover-container > a").attr("href", "/game_detail.html?gid=" + value.gid);
                    //设置封面
                    html.find(".index-game-card-cover-container img").attr("src", value.chref);
                    //设置游戏名称
                    html.find(".index-game-card-info-container > p").text(value.gname);
                    //判断该游戏是否是免费游戏
                    if (value.gprice === 0) {
                        html.find(".index-game-card-discount-label").text("免费");
                        //不能使用remove,直接删除节点会影响css
                        //隐藏折扣显示
                        html.find(".index-game-card-info-price-container > span").hide();
                        //设置原价
                        html.find(".index-game-card-info-price-container > div > span:first-of-type").hide();
                        //设置现价
                        html.find(".index-game-card-info-price-container > div > span:last-of-type").css("color", "rgb(255, 105, 0)");
                        html.find(".index-game-card-info-price-container > div > span:last-of-type").css("margin-top", "15px");
                        html.find(".index-game-card-info-price-container > div > span:last-of-type").text("免费");
                    } else {
                        //判断该游戏是否在促销
                        if (value.discount === 1) {
                            //隐藏特殊标签
                            html.find(".index-game-card-discount-label").hide();
                            //隐藏折扣显示
                            html.find(".index-game-card-info-price-container > span").hide();
                            //隐藏原价
                            html.find(".index-game-card-info-price-container > div > span:first-of-type").hide();
                            //设置现价
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").css("margin-top", "15px");
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").text("￥" + value.gprice);
                        } else {
                            //设置折扣
                            let save = ((1 - value.discount) * 100).toFixed();
                            html.find(".index-game-card-info-price-container > span").text("-" + save + "%");
                            //设置原价
                            html.find(".index-game-card-info-price-container > div > span:first-of-type").text("￥" + value.gprice);
                            //设置现价
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").css("color", "rgb(255, 105, 0)");
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").text("￥" + value.gprice * value.discount);
                        }
                    }

                    finalHtml += html.html();
                });
                $("#recommendation-score").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-score");
            }
        },
        function () {
            ajaxFailed("#recommendation-score");
        }
    );

    //恢复默认搜索条件
    searchCondition.sort = undefined;
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示免费游戏
 */
function showFreeGame(game_recommendation_card_html) {
    searchCondition.minPrice = 0;
    searchCondition.maxPrice = 0;

    searchGame(searchCondition).then(
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);
                    //设置点击事件
                    html.find(".index-game-card-cover-container > a").attr("href", "/game_detail.html?gid=" + value.gid);
                    //设置封面
                    html.find(".index-game-card-cover-container img").attr("src", value.chref);
                    //设置游戏名称
                    html.find(".index-game-card-info-container > p").text(value.gname);
                    //更改标签
                    html.find(".index-game-card-discount-label").text("免费");
                    //隐藏折扣
                    html.find(".index-game-card-info-price-container > span").hide();
                    //设置原价
                    html.find(".index-game-card-info-price-container > div > span:first-of-type").hide();
                    //设置现价
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").css("color", "rgb(255, 105, 0)");
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").css("margin-top", "15px");
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").text("免费");

                    finalHtml += html.html();
                });

                $("#recommendation-free").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-free");
            }
        },
        function () {
            ajaxFailed("#recommendation-free");
        }
    );

    //恢复默认搜索条件
    searchCondition.minPrice = undefined;
    searchCondition.maxPrice = undefined;
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示新上线游戏
 */
function showNewGame(game_recommendation_card_html) {
    searchCondition.tag = JSON.stringify(["newsale"]);

    searchGame(searchCondition).then(
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);
                    //设置点击事件
                    html.find(".index-game-card-cover-container > a").attr("href", "/game_detail.html?gid=" + value.gid);
                    //设置封面
                    html.find(".index-game-card-cover-container img").attr("src", value.chref);
                    //设置游戏名称
                    html.find(".index-game-card-info-container > p").text(value.gname);
                    //判断该游戏是否是免费游戏
                    if (value.gprice === 0) {
                        //更改标签
                        html.find(".index-game-card-discount-label").text("免费");
                        //隐藏折扣
                        html.find(".index-game-card-info-price-container > span").hide();
                        //设置原价
                        html.find(".index-game-card-info-price-container > div > span:first-of-type").hide();
                        //设置现价
                        html.find(".index-game-card-info-price-container > div > span:last-of-type").css("color", "rgb(255, 105, 0)");
                        html.find(".index-game-card-info-price-container > div > span:last-of-type").css("margin-top", "15px");
                        html.find(".index-game-card-info-price-container > div > span:last-of-type").text("免费");
                    } else {
                        //判断该游戏是否在促销
                        if (value.discount === 1) {
                            //隐藏特殊标签
                            html.find(".index-game-card-discount-label").hide();
                            //隐藏折扣显示
                            html.find(".index-game-card-info-price-container > span").hide();
                            //隐藏原价
                            html.find(".index-game-card-info-price-container > div > span:first-of-type").hide();
                            //设置现价
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").css("margin-top", "15px");
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").text("￥" + value.gprice);
                        } else {
                            //设置折扣
                            let save = ((1 - value.discount) * 100).toFixed();
                            html.find(".index-game-card-info-price-container > span").text("-" + save + "%");
                            //设置原价
                            html.find(".index-game-card-info-price-container > div > span:first-of-type").text("￥" + value.gprice);
                            //设置现价
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").css("color", "rgb(255, 105, 0)");
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").text("￥" + value.gprice * value.discount);
                        }
                    }
                    finalHtml += html.html();
                });
                $("#recommendation-new").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-new");
            }
        },
        function () {
            ajaxFailed("#recommendation-new");
        }
    );

    //恢复默认搜索条件
    searchCondition.tag = undefined;
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示即将上线游戏
 */
function showPreGame(game_recommendation_card_html) {
    searchCondition.tag = JSON.stringify(["presale"]);

    searchGame(searchCondition).then(
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);
                    //设置点击事件
                    html.find(".index-game-card-cover-container > a").attr("href", "/game_detail.html?gid=" + value.gid);
                    //设置封面
                    html.find(".index-game-card-cover-container img").attr("src", value.chref);
                    //设置游戏名称
                    html.find(".index-game-card-info-container > p").text(value.gname);
                    //设置标签
                    html.find(".index-game-card-discount-label").text("即将上线");
                    //隐藏折扣
                    html.find(".index-game-card-info-price-container > span").hide();
                    //隐藏原价
                    html.find(".index-game-card-info-price-container > div > span:first-of-type").hide();
                    //更改现价显示发售日期
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").css("margin-top", "15px");
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").text(value.realeasedate.split(" ")[0]);

                    finalHtml += html.html();
                });
                $("#recommendation-pre").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-pre");
            }
        },
        function () {
            ajaxFailed("#recommendation-pre");
        }
    );

    //恢复默认搜索条件
    searchCondition.tag = undefined;
}