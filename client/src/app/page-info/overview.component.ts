import { Component, OnInit } from '@angular/core';
import { PageInfoService } from '../shared/services/pageInfo.service';
import { EchartDataTemlate } from '../shared/models/echartDataTemplate';
var es = require('echarts');

@Component({
  selector: 'app-flow',
  templateUrl: './overview.component.html',
  providers: [
    PageInfoService
  ],
})
export class PGOverviewComponent implements OnInit {
  private edt: EchartDataTemlate;





  constructor(public pageInfoService: PageInfoService) {
    this.edt = new EchartDataTemlate();
  }

  public showLine(startDate,endDate): void {
    //从服务器端获取数据
    this.pageInfoService.getLineData(startDate,endDate)
      .then(

      data => {
        var dom = document.getElementById("line1");
        var myChart = es.init(dom);
        var option = this.edt.getLineOptionTemplate();

        for (var i = 0; i < data.length; i++) {
          option.xAxis.data[i] = data[i].date;
          option.series[0].data[i] = data[i].pv_num;
          option.series[1].data[i] = data[i].uv_num;
        }
        console.log(option);

        myChart.setOption(option, true);
      })
      .catch(err => { });
  }




  ngOnInit() {
    var startDate='2016-10-10';
    var endDate  ='2016-11-26';
    this.showLine(startDate,endDate);


  }
}