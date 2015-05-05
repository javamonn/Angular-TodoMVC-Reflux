var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var traceur = require('gulp-traceur');
var add = require('gulp-add-src');

/**
 * Minify and concat component files into a file included by the index.
 */
gulp.task('build', ['clean'], function() {

  return gulp.src([
    './js/app.module.js',
    './js/app.constants.js',
    './js/**/*.js'
  ])
  .pipe(traceur())
  .pipe(add.prepend([
    './node_modules/angular/angular.js',
    './node_modules/immutable/dist/immutable.js',
    './node_modules/ramda/dist/ramda.js',
    './node_modules/traceur/bin/traceur-runtime.js',
    './node_modules/reflux/reflux.js'
  ]))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./js'));
});

gulp.task('clean', function() {
  return gulp.src(['./js/app.js'], {read: false})
    .pipe(clean());
});

gulp.task('serve', ['build'], function() {
  gulp.watch('./js/**/*.js', ['build']);
});

gulp.task('default', ['serve']);
