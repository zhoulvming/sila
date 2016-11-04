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
      title: '基本指标',
      icon: '',
      sub: [{
        title: '趋势分析',
        path: 'home'
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
    }, {
      title: '使用分析',
      icon: '',
    }];
  }

  ngOnInit() {
  }

}
