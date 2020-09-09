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
const shell = require('gulp-shell');

// Javascript compilation

var uglify = require('gulp-uglify');

gulp.task('js-deps.jquery', () => {
  return gulp.src('./node_modules/jquery/dist/jquery.js')
    .pipe(gulp.dest('./gulp/js/vendor'))
});

gulp.task('js-deps.js-cookie', () => {
  return gulp.src('./node_modules/js-cookie/src/js.cookie.js')
    .pipe(gulp.dest('./gulp/js/vendor'))
});

gulp.task('js-deps.j-toker', function() {
  return gulp.src('./node_modules/j-toker/dist/jquery.j-toker.js')
    .pipe(gulp.dest('./gulp/js/vendor'))
});

gulp.task('js-deps', gulp.parallel('js-deps.jquery', 'js-deps.js-cookie', 'js-deps.j-toker'));

gulp.task('js-cleanup', () => {
  return del([path.join(config.include.dest, '*.js'), path.join(config.uglify.dest, '*.js')]);
});

const buildJsBase = () => {
  return gulp.src(config.include.src)
    .pipe(hash())
    .pipe(include(config.include.opt).on('error', console.error.bind(console)));
};

gulp.task('js-unminified', gulp.series('js-deps', () => {
  return buildJsBase()
    .pipe(gulp.dest(config.include.dest));
}));

gulp.task('js-minified', gulp.series('js-deps', () => {
  return buildJsBase()
    .pipe(uglify(config.uglify.opt).on('error', console.error.bind(console)))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.uglify.dest));
}));

// Templates

gulp.task('templates', () => {
  return gulp.src(config.templates.src)
    .pipe(map((contents, filename) => {
      contents = contents.toString();
      var name = config.templates.variable;
      filename = path.basename(filename);

      contents = 'window.'+name+'=window.'+name+' || {}; window.'+name+'["'+filename+'"] = \'' + contents.replace(/'/g, "\\'").replace(/(\r\n|\n|\r)/gm,"") + '\';';
      return contents;
    }))
    .pipe(concat(config.templates.outputFile))
    .pipe(hash())
    .pipe(gulp.dest(config.templates.dest));
});

gulp.task('clear-cache', shell.task('bundle exec rake cache:clear'));

gulp.task('js', gulp.series('js-cleanup', 'js-unminified', 'js-minified', 'templates', 'clear-cache'));

// Watchers

gulp.task('watch', () => {
  gulp.watch([config.uglify.src, config.templates.src], gulp.series('js'));
});

gulp.task('default', gulp.series('watch', 'js'));
