var gulp = require('gulp');
var glp = require('gulp-load-plugins')({
  lazy: true
});
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var path = require('path');
var source = require('vinyl-source-stream');

gulp.task('lint', function () {
  return gulp.src(["./src/**/*.js"])
    .pipe(glp.eslint())
    .pipe(glp.eslint.format());
});

gulp.task('browserify', ['lint'], function (done) {

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

gulp.task('vendor:css', function () {

  var source = [
    "./node_modules/bootstrap/dist/css/bootstrap.css",
    "./node_modules/font-awesome/css/font-awesome.css"];

  return gulp.src(source)
    .pipe(glp.minifyCss())
    .pipe(glp.concat("vendor.css"))
    .pipe(gulp.dest("./wwwroot/css"));
});

gulp.task('vendor:icons', function () {
  var source = [
    "./node_modules/bootstrap/dist/fonts/**/*",
    "./node_modules/font-awesome/fonts/**/*"
  ];

  return gulp.src(source).pipe(gulp.dest("./wwwroot/fonts"));
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
    .pipe(glp.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('wwwroot/css'))
    .pipe(glp.livereload());
});


gulp.task('default', ['vendor:icons', 'vendor:css', 'app:css', 'browserify'], function () {
  glp.livereload.listen();

  gulp.watch('./src/**/*.js', ['browserify']);
  gulp.watch('./src/**/*.scss', ['app:css']);
});
