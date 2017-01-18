/**
 * 采用指令方式把 jquery 插件（daterangepicker）放到angular2中使用
 * 
 * 封装说明: 
 * 
 * 1、首先创建一个指令，采用@input方式，来获取jquery插件所需要的参数
 * 
 * 2、在ngOnChanges时，也就是参数通过@input传入时，初始化jquery插件
 * （初始化jquery插件需要获取dom元素，所以我们引入ElementRef，用来获取dom元素）
 * 
 * note: jquery中回调函数，如果直接使用this,回调是无法获取angular的函数的
 *       所以这里采用bind的形式，把this传递进去。这样在angular中的函数才会被正确调用
 */
import { Directive, Output, Input, ElementRef, EventEmitter } from '@angular/core';
declare var $: any;

// 自定义指令
@Directive({
  selector: '[dateRangePicker]'
})

export class DateRangePicker {
  /**
   * jquery.daterangepicker插件所需的参数
   * 参数:http://www.daterangepicker.com/#options
   */
  @Input() public dateRangePickerOptions: any;

  // 选中事件
  @Output() selected: any = new EventEmitter();

  /**
   * 初始化
   * @param _elementRef
   */  
  constructor(private _elementRef: ElementRef) { }

  /**
   * 属性发生更改时
   * @private
   */
  ngOnChanges() {
    $(this._elementRef.nativeElement).daterangepicker(this.dateRangePickerOptions, this.dateCallback.bind(this));
    $('.daterangepicker.dropdown-menu').hide();
  }

  /**
   * 时间发生更改时使用emit传递事件
   * @private
   */
  dateCallback(start, end) {
    let format = "YYYY-MM-DD";
    if (this.dateRangePickerOptions.locale.format) {
      format = this.dateRangePickerOptions.locale.format;
    }
    let date = {
      startDate: start.format(format),
      endDate: end.format(format),
    }
    this.selected.emit(date);
  }
}