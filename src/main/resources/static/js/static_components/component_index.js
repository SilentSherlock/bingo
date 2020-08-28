//首页组件初始化
$(document).ready(function () {
    //初始化
    getRecommendationGameCardHtml().then(function (value) {
        //首页初始化
        index_init(value);
    });
});

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 初始化
 */
function index_init(game_recommendation_card_html) {

    /*对首页幻灯片相关的初始化可以在这里完成*/

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
        $.get(dynamic_components.component_game_recommendation_card.curl, function (data) {
            resolve(data);
        });
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示促销游戏
 */
function showGameByPromotion(game_recommendation_card_html) {
    let data = {
        pageCount: index_pageCount,
        pageIndex: index_pageIndex,
        sort: "discount"
    };

    $.post(
        requestmap.store_search,
        data,
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);
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
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").text("￥" + value.gprice * value.discount);

                    finalHtml += html.html();
                });

                $("#recommendation-promotion").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-promotion");
            }
        }
    ).fail(function () {
        ajaxFailed("#recommendation-promotion");
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示高评价游戏
 */
function showGameByScore(game_recommendation_card_html) {
    let data = {
        pageCount: index_pageCount,
        pageIndex: index_pageIndex,
        sort: "score"
    };

    $.post(
        requestmap.store_search,
        data,
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);
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
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").text("￥" + value.gprice * value.discount);
                        }
                    }

                    finalHtml += html.html();
                });
                $("#recommendation-score").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-score");
            }
        }
    ).fail(function () {
        ajaxFailed("#recommendation-score");
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示免费游戏
 */
function showFreeGame(game_recommendation_card_html) {
    let data = {
        pageCount: index_pageCount,
        pageIndex: index_pageIndex,
        minPrice: 0,
        maxPrice: 0
    };

    $.post(
        requestmap.store_search,
        data,
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);
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
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").css("margin-top", "15px");
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").text("免费");

                    finalHtml += html.html();
                });

                $("#recommendation-free").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-free");
            }
        }
    ).fail(function () {
        ajaxFailed("#recommendation-free");
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示新上线游戏
 */
function showNewGame(game_recommendation_card_html) {
    let data = {
        pageCount: index_pageCount,
        pageIndex: index_pageIndex,
        tag: JSON.stringify(["newsale"])
    };

    $.post(requestmap.store_search,
        data,
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);

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
                            html.find(".index-game-card-info-price-container > div > span:last-of-type").text("￥" + value.gprice * value.discount);
                        }
                    }
                    finalHtml += html.html();
                });
                $("#recommendation-new").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-new");
            }
        }
    ).fail(function () {
        ajaxFailed("#recommendation-new");
    });
}

/**
 * 作者: lwh
 * 时间: 2020.8.26
 * 描述: 获取并显示即将上线游戏
 */
function showPreGame(game_recommendation_card_html) {
    let data = {
        pageCount: index_pageCount,
        pageIndex: index_pageIndex,
        tag: JSON.stringify(["presale"])
    };

    $.post(
        requestmap.store_search,
        data,
        function (data) {
            if (data.status === 1) {
                let finalHtml = "";

                $.each(data.resultMap.searchList, function (key, value) {
                    let html = $(game_recommendation_card_html);
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
                    html.find(".index-game-card-info-price-container > div > span:last-of-type").text(value.realeasedate.split("T")[0]);

                    finalHtml += html.html();
                });
                $("#recommendation-pre").html(finalHtml);
            } else {
                ajaxNoContent("#recommendation-pre");
            }
        }
    ).fail(function () {
        ajaxFailed("#recommendation-pre");
    });
}