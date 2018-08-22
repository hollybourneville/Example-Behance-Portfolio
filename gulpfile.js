'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps'); // tells you where in your sass the styl comes form instead of css
         
var autoprefixer = require('gulp-autoprefixer');//adds prefixes to browsers who arent up to speed with new css etc.
var browserSync = require('browser-sync').create(); //to create server in your folder, auto refresh
 
gulp.task('sass', function () {
  return gulp.src('./assets/scss/**/*.scss')
      .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
     .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })) //adds prefixes to browsers who arent up to speed with new css etc. 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});
 
gulp.task('sass:watch', function () {
	  browserSync.init({
        server: "." //current folder becomes the server
    });
  gulp.watch('./assets/scss/**/*.scss', ['sass']);

  gulp.watch("./*.html").on('change', browserSync.reload); //. stands for current folder, asterisk is 
  gulp.watch("./assets/*.js").on('change', browserSync.reload);
  //to look out for anything with HTML
});