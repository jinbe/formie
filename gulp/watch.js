'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('watch', ['compile', 'docs:watch'], function() {
    gulp.watch('app/views/**/*.html', ['views']);
    gulp.watch('app/scripts/models/**/*.ts', ['scripts:typescript']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch(['app/index.html', 'app/scripts/**/*.js', 'app/assets/**/*'], browserSync.reload);
});
