import { Component, OnInit } from '@angular/core';
import { PageInfoService } from '../shared/services/pageInfo.service';
//import { FlowList } from '../shared/models/flowList01';
//import { FlowTop10Item } from '../shared/models/flowList01';
var es = require('echarts');

@Component({
  selector: 'app-flow',
  templateUrl: './overview.component.html',
  providers: [
    PageInfoService
  ],
})
export class PGOverviewComponent implements OnInit {
 





  constructor(public pageInfoService: PageInfoService) {

  }

  public showLine(): void {
    //从服务器端获取数据
    this.pageInfoService.getLineData()
      .then(

      data => {
        var dom = document.getElementById("line1");
        var myChart = es.init(dom);
        var option = data;
        myChart.setOption(option, true);
      })
      .catch(err => { });
  }

  

  
  ngOnInit() {
    this.showLine();
   

  }
}