'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var header = require('gulp-header');
var jsguide = require('jsguide');
var minifyHtml = require('gulp-minify-html');
var ngHtml2js = require('gulp-ng-html2js');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var wiredep = require('wiredep');

gulp.task('demo', ['demo:build'], function() {
    gulp.watch('demo/views/**/*.html', ['demo:views']);
    gulp.watch('demo/scripts/models/**/*.ts', ['demo:docs']);
    gulp.watch('demo/styles/**/*.scss', ['styles']);
    gulp.watch(['demo/index.html', 'demo/docs/**', 'demo/scripts/**/*.js'], browserSync.reload);

    browserSync({
        server: {
            baseDir: 'demo'
        },
        port: 3000,
        notify: false,
        ghostMode: false
    });
});

gulp.task('demo:build', function(done) {
    runSequence('demo:clean', 'demo:docs', ['demo:wiredep', 'demo:views', 'demo:styles'], done);
});

gulp.task('demo:clean', function(done) {
    del(['demo/docs/**', 'demo/{scripts,styles}/auto/**'], done);
});

gulp.task('demo:docs', ['build:typescript'], function(done) {
    var options = {
        source: {
            include: ['src/models/auto']
        },
        nonJsFiles: 'src/models/Interfaces.ts',
        guides: 'docs/guide.md',
        outDir: 'demo/docs',
        moduleName: 'docsModule',
        buildAsModuleFor: {
            appModule: 'formieDemo',
            baseState: 'demo.docs',
            baseUrl: ''
        }
    };

    jsguide(options, done);
});

gulp.task('demo:wiredep', function() {
    return gulp.src('demo/index.html')
        .pipe(wiredep.stream({cwd: 'demo'}))
        .pipe(gulp.dest('demo'));
});

gulp.task('demo:views', function() {
    return gulp.src('demo/views/**/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2js({
            moduleName: 'formieDemo',
            declareModule: false,
            prefix: '/views/'
        }))
        .pipe(concat('views.js'))
        .pipe(header('\'use strict\';\n\n'))
        .pipe(gulp.dest('demo/scripts/auto'));
});

gulp.task('demo:styles', function() {
    var stream = gulp.src('demo/styles/{app,vendor}.scss')
        .pipe(sass())
        .on('error', function(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest('demo/styles/auto'));

    if (browserSync.active) {
        return stream.pipe(browserSync.reload({stream: true}));
    }

    return stream;
});
