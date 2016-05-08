var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    phplint = require('phplint').lint,
    phpunit = require('gulp-phpunit'),
    phpcs = require('gulp-phpcs'),
    shell = require('gulp-shell');

var config = {
    vendorBin: 'vendor/bin/',
    phpDir: 'php',
    docDir: 'docs',
    phpdocDir: 'docs/phpdoc',
    pdependDocDir: 'docs/pdepend'
};

/**
 * Checks for PHP syntax errors
 */
gulp.task('phplint', function () {
    return phplint([config.phpDir + '/**/*.php'], {limit: 10}, function(){});
});

/**
 * Runs Code Sniffer over the PHP files
 */
gulp.task('phpcs', function () {
    return gulp.src(config.phpDir + '/**/*.php')
        .pipe(phpcs({
            bin: config.vendorBin + 'phpcs',
            standard: 'PSR2',
            warningSeverity: 0
        }))
        .pipe(phpcs.reporter('log'));
});

/**
 * Beatifies the code according to PSR-2
 */
gulp.task('phpcbf', shell.task([config.vendorBin + 'phpcbf --standard=PSR2 ' + config.phpDir]));

/**
 * Runs PHP mess detector
 */
gulp.task('phpmd', shell.task([
	'mkdir -p ' + config.docDir,
	config.vendorBin + 'phpmd ' + config.phpDir + ' html codesize,unusedcode,naming,design,cleancode,controversial --reportfile ' + config.docDir + '/phpmd.html --suffixes ' + config.phpDir
]));

/**
 * Runs pdepend to gain information about metrics
 */
gulp.task('pdepend', shell.task([
    'mkdir -p ' + config.pdependDocDir,
    config.vendorBin + 'pdepend --summary-xml=' + config.pdependDocDir + '/summary.xml --jdepend-chart=' + config.pdependDocDir + '/chart.svg --overview-pyramid=' + config.pdependDocDir + '/pyramid.svg --suffix=php ' + config.phpDir
]));

/**
 * Finds duplicate code
 */
gulp.task('phpcpd', shell.task([config.vendorBin + 'phpcpd ' + config.phpDir]));

/**
 * Generates a metrics report as HTML file
 */
gulp.task('phpmetrics', shell.task([
	'mkdir -p ' + config.docDir,
	config.vendorBin + 'phpmetrics --report-html=' + config.docDir + '/metrics.html ' + config.phpDir
]));

/**
 * Runs PHPUnit to execute unit tests
 */
gulp.task('phpunit', function() {
    return gulp.src('phpunit.xml')
        .pipe(phpunit(config.vendorBin + 'phpunit'))
        .on('error', function(){console.error('The tests failed')});
});

/**
 * Runs an API generator
 */
gulp.task('phpdoc', shell.task([config.vendorBin + 'phpdoc -d ' + config.phpDir + ' -t ' + config.phpdocDir]));

/**
 * Watches PHP files for changes and runs according tasks
 */
gulp.task('watch', function () {
    gulp.watch([config.phpDir + '/**/*.php'], function(){
        runSequence('phplint', 'phpcs', 'phpunit', 'phpmd', 'phpcpd')
    });
});

/**
 * Runs a selection of tasks
 */
gulp.task('default', function(callback) {
    runSequence('phplint', 'phpcs', 'phpcbf', 'phpunit', 'phpmd', 'phpcpd', callback);
});