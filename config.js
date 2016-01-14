var sourceRoot = "./gulp";
var publicRoot = "./public";
var sourceAssets  = sourceRoot + "/assets";
var publicAssets = publicRoot + "/assets";

module.exports = {
  fileinclude: {
    src: sourceRoot + "/layouts/**/*.html",
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
  project: {
    src: './project.json',
    dest: publicAssets + '/js/',
    outputFile: 'config.js',
    variable: 'PROJECT',
    opt: {}
  },
  sass: {
    src: sourceAssets + "/scss/**/*.scss",
    dest: publicAssets + "/css",
    opt: {outputStyle: 'compressed'}
  },
  templates: {
    src: sourceRoot + "/templates/**/*.ejs",
    dest: publicAssets + "/html/",
    outputFile: 'templates.html',
    opt: {}
  },
  uglify: {
    src: [
      sourceAssets + '/js/vendor/jquery-1.12.0.min.js',
      sourceAssets + '/js/vendor/underscore-min.js',
      sourceAssets + '/js/vendor/backbone-min.js',
      sourceAssets + '/js/vendor/jquery.cookie.js',
      sourceAssets + '/js/vendor/jquery-deparam.js',
      sourceAssets + '/js/vendor/pubsub.min.js',
      sourceAssets + '/js/vendor/jquery.j-toker.min.js',
      sourceAssets + '/js/utilities.js',
      sourceAssets + '/js/router.js',
      sourceAssets + '/js/models/*.js',
      sourceAssets + '/js/collections/*.js',
      sourceAssets + '/js/views/**/*.js',
      sourceAssets + '/js/app.js'
    ],
    dest: publicAssets + '/js/',
    outputFile: 'app.js',
    opt: {}
  }
};
