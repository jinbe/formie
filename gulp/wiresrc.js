'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('wiresrc', function() {
    var sources = gulp.src('app/scripts/**/*.js', {read: false});

    return gulp.src('app/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('app'));
});
