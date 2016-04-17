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

gulp.task('phplint', function () {
    return phplint([config.phpDir + '/**/*.php'], {limit: 10}, function(){});
});

gulp.task('phpcs', function () {
    return gulp.src(config.phpDir + '/**/*.php')
        .pipe(phpcs({
            bin: config.vendorBin + 'phpcs',
            standard: 'PSR2',
            warningSeverity: 0
        }))
        .pipe(phpcs.reporter('log'));
});

gulp.task('phpcbf', shell.task([config.vendorBin + 'phpcbf --standard=PSR2 ' + config.phpDir]));

gulp.task('phpmd', shell.task([config.vendorBin + 'phpmd ' + config.phpDir + ' html codesize,unusedcode,naming,design,cleancode,controversial --reportfile ' + config.docDir + '/phpmd.html --suffixes ' + config.phpDir]));

gulp.task('pdepend', shell.task([
    'mkdir -p ' + config.pdependDocDir,
    config.vendorBin + 'pdepend --summary-xml=' + config.pdependDocDir + '/summary.xml --jdepend-chart=' + config.pdependDocDir + '/chart.svg --overview-pyramid=' + config.pdependDocDir + '/pyramid.svg --suffix=php ' + config.phpDir
]));

gulp.task('phpcpd', shell.task([config.vendorBin + 'phpcpd ' + config.phpDir]));

gulp.task('phpunit', function() {
    return gulp.src('phpunit.xml')
        .pipe(phpunit(config.vendorBin + 'phpunit'))
        .on('error', function(){console.error('The tests failed')});
});

gulp.task('phpdoc', shell.task([config.vendorBin + 'phpdoc -d ' + config.phpDir + ' -t ' + config.phpdocDir]));

gulp.task('watch', function () {
    gulp.watch([config.phpDir + '/**/*.php'], function(){
        runSequence('phplint', 'phpcs', 'phpunit', 'phpmd', 'phpcpd')
    });
});

gulp.task('default', function() {
    runSequence('phplint', 'phpcs', 'phpcbf', 'phpunit', 'phpmd', 'phpcpd');
});