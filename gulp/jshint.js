'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
    return gulp.src(['demo/ionic/www/scripts/app.js', 'demo/ionic/www/scripts/controllers/*.js', 'src/ionic/scripts/**/*.js', 'src/models/auto/models.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
