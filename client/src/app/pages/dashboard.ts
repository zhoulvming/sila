import { Component, OnInit } from '@angular/core';
import { AppState, Global } from '../shared/services/app.service';
declare var $: any;
var ec = require('echarts');

@Component({
  templateUrl: './dashboard.html'
})
export class DashboardPage implements OnInit {
  constructor(public _appState: AppState, private _global: Global) { }

  ngOnInit() {

    // 页面一些共通组件的初始化和数据获取
    this._global.init();


    this.setLine_source_type();
    this.setBar_source_type();


  }

  setBar_source_type() {
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['蒸发量', '降水量'],
        y: "bottom"
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['10-19岁', '20-29岁', '30-39岁', '40-49岁', '50-59岁']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '年龄分布',
          type: 'bar',
          data: [10, 40, 30, 15, 5],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          },
          itemStyle: {
            normal: {
              color: '#60C0DD'
            }
          }
        }
      ]
    };
    
    
    
    //图表渲染的容器对象  
    var chartContainer = document.getElementById("bar_source_type");  
    //加载图表  
    var myChart = ec.init(chartContainer);  
    myChart.setOption(option);  
  }

  setLine_source_type() {

    var title = {
      text: "ECharts简单线形图表及其配置展示实例", //正标题  
      link: "http://www.xxx.com", //正标题链接 点击可在新窗口中打开  
      x: "center", //标题水平方向位置  
      subtext: "From:http://www.xxx.com", //副标题  
      sublink: "http://www.xxx.com", //副标题链接  
      //正标题样式  
      textStyle: {
        fontSize: 24
      },
      //副标题样式  
      subtextStyle: {
        fontSize: 12,
        color: "red"
      }
    };

    var option = {
      //图表标题  
      // title: title,

      //数据提示框配置  
      tooltip: {
        trigger: 'axis' //触发类型，默认数据触发，见下图，可选为：'item' | 'axis' 其实就是是否共享提示框  
      },
      //图例配置  
      legend: {
        data: ['搜索引擎', '外部链接', '直接访问'], //这里需要与series内的每一组数据的name值保持一致  
        y: "bottom"
      },
      //工具箱配置  
      toolbox: {
        show: true,
        feature: {
          mark: { show: true }, // 辅助线标志，上图icon左数1/2/3，分别是启用，删除上一条，删除全部  
          dataView: { show: true, readOnly: false },// 数据视图，上图icon左数8，打开数据视图  
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },// 图表类型切换，当前仅支持直角系下的折线图、柱状图转换，上图icon左数6/7，分别是切换折线图，切换柱形图  
          restore: { show: true }, // 还原，复位原始图表，上图icon左数9，还原  
          saveAsImage: { show: true } // 保存为图片，上图icon左数10，保存  
        }
      },
      calculable: true,
      //轴配置  
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          name: "月份"
        }
      ],
      //Y轴配置  
      yAxis: [
        {
          type: 'value',
          splitArea: { show: true },
          name: "数值"
        }
      ],
      //图表Series数据序列配置  
      series: [
        {
          name: '搜索引擎',
          type: 'line',
          data: [1.6, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '外部链接',
          type: 'line',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: '直接访问',
          type: 'line',
          data: [3.6, 6.9, 11.0, 28.4, 30.7, 72.7, 177.6, 185.2, 50.7, 20.8, 8.0, 4.3]
        }
      ]
    };
    
    
    
    //图表渲染的容器对象  
    var chartContainer = document.getElementById("line_source_type");  
    //加载图表  
    var myChart = ec.init(chartContainer);  
    myChart.setOption(option);  
  }

}