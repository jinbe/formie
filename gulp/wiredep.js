'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;

gulp.task('wiredep', ['wiredep:index', 'wiredep:sass']);

gulp.task('wiredep:index', function() {
    return gulp.src('app/index.html')
        .pipe(wiredep({
            directory: 'app/lib',
            ignorePath: /^\/|\.\.\//
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('wiredep:sass', function() {
    return gulp.src('app/styles/vendor.scss')
        .pipe(wiredep({
            directory: 'app/lib'
        }))
        .pipe(gulp.dest('app/styles'));
});
