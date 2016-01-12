var gulp = require('gulp');

// config
var config = require('./config');
var project = require('./project.json');

// utilities
var concat = require('gulp-concat');
var wrapper = require('gulp-wrapper');
var rename = require("gulp-rename");

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

// Put project config in a javascript file for front-end app to use

gulp.task('project', function() {
  gulp.src(config.project.src)
    .pipe(wrapper({
      header: 'window.'+config.project.variable+' = ', // wrap json in javascript variable
      footer: ';\n'
    }))
    .pipe(rename(config.project.outputFile)) // rename file
    .pipe(gulp.dest(config.project.dest));
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

// Templates

gulp.task('templates', function() {
  gulp.src(config.templates.src)
    .pipe(wrapper({
      header: '<script id="${filename}" type="text/ejs">\n', // wrap html in script
      footer: '</script>\n'
    }))
    .pipe(concat(config.templates.outputFile)) // put it all in one file
    .pipe(gulp.dest(config.templates.dest));
});

// File includes

var fileinclude = require('gulp-file-include'),
    fileinclude_opt = config.fileinclude.opt;
    // pass in project info
    fileinclude_opt.context = project;

gulp.task('fileinclude', function() {
  gulp.src(config.fileinclude.src)
    .pipe(fileinclude(fileinclude_opt).on('error', console.error.bind(console)))
    .pipe(gulp.dest(config.fileinclude.dest));
});

// Watchers

gulp.task('watch', function () {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.uglify.src, ['js']);
  gulp.watch(config.markdown.src, ['md', 'fileinclude']);
  gulp.watch(config.templates.src, ['templates', 'fileinclude']);
  gulp.watch(config.project.src, ['project']);
  gulp.watch(config.fileinclude.src, ['fileinclude']);
});

gulp.task('default', ['watch', 'sass', 'js', 'md', 'templates', 'project', 'fileinclude']);
