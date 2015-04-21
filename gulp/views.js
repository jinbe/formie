'use strict';

var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var ngHtml2js = require('gulp-ng-html2js');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var size = require('gulp-size');

gulp.task('views', function() {
    return gulp.src('demo/views/**/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2js({
            moduleName: 'dodDocs',
            declareModule: false,
            prefix: '/views/'
        }))
        .pipe(concat('views.js'))
        .pipe(insert.prepend('\'use strict\';\n\n'))
        .pipe(gulp.dest('demo/scripts/auto'))
        .pipe(size());
});
