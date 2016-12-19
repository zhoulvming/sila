import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { AppState, Global } from '../shared/services/app.service';
@Component({
  selector: 'source',
  templateUrl: './visit.district.html'
})
export class VisitDistrictPage implements OnInit {
  // 时间范围(通过updateDaterangeI函数自动获取到页面所选内容)
  selectedDaterange = {
    startDate: '2016-01-01',
    endDate: '2016-03-01'
  };
  // 埋点网站(页面顶部下拉框所选内容)，因为
  selectedSiteID = [];
  // 分析类型：来源类型/来源网站
  anaType: number;

  constructor(public _appState: AppState, private _global: Global, private ref: ChangeDetectorRef) {
    var self = this;

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

  ngOnInit() { }



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
    
    if ( ! targetSite ) {
      //alert('您未选择要分析的目标网站');
      return ;
    }

    // 获取

  }
  
}