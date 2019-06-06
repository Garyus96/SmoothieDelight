const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function style() {
   return gulp.src('./scss/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(autoprefixer('last 2 versions'))
   .pipe(gulp.dest('./dest/css'))
   .pipe(browserSync.stream());
}

function jsConcat() {
  return gulp.src('./js/**/*.js')
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dest/js'))
  .pipe(browserSync.stream());
}

function watch() {
   browserSync.init({
      server: {
         baseDir: './'
      }
   });
   gulp.watch('./scss/**/*.scss', style);
   gulp.watch('./*.html').on('change', browserSync.reload);
   gulp.watch('./js/**/*.js', jsConcat);
}

exports.style = style;
exports.jsConcat = jsConcat;
exports.watch = watch;
