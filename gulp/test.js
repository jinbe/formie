'use strict';

var gulp = require('gulp');
var karma = require('karma').server;

gulp.task('test', ['build'], function(done) {
    karma.start({
        configFile: process.cwd() + '/test/karma.conf.js',
        singleRun: true
    }, done);
});
