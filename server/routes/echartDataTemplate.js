var barOptionTemplate = {
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        feature: {
            dataView: {show: false, readOnly: false},
            magicType: {show: false, type: ['line', 'bar']},
            restore: {show: false},
            saveAsImage: {show: false}
        }
    },
    legend: {
        data:['以往新增用户数量']
    },
    xAxis: [
        {
            type: 'category',
            data: [/*'1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'*/]
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '用户量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} '
            }
        }
       
    ],
    series: [
        {
            name:'以往新增用户数量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }
      
    ]
};

var pieOptionTemplate = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: 'xxx',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            
            data:[
            //    {value:40, name:'直接访问'},
            //    {value:30, name:'搜索'},
            //    {value:30, name:'外链'},
                
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

exports.getPieOptionTemplate = function() {
    return pieOptionTemplate;
};
