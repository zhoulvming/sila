import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateRangePicker } from '../directives/daterangepicker.directive';

@Component({
  selector: 'daterange',
  templateUrl: 'daterange.component.html',
  styleUrls: ['daterange.component.scss'],
  providers: [DateRangePicker]
})
export class DaterangeComponent implements OnInit {
  @Input()
  input;

  @Output() updateDaterangeI:EventEmitter<any> = new EventEmitter();
  selectedDaterange = {};

  // private option: Object = {
  //   startDate: this.input.startDate,
  //   endDate: this.input.endDate,
  //   locale: {
  //     format: "YYYY-MM-DD",
  //     separator: " 至 ",
  //     applyLabel: "确定",
  //     cancelLabel: '取消',
  //     fromLabel: '起始时间',
  //     toLabel: '结束时间',
  //     customRangeLabel: '自定义',
  //     daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
  //     monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
  //       '七月', '八月', '九月', '十月', '十一月', '十二月'],
  //     firstDay: 1
  //   }
  // };

  option = {};

  constructor() {
  }

  ngOnInit() {
    this.option = {
      startDate: this.input.startDate,
      endDate: this.input.endDate,
      locale: {
        format: "YYYY-MM-DD",
        separator: " 至 ",
        applyLabel: "确定",
        cancelLabel: '取消',
        fromLabel: '起始时间',
        toLabel: '结束时间',
        customRangeLabel: '自定义',
        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月'],
        firstDay: 1
      }
    };
  }

  dateSelected(obj) {
    this.selectedDaterange = obj;
    this.updateDaterangeI.emit(this.selectedDaterange);

  }



}