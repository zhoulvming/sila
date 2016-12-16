import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppState, Global } from '../shared/services/app.service';

declare var $: any;
var ec = require('echarts');

@Component({
  selector: 'source',
  templateUrl: './source.all.html',
  styleUrls: ['source.all.scss']
})
export class SourceAllPage implements OnInit {
  // 时间范围(通过updateDaterangeI函数自动获取到页面所选内容)
  selectedDaterange = {
    startDate: '2016-01-01',
    endDate: '2016-03-01'
  };
  // 埋点网站(页面顶部下拉框所选内容)，因为
  selectedSiteID = [];
  // 分析类型：来源类型/来源网站
  anaType: number;

  constructor(public _appState: AppState, private _global: Global, private ref: ChangeDetectorRef) {
    var self = this;

    /**
     * 订阅分析网站变更事件
     * 取值用this.selectedSiteID[0]获取
     */
    _appState.siteSelectedChange.subscribe((value: any) => {
      self.selectedSiteID.unshift(value);
      self.ref.markForCheck();
      self.ref.detectChanges();
      self.selectedSiteID[0] = value;

      // render page
      this.renderPage();
    })
  }

  ngOnInit() {
    // 页面一些共通组件的初始化和数据获取
    this._global.init();

    this.renderPage();

    // 树结构数据
    this.setupTreeData();

    // echarts组件
    this.setPie_source_type();
    this.setLine_source_type();
    
  }

  private getSearchCondition() {

  }

  setPie_source_type() {

    

    var myChart = ec.init(document.getElementById('pie_source_type'));
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        y: 'bottom',
        data: ['搜索引擎', '外部访问', '直接访问']
      },

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
      series: [
        {
          name: '来源类型',
          type: 'pie',
          radius : ['30%', '60%'],
          itemStyle: 　{
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
          data: [
            { value: 335, name: '搜索引擎' },
            { value: 310, name: '外部访问' },
            { value: 234, name: '直接访问' }
          ]
        }
      ]
    };
    myChart.setOption(option);
  }

  setLine_source_type() {

    var title = {
      text: "ECharts简单线形图表及其配置展示实例", //正标题  
      link: "http://www.xxx.com", //正标题链接 点击可在新窗口中打开  
      x: "center", //标题水平方向位置  
      subtext: "From:http://www.xxx.com", //副标题  
      sublink: "http://www.xxx.com", //副标题链接  
      //正标题样式  
      textStyle: {
        fontSize: 24
      },
      //副标题样式  
      subtextStyle: {
        fontSize: 12,
        color: "red"
      }
    };

    var option = {
      //图表标题  
      // title: title,

      //数据提示框配置  
      tooltip: {
        trigger: 'axis' //触发类型，默认数据触发，见下图，可选为：'item' | 'axis' 其实就是是否共享提示框  
      },
      //图例配置  
      legend: {
        data: ['搜索引擎', '外部链接', '直接访问'], //这里需要与series内的每一组数据的name值保持一致  
        y: "bottom"
      },
      //工具箱配置  
      toolbox: {
        show: true,
        feature: {
          mark: { show: true }, // 辅助线标志，上图icon左数1/2/3，分别是启用，删除上一条，删除全部  
          dataView: { show: true, readOnly: false },// 数据视图，上图icon左数8，打开数据视图  
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },// 图表类型切换，当前仅支持直角系下的折线图、柱状图转换，上图icon左数6/7，分别是切换折线图，切换柱形图  
          restore: { show: true }, // 还原，复位原始图表，上图icon左数9，还原  
          saveAsImage: { show: true } // 保存为图片，上图icon左数10，保存  
        }
      },
      calculable: true,
      //轴配置  
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          name: "月份"
        }
      ],
      //Y轴配置  
      yAxis: [
        {
          type: 'value',
          splitArea: { show: true },
          name: "数值"
        }
      ],
      //图表Series数据序列配置  
      series: [
        {
          name: '搜索引擎',
          type: 'line',
          data: [1.6, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '外部链接',
          type: 'line',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: '直接访问',
          type: 'line',
          data: [3.6, 6.9, 11.0, 28.4, 30.7, 72.7, 177.6, 185.2, 50.7, 20.8, 8.0, 4.3]
        }
      ]
    };
    
    
    
    //图表渲染的容器对象  
    var chartContainer = document.getElementById("line_source_type");  
    //加载图表  
    var myChart = ec.init(chartContainer);  
    myChart.setOption(option);  
  }

  ngAfterContentInit() { }



  test() {
    $("#mytree").jqGrid({   
      treeGrid: true,  
      treeGridModel: 'adjacency', //treeGrid模式，跟json元数据有关  
      ExpandColumn : 'username',       
      scroll: "true",  
      "url":"assets/data/data.json",
      datatype: 'json',      
      colNames:['编号','姓名','密码','年龄','地址','出生日期'],      
      colModel:[      
          {name:'id',index:'id', width:90,sorttype:"int"},      
          {name:'username',index:'username', width:110,sorttype:"int"},      
          {name:'password',index:'password', width:80},      
          {name:'age',index:'age', width:80},        
          {name:'address',index:'address', width:80},       
          {name:'time',index:'time', width:80,sorttype:"date"}        
       ],  
      pager: "false",    
      sortname: 'id',      
      sortorder: "desc",   
          
      jsonReader: {      
        root: "dataRows",    
        repeatitems : false      
      },      
      treeReader : {  
        level_field: "level",  
        parent_id_field: "parent",   
        leaf_field: "isLeaf",  
        expanded_field: "expanded"  
      },  
      caption: "jqGrid test",     
      mtype: "POST",  
      height: "auto",    // 设为具体数值则会根据实际记录数出现垂直滚动条  
      rowNum : "-1",     // 显示全部记录  
      shrinkToFit:false  // 控制水平滚动条  
   });       
  }

  setupTreeData() {
    $('#mytree').jqGrid({
				"url":"assets/data/data.json",
				"colModel":[
					{
						"name":"id",
						"index":"id",
						"sorttype":"int",
						"key":true,
						"hidden":true,
						"width":50
					},{
						"name":"name",
						"index":"name",
						"sorttype":"string",
						"label":"来源类型",
						"width":120
					},{
						"name":"pv",
						"index":"pv",
						"sorttype":"int",
						"label":"浏览量",
						// "width":90,
						"align":"right"
					},{
						"name":"pv_ratio",
						"index":"pv_ratio",
						"sorttype":"number",
						"label":"浏览量占比(%)",
						// "width":90,
						"align":"right"
					},{
						"name":"visit_count",
						"index":"visit_count",
						"sorttype":"string",
						"label":"访问次数",
						// "width":100
            "align":"right"
					},{
						"name":"uv",
						"index":"uv",
						"sorttype":"int",
						"label":"访客数",
						// "width":100
            "align":"right"
					},{
						"name":"visit_average_time",
						"index":"visit_average_time",
						"sorttype":"string",
						"label":"平均访问时长",
						// "width":100
            "align":"right"
					},{
						"name":"lft",
						"hidden":true
					},{
						"name":"rgt",
						"hidden":true
					},{
						"name":"level",
						"hidden":true
					},{
						"name":"uiicon",
						"hidden":true
					}
				],
				"width":$('.tab-content').width()-15,
				"hoverrows":false,
				"viewrecords":false,
				"gridview":true,
				"height":"auto",
				"sortname":"lft",
				"loadonce":true,
				"rowNum":100,
				"scrollrows":true,
				// enable tree grid
				"treeGrid":true,
				// which column is expandable
				"ExpandColumn":"name",
				// expand a node when click on the node name 
				"ExpandColClick" : true,
				// datatype
				"treedatatype":"json",
				// the model used
				"treeGridModel":"nested",
				// configuration of the data comming from server
				"treeReader":{
					"left_field":"lft",
					"right_field":"rgt",
					"level_field":"level",
					"leaf_field":"isLeaf",
					"expanded_field":"expanded",
					"loaded":"loaded",
					"icon_field":"icon"
				},
				"sortorder":"asc",
				"datatype":"json",
				"pager":"#pager"
			}); 
  }

  /**
   * 
   * 日期范围变化触发此函数
   * 
   * @param {any} obj
   * obj {
   *   startDate: ...
   *   endDate: ...
   * }
   * 
   * @memberOf SourceAllPage
   */
  updateDaterangeI(obj) {
    this.selectedDaterange = obj;
    this.renderPage();
  }


  /**
   * 页面展现
   */
  renderPage() {

    console.log('>>> begin render page');
    console.log('目标网站ID：' + this.selectedSiteID[0]);
    console.log('日期范围：' + this.selectedDaterange.startDate + ' ~ ' + this.selectedDaterange.endDate);

    var targetSite = this.selectedSiteID[0];
    var startDate = this.selectedDaterange.startDate;
    var endDate = this.selectedDaterange.endDate;
    
    if ( ! targetSite ) {
      //alert('您未选择要分析的目标网站');
      return ;
    }

    // 获取

  }
  

}