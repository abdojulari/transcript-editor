var gulp = require('gulp');
var config = require('./config');

// Sass compilation

var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src(config.sass.src)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass(config.sass.opt))
    .pipe(gulp.dest(config.sass.dest));
});

// Coffeescript compilation

var coffee = require("gulp-coffee");

gulp.task('coffee', function () {
    gulp.src(config.coffee.src)
    .pipe(coffee(config.coffee.opt).on('error', function(err){}))
    .pipe(gulp.dest(config.coffee.dest));
});

// Watchers
gulp.task('watch', function () {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.coffee.src, ['coffee'])
});


gulp.task('default', ['watch', 'sass', 'coffee']);
