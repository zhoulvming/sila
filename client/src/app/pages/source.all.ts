// system import or require
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { AppState, Global } from '../shared/services/app.service'
var ec = require('echarts')
declare var $: any

// private import
import { SourceService } from '../shared/services/source.service'

@Component({
  templateUrl: './source.all.html',
  providers: [ SourceService ],
})
export class SourceAllPage implements OnInit {

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
      this.renderPage()
    })
  }

  ngOnInit() {
    this._global.init()
    this.renderPage()
  }

  setEchartPie_sourceType_today_pv(data) {
    var myChart = ec.init(document.getElementById('pie_source_type'))
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        y: 'bottom',
        data: ['搜索引擎', '外部链接', '直接访问']
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      series: [
        {
          name: '来源类型',
          type: 'pie',
          radius: ['30%', '60%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: true
              }
            },
            emphasis: {//强调样式（悬浮时样式
              label: {
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            }
          },
          data: data
        }
      ]
    };
    myChart.setOption(option);
  }

//todo:test data fo me 
  /**
   * 来源类型折线图
   * 范围：今日
   * 分析指标：浏览量（PV）
   */
  setEchartLine_sourceType_today_pv(data) {

    var day_xAxisData = ['00:00~00:59', '01:00~01:59', '02:00~02:59', '03:00~03:59', '04:00~04:59', 
      '05:00~05:59', '06:00~06:59', '07:00~07:59', '08:00~08:59', '09:00~09:59', '10:00~10:59', '11:00~11:59', '12:00~12:59', 
      '13:00~13:59', '14:00~14:59', '15:00~15:59', '16:00~16:59', '17:00~17:59', '18:00~18:59', '19:00~19:59', '20:00~20:59', 
      '21:00~21:59', '22:00~22:59', '23:00~23:59']

    var option = {
      tooltip: {
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
        trigger: 'axis'
      },
      legend: {
        data: ['搜索引擎', '外部链接', '直接访问'],
        y: "bottom"
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          name: "时间",
          boundaryGap : false,
          data: day_xAxisData,
          axisLabel: {
            interval: 3
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitArea: { show: true },
          name: "数值"
        }
      ],
      series: [
        {
          name: '搜索引擎',
          type: 'line',
          data: [1.6, 4.9, 7.0, 23.2, 25.6, 29,1.6, 4.9, 7.0, 23.2, 25.6, 29, 1.6, 4.9, 7.0, 23.2, 25.6, 29,1.6, 4.9, 7.0, 23.2, 25.6, 29]
        },
        {
          name: '外部链接',
          type: 'line',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 30, 2.6, 5.9, 9.0, 26.4, 28.7, 30, 2.6, 5.9, 9.0, 26.4, 28.7, 30, 2.6, 5.9, 9.0, 26.4, 28.7, 30]
        },
        {
          name: '直接访问',
          type: 'line',
          data: [3.6, 6.9, 11.0, 28.4, 30.7, 31, 3.6, 6.9, 11.0, 28.4, 30.7, 31, 3.6, 6.9, 11.0, 28.4, 30.7, 31, 3.6, 6.9, 11.0, 28.4, 30.7, 31]
        }
      ]
    }

    //加载图表  
    var myChart = ec.init(document.getElementById("line_source_type"))
    myChart.setOption(option)
  }

  ngAfterContentInit() { }

  /**
   * treegrid setup
   */
  setupTreeData() {
    $('#mytree').jqGrid({
      "url": "assets/data/data.json",
      "colModel": [
        {
          "name": "id",
          "index": "id",
          "sorttype": "int",
          "key": true,
          "hidden": true,
          "width": 50
        }, {
          "name": "name",
          "index": "name",
          "sorttype": "string",
          "label": "来源类型",
          "width": 120
        }, {
          "name": "pv",
          "index": "pv",
          "sorttype": "int",
          "label": "浏览量",
          // "width":90,
          "align": "right"
        }, {
          "name": "pv_ratio",
          "index": "pv_ratio",
          "sorttype": "number",
          "label": "浏览量占比(%)",
          // "width":90,
          "align": "right"
        }, {
          "name": "visit_count",
          "index": "visit_count",
          "sorttype": "string",
          "label": "访问次数",
          // "width":100
          "align": "right"
        }, {
          "name": "uv",
          "index": "uv",
          "sorttype": "int",
          "label": "访客数",
          // "width":100
          "align": "right"
        }, {
          "name": "visit_average_time",
          "index": "visit_average_time",
          "sorttype": "string",
          "label": "平均访问时长",
          // "width":100
          "align": "right"
        }, {
          "name": "lft",
          "hidden": true
        }, {
          "name": "rgt",
          "hidden": true
        }, {
          "name": "level",
          "hidden": true
        }, {
          "name": "uiicon",
          "hidden": true
        }
      ],
      "width": $('.tab-content').width() - 15,
      "hoverrows": false,
      "viewrecords": false,
      "gridview": true,
      "height": "auto",
      "sortname": "lft",
      "loadonce": true,
      "rowNum": 100,
      "scrollrows": true,
      "treeGrid": true,
      "ExpandColumn": "name",
      "ExpandColClick": true,
      "treedatatype": "json",
      "treeGridModel": "nested",
      "treeReader": {
        "left_field": "lft",
        "right_field": "rgt",
        "level_field": "level",
        "leaf_field": "isLeaf",
        "expanded_field": "expanded",
        "loaded": "loaded",
        "icon_field": "icon"
      },
      "sortorder": "asc",
      "datatype": "json",
      "pager": "#pager"
    })
  }

  /**
   * 
   * 日期范围变化触发此函数
   * 
   * @param {any} obj
   * obj {
   *   startDate: ...
   *   endDate: ...
   * }
   * 
   * @memberOf SourceAllPage
   */
  updateDaterangeI(obj) {
    this.selectedDaterange = obj
    this.renderPage()
  }


  /**
   * 页面展现
   */
  renderPage() {
    var self = this

    console.log('>>> begin render page')
    console.log('目标网站ID：' + this.selectedSiteID[0])
    console.log('日期范围：' + this.selectedDaterange.startDate + ' ~ ' + this.selectedDaterange.endDate)

    var siteId = this.selectedSiteID[0]
    var startDate = this.selectedDaterange.startDate
    var endDate = this.selectedDaterange.endDate

    if (!siteId) {
      //alert('您未选择要分析的目标网站')
      //return
    }

    //todo: test data
    startDate = '2016-12-22'
    endDate = '2016-12-22'
    siteId = 1

    self.sourceService.getDataWithType(siteId, startDate, endDate)
      .then(data => {
        console.log(data)
        self.setEchartPie_sourceType_today_pv(data.pieData)
        //self.setEchartLine_sourceType_today_pv(data.lineData)
        self.setupTreeData()
      }).catch(err => { })
  }
}