'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('watch', ['compile'], function() {
    gulp.watch('demo/views/**/*.html', ['views']);
    gulp.watch('demo/scripts/models/**/*.ts', ['scripts:typescript']);
    gulp.watch('demo/styles/**/*.scss', ['styles']);
    gulp.watch(['demo/index.html', 'demo/scripts/**/*.js', 'demo/assets/**/*'], browserSync.reload);
});
