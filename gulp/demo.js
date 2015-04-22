'use strict';

var gulp = require('gulp');
var jsguide = require('jsguide');

gulp.task('demo:docs', ['build:typescript'], function(done) {
    var options = {
        source: {
            include: ['src/models/auto']
        },
        nonJsFiles: 'src/models/Interfaces.ts',
        guides: 'docs/*.md',
        outDir: 'demo/docs',
        moduleName: 'docsModule',
        buildAsModuleFor: {
            appModule: 'dodDocs',
            baseState: 'demo.docs',
            baseUrl: '',
            baseTemplateUrl: '/docviews'
        }
    };

    jsguide(options, done);
});

var runSequence = require('run-sequence');
var del = require('del');

gulp.task('compile', ['compile:clean'], function(done) {
    runSequence(['wiredep', 'views'], ['scripts', 'styles'], 'wiresrc', 'docs', done);
});

gulp.task('compile:clean', function(done) {
    del('demo/{assets,scripts,styles}/auto/**', done);
});

var browserSync = require('browser-sync');

gulp.task('serve', ['compile'], function() {
    gulp.watch('demo/views/**/*.html', ['views']);
    gulp.watch('demo/scripts/models/**/*.ts', ['scripts:typescript']);
    gulp.watch('demo/styles/**/*.scss', ['styles']);
    gulp.watch(['demo/index.html', 'demo/scripts/**/*.js', 'demo/assets/**/*'], browserSync.reload);

    browserSync({
        server: {
            baseDir: 'demo'
        },
        port: 3000,
        notify: false,
        ghostMode: false
    });
});


var wiredep = require('wiredep').stream;

gulp.task('wiredep', ['wiredep:index', 'wiredep:sass']);

gulp.task('wiredep:index', function() {
    return gulp.src('demo/index.html')
        .pipe(wiredep({
            directory: 'demo/lib',
            ignorePath: /^\/|\.\.\//
        }))
        .pipe(gulp.dest('demo'));
});

gulp.task('wiredep:sass', function() {
    return gulp.src('demo/styles/vendor.scss')
        .pipe(wiredep({
            directory: 'demo/lib'
        }))
        .pipe(gulp.dest('demo/styles'));
});

var inject = require('gulp-inject');

gulp.task('wiresrc', function() {
    var sources = gulp.src('demo/scripts/**/*.js', {read: false});

    return gulp.src('demo/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('demo'));
});
