'use strict';

var gulp = require('gulp');
var jsguide = require('jsguide');

gulp.task('docs', ['build:typescript'], function(done) {
    var options = {
        source: {
            include: ['src/models/auto']
        },
        nonJsFiles: 'src/models/Interfaces.ts',
        guides: 'docs/*.md',
        outDir: 'docs/auto',
        moduleName: 'formieDocs',
        pageTitle: 'Using formie'
    };

    jsguide(options, done);
});
