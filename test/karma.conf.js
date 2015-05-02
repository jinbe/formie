module.exports = function(config) {
    config.set({
        basePath: '../',
        files: [
            'src/models/**/*.js',
            'test/unit/**/*.js',
            'test/mock/**/*.js'
        ],
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],
        autoWatch: false,
        singleRun: true
    });
};
