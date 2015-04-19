'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('mobile', ['compile'], function() {
    return gulp.src('./')
        .pipe(shell('ionic run android'));
});

gulp.task('mobile:build', ['compile'], function() {
    return gulp.src('./')
        .pipe(shell('ionic build android'));
});
