'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', ['watch'], function() {
    browserSync({
        server: {
            baseDir: 'demo'
        },
        port: 3000,
        notify: false,
        ghostMode: false
    });
});
