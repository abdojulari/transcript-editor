var sourceRoot = "./gulp";
var publicRoot = "./public";
var sourceAssets  = sourceRoot + "/assets";
var publicAssets = publicRoot + "/assets";

module.exports = {
  fileinclude: {
    src: sourceRoot + "/pages/**/*.html",
    dest: publicRoot + "/",
    opt: {
      basepath: "@root"
    }
  },
  markdown: {
    src: sourceRoot + "/content/**/*.md",
    dest: publicAssets + "/html/",
    outputFile: 'content.html',
    opt: {}
  },
  mustache: {
    src: sourceRoot + "/templates/**/*.mustache",
    dest: publicAssets + "/html/",
    outputFile: 'templates.html',
    opt: {}
  },
  sass: {
    src: sourceAssets + "/scss/**/*.scss",
    dest: publicAssets + "/css",
    opt: {outputStyle: 'compressed'}
  },
  uglify: {
    src: [
      sourceAssets + '/js/vendor/jquery-1.12.0.min.js',
      sourceAssets + '/js/vendor/underscore-min.js',
      sourceAssets + '/js/vendor/backbone-min.js',
      sourceAssets + '/js/vendor/mustache.min.js',
      sourceAssets + '/js/utilities.js',
      sourceAssets + '/js/app.js',
      sourceAssets + '/js/router.js'
    ],
    dest: publicAssets + '/js/',
    outputFile: 'app.js',
    opt: {}
  }
};
