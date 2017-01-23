import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
declare var $: any;
export type InteralStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InteralStateType = {};
  siteDataChange: EventEmitter<any>;// 利用service EventEmitter方式监控下拉框数据变化
  siteSelectedChange: EventEmitter<any>;

  constructor() {
    this.siteDataChange = new EventEmitter();
    this.siteSelectedChange = new EventEmitter();
  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  private _clone(object: InteralStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}

@Injectable()
export class Global {

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  constructor(private _http: Http,
    public _appState: AppState) {
  }

  /**
   * 获取当前path
   */
  getCurrentPath(route) {
    let currPath = '';
    let urlArr = route.url._value;
    urlArr.forEach(function (item) {
      currPath += '/' + item.path;
    });
    return currPath;
  }

  /**
   * 页面初始化函数
   */
  init() {

    /**
     * 下拉框组件初始化
     */
    $('.ui.dropdown').dropdown();

    /**
     * tab组件初始化
     */
    var setupTab = function () {
      var titles = $('.sila-tab .tab-header').find('li');
      var divs = $('.sila-tab .tab-content').find('.dom');
      if (titles.length != divs.length) return;
      for (var i = 0; i < titles.length; i++) {
        var li = titles[i];
        li.id = i;
        li.onclick = function () {
          for (var j = 0; j < titles.length; j++) {
            titles[j].className = '';
            divs[j].style.display = 'none';
          }
          this.className = 'selected';
          divs[this.id].style.display = 'block';
        }
      }
    };

    /**
     * 监控网站数据获取
     */
    var setupSiteDropdownData = function (self) {
      let hasData = self._appState.state['STATEDATA_SITE'];
      if (hasData) {
        // do nothing
      } else {
        // get data from backend
        self._http.get('/common/sites').toPromise()
          .then(response => {
            var obj = response.json();
            self._appState.siteDataChange.emit(obj);
            self._appState.set('STATEDATA_SITE', obj);
          })
          .catch(self.handleError);
      }
    };

    /**
     * ui message close event
     */
    $('.message .close').on('click', function () {
      $(this).closest('.message').transition('fade');
    });

    /**
     * dashboard 与 普通页面切换时
     */
    var currentPath = window.location.href;
    if (currentPath.indexOf('#/dashboard') > 0 || currentPath.lastIndexOf('/#/') + 3 == currentPath.length) {
      $('.sila > .body > .left').hide();
      $('.sila > .body > .right').attr('style', 'padding-left:0');
    } else {
      $('.sila > .body > .left').show();
      $('.sila > .body > .right').attr('style', 'padding-left:250px');
    }

    // excute  
    setupTab();
    setupSiteDropdownData(this);



  }


  /**
   * 绘制饼图函数
   */
  setupPieChart(dom, option) {
    dom.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: { y: 'top', data: option.legendData },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      series: [{
        name: '引擎来源',
        type: 'pie',
        radius: ['30%', '60%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: true
            }
          },
          emphasis: {//强调样式（悬浮时样式
            label: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            }
          }
        },
        data: option.seriesData
      }
      ]
    })
  }

  /**
   * 绘制折线图函数
   */
  setupLineChart(dom, option) {
    dom.setOption({
      tooltip: {
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
        trigger: 'axis'
      },
      legend: {
        data: option.legendData,
        y: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: option.xAxisData,
          axisLabel: {
            interval: option.xAxisInterval
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitArea: { show: true }
        }
      ],
      series: option.seriesData
    })
  }

  /**
   * TODO: 未实装完毕
   * 获取最近七天
   * 返回个数为7的数组，分别为最近7天的数据
   */
  getLast7day() {

    var curDate = new Date()
    var last7Dday0 =  new Date(curDate.getTime() + (86400000 * -6))
    var last7Dday1 =  new Date(curDate.getTime() + (86400000 * -5))
    var last7Dday2 =  new Date(curDate.getTime() + (86400000 * -4))
    var last7Dday3 =  new Date(curDate.getTime() + (86400000 * -3))
    var last7Dday4 =  new Date(curDate.getTime() + (86400000 * -2))
    var last7Dday5 =  new Date(curDate.getTime() + (86400000 * -1))
    var last7Dday6 =  new Date(curDate.getTime() + (86400000 * -0))

    var fmt = function(data) {
      return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate()
    }

    var ary = new Array(7)
    ary[0] = fmt(last7Dday0)
    ary[1] = fmt(last7Dday1)
    ary[2] = fmt(last7Dday2)
    ary[3] = fmt(last7Dday3)
    ary[4] = fmt(last7Dday4)
    ary[5] = fmt(last7Dday5)
    ary[6] = fmt(last7Dday6)

    return ary

  }

  setupTreeGrid(dom, option) {
    dom.jqGrid({
      "url": option.jsonUrl,
      "colModel": [
        {
          "name": "id",
          "index": "id",
          "sorttype": "int",
          "key": true,
          "hidden": true,
          "width": 50
        }, {
          "name": "name",
          "index": "name",
          "sorttype": "string",
          "label": "来源类型",
          "width": 120
        }, {
          "name": "pv",
          "index": "pv",
          "sorttype": "int",
          "label": "浏览量",
          // "width":90,
          "align": "right"
        }, {
          "name": "pv_ratio",
          "index": "pv_ratio",
          "sorttype": "number",
          "label": "浏览量占比(%)",
          // "width":90,
          "align": "right"
        }, {
          "name": "visit_count",
          "index": "visit_count",
          "sorttype": "string",
          "label": "访问次数",
          // "width":100
          "align": "right"
        }, {
          "name": "uv",
          "index": "uv",
          "sorttype": "int",
          "label": "访客数",
          // "width":100
          "align": "right"
        }, {
          "name": "visit_average_time",
          "index": "visit_average_time",
          "sorttype": "string",
          "label": "平均访问时长",
          // "width":100
          "align": "right"
        }, {
          "name": "lft",
          "hidden": true
        }, {
          "name": "rgt",
          "hidden": true
        }, {
          "name": "level",
          "hidden": true
        }, {
          "name": "uiicon",
          "hidden": true
        }
      ],
      "width": '100%',
      "hoverrows": false,
      "viewrecords": false,
      "gridview": true,
      "height": "auto",
      "sortname": "lft",
      "loadonce": true,
      "rowNum": 100,
      "scrollrows": true,
      "treeGrid": true,
      "ExpandColumn": "name",
      "ExpandColClick": true,
      "treedatatype": "json",
      "treeGridModel": "nested",
      "treeReader": {
        "left_field": "lft",
        "right_field": "rgt",
        "level_field": "level",
        "leaf_field": "isLeaf",
        "expanded_field": "expanded",
        "loaded": "loaded",
        "icon_field": "icon"
      },
      "sortorder": "asc",
      "datatype": "json",
      "pager": "#pager"
    })
  }

}