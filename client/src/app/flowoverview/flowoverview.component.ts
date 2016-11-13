import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { FlowService } from '../shared/services/flow.service';
import { Flow } from '../shared/models/flow';
var es=require('echarts');

@Component({
  selector: 'app-flow',
  templateUrl: './flowoverview.component.html',
  styleUrls: ['./flowoverview.component.css'],
  providers: [
    FlowService
  ],
})
export class FlowOverviewComponent implements OnInit {


  public list: Flow[];





  constructor(public flowService: FlowService) {

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

  ngOnInit() {
    this.showPie();



  }

}
