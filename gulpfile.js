var gulp = require('gulp');
var concat = require('gulp-concat');

/**
 * Minify and concat component files into a file included by the index.
 */
gulp.task('build', function() {
  gulp.src([
    './node_modules/angular/angular.js',
    './js/**/*.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./js'));
});

gulp.task('default', ['build']);
