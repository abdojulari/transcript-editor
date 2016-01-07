var publicAssets = "./public/assets";
var sourceFiles  = "./gulp/assets";

module.exports = {
  coffee: {
    src: sourceFiles + '/js/app.coffee',
    dest: publicAssets + '/js',
    opt: {}
  },
  sass: {
    src: sourceFiles + "/scss/**/*.scss",
    dest: publicAssets + "/css",
    opt: {outputStyle: 'compressed'}
  }
};
