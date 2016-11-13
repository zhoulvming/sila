import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // sidemenu
  sidemenu;

  constructor() { 
    this.sidemenu = [{
      title: '应用概况',
      icon: '',
      path: '#/home'
    }, {
      title: '流量来源',
      icon: '',
      sub: [{
        title: '概览',
        path: '#/flow/overview'
      }, {
        title: '每日统计（小时为单位）',
        path: '#/flow/day'
      }, {
        title: '活跃用户',
        path: 'home'
      }, {
        title: '留存用户',
        path: 'home'
      }]
    }, {
      title: '用户分析',
      icon: '',
      sub: [{
        title: '百度用户',
        path: '#/flow/day'
      }]
    }, {
      title: '使用分析',
      icon: '',
    }];
  }

  ngOnInit() {
  }

}
