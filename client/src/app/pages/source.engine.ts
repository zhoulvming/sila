// system import or require
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { AppState, Global } from '../shared/services/app.service'
var ec = require('echarts')
declare var $: any

// private import
import { SourceService } from '../shared/services/source.service'

@Component({
  templateUrl: './source.engine.html',
  providers: [ SourceService ]
})
export class SourceEnginePage implements OnInit {

  // 时间范围(通过updateDaterangeI函数自动获取到页面所选内容)
  selectedDaterange = {
    startDate: '2016-01-01',
    endDate: '2016-03-01'
  }

  // 埋点网站(页面顶部下拉框所选内容)，因为self.selectedSiteID.unshift(value);只能定义成数组类型
  selectedSiteID = []

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

  /**
   * 组件初始化
   * 
   *   _global.init: 每个页面均需要调用此函数
   *   renderPage: 页面渲染
   */
  ngOnInit() {
    this._global.init()
    this.renderPage()
  }
  ngAfterContentInit() { }

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

    var siteId = this.selectedSiteID[0]
    var startDate = this.selectedDaterange.startDate
    var endDate = this.selectedDaterange.endDate


    // todo: 测试用，后面放开
    if (!siteId) {
      //alert('您未选择要分析的目标网站')
      //return
    }

    //todo: test data
    startDate = '2016-12-22'
    endDate = '2016-12-22'
    siteId = 1

    //饼图
    self.setupPieChart()

    //折线图
    self.setupLineChart()

    // treegrid data
    self.setupTreeGrid()

  }

  setupPieChart() {
    var dom = ec.init(document.getElementById('pie_source_engine'))
    var option = {
      legendData: ['百度', '谷歌', '搜狗'],
      seriesData: [
                    {value:70, name:'百度'},
                    {value:20, name:'谷歌'},
                    {value:10, name:'搜狗'}
                  ]
    }
    this._global.setupPieChart(dom, option)
  }

  setupLineChart() {
    var option = {
      seriesData: [
        {
          name: '百度',
          type: 'line',
          data: [100, 110, 120, 130, 140, 150, 160]
        },
        {
          name: '谷歌',
          type: 'line',
          data: [50, 60, 70, 80, 90, 100, 110]
        },
        {
          name: '搜狗',
          type: 'line',
          data: [20, 30, 40, 60, 50, 40, 30]
        }
      ],
      legendData: {
        data: ['百度', '谷歌', '搜狗']
      },
      xAxisData: this._global.getLast7day(),
      xAxisInterval: 1
    }
    var dom = ec.init(document.getElementById('line_source_engine'))
    this._global.setupLineChart(dom, option)
  }

  setupTreeGrid() {
    var option = {
      jsonUrl: 'assets/data/data.json'
    }
    var dom = $('#treegrid_engine')

    this._global.setupTreeGrid(dom, option)
  }


}