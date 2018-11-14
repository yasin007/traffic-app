var gulp = require('gulp'); // 引入gulp插件
var uglify = require('gulp-uglify');
var concat = require('gulp-concat'); // 文件合并插件
var rename = require('gulp-rename'); // 重命名插件
var minStyle = require('gulp-clean-css'); // 清除css插件
var sass = require('gulp-sass'); // sass编辑插件
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');

var dir = 'assets/';
var styleFileName = 'feedback-upload'; // 页面样式文件名称

var stylePaths = {
    sass: [
        dir + 'scss/views/' + styleFileName + '.scss'
    ]
};

var jsPaths = {
    js: [
        dir + 'js/dev/views/' + styleFileName + '.js',
        dir + 'js/dev/utils/utils.js'
    ]
};

// 预处理样式文件任务
gulp.task('sass', function () {
    var processors = [px2rem({remUnit: 37.5})];
    return gulp.src(stylePaths.sass)
        .pipe(sass({
            outputStyle: 'compact'
        }).on('error', sass.logError))
        .pipe(concat(styleFileName + '.css'))
        .pipe(postcss(processors))
        .pipe(minStyle())
        .pipe(rename(styleFileName + '.min.css'))
        .pipe(gulp.dest('./' + dir + '/css'))
});

gulp.task('sass-watch', function () {
    gulp.watch(stylePaths.sass, ['sass']);
});

// JS任务
gulp.task('jsCompress', function () {
    // 1. 找到文件
    return gulp.src(jsPaths.js[0])
        .pipe(uglify({mangle: true}))
        .pipe(rename(styleFileName + '.min.js'))
        .pipe(gulp.dest('./' + dir + 'js/views'));
});

gulp.task('utils', function () {
    // 1. 找到文件
    return gulp.src(jsPaths.js[1])
        .pipe(uglify({mangle: true}))
        .pipe(rename('utils.min.js'))
        .pipe(gulp.dest('./' + dir + 'js/utils'));
});


// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch(jsPaths.js, ['jsCompress', 'utils']);
});




