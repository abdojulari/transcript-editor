var gulp = require('gulp');
var config = require('./config');
var concat = require('gulp-concat');
var wrapper = require('gulp-wrapper');

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

gulp.task('js', function() {
  gulp.src(config.uglify.src)
    .pipe(concat(config.uglify.outputFile))
    .pipe(uglify(config.uglify.opt).on('error', console.error.bind(console)))
    .pipe(gulp.dest(config.uglify.dest));
});

// Markdown to HTML

var markdown = require('gulp-markdown');

gulp.task('md', function() {
  gulp.src(config.markdown.src)
    .pipe(markdown(config.markdown.opt).on('error', console.error.bind(console))) // convert markdown to html
    .pipe(wrapper({
      header: '<div class="page" id="${filename}">\n', // wrap html in div
      footer: '</div>\n'
    }))
    .pipe(concat(config.markdown.outputFile)) // put it all in one file
    .pipe(gulp.dest(config.markdown.dest));
});

// Mustache templates

gulp.task('mustache', function() {
  gulp.src(config.mustache.src)
    .pipe(wrapper({
      header: '<script id="${filename}" type="x-tmpl-mustache">\n', // wrap html in script
      footer: '</script>\n'
    }))
    .pipe(concat(config.mustache.outputFile)) // put it all in one file
    .pipe(gulp.dest(config.mustache.dest));
});

// File includes

var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function() {
  gulp.src(config.fileinclude.src)
    .pipe(fileinclude(config.fileinclude.opt).on('error', console.error.bind(console)))
    .pipe(gulp.dest(config.fileinclude.dest));
});

// Watchers

gulp.task('watch', function () {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.uglify.src, ['js']);
  gulp.watch(config.markdown.src, ['md', 'fileinclude']);
  gulp.watch(config.mustache.src, ['mustache', 'fileinclude']);
  gulp.watch(config.fileinclude.src, ['fileinclude']);
});

gulp.task('default', ['watch', 'sass', 'js', 'md', 'mustache', 'fileinclude']);
