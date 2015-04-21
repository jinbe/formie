'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('compile', ['compile:clean'], function(done) {
    runSequence(['wiredep', 'views'], ['scripts', 'styles'], 'wiresrc', 'docs', done);
});

gulp.task('compile:clean', function(done) {
    del('demo/{assets,scripts,styles}/auto/**', done);
});
