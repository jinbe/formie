'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;

gulp.task('wiredep', ['wiredep:index', 'wiredep:sass']);

gulp.task('wiredep:index', function() {
    return gulp.src('demo/index.html')
        .pipe(wiredep({
            directory: 'demo/lib',
            ignorePath: /^\/|\.\.\//
        }))
        .pipe(gulp.dest('demo'));
});

gulp.task('wiredep:sass', function() {
    return gulp.src('demo/styles/vendor.scss')
        .pipe(wiredep({
            directory: 'demo/lib'
        }))
        .pipe(gulp.dest('demo/styles'));
});
