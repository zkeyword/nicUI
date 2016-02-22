nic 一个基于jQuery的UI库
=============================

........................
........................
........................
文档未齐................
........................
........................
........................


nic的前身是个人编写的[nic]https://github.com/zkeyword/nic ,由于这套UI写的不够满意，所以决定在这个的基础上丰富起来，并且采用LESS和RequireJS进行模块开发，提高了代码的可维护性。

其中js控件包含如下部分：

	1、grid 表格

	2、dialog 对话框，包含alert、confir、merror、prompt等对话框。

	3、pop 弹出框

	4、tip 箭头的浮动提示框

	5、tab 选项卡

	6、selectArea 地区选择

	7、calendar 日历组件

less包含：

	1、常用按钮、表单、图标、CSS3圆角、三角、CSS3动画
	
nic的目录结构为：
	
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
            -- config.js requirejs配置文件
 
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