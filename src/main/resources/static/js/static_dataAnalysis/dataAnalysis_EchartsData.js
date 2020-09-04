//柱状图
function configureBarEcharts(echartsId, xData, yData){
    var myEcharts = echarts.init(document.getElementById(echartsId));

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval : 2
            },
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: yData,
            type: 'bar',
        }]
    };
// 使用刚指定的配置项和数据显示图表。
    myEcharts.setOption(option);
}
//饼状图
function configurePieEcharts(echartsId, data){
    var myEcharts = echarts.init(document.getElementById(echartsId));
    var maxIndex = data.length - 1;
    var min = data[maxIndex].value - (data[maxIndex].value / 2);
    var max = data[0].value + (data[0].value / 2);

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '热销类型',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#000000'
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
            show: false,
            min: min,
            max: max,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '类型',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: data.sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    textStyle: {
                        fontWeight : 'bold',
                        fontSize : 18
                    },
                    color: 'rgb(0,0,0)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    shadowBlur: 200,
                    shadowColor: 'rgba(123,123,123,0.5)'
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    myEcharts.setOption(option);
}
//折线图
function configureLineEcharts(echartsId, xData, yData){
    echarts.init(document.getElementById(echartsId)).clear();
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(echartsId));

    option = {
        title: {
            text: '游戏销量关系图',
            subtext: '30日内的销量',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data: ['销量'],
            left: 10
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 100 - (7 / 30) * 100 + 1,
                end: 100,
                xAxisIndex: [0]
            },
            {
                type: 'inside',
                realtime: true,
                start: 100 - (7 / 30) * 100 + 1,
                end: 100,
                xAxisIndex: [0]
            }
        ],
        grid: {
            left: 50,
            right: 50,
            height: '70%'
        },
        xAxis:{
            type: 'category',
            boundaryGap: false,
            data: xData
        },
        yAxis: {
            name: '销量(份)',
            type: 'value',
        },
        series:{
            name: '销量',
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            symbolSize: 8,
            hoverAnimation: false,
            data: yData
        }
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true);
}