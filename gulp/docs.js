'use strict';

var gulp = require('gulp');
var jsguide = require('jsguide');

gulp.task('docs', ['build:typescript'], function(done) {
    var options = {
        source: {
            scripts: ['src/models/auto/**'],
            guides: 'docs/*.md',
            comments: 'src/models/Interfaces.ts'
        },
        outDir: 'docs/auto',
        moduleName: 'formieDocs',
        pageTitle: 'Using formie'
    };

    jsguide(options, done);
});
