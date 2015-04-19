'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var minifyHtml = require('gulp-minify-html');
var ngHtml2js = require('gulp-ng-html2js');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var markdown = require('gulp-markdown');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var del = require('del');

gulp.task('docs', ['docs:clean', 'docs:interfaces', 'docs:views', 'docs:styles', 'docs:lib', 'scripts:typescript'], shell.task('jsdoc -c app/docs/jsdoc/conf.json'));

gulp.task('docs:clean', function(done) {
    del('app/docs/data/**', done);
});

gulp.task('docs:interfaces', function(done) {
    done();

    // TODO this fails a lot
    //return gulp.src('app/scripts/models/interfaces.ts')
    //    .pipe(replace(/\*\/[\s\S]*?(?=\/\*\*)/g, '*/\n\n'))
    //    .pipe(replace(/\*\/(?![\s\S]*\*\/)[\s\S]*/, '*/\n'))
    //    .pipe(rename('interfaces.js'))
    //    .pipe(gulp.dest('app/scripts/auto'));
});

gulp.task('docs:views', ['docs:views:md'], function() {
    return gulp.src('app/docs/views/**/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2js({
            moduleName: 'dodDocs',
            declareModule: false,
            prefix: '/views/'
        }))
        .pipe(concat('views.js'))
        .pipe(insert.prepend('\'use strict\';\n\n'))
        .pipe(gulp.dest('app/docs/scripts/auto'));
});

gulp.task('docs:views:md', function() {
    return gulp.src('app/docs/views/**/*.md')
        .pipe(markdown())
        .pipe(insert.prepend('<div class="markdown">\n'))
        .pipe(insert.append('</div class="markdown">\n'))
        .pipe(gulp.dest('app/docs/views/auto'));
});

gulp.task('docs:styles', function() {
    var stream = gulp.src('app/docs/styles/docs.scss')
        .pipe(sass())
        .on('error', function(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('app/docs/styles/auto'));

    if (browserSync.active) {
        return stream.pipe(browserSync.reload({stream: true}));
    }

    return stream;
});

gulp.task('docs:lib', function() {
    return gulp.src('app/lib/**/*')
        .pipe(gulp.dest('app/docs/lib'));
});

gulp.task('docs:serve', ['docs:watch'], function() {
    browserSync({
        server: {
            baseDir: 'app/docs'
        },
        port: 3000,
        notify: false,
        ghostMode: false
    });
});

gulp.task('docs:watch', ['docs'], function() {
    gulp.watch(['app/scripts/models/**/*.ts', 'app/docs/jsdoc/conf.json', 'app/docs/jsdoc/**/*.js'], ['docs']);
    gulp.watch('app/docs/views/**/*.html', ['docs:views']);
    gulp.watch('app/docs/styles/**/*.scss', ['docs:styles']);
    gulp.watch(['app/docs/index.html', 'app/docs/scripts/**/*.js'], browserSync.reload);
});
