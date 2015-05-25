var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var add = require('gulp-add-src');
var rename = require('gulp-rename');
var gls = require('gulp-live-server');
var karma = require('karma').server;

/**
 * Minify and concat component files into a file included by the index.
 */
gulp.task('build', ['clean'], function() {

  return gulp.src([
    './app/module.js',
    './app/services/**/*.js',
    './app/components/**/*.js',
    './app/layout/**/*.js',
    './app/routes.js'
  ])
  .pipe(babel())
  .pipe(add.prepend([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/angular/angular.js',
    './node_modules/immutable/dist/immutable.js',
    './node_modules/ramda/dist/ramda.js',
    './node_modules/reflux/dist/reflux.js',
    './node_modules/baconjs/dist/Bacon.js',
    './node_modules/pouchdb/dist/pouchdb.js',
    './node_modules/cuid/dist/browser-cuid.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js'
  ]))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./app/_build'));
});

gulp.task('clean', function() {
  return gulp.src(['./app/_build/app.js'], {read: false})
    .pipe(clean());
});

gulp.task('styles', function() {
  return gulp.src('node_modules/todomvc-app-css/index.css')
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./app/_build'));
});

/********************************************************/

gulp.task('test', ['build'], function(done) {
  return karma.start({
    configFile: require('path').resolve('karma.conf.js'),
    singleRun: true
  }, function() {
    done(); 
  });
});

gulp.task('develop', ['build', 'styles'], function(done) {
  return karma.start({
    configFile: require('path').resolve('karma.conf.js')
  }, function() {
    done(); 
  });
  gulp.watch(['./app/**/*.js', '!./app/_build/**/*.js'], ['build', server.notify]);
});

gulp.task('serve', ['build', 'styles'], function() {
  var server = gls.static('app', process.env.PORT || 8000);
  server.start();
});

gulp.task('default', ['serve']);
