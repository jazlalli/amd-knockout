// Karma configuration
// Generated on Wed May 08 2013 11:47:33 GMT+0100 (GMT Daylight Time)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
    JASMINE,
    JASMINE_ADAPTER,
    REQUIRE,
    REQUIRE_ADAPTER,

    'Public/scripts/vendor/jquery.js',
    'Public/scripts/vendor/knockout.js',
    'Public/scripts/vendor/underscore.js',
    'Public/scripts/vendor/pager.js',
    'Public/scripts/vendor/postal.js',
    'Public/scripts/app.js',

    { pattern: 'Public/script/**/*.js', included: false },
    { pattern: 'Public/test/**/*Tests.js', included: false },

    'Public/test/test-main.js'
];


// list of files to exclude
exclude = [
    'Public/script/main.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
