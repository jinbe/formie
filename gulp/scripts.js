'use strict';

var gulp = require('gulp');
var typescript = require('gulp-typescript');
var replace = require('gulp-replace');
var insert = require('gulp-insert');
var jshint = require('gulp-jshint');
var size = require('gulp-size');

gulp.task('scripts', ['scripts:typescript'], function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(size());
});

gulp.task('scripts:typescript', function() {
    var options = {
        out: 'models.js',
        removeComments: false
    };

    return gulp.src('app/scripts/models/**/*.ts')
        .pipe(typescript(options))
        .pipe(replace(/'use strict';\s*/g, ''))
        .pipe(insert.prepend('\'use strict\';\n\n'))
        .pipe(gulp.dest('app/scripts/auto'));
});
