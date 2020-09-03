//引入全局变量
// let dataCurrentPage = 1;
// let dataCurrentIndex = 0;
// let dataCountPage = 0;
// let updategid;
// let curSearch = null;
// let curOrder = 'asc';
// let curSort = 0;
/*页面初始化*/
$(document).ready(function () {
    window.onresize = function () {
        location.reload();
    };

    $("#home-content").show();
    $("#edit-query-game").hide();
    $("#add-game-content").hide();

    ChangeIndexPage(0, curSearch);
    $('#table-body').on('click','tr', function() {
        var gid = $(this).closest("tr").find("td").eq(1).text();
        var state = document.getElementById(gid).getAttribute('class');
        if(state === 'collapse'){
            $(this).closest("tr").find("td").eq(0).html("<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-arrows-angle-contract\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "  <path fill-rule=\"evenodd\" d=\"M9.5 2.036a.5.5 0 0 1 .5.5v3.5h3.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5z\"/>\n" +
                "  <path fill-rule=\"evenodd\" d=\"M14.354 1.646a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 1 1-.708-.708l4.5-4.5a.5.5 0 0 1 .708 0zm-7.5 7.5a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708-.708l4.5-4.5a.5.5 0 0 1 .708 0z\"/>\n" +
                "  <path fill-rule=\"evenodd\" d=\"M2.036 9.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V10h-3.5a.5.5 0 0 1-.5-.5z\"/>\n" +
                "</svg>");
            getECharts(gid);
        }else{
            $(this).closest("tr").find("td").eq(0).html("<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-arrows-angle-expand\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "  <path fill-rule=\"evenodd\" d=\"M1.5 10.036a.5.5 0 0 1 .5.5v3.5h3.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5z\"/>\n" +
                "  <path fill-rule=\"evenodd\" d=\"M6.354 9.646a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708-.708l4.5-4.5a.5.5 0 0 1 .708 0zm8.5-8.5a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708-.708l4.5-4.5a.5.5 0 0 1 .708 0z\"/>\n" +
                "  <path fill-rule=\"evenodd\" d=\"M10.036 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 1 1-1 0V2h-3.5a.5.5 0 0 1-.5-.5z\"/>\n" +
                "</svg>");
        }
    });
})
/***翻页*/
$(document).on("click",".dataAnalysis-to-page",function () {
    if(this.innerText=="»"){
        dataCurrentPage++;
        if(dataCurrentPage > dataCountPage){
            dataCurrentPage = dataCountPage;
        }else {
            dataCurrentPage = dataCurrentPage;
        }
    }else if(this.innerText=="«"){
        dataCurrentPage--;
        if(dataCurrentPage == 0){
            dataCurrentPage = 1;
        }else {
            dataCurrentPage = dataCurrentPage;
        }
    }else {
        dataCurrentPage = this.innerText
    }
    dataCurrentIndex = 10 * (dataCurrentPage-1);
    ChangeIndexPage();
})
//获取数据分析页面加载时需要显示的图表
function loadStartEcharts(){
    var data = [];
    var type = [];
    var sales = [];
    var colors = ['#e53756',
        '#e2289d',
        '#7974b1',
        '#75a78b',
        '#c1a984']
    //获取数据
    $.ajax({
        url:"../../store/getFavType",
        type:"post",
        async: false,
        success:function (result) {
            console.log(result);
            var sortFavType = result.resultMap.sortFavType;
            var favType = result.resultMap.favType;
            for(let i = 0; i < 5; i++){
                for(var key in sortFavType[i]){
                    data.push({
                        value : sortFavType[i][key],
                        name : key.toString(),
                        itemStyle: {
                            color : colors[i]
                        }
                    });
                }
            }
            for(let key in favType){
                let r = Math.random() * 255;
                let g = Math.random() * 255;
                let b = Math.random() * 255;
                type.push(key.toString());
                sales.push({
                    value: favType[key],
                    itemStyle : {
                        color : 'rgb(' + r + ',' + g + ',' + b + ')'
                    }
                });
            }
        }
    })
    //生成Echarts表
    let flag = 0;
    if(sales.length != 0 && type.length != 0){
        configureBarEcharts('gameType', type, sales);
        flag = 0;
    }
    else{
        flag = 1;
    }
    if(data.length != 0){
        console.log(data);
        configurePieEcharts('gameTypeFav', data);
        flag = 0;
    }else{
        flag = 1;
    }
    if(flag === 1){
        document.getElementById("no-data-alert-admin").removeAttribute("hidden");
    }else if(flag == 0){
        document.getElementById("no-data-alert-admin").setAttribute("hidden", true);
    }
}
//根据相应标签id获取其下的折线图
function getECharts(id){
    var time = new Date();
    var timeData = [];
    for(var i = 29; i >=0; i--){
        timeData.push(DateToTime(new Date(time.getTime() - i * 24 * 3600 * 1000)));
    }
    var gid = {
        gid : id
    }
    var data = [];
    $.ajax({url:'../../store/getSale2DateByGId',
        type:'post',
        data: gid,
        async: false,
        success:function (result) {
            console.log(result);
            data = result.resultMap.sales;
        }});
    configureLineEcharts('main_' + id, timeData, data);
}
//获取游戏销售数据信息并配置分页
function ChangeIndexPage(){
    let html = "";
    let pageHtml = "";
    $.ajax({
        url:"../../store/getAllGameSaleData",
        type:"post",
        data:{
            order : curOrder,
            sort : curSort,
            gname: curSearch,
            pageIndex : dataCurrentIndex,
            pageCount : 10,
        },
        dataType:'json',
        success:function (result) {
            if(result.status == 1){
                let gameSaleData = result.resultMap.gameSaleData;
                for(let key in gameSaleData){
                    html +=
                        "<tr class='rows' data-toggle='collapse' href='#" + result.resultMap.gameSaleData[key].gid + "' aria-expanded='false' aria-controls='collapseExample'>" +
                        "<td scope='col'style='text-align: center'><svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-arrows-angle-expand\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                        "  <path fill-rule=\"evenodd\" d=\"M1.5 10.036a.5.5 0 0 1 .5.5v3.5h3.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5z\"/>\n" +
                        "  <path fill-rule=\"evenodd\" d=\"M6.354 9.646a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708-.708l4.5-4.5a.5.5 0 0 1 .708 0zm8.5-8.5a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708-.708l4.5-4.5a.5.5 0 0 1 .708 0z\"/>\n" +
                        "  <path fill-rule=\"evenodd\" d=\"M10.036 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 1 1-1 0V2h-3.5a.5.5 0 0 1-.5-.5z\"/>\n" +
                        "</svg></td>" +
                        "<td scope='col'style='text-align: center'>" + result.resultMap.gameSaleData[key].gid + "</td>" +
                        "<td scope='col'>" + result.resultMap.gameSaleData[key].gname + "</td>" +
                        "<td scope='col'style='text-align: center'>" + result.resultMap.gameSaleData[key].cursale + "</td>";
                    if(result.resultMap.gameSaleData[key].increaserate === 0){
                        html += "<td scope='col' style='text-align: center'>" + (result.resultMap.gameSaleData[key].increaserate * 100).toFixed(2) + "%" + "&nbsp;&nbsp;<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-list\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z\"/>\n" +
                            "</svg></td>";
                    }else if(result.resultMap.gameSaleData[key].increaserate < 0){
                        html += "<td scope='col' style='text-align: center;background-color: #faa1a1'>" + (result.resultMap.gameSaleData[key].increaserate * 100).toFixed(2) + "%" + "&nbsp;&nbsp;<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-arrow-down\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z\"/>\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z\"/>\n" +
                            "</svg></td>";
                    }else{
                        html += "<td scope='col' style='text-align: center;background-color: #8fd19e'>" + (result.resultMap.gameSaleData[key].increaserate * 100).toFixed(2) + "%" + "&nbsp;&nbsp;<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-arrow-up\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z\"/>\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z\"/>\n" +
                            "</svg></td>";
                    }
                    html += "</tr> <tr class='collapse' id='" + result.resultMap.gameSaleData[key].gid + "'>'" +
                        "<td class='well' id='main_" + result.resultMap.gameSaleData[key].gid + "' style='width:800px;height:400px;' colspan='5'></td></tr>";
                }
                $(".table-body").html(html);
            }
            pageHtml +=
                "<nav aria-label=\"Page navigation\">\n" +
                "  <ul class=\"pagination \">\n" +
                "    <li>\n" +
                "      <a class='dataAnalysis-to-page' href=\"#\" aria-label=\"Previous\">\n" +
                "        <span aria-hidden=\"true\">&laquo;</span>\n" +
                "      </a>\n" +
                "    </li>"
            dataCountPage = result.resultMap.gameSaleDataCount;
            console.log(dataCountPage);
            let pages = new Array();
            if(dataCurrentPage>3){
                if(dataCurrentPage<dataCountPage-3){
                    pages.push(dataCurrentPage-3);
                    pages.push(dataCurrentPage-2);
                    pages.push(dataCurrentPage-1);
                    pages.push(dataCurrentPage*1);
                    pages.push(dataCurrentPage*1+1);
                    pages.push(dataCurrentPage*1+2);
                }else{
                    for(let i = dataCountPage-6;i < dataCountPage;i++){
                        pages.push(i+1);
                    }
                }
            }else{
                for(let i = 0;i < 6;i++){
                    pages.push(i+1);
                }
            }
            for(let i = 0; i < pages.length;i++){
                let page = i;
                if(pages[page]>dataCountPage){
                    break;
                }
                if(pages[page] == dataCurrentPage){
                    pageHtml +="<li class='active'><a class='dataAnalysis-to-page'>"+pages[page]+"</a></li>"
                }else {
                    pageHtml +="<li ><a class='dataAnalysis-to-page'>"+pages[page]+"</a></li>"
                }
            }
            pageHtml +=
                "<li>\n" +
                "      <a class='dataAnalysis-to-page' href=\"#\" aria-label=\"Next\">\n" +
                "        <span aria-hidden=\"true\">&raquo;</span>\n" +
                "      </a>\n" +
                "    </li>\n" +
                "  </ul>\n" +
                "</nav>"
            $(".data-pages").html(pageHtml);
        }
    })
}

function ClearOtherSort(src){
    if(src === 0){
        $("#cursale").html("本日销量");
        $("#increaserate").html("同比增长");
    }else if(src === 1){
        $("#uniqueId").html("唯一识别码");
        $("#increaserate").html("同比增长");
    }else if(src === 2){
        $("#uniqueId").html("唯一识别码");
        $("#cursale").html("本日销量");
    }

}
