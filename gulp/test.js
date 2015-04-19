'use strict';

var gulp = require('gulp');
var karma = require('karma').server;
//var protractor = require('gulp-protractor');
//var browserSync = require('browser-sync');

//gulp.task('test', ['test:unit', 'test:e2e']);

gulp.task('test:unit', ['compile'], function(done) {
    karma.start({
        configFile: process.cwd() + '/test/karma.conf.js',
        singleRun: true
    }, done);
});

//gulp.task('test:e2e', ['serve:e2e', 'protractor']);

//gulp.task('protractor', ['webdriver:update'], function(done) {
//    var testFiles = [
//        'test/e2e/**/*.js'
//    ];
//
//    gulp.src(testFiles)
//        .pipe(protractor.protractor({
//            configFile: 'test/protractor.conf.js'
//        }))
//        .on('error', function(err) {
//            throw err;
//        })
//        .on('end', function() {
//            browserSync.exit();
//            done();
//        });
//});

//gulp.task('webdriver:update', protractor.webdriver_update);

//gulp.task('webdriver:standalone', protractor.webdriver_standalone);
