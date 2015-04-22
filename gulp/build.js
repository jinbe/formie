'use strict';

var addSrc = require('gulp-add-src');
var angularFilesort = require('gulp-angular-filesort');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var del = require('del');
var directiveReplace = require('gulp-directive-replace');
var gulp = require('gulp');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');

gulp.task('build', function(done) {
    runSequence('build:clean', ['build:scripts', 'build:styles'], done);
});

gulp.task('build:clean', function(done) {
    del('dist/**', done);
});

gulp.task('build:typescript', function() {
    return gulp.src('src/models/**/*.ts')
        .pipe(typescript({out: 'models.js', removeComments: false}))
        .pipe(gulp.dest('src/models/auto'));
});

gulp.task('build:scripts', ['build:typescript'], function() {
    return gulp.src('src/ionic/scripts/directives/**/*.js')
        .pipe(directiveReplace({root: 'src/ionic'}))
        .pipe(addSrc(['src/ionic/scripts/**/*.js', '!src/ionic/scripts/directives/**/*.js']))
        .pipe(addSrc('src/models/auto/**/*.js'))
        .pipe(jshint())
        .pipe(angularFilesort())
        .pipe(concat('formieIonic.js'))
        .pipe(replace(/'use strict';\s*/g, ''))
        .pipe(header('\'use strict\';\n\n'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build:styles', function() {
    return gulp.src('src/ionic/styles/formieIonic.scss')
        .pipe(sass())
        .on('error', function(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(autoprefixer('last 1 version'))
        .pipe(minifyCss())
        .pipe(addSrc('src/ionic/styles/{formieIonic,ionicOverwrite}.scss'))
        .pipe(gulp.dest('dist'));
});
