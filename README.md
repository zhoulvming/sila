# 客户端启动方式
> ng build --watch


# 服务器端启动方式
> nodemon

# 工程目录结构说明
SILA
├─── client                                 // 客户端代码
│    ├─── dist                              // 编译后输出目录
│    ├─── src                               // 代码目录
│    │    ├─── app                          // 项目代码
│    │    ├─── assets                       // 项目应用的外部资源
│    │    │    ├─── css                     // 项目自己的样式
│    │    │    ├─── js                      // 项目自己的js
│    │    │    ├─── img                     // 图片
│    │    │    ├─── plugins                 // 第三方插件（也可以通过npm放在node_modules目录下面，一般放置比较简单单个文件的插件）
│    │    ├─── environments                 // 无视
│    │    ├─── index.html                   // SPA index页面
│    │    ├─── main.ts                      // angular2入口文件
│    │    ├─── polyfills.ts                 // polyfills
│    │    ├─── styles.scss                  // 全局样式，在angular-cli.json文件中被引用
│    │    ├─── styles-responsive.scss       // 全局样式，在angular-cli.json文件中被引用
│    │    ├─── angular-cli.json             // angular-cli配置文件
│    │
│    │
├─── server               // 服务器端代码  
│    ├─── conf  
│    ├─── dao
│    ├─── routes
├─── server.js            // 入口文件
