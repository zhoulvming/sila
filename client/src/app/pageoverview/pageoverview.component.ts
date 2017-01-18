import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { PageService } from '../shared/services/page.service';
//import { FlowList } from '../shared/models/flowList01';
//import { FlowTop10Item } from '../shared/models/flowList01';

var es = require('echarts');

@Component({
    selector: 'app-flow',
    templateUrl: './pageoverview.component.html',
    styleUrls: ['./pageoverview.component.css'],
    providers: [
        PageService
    ],
})
export class PageOverviewComponent implements OnInit {

    constructor(public flowService: PageService) {

    }

    public showLine(): void {
        //从服务器端获取数据
        this.flowService.getLineData()
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
