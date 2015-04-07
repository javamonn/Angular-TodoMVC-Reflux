var gulp = require('gulp');
var concat = require('gulp-concat');
var open = require('gulp-open');

/**
 * Minify and concat component files into a file included by the index.
 */
gulp.task('build', function() {
  gulp.src([
    './node_modules/angular/angular.js',
    './node_modules/ramda/dist/ramda.js',
    './js/**/*.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./js'));
});

gulp.task('serve', ['build'], function() {
  gulp.src('./index.html')
    .pipe(open());
});

gulp.task('default', ['serve']);
