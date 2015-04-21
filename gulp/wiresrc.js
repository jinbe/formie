'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('wiresrc', function() {
    var sources = gulp.src('demo/scripts/**/*.js', {read: false});

    return gulp.src('demo/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('demo'));
});
