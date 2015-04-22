'use strict';

var fs = require('fs');
var gutil = require('gulp-util');
var path = require('path');
var through = require('through2');
var Minimize = require('minimize');

module.exports = {
    expandTemplateUrl: function(root, minimizeOptions) {
        root = (root || '');
        minimizeOptions = (minimizeOptions || {});

        var stream = through.obj(function(file, enc, done) {
            var thisRef = this;

            if (file.isStream()) {
                thisRef.emit('error', new gutil.PluginError('gulputil.expandTemplateUrl', 'Streams are not supported'));
                return done();
            }

            if (!file.isBuffer()) {
                thisRef.push(file);
                return done();
            }

            var re = /templateUrl\:[^\'\"]*(\'|\")([^\'\"]+)(\'|\")/g;
            expandNext(re, file.contents.toString(), done);

            function expandNext(re, contents, done) {
                var match = re.exec(contents);

                if (!match || !match[2]) {
                    if (contents) {
                        file.contents = new Buffer(contents);
                    }

                    thisRef.push(file);
                    return done();
                }

                try {
                    var templateUrl = path.join(root, match[2]);
                    var templateContent = fs.readFileSync(templateUrl, 'utf8');

                    var minimize = new Minimize(minimizeOptions);
                    minimize.parse(templateContent, function(err, template) {
                        if (err) {
                            thisRef.emit('error', new gutil.PluginError('gulputil.expandTemplateUrl', err));
                            return done();
                        }

                        template = template.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
                        template = 'template: \'' + template + '\'';

                        var newContents = contents.substring(0, match.index) + template + contents.substring(re.lastIndex);
                        re.lastIndex = match.index + template.length;
                        expandNext(re, newContents, done);
                    });
                }
                catch (err) {
                    err.fileName = file.path;
                    thisRef.emit('error', new gutil.PluginError('gulputil.expandTemplateUrl', err));
                    return done();
                }
            }
        });

        return stream;
    }
};
