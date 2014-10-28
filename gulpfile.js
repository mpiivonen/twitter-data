var jshint = require('gulp-jshint');
var gulp = require('gulp');

gulp.task('default', ['hint'], function() {

});

gulp.task('hint', function(){
  return gulp.src('index.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
});
