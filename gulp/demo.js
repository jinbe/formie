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

gulp.task('demo', ['demo:build'], function() {
    gulp.watch('demo/ionic/www/views/**/*.html', ['demo:views']);
    gulp.watch('demo/ionic/www/scripts/models/**/*.ts', ['demo:docs']);
    gulp.watch('demo/ionic/www/styles/**/*.scss', ['styles']);
    gulp.watch(['demo/ionic/www/index.html', 'demo/ionic/www/docs/**', 'demo/ionic/www/scripts/**/*.js'], browserSync.reload);

    browserSync({
        server: {
            baseDir: 'demo/ionic/www'
        },
        port: 3000,
        notify: false,
        ghostMode: false
    });
});

gulp.task('demo:build', function(done) {
    runSequence('demo:clean', 'demo:docs', ['demo:views', 'demo:styles'], done);
});

gulp.task('demo:clean', function(done) {
    del(['demo/ionic/www/docs/**', 'demo/ionic/www/{scripts,styles}/auto/**'], done);
});

gulp.task('demo:docs', ['build:typescript'], function(done) {
    var options = {
        source: {
            scripts: ['src/models/auto/**'],
            guides: 'docs/guide.md',
            comments: 'src/models/Interfaces.ts'
        },
        outDir: 'demo/ionic/www/docs',
        moduleName: 'docsModule',
        buildAsModuleFor: {
            appModule: 'formieIonicDemo',
            baseState: 'demo.docs',
            baseUrl: ''
        }
    };

    jsguide(options, done);
});

gulp.task('demo:views', function() {
    return gulp.src('demo/ionic/www/views/**/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2js({
            moduleName: 'formieIonicDemo',
            declareModule: false,
            prefix: '/views/'
        }))
        .pipe(concat('views.js'))
        .pipe(header('\'use strict\';\n\n'))
        .pipe(gulp.dest('demo/ionic/www/scripts/auto'));
});

gulp.task('demo:styles', function() {
    var stream = gulp.src('demo/ionic/www/styles/{app,vendor}.scss')
        .pipe(sass({errLogToConsole: false}))
        .on('error', function(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest('demo/ionic/www/styles/auto'));

    if (browserSync.active) {
        return stream.pipe(browserSync.reload({stream: true}));
    }

    return stream;
});
