var sourceRoot = "./gulp";
var publicRoot = "./public";
var sourceAssets  = sourceRoot;
var publicAssets = publicRoot + "/assets";

module.exports = {
  include: {
    dest: publicAssets + '/js/',
    opt: {},
    src: [
      sourceAssets + '/js/admin.js',
      sourceAssets + '/js/default.js'
    ]
  },
  sass: {
    src: sourceAssets + "/scss/**/*.scss",
    dest: publicAssets + "/css",
    opt: {outputStyle: 'compressed'}
  },
  templates: {
    src: sourceAssets + "/templates/**/*.ejs",
    dest: publicAssets + '/js/',
    outputFile: 'templates.js',
    variable: 'TEMPLATES',
    opt: {}
  },
  uglify: {
    src: sourceAssets + "/js/**/*.js",
    dest: publicAssets + '/js/',
    opt: {}
  }
};
