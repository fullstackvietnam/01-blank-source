'use strict';
// Gọi thư viện sử dụng vào
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

// Task này sẽ tìm tất cả file .sass trong thư mục src/styles sẽ build ra file .css ở thư mục dist/css
gulp.task('taocss', function () {
  return gulp.src('./src/styles/**/*.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream())
});

// Task này sẽ tìm tất cả file .js trong thư mục src/scripts sẽ build ra file .js ở thư mục dist/js
gulp.task('taojs', function () {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js'));
});

// Task này sẽ tìm tất cả file .pug trong thư mục src/templates sẽ build ra file .html ở thư mục dist
gulp.task('taohtml', function buildHTML() {
  return gulp.src([
    './src/template/**/*.pug',
    '!./src/template/{**/\_*,**/\_*/**}.pug'
])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'));
});

// Task này có nhiệm vụ theo dõi mọi thay đổi trên hệ thống
gulp.task('theodoi', function () {
  gulp.watch('./src/styles/**/*.sass', ['taocss']);
  gulp.watch('./src/template/**/*.pug', ['taohtml']);
  gulp.watch('./src/scripts/**/*.js', ['taojs']);
  gulp.watch("./dist/**/*.*").on('change', browserSync.reload);

});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./dist"
      }
  });
});

// Lệnh mặc định của Gulp
gulp.task('default', function () {
  gulp.start([
    'taocss',
    'taojs',
    'taohtml',
    'theodoi',
    'browser-sync'
  ]);
});