import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';

import { ActivatedRoute, Router, Params }   from '@angular/router';
import { AppState, Global } from './shared/services/app.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ Global ]
})
export class AppComponent {

  // 变量定义
  currentRootMenuId = null;
  currentRootMenuIcon = null;
  currentRootMenuTitle = null;
  currentSubMenu = null;
  currentSelectedSubMenu = null;
  pageHeaderDescShowFlag = false;

  // 监控网站下拉框数据
  siteData = [];
  // siteSelectedChange: EventEmitter<any>;

  menu = [{
      title: '全景概览',
      icon: 'dashboard icon',
      id: 'link_dashboard',
      path: '#/dashboard',
      sub: null,
    },{
      title: '来源分析',
      icon: 'external icon',
      id: 'link_source',
      path: '#/source/all',
      sub: [{
        id:'link_source_all',
        icon: 'grid layout icon',
        title: '所有来源',
        description: '您网站上流量的来源分布情况，主要包括直接访问、搜索引擎和外部链接。助您了解哪些来源给您网站带来了更多有效访客，从而合理规划网络推广渠道。',
        path: '#/source/all'
      },{
        id:'link_source_engine',
        icon: 'search icon',
        title: '搜索引擎',
        description: '各类搜索引擎给您网站带来的流量情况。助您了解各个搜索引擎给您网站带来访客的情况，为合理优化搜索推广渠道提供数据支持。',
        path: '#/source/engine'
      }]
    },{
      title: '页面分析',
      icon: 'send icon',
      id: 'link_page',
      path: '#/page/index',
      sub: [{
        id: 'link_page_index',
        icon: 'building outline icon',
        title: '页面总表',
        description: '访客对您网站各个页面的访问情况，重点从页面价值、入口页和退出页进行分析。',
        path: '#/page/index'
      },{
        id: 'link_page_event',
        icon: 'fire icon',
        title: '事件分析',
        description: '提供您网站的访客点击情况，通过的多维度的分析报告，助您了解网站访客对于网站不同内容的点击情况，了解访客的点击习惯，更好的优化网站。',
        path: '#/page/event'
      }]
    },{
      title: '访客分析',
      icon: 'user icon',
      id: 'link_visit',
      path: '#/visit/client',
      sub: [{
        id: 'link_visit_client',
        icon: 'setting icon',
        title: '系统环境',
        description: '访客所使用的系统环境配置情况。助您了解访客的系统环境情况，可作为网站设计的参考，从而有效提升访客的网站交互体验。',
        path: '#/visit/client'
      },{
        id: 'link_visit_district',
        icon: 'paw icon',
        title: '地域分布',
        description: '各个地域给您网站带来的访客数及流量情况。助您了解网站访问的地域分布，特定地域用户偏好可进行针对性的运营和推广。',
        path: '#/visit/district'
      }]
    }];

  // 构造函数
  constructor(
    public _global: Global,
    public _appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    /**
     * 从后台获取sites数据后如何刷新到页面的下拉框中，下面几行代码是关键
     * 1、使用了 service EventEmitter方式 来监测到后台数据获取完毕，这里用了subscribe(订阅)
     * 2、使用了 ChangeDetectorRef机制来把数据的变化反映到html页面中，相当于angular1中是$apply的功能
     */
    var self = this;
    _appState.siteDataChange.subscribe((value:any)=>{
      self.siteData.unshift(value);
      self.ref.markForCheck();
      self.ref.detectChanges();
      self.siteData = value;

      //页面初始化时候，如何设置第一条为选中
      setTimeout(function(){
        $('#site_select').val(value[0].id);
      }, 500);
    })


    
    


  }

  // 页面初始化
  ngOnInit() {

    var self = this
    // 页面刷新时候设置当前菜单状态
    self.resetMenuState()

    // 分析网站下拉框
    // $('#site_select')
      // .dropdown('setting', 'transition', 'vertical flip')
      // .popup('setting', 'content', '请选择您要分析的网站')
    
    $("#site_select").change(function(obj) {  
      // 当前选择的目标网站id存放进appstate，然后在source组件中获取
      self._appState.siteSelectedChange.emit(obj.target.value)
      // console.log($('#site_select').val())
    })
    
  }

  // 根节点击处理
  onRootMenuSelect(id) {
    var hasSubmenuFlag = false
    this.currentRootMenuId = id
    this.menu.forEach(root => {
      if (root.id == id) {
        this.currentRootMenuTitle = root.title
        this.currentRootMenuIcon = root.icon
        if (root.sub) {
          hasSubmenuFlag = true
          this.currentSubMenu = root.sub
          this.currentSelectedSubMenu = this.currentSubMenu[0]
        }
      }
    });
    if ( !hasSubmenuFlag ) {
      this.currentSubMenu = null
    }
  }

  // 子菜单点击处理
  onSubMenuSelect(submenu) {
    this.currentSelectedSubMenu = submenu
  }

  // 页面刷新时候设置当前菜单状态
  private resetMenuState() {
    var self = this
    let path = window.location.href
    let ary = path.split('#')
    let currentPath = '#' + ary[1]
    if (ary.length == 1) {
      currentPath = '#/dashboard'
    } else {
      if ( currentPath == '#/') {
        currentPath = '#/dashboard'
      }
    }
    self.menu.every(function (root, k) {
      if (root.sub) {
        // self.currentSubMenu = root.sub  
        if(root.path === currentPath) {
          self.currentSubMenu = root.sub  
          self.currentSelectedSubMenu = self.currentSubMenu[0]
          self.currentRootMenuId = root.id
          self.currentRootMenuTitle = root.title
          self.currentRootMenuIcon = root.icon          
          return false;
        } else {
          let subMenuIdx = 0
          root.sub.every(function (subitem, i) {
            if (subitem.path === currentPath) {
              subMenuIdx++
              self.currentRootMenuId = root.id
              self.currentRootMenuTitle = root.title
              self.currentRootMenuIcon = root.icon
              self.currentSubMenu = root.sub
              self.currentSelectedSubMenu = self.currentSubMenu[subMenuIdx]
              return false
            }
            return true
          })
        }
      }
      return true
    })
  }

  toggleDescription() {
    this.pageHeaderDescShowFlag = ! this.pageHeaderDescShowFlag;
  }


}
