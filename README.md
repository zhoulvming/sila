### 网站统计IP PV UV实现原理
> PV(访问量)：Page View, 即页面浏览量或点击量，用户每次刷新即被计算一次。
> UV(独立访客)：Unique Visitor,一般使用cookie标记,访问您网站的一台电脑客户端(比如一台电脑开多个浏览器访问则为多个UV)为一个访客，00:00-24:00内相同的客户端只会被计算一次。
> IP(独立IP)：指独立IP数。00:00-24:00内相同IP地址之被计算一次(多台电脑可能共用一个ip)。

### ip、pv、uv的区别：
> IP(独立IP)：某IP地址的计算机访问网站的次数。这种统计方式很容易实现，具有真实性。所以是衡量网站流量的重要指标。
> PV(访问量)：PV反映的是浏览某网站的页面数，所以每刷新一次也算一次。就是说PV与来访者的数量成正比，但PV并不是页面的来访者数量，而是网站被访问的页面数量。
> UV(独立访客)：可以理解成访问某网站的电脑的数量。网站判断来访电脑的身份是通过来访电脑的cookies实现的。如果更换了IP后但不清除cookies，再访问相同网站，该网站的统计中UV数是不变的。

### 跳出率实装

  cnt1 = 用户访问入口页面，然后直接离开的数量(利用visit_log表可计算获取)
  cnt2 = 网站全部访问用户数量(利用visit_log表可计算获取)
  跳出率 = cnt1/cnt2

### 客户端启动方式
> ng build --watch

### 服务器端启动方式
> nodemon

### 工程目录结构说明
```
SILA
├── README.md                                       // 项目说明文档（包含一部分设计内容）
├── client                                          // 客户端代码目录
│   ├── dist                                        // 编译后输出目录
│   ├── src                                         // 代码目录
│   │   ├── app                                     // 项目代码
│   │   │   ├── shared                              // 共享目录
│   │   │   │   ├── models                          // model目录
│   │   │   │   ├── services                        // service（与后台交互）
│   │   │   │   │   ├── access-source.service.ts    // 访问来源service
│   │   │   ├── access-source                       // 访问来源页面目录
│   │   │   │   ├── overview.component.*            // 概览
│   │   │   │   ├── searchEngine.component.*        // 搜索引擎
│   │   │   │   ├── referrer.component.*            // 外部链接
│   │   │   │   ├── directAccess.component.*        // 直接访问
│   │   │   ├── page-info                           // 网页数据页面目录
│   │   │   ├── user-info                           // 用户属性页面目录
│   │   │   ├── user-behaviour                      // 用户行为页面目录
│   │   │   ├── system-manager                      // 账号管理页面目录
│   │   │   ├── app-routing.module.ts               // 页面路由
│   │   │   ├── app.component.*                     // layout组件
│   │   │   ├── app.module.ts                       // 模块定义文件
│   │   ├── assets                                  // 项目应用的外部资源目录
│   │   │   ├── css                                 // 项目自己的样式目录
│   │   │   ├── js                                  // 项目自己的js目录
│   │   │   │   ├── app.js                          // 项目app.js
│   │   │   │   ├── common.js                       // 项目共通js
│   │   │   │   ├── ta.js                           // 埋点脚本
│   │   │   ├── img                                 // 图片目录
│   │   │   ├── plugins                             // 第三方插件（也可通过npm安装node_modules目录下，一般放置较简单的单文件插件）
│   │   ├── environments                            // 无视
│   │   ├── index.html                              // SPA index页面
│   │   ├── main.ts                                 // angular2入口文件
│   │   ├── polyfills.ts                            // polyfills
│   │   ├── styles.scss                             // 全局样式，在angular-cli.json文件中被引用
│   │   ├── styles-responsive.scss                  // 全局样式，在angular-cli.json文件中被引用
│   │
│   │
├── server                                          // 服务器端代码目录
│   ├── conf                                        // 配置目录
│   │   ├── db.js                                   // 数据库配置文件
│   ├── dao                                         // 数据库访问DAO（包含service和sql）
│   │   ├── access-source.Dao.js                    // 访问来源Dao
│   │   ├── access-source.Sql.js                    // 访问来源Sql
│   │   ├── log-visit.dao.js                        // 页面访问表 Dao
│   │   ├── log-visit.sql.js                        // 页面访问表 Sql
│   │   ├── event.dao.js                            // 页面事件统计表 Dao
│   │   ├── event.sql.js                            // 页面事件统计表 Sql
│   ├── routes                                      // 所有业务接口逻辑
│   │   ├── index.js                                // 接入客户端的入口文件，不用关心
│   │   ├── access-source.js                        // 访问来源业务接口
│   │   ├── sila.js                                 // 响应客户端埋点脚本的所有路由处理
│   ├── db.sql                                      // 数据库DDL
│   ├── server.js                                   // 服务器端入口文件

```



### 数据库设计

```
TABLE sila_site: 站点表(即客户表，使用我们产品的站点)
  id int(10)            : 自动生成（主键）
  name varchar(90)      : 站点名称
  main_url varchar(255) : 站点主URL(考虑其不同域名的场合)
  created timestamp     : 客户注册埋点的时间
```

```
TABLE sila_log_visit: 页面访问表
  id varchar(50)        : 用户访问唯一标识作为主键
  idsite                : 站点表外键
  page_url              : 页面URL
  page_title            : 页面名称
  domain                : 域名(document.domain)
  referrer              : 来源
  window_screen         : 浏览器属性
  language              : 语言
  cid                   : 城市ID
  cname                 : 城市名称
  cip                   : IP地址  
  start_time            : 来访时间
  leave_time            : 离开时间  (当页面关闭或者。。。场合，埋点脚本会去更新该字段)
  cookie_uuid           : 用户访问唯一标识（用户追踪访客，统计UV）
  province              : 省份名称
```

```
TABLE sila_event: 事件统计表
  id int(10)            : 自动生成（主键）
  idsite                : 站点表外键
  page_url              : 页面URL
  event_type            : 事件类型（按钮点击，链接点击，其它:1/2/3）
  event_name            : 事件名称
  event_time            : 发生时间
  target_id             : 目标的DOM ID
```



### TOOLIST
> 如果用户不断刷新，我们算一次页面请求, 如何实现？
answer：利用存储一秒有效期的cookieh值来保证不重复提交

