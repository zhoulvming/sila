import { Component, OnInit } from '@angular/core';
import { AccessSourceService } from '../shared/services/accessSource.service';
import { EchartDataTemlate } from '../shared/models/echartDataTemplate';


import { FlowList } from '../shared/models/flowList01';
import { FlowTop10Item } from '../shared/models/flowList01';
var es = require('echarts');

@Component({
  selector: 'app-flow',
  templateUrl: './overview.component.html',
  providers: [
    AccessSourceService
  ],
})
export class ASOverviewComponent implements OnInit {
  private edt: EchartDataTemlate;

  public list01: FlowList[];
  public list02: FlowList[];
  public top10List: FlowTop10Item[];





  constructor(public accessSourceService: AccessSourceService) {
    this.edt = new EchartDataTemlate();
  }

  public showPie(): void {
    //从服务器端获取数据
    this.accessSourceService.getPieData()
      .then(

      pieData => {
        var dom = document.getElementById("pie01");
        var myChart = es.init(dom);
        var option = this.edt.getPieDataTemplate();
        option.series[0].name = "流量来源饼图";
        for (var i = 0; i < pieData.length; i++) {
          option.series[0].data[i] = {};
          option.series[0].data[i].value = pieData[i].num;
          option.series[0].data[i].name = pieData[i].visitType;
        }




        myChart.setOption(option, true);
      })
      .catch(err => { console.log(err);});
  }

  public showBar1(): void {
    //从服务器端获取数据
    this.accessSourceService.getBarData1()
      .then(

      barData => {
        var dom = document.getElementById("bar1");
        var myChart = es.init(dom);
        var option = barData;
        option = this.edt.getBarOptionTemplate();
        myChart.setOption(option, true);
      })
      .catch(err => { });
  }

  public showList1(): void {
    //从服务器端获取数据
    this.accessSourceService.getListData1()
      .then(
      data => {
        this.list01 = data;

      })
      .catch(err => { });
  }
  public showList2(): void {
    //从服务器端获取数据
    this.accessSourceService.getListData2()
      .then(
      data => {
        this.list02 = data;

      })
      .catch(err => { });
  }
  public showTop10List(): void {
    //从服务器端获取数据
    this.accessSourceService.getTop10ListData()
      .then(
      data => {
        this.top10List = data;

      })
      .catch(err => { });
  }

  ngOnInit() {
    this.showPie();
    this.showList1();
    this.showList2();
    this.showBar1();
    this.showTop10List();

  }
}