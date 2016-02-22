# nicUI 一个基于jQuery的UI库 #

#### 简介

nicUI是一款基于jQuery开发的UI库，也是我本人在前端开发工作中的一些总结，当然网上有很多现成的UI库，但是始终觉得不够顺手，而且调用方式各式各样，维护起来也麻烦，后来在项目中也用到一些前端模块化的概念，因此才有了写个自己UI库的想法，而且nicUI是采用webpack来打包的，所以在模块化方面即可支持AMD规范，又可支持CMD规范，很方便了实现了UI的扩展。

#### 相关技术栈

- webpack

- less

- gulp

- jQuery

- artTemplate

#### 存在问题

目前nicUI处于比较粗狂的阶段，在css方面，并没有考虑太多兼容低版本浏览的情况，如果需要可做相应修改，而在js方面，控件的数量并不是太丰富，由于是采用webpack的打包机制编写，模块化比较好，如果需要可以做相应修改。

#### 目录结构
	
    -- dest 打包压缩后的目录
 
        -- js
           -- main.js主业务文件
        -- css
        -- images
 
    -- dev 开发目录
 
        -- js
            -- app 业务代码
               -- main.js主业务文件
            -- core 通用可移植的代码
            -- lib 第三方基本库
 
        -- less
            -- app
                -- mod 公用模块
                -- page 页面级代码
            -- core 通用可移植的代码
            -- lib 第三方基本库
            -- styles.less 统一入口
 
        -- img
            -- default 一般图片
            -- sprite 需要合并的图片
	
	-- doc 实例文档

#### 依赖管理

##### js部分

nicUI的js依赖管理文件在dev/js/app/main.js文件内，nicUI分为3种调用方式：

- 第三的且有独立调用方式，直接挂载在window对象下

- 需要返回对象，并提供相对应接口的，挂载在nic.ui的命名空间下面

- jquery插件方式，第三方的也有用这种方式挂载在jquery的对象下

其中，为什么用的是大部分依赖用的是nic.ui，nicUI的基本架构为：

- nic.base 基础层，所有的基础函数库、工具函数库，如cookie、isFunction、isArray等

- nic.ui 显示层，用来重构和回流DOM，前端的特效显示处理

- nic.app 应用层，挂载一些应用的业务类，业务上的代码可以挂载在该空间下。

##### css部分

nicUI的css依赖文件在dev/less/styles.less文件内

#### 调用文件

    <link rel="stylesheet" type="text/css" href="dest/css/styles.css">
    <script src="dest/js/lib/jquery1.10.2.js"></script>
    <script src="dest/js/main.js"></script>