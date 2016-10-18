var gulp          = require('gulp'),
	less          = require('gulp-less'),
	uglify        = require('gulp-uglify'),
	//jshint        = require('gulp-jshint'),
	maps          = require('gulp-sourcemaps'),
	minifycss     = require('gulp-minify-css'),
	rev           = require('gulp-rev'),
	cssurl        = require('gulp-cssurl'),
	revCollector  = require('gulp-rev-collector'),
	sprite        = require('gulp.spritesmith'),
	imagemin      = require('gulp-imagemin'),
	clean         = require('gulp-clean'),
	plumber       = require('gulp-plumber'),
	//tmodjs        = require('gulp-tmod'),
	nodemon       = require('gulp-nodemon'),
	htmlInclude   = require('gulp-file-include'),
	webpack       = require('gulp-webpack'),
	webpackConfig = require('./webpack.config'),
	markdown      = require('markdown'),
	path       	  = {
						demo: 'demo/',
						src: 'src/',
						dest: 'dest/'
				    };

					
					
//less
gulp.task('less', function () {
    gulp
		.src(path.src+'less/styles.less')
        //.pipe(maps.init())
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  less Syntax Error! --------------------------');
		}))
		.pipe(less())
		.pipe(minifycss({compatibility: 'ie7'}))
		.pipe(rev())
		.pipe(cssurl())
		//.pipe(maps.write('./'))
        .pipe(gulp.dest(path.dest+'css/'))
		.pipe( rev.manifest('cssRev.json') )
        .pipe(gulp.dest(path.src+'rev/'));
		
	gulp
		.src(path.demo+'src/less/styles.less')
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  less Syntax Error! --------------------------');
		}))
		.pipe(less())
		.pipe(minifycss({compatibility: 'ie7'}))
		.pipe(rev())
		.pipe(cssurl())
        .pipe(gulp.dest(path.demo+'dest/css/'))
		.pipe( rev.manifest('cssRev.json') )
        .pipe(gulp.dest(path.demo+'src/rev/'));
});



//jshint
/* gulp.task('jshint', function() {
	gulp
		.src(path.src+'js/core/drag.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));	
}) */



//js
gulp.task('js', function () {
	gulp.src(path.src+'src/')
		.pipe(webpack(webpackConfig))
		//.pipe(minifyJs())
		.pipe(rev())
		.pipe(gulp.dest(path.dest+'js/'))
		.pipe(gulp.dest(path.demo+'dest/js/'))
		.pipe( rev.manifest('jsRev.json') )
		.pipe(gulp.dest(path.src+'rev/'))
        .pipe(gulp.dest(path.demo+'src/rev/'));
});

gulp.task('djs', function () {
	gulp.src('app.65b32be3f985189a67e5.js')
		.pipe(uglify())
		.pipe(gulp.dest('a'));		
});



//tmod.js
// gulp.task('tmod', function() {
	// gulp.src(path.src + '/tpl/**/*.html')
		// .pipe(tmodjs({
			// base:  path.src + 'tpl',
			// combo: true,
			// output: path.src + 'js/app/'
		// }));
// });

//清理图片
gulp.task('clean', [/*'clean:css', 'clean:js', */'clean:imagesDefault', 'clean:imagesSprite']);

gulp.task('clean:css', function() {
	gulp
		.src([
			path.dest+'css/**'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:js', function() {
	gulp
		.src([
			path.dest+'js/**/*'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesDefault', function() {
	gulp
		.src([
			path.dest+'img/default/*.{png,jpg,jpeg,gif}'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesSprite', function() {
	gulp
		.src([
			path.dest+'img/sprite/*.{png,jpg}'
		], {read: false})
		.pipe(clean({force: true}));
});



//复制文件
gulp.task('copy', ['clean', 'copy:plugs', 'copy:js', 'copy:images']);

gulp.task('copy:plugs', function(){

});

gulp.task('copy:js', function(){
	gulp
		.src(path.src+'js/lib/*')
		.pipe(gulp.dest(path.dest+'js/lib/'))
		.pipe(gulp.dest(path.demo+'/dest/js/lib/'));
});

gulp.task('copy:images', function(){
	gulp
		.src(path.src+'img/default/**/*.{png,jpg,jpeg,gif}')
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(path.dest+'img/'))
		.pipe(gulp.dest(path.demo+'dest/img/'));
});



//sprite
gulp.task('sprite', ['clean:imagesSprite'], function () {	
	var spriteData = gulp
						.src(path.src+'img/sprite/**.png')
						.pipe(sprite({
							imgName: 'sprite.png',
							cssName: 'sprite-png.css',
							cssTemplate: path.src+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../img/sprite.png'
						}));
		spriteData
			.img
			.pipe(imagemin({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(path.dest+'img/'))
			.pipe(gulp.dest(path.demo+'dest/img/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.src+'less/core/'));
});


//mock数据
gulp.task('server', function(){
	//require('./index')
	nodemon({
		script: 'index.js'
	});
});



//demo
gulp.task('demo', function(){
	
	gulp.src([path.demo+'src/rev/*.json', path.demo+'src/html/module/**/*.html'])
		.pipe(htmlInclude({
			prefix: '@@',
			basepath: '@file',
			filters: {
				markdown: markdown.parse
			}
		}))
		.pipe( revCollector() )
		.pipe(gulp.dest(path.demo+'dest/html/'));
		
	gulp.src([path.demo+'src/rev/*.json', path.demo+'src/html/index.html'])
		.pipe(htmlInclude({
			prefix: '@@',
			basepath: '@file',
			filters: {
				markdown: markdown.parse
			}
		}))
		.pipe( revCollector() )
		.pipe(gulp.dest(path.demo+'dest/'));

	gulp
		.src(path.demo+'src/html/module/**/*.{png,jpg,jpeg,gif}')
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(path.demo+'dest/html/'));
});

//默认任务
gulp.task('default', ['clean', 'copy', 'sprite',  'js', 'less', 'server', 'demo'], function(){
	
	//监听demo
	gulp.watch(path.demo+'src/html/**', ['demo']);
	gulp.watch(path.demo+'src/less/**', ['less']);	
	gulp.watch('./README.md', ['demo']);	
	
	//监听不合并图片
	gulp.watch(path.src+'img/default/**', ['copy:images']);
	
	//监听sprite
	gulp.watch(path.src+'img/sprite/**.png', ['sprite']);
	
	//监听tpl
	//gulp.watch(path.src+'tpl/**', ['tmod']);
		
	//监听js
    gulp.watch(path.src+'js/**', ['js']);
	
    //监听less
    gulp.watch(path.src+'less/**', ['less']);
	
});