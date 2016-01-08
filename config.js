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
    src: sourceAssets + '/js/**/*.js',
    dest: publicAssets + '/js/',
    outputFile: 'app.js',
    opt: {}
  }
};
