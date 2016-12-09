import { Component, OnInit } from '@angular/core';
import { AccessSourceService } from '../shared/services/accessSource.service';
import { EchartDataTemlate } from '../shared/models/echartDataTemplate';


import { FlowList } from '../shared/models/flowList01';
import { FlowTop10Item } from '../shared/models/flowList01';
var es = require('echarts');

@Component({
  selector: 'app-flow--',
  templateUrl: './overview.component.html',
  providers: [
    AccessSourceService
  ],
})
export class ASOverviewComponent implements OnInit {
  private edt: EchartDataTemlate;

  public list01: FlowList[];
  public list02: FlowList[];
  public list03: FlowList[];
  public top10List: FlowTop10Item[];





  constructor(public accessSourceService: AccessSourceService) {
    this.edt = new EchartDataTemlate();
  }

  public showPie(startDate,endDate): void {
    //从服务器端获取数据
    this.accessSourceService.getPieData(startDate,endDate)
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
        var option = this.edt.getBarOptionTemplate();
        for (var i = 0; i < barData.length; i++) {
          option.xAxis[0].data[i]=barData[i].date;
          option.series[0].data[i]=barData[i].num;
          
        }
        myChart.setOption(option, true);
      })
      .catch(err => { });
  }

  public showList1(startDate,endDate): void {
    //从服务器端获取数据
    this.accessSourceService.getListData1(startDate,endDate)
      .then(
      data => {
        this.list01 = data;

      })
      .catch(err => { });
  }
  public showList2(startDate,endDate): void {
    //从服务器端获取数据
    this.accessSourceService.getListData2(startDate,endDate)
      .then(
      data => {
        this.list02 = data;

      })
      .catch(err => { });
  }
  public showList3(startDate,endDate): void {
    //从服务器端获取数据
    this.accessSourceService.getListData3(startDate,endDate)
      .then(
      data => {
        this.list03 = data;

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

  public showAgain(): void {
    console.log("show again");
  }

  ngOnInit() {
    //console.log("4==="+$('#date-range').val());
    var startDate='2016-10-10';
    var endDate  ='2016-11-26';
    this.showPie(startDate,endDate);
    this.showList1(startDate,endDate);
    this.showList2(startDate,endDate);
    this.showList3(startDate,endDate);
    this.showBar1();
    this.showTop10List();

/*
    $('#date-range').on('apply.daterangepicker',function(ev, picker) {
      console.log("===========iam here======");
      
        console.log(ev);
      console.log("showPie ---"+ picker.startDate.format('YYYY-MM-DD')+"  "+picker.endDate.format('YYYY-MM-DD'));
       this.showPie(picker.startDate.format('YYYY-MM-DD'),
                    picker.endDate.format('YYYY-MM-DD'));
      
    });
    */


  }
}