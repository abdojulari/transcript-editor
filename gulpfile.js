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

// Javascript compilation

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('js', function() {
  gulp.src(config.uglify.src)
    .pipe(concat(config.uglify.outputFile))
    .pipe(uglify(config.uglify.opt).on('error', console.error.bind(console)))
    .pipe(gulp.dest(config.uglify.dest));
});

// Watchers
gulp.task('watch', function () {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.uglify.src, ['js']);
});


gulp.task('default', ['watch', 'sass', 'js']);
