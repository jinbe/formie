'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var size = require('gulp-size');

gulp.task('styles', function() {
    var stream = gulp.src('demo/styles/{app,vendor}.scss')
        .pipe(sass())
        .on('error', function(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest('demo/styles/auto'))
        .pipe(size());

    if (browserSync.active) {
        return stream.pipe(browserSync.reload({stream: true}));
    }

    return stream;
});
