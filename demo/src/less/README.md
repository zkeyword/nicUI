LESS文件说明
==========================================================

styles.less 样式总文件

/lib 框架样式

	base.less 基础样式
	
	ui.less ui通用函数
	
		阴影
		.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000)
		
		圆角
		.box-radius(@size: 5px)
		.border-top-radius(@size)
		.border-right-radius(@size)
		.border-bottom-radius(@size)
		.border-left-radius(@size)
			
		三角
		.arrow(@color: #ddd; @pointer:up; @size: 20px)
		
		盒子模型
		.box-sizing(@boxmodel: border-box)
		
		透明度
		.opacity(@opacity)
		
		动画
		
	ui-*.less 组件样式
	
	l-*.less js相关组件样式
		
	common.less 公用样式(放置的样式是模块、页面级依赖的样式)

		
/app 应用样式

	layout.less 布局样式
	
	mo-*.less 模块样式
	
	page-*.less 页面级样式