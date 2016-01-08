var publicAssets = "./public/assets";
var sourceFiles  = "./gulp/assets";

module.exports = {
  uglify: {
    src: sourceFiles + '/js/**/*.js',
    dest: publicAssets + '/js/',
    outputFile: 'app.js',
    opt: {}
  },
  sass: {
    src: sourceFiles + "/scss/**/*.scss",
    dest: publicAssets + "/css",
    opt: {outputStyle: 'compressed'}
  }
};
