import { Component, OnInit } from '@angular/core';
import { AccessSourceService } from '../shared/services/accessSource.service';
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
export class PGOverviewComponent implements OnInit {
  public list01: FlowList[];
  public list02: FlowList[];
  public top10List:FlowTop10Item[];





  constructor(public flowService: AccessSourceService) {

  }

  public showPie(): void {
    //从服务器端获取数据
    this.flowService.getPieData()
      .then(

      data => {
        var dom = document.getElementById("pie01");
        var myChart = es.init(dom);
        var option = data;
        myChart.setOption(option, true);
      })
      .catch(err => { });
  }

  public showBar1(): void {
    //从服务器端获取数据
    this.flowService.getBarData1()
      .then(

      data => {
        var dom = document.getElementById("bar1");
        var myChart = es.init(dom);
        var option = data;
        myChart.setOption(option, true);
      })
      .catch(err => { });
  }

  public showList1(): void {
    //从服务器端获取数据
    this.flowService.getListData1()
      .then(
      data => {
        this.list01 = data;

      })
      .catch(err => { });
  }
  public showList2(): void {
    //从服务器端获取数据
    this.flowService.getListData2()
      .then(
      data => {
        this.list02 = data;

      })
      .catch(err => { });
  }  
  public showTop10List(): void {
    //从服务器端获取数据
    this.flowService.getTop10ListData()
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