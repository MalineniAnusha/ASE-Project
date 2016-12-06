var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

gulp.task('coffee', function () {
   gulp.src('coffee/*.coffee')
       .pipe(coffee())
       .pipe(concat('main.js'))
       .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
    gulp.watch('coffee/*.coffee', ['coffee']);
});

gulp.task('default', ['coffee', 'watch']);