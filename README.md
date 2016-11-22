# 客户端启动方式
> ng build --watch

# 服务器端启动方式
> nodemon

# 工程目录结构说明
SILA
├─── README.md                              // 项目说明文档（包含一部分设计内容）
├─── client                                 // 客户端代码
│    ├─── dist                              // 编译后输出目录
│    ├─── src                               // 代码目录
│    │    ├─── app                          // 项目代码
│    │    │    ├─── shared                  // 共享目录
│    │    │    │    ├─── models                  // model
│    │    │    │    ├─── services                // service（与后台交互）
│    │    │    │    │    ├─── access-source.service.ts  // 访问来源service
│    │    │    ├─── access-source           // 访问来源页面目录
│    │    │    │    ├─── overview.component.*     //概览
│    │    │    │    ├─── searchEngine.component.* //搜索引擎
│    │    │    │    ├─── referrer.component.*     //外部链接
│    │    │    │    ├─── directAccess.component.*     //直接访问
│    │    │    ├─── page-info               // 网页数据页面目录
│    │    │    ├─── user-info               // 用户属性页面目录
│    │    │    ├─── user-behaviour          // 用户行为页面目录
│    │    │    ├─── system-manager          // 账号管理页面目录
│    │    │    ├─── app-routing.module.ts   // 页面路由
│    │    │    ├─── app.component.*         // layout组件
│    │    │    ├─── app.module.ts           // 模块定义文件
│    │    ├─── assets                       // 项目应用的外部资源
│    │    │    ├─── css                     // 项目自己的样式
│    │    │    ├─── js                      // 项目自己的js
│    │    │    │    ├─── app.js                      // 项目app.js
│    │    │    │    ├─── common.js                   // 项目共通js
│    │    │    ├─── img                     // 图片
│    │    │    ├─── plugins                 // 第三方插件（也可以通过npm放在node_modules目录下面，一般放置比较简单单个文件的插件）
│    │    ├─── environments                 // 无视
│    │    ├─── index.html                   // SPA index页面
│    │    ├─── main.ts                      // angular2入口文件
│    │    ├─── polyfills.ts                 // polyfills
│    │    ├─── styles.scss                  // 全局样式，在angular-cli.json文件中被引用
│    │    ├─── styles-responsive.scss       // 全局样式，在angular-cli.json文件中被引用
│    │
│    │
├─── server               // 服务器端代码  
│    ├─── conf            // 配置目录
│    ├─── dao             // 数据库访问DAO（包含service和sql）
│    │    ├─── access-source.Dao.js          // 访问来源Dao
│    │    ├─── access-source.Sql.js          // 访问来源Sql
│    ├─── routes          // 所有业务接口逻辑
│    │    ├─── access-source.js          // 访问来源业务接口
│    ├─── db.sql          // 数据库DDL
│    ├─── server.js       // 入口文件

# 数据库设计
TABLE sila_site: 站点表(即客户表，使用我们产品的站点)
  id int(10)            : 自动生成（主键）
  name varchar(90)      : 站点名称
  main_url varchar(255) : 站点主URL(考虑其不同域名的场合)
  created timestamp     : 客户注册埋点的时间

TABLE sila_log_visit: 页面访问表
  id int(10)            : 自动生成（主键）
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
  leave_time            : 离开时间

TABLE sila_event: 事件统计表
  id int(10)            : 自动生成（主键）
  event_type            : 事件类型（按钮点击，链接点击，其它）
  event_name            : 事件名称
  event_time            : 发生时间
  target_id             : 目标的DOM ID