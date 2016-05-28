###########
准备将less替换成stylus或postcss
###########

# nicUI 一个基于jQuery的UI库 #

#### 简介

nicUI是一款基于jQuery开发的UI库，也是我本人在前端开发工作中的一些总结，当然网上有很多现成的UI库，但是始终觉得不够顺手，而且调用方式各式各样，维护起来也麻烦，后来在项目中也用到一些前端模块化的概念，因此才有了写个自己UI库的想法，而且nicUI是采用webpack来打包的，所以在模块化方面即可支持AMD规范，又可支持CMD规范，很方便了实现了UI的扩展。

#### 相关技术栈

- webpack

- less

- gulp

- jQuery

- artTemplate

- mockjs

- iconfont


#### 运行方式

首先，请先安装node环境，然后在安装nicUI内依赖的工具：

	npm install
	
运行：
	
	gulp
	
运行成功之后，直接在浏览器打开 http://127.0.0.1:3000 即可，nicUI默认的端口号是3000，如果有端口冲突可以修改根目录下的index.js文件。

#### 调用文件

	<link rel="stylesheet" type="text/css" href="dest/css/styles/styles.css">
    <script src="dest/js/lib/jquery1.10.2.js"></script>
    <script src="dest/js/nicUI.js"></script>
	
nicUI通过gulp-rev会生成带版本号styles.css和nicUI.js，并通过gulp-rev-collector修改对应的html，如若不需要或有具体需求请自行修改gulp的配置gulpfile.js。

#### 目录结构

	/ 根目录
	|__ dest 实例文档
	|__ dest 压缩合并后目录
	|__ src 开发目录
	|	|__ font 字体图标目录
	|	|__ rev 版本配置(自动生成)
	|	|__ img 图片目录
	|	|	|__ default 一般图片
	|	|	|__ sprite 需要合并的图片
	|	|__ less 样式目录
	|	|	|__ app 业务代码
	|	|	|	|__ mod 公用模块
	|	|	|	|__ page 页面级代码
	|	|	|__ core 通用可移植的代码
	|	|	|__ lib 第三方基本库
	|	|	|__ styles.less 统一入口
	|	|__ js  脚本文件
	|		|__ app 业务代码
	|		|	|__ main.js 主业务文件，也是用来管理js依赖的地方
	|		|__ core 通用可移植的代码
	|		|__ lib 第三方基本库
	|__ index.js express路由
	|__ webpack.config.js webpack配置文件
	|__ gulpfile.js gulp配置文件

#### 依赖管理

##### js部分

nicUI的js依赖管理文件在dev/js/app/main.js文件内，nicUI分为3种调用方式：

- 第三的且有独立调用方式，直接挂载在window对象下

- 需要返回对象，并提供相对应接口的，挂载在nic.ui的命名空间下面

- jquery插件方式，第三方的也有用这种方式挂载在jquery的对象下

其中，为什么用的是大部分依赖用的是nic.ui，nicUI的基本架构为：

- nic.base 基础层，所有的基础函数库、工具函数库，如cookie、isFunction、isArray等

- nic.ui 显示层，用来呈现DOM，前端的特效显示处理

- nic.app 应用层，挂载一些应用的业务类，业务上的代码可以挂载在该空间下。

##### css部分

nicUI的css依赖文件在dev/less/styles.less文件内

#### 关于iconfont和sprite

目前前端圈子比较流行的图标一般是采用这两种方式，这里优劣性我不再讨论，这里建议：单一颜色的图标采用iconfont；多色图图标或者图片文件可采用sprite。

对于iconfont的字体文件可使用在线的icomoon.io进行制作，nicUI提供初级的解决方案，使用者可适当修改gulpfile.js文件。

如果不需要兼容低版本的浏览器，那么我可以考虑将一部分小图除了iconfont和sprite化，我们还可以选择base64处理，直接减少http请求数。

#### 存在问题

目前nicUI处于比较粗狂的阶段，在css方面，并没有考虑太多兼容低版本浏览的情况，如果需要可做相应修改，而在js方面，控件的数量并不是太丰富，由于是采用webpack的打包机制编写，模块化比较好，如果需要可以做相应修改。

由于用了gulp-htmlmin、gulp-imagemin插件，在压缩html和img的时候在windows系统上可能会出错，目前的解决方式只有重启，还没找到合适的插件。