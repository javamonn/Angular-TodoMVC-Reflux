var gulp = require('gulp');
var concat = require('gulp-concat');
var open = require('gulp-open');
var clean = require('gulp-clean');

/**
 * Minify and concat component files into a file included by the index.
 */
gulp.task('build', ['clean'], function() {
  return gulp.src([
    './node_modules/angular/angular.js',
    './node_modules/ramda/dist/ramda.js',
    './js/app.module.js',
    './js/app.constants.js',
    './js/**/*.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./js'));
});

gulp.task('clean', function() {
  return gulp.src(['./js/app.js'], {read: false})
    .pipe(clean());
});

gulp.task('serve', ['build'], function() {

  gulp.watch('./js/**/*.js', ['build']);

  return gulp.src('./index.html')
    .pipe(open());
});

gulp.task('default', ['serve']);
