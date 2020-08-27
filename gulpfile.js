const gulp = require('gulp');

// config
const config = require('./gulp/config');

// utilities
const del = require('del');
const concat = require('gulp-concat');
const include = require('gulp-include');
const map = require('vinyl-map');
const path = require('path');
const rename = require('gulp-rename');
const hash = require('gulp-hash-filename');

// Sass compilation

const sass = require('gulp-sass');

gulp.task('sass-cleanup', () => {
  return del([path.join(config.sass.dest, '*.css')]);
});

gulp.task('sass', ['sass-cleanup'], function () {
  return gulp.src(config.sass.src)
    .pipe(hash())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass(config.sass.opt))
    .pipe(gulp.dest(config.sass.dest));
});

// Javascript compilation

var uglify = require('gulp-uglify');

gulp.task('js-deps.jquery', function() {
  return gulp.src('./node_modules/jquery/dist/jquery.js')
    .pipe(gulp.dest('./gulp/js/vendor'))
});

gulp.task('js-deps.js-cookie', function() {
  return gulp.src('./node_modules/js-cookie/src/js.cookie.js')
    .pipe(gulp.dest('./gulp/js/vendor'))
});

gulp.task('js-deps.j-toker', function() {
  return gulp.src('./node_modules/j-toker/dist/jquery.j-toker.js')
    .pipe(gulp.dest('./gulp/js/vendor'))
});

gulp.task('js-deps', ['js-deps.jquery', 'js-deps.js-cookie', 'js-deps.j-toker']);

gulp.task('js-cleanup', () => {
  return del([path.join(config.include.dest, '*.js'), path.join(config.uglify.dest, '*.js')]);
});

const buildJsBase = () => {
  return gulp.src(config.include.src)
    .pipe(hash())
    .pipe(include(config.include.opt).on('error', console.error.bind(console)));
};

gulp.task('js-unminified', ['js-deps'], () => {
  return buildJsBase()
    .pipe(gulp.dest(config.include.dest));
});

gulp.task('js-minified', ['js-deps'], () => {
  return buildJsBase()
    .pipe(uglify(config.uglify.opt).on('error', console.error.bind(console)))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.uglify.dest));
});

// Templates

gulp.task('templates', function() {
  return gulp.src(config.templates.src)
    .pipe(hash())
    .pipe(map(function(contents, filename){
      contents = contents.toString();
      var name = config.templates.variable;
      filename = path.basename(filename);

      contents = 'window.'+name+'=window.'+name+' || {}; window.'+name+'["'+filename+'"] = \'' + contents.replace(/'/g, "\\'").replace(/(\r\n|\n|\r)/gm,"") + '\';';
      return contents;
    }))
    .pipe(concat(config.templates.outputFile))
    .pipe(gulp.dest(config.templates.dest));
});

gulp.task('js', ['js-cleanup', 'js-unminified', 'js-minified', 'templates']);

// Watchers

gulp.task('watch', function () {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch([config.uglify.src, config.templates.src], ['js']);
});

gulp.task('default', ['watch', 'sass', 'js']);
