var publicAssets = "./public/assets";
var sourceFiles  = "./gulp/assets";

module.exports = {
  sass: {
    src: sourceFiles + "/scss/**/*.scss",
    dest: publicAssets + "/css",
    opt: {outputStyle: 'compressed'}
  }
};
