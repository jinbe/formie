'use strict';

var gulp = require('gulp');
var jsguide = require('jsguide');

gulp.task('docs', function(done) {
    var options = {
        source: {
            include: ['demo/scripts']
        },
        nonJsFiles: 'demo/scripts/models/Interfaces.ts',
        guides: 'demo/guides/**',
        outDir: 'demo/docs',
        moduleName: 'docsModule',
        pageTitle: 'Using formie',
        buildAsModuleFor: {
            appModule: 'dodDocs',
            baseState: 'demo.docs',
            baseUrl: '',
            baseTemplateUrl: '/docviews'
        }
    };

    jsguide(options, done);
});
