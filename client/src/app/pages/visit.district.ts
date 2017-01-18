import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppState, Global } from '../shared/services/app.service';
import { VisitorService } from '../shared/services/visitor.service';
import { VisitorList } from '../shared/models/visitorList';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/toPromise';
declare var $: any;
var ec = require('echarts');
//var china=require('map/js/china');


@Component({
  selector: 'source',
  templateUrl: './visit.district.html',
  providers: [
    VisitorService
  ],
})
export class VisitDistrictPage implements OnInit {
  public list: VisitorList[];

  // 时间范围(通过updateDaterangeI函数自动获取到页面所选内容)
  selectedDaterange = {
    startDate: '2016-01-01',
    endDate: '2016-03-01'
  };
  // 埋点网站(页面顶部下拉框所选内容)，因为
  selectedSiteID = [];
  // 分析类型：来源类型/来源网站
  anaType: number;

  constructor(public visitorService: VisitorService, private _http: Http, public _appState: AppState, private _global: Global, private ref: ChangeDetectorRef) {
    var self = this;
    //设置中国地图
    this._http.get('assets/data/china.json').toPromise()
      .then(response => {
        var chinaJson = response.json();
        ec.registerMap('china', chinaJson);
      });
    /**
     * 订阅分析网站变更事件
     * 取值用this.selectedSiteID[0]获取
     */
    _appState.siteSelectedChange.subscribe((value: any) => {
      self.selectedSiteID.unshift(value);
      self.ref.markForCheck();
      self.ref.detectChanges();
      self.selectedSiteID[0] = value;

      // render page
      this.renderPage();
    })
  }


  public showMap(): void {

    var siteId = this.selectedSiteID[0] ;
    var startDate = this.selectedDaterange.startDate ;
    var endDate = this.selectedDaterange.endDate ;
    siteId="1";
    startDate="2000-11-11";
    endDate="2020-11-11";
    //alert(siteId);
    //alert(startDate);
    if (!siteId) {
      //alert('您未选择要分析的目标网站') ;
      return ;
    }

    this.visitorService.getVisitorDataByProvince(startDate, endDate, siteId)
      .then(
      data => {
        this.list = data;

        var option = {
          title: {
            text: '访问量',
            //subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['iphone5']
          },
          visualMap: {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: '访问量',
              type: 'map',
              mapType: 'china',
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data: [
                //{ name: '西藏', value: 999 }

              ]
            }
          ]
        };
        for (var i = 0; i < data.length; i++) {
          if (i == 0) option.visualMap.max = data[i].ip_num;
          option.series[0].data[i] = {};
          option.series[0].data[i].value = data[i].ip_num;
          option.series[0].data[i].name = data[i].province;
        }
        var myChart = ec.init(document.getElementById('map_type'));
        myChart.setOption(option);

      })
      .catch(err => { console.log(err);});
      ;

  }

  ngOnInit() {
    //this.showMap(startDate,endDate,siteId);//
     this._global.init()
    this.showMap();
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
    this.showMap();
    //this.renderPage()
  }



  /**
   * 页面展现
   */
  renderPage() {

    console.log('>>> begin render page');
    console.log('目标网站ID：' + this.selectedSiteID[0]);
    console.log('日期范围：' + this.selectedDaterange.startDate + ' ~ ' + this.selectedDaterange.endDate);

    var targetSite = this.selectedSiteID[0];
    var startDate = this.selectedDaterange.startDate;
    var endDate = this.selectedDaterange.endDate;

    if (!targetSite) {
      //alert('您未选择要分析的目标网站');
      return;
    }

    // 获取

  }

}