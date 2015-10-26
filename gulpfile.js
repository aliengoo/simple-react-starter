var gulp = require('gulp');
var glp = require('gulp-load-plugins')({
  lazy: true
});
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var path = require('path');
var source = require('vinyl-source-stream');

gulp.task('browserify', function (done) {

  var args = watchify.args;
  args.extensions = ['.js'];

  watchify(browserify(path.join("./src", "main.js"), args), args)
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      console.error(err.message);
      done();
    })
    .pipe(source("app.js"))
    .pipe(gulp.dest("./wwwroot"))
    .pipe(glp.livereload()).on('end', done);
});

gulp.task('app:css', function () {

  // pipe the target file to the
  var mainFile = [path.join("./src/styles", "app.scss")];
  var imports = [
    "!" + mainFile[0],
    "./src/**/*.scss"
  ];

  return gulp.src(mainFile)
    .pipe(glp.inject(gulp.src(imports, {read: false}), {
      relative: true,
      starttag: '/* inject:imports */',
      endtag: '/* endinject */',
      transform: function(filePath){
        return '@import "' + filePath + '";';
      }
    }))
    .pipe(glp.sass())
    .pipe(gulp.dest('wwwroot'))
    .pipe(glp.livereload());
});

gulp.task('default', ['app:css', 'browserify', 'webserver'], function () {
  glp.livereload.listen();

  gulp.watch('./src/**/*.js', ['browserify']);
  gulp.watch('./src/**/*.scss', ['app:css']);
});

gulp.task('webserver', function () {
  return gulp.src('wwwroot').pipe(glp.webserver({
    port:9190,
    livereload: true
  }));
});