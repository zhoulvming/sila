import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { AppState, Global } from '../shared/services/app.service'
var ec = require('echarts');

// private import
import { SourceService } from '../shared/services/source.service'
declare var $: any

@Component({
  templateUrl: './visit.client.html',
  providers: [
    SourceService
  ],
})
export class VisitClientPage implements OnInit {
  //constructor(public sourceService: SourceService) { }

  // 时间范围(通过updateDaterangeI函数自动获取到页面所选内容)
  selectedDaterange = {
    startDate: '2016-01-01',
    endDate: '2016-03-01'
  }

  // 埋点网站(页面顶部下拉框所选内容)，因为self.selectedSiteID.unshift(value);只能定义成数组类型
  selectedSiteID = []

  // 分析类型：来源类型/来源网站
  anaType: number

  constructor(
    public sourceService: SourceService,
    public appState: AppState,
    private _global: Global,
    private _ref: ChangeDetectorRef) {

    // self this
    var self = this

    /**
     * 订阅分析网站变更事件
     * 取值用this.selectedSiteID[0]获取
     */
    appState.siteSelectedChange.subscribe((value: any) => {
      self.selectedSiteID.unshift(value)
      self._ref.markForCheck()
      self._ref.detectChanges()
      self.selectedSiteID[0] = value

      // render page
      //this.renderPage()
    })
  }

  ngOnInit() { 
    this._global.init()
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
          data: ['IE', 'Chrome', 'FireFox', 'Safari', 'Opera']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '浏览器分布',
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
}