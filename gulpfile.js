var gulp = require('gulp');
var sass = require('gulp-sass');
var liveReload  = require('gulp-livereload');
var config = require('./config');

gulp.task('sass', function () {
  gulp.src(config.sass.src)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass(config.sass.opt))
    .pipe(gulp.dest(config.sass.dest));
});

gulp.task('sass:watch', function () {
  gulp.watch(config.sass.src, ['sass']);
});

gulp.task('default', ['sass:watch', 'sass']);
