'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
var browserSync = require('browser-sync').create()
var concat = require('gulp-concat')

gulp.task('scripts', function () {
  return gulp.src('./assets/src/js/*.js')
    .pipe(concat('functions.js'))
    .pipe(gulp.dest('./assets/dist/js/'))
})

gulp.task('scripts:watch', function () {
  gulp.watch('./assets/src/js/*.js', ['scripts', browserSync.reload])
})

gulp.task('imagemin', function () {
  gulp.src('./assets/src/images/*')
    .pipe(imagemin())
		.pipe(gulp.dest('./assets/dist/images'))
})

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('sass', function () {
  return gulp.src('./assets/src/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./assets/dist/css/'))
})

gulp.task('sass:watch', function () {
  gulp.watch('./assets/src/sass/**/*.sass', ['sass'])
})

gulp.task('html:watch', function () {
  gulp.watch('*.html', browserSync.reload)
})

gulp.task('default', ['imagemin', 'sass', 'sass:watch', 'scripts', 'scripts:watch', 'browser-sync', 'html:watch'])
