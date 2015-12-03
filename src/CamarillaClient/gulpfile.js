/**
 *  This file in the main entry point for defining Gulp tasks and using Gulp plugins.
 *  Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file);
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
    // place code for your default task here
    gulp.start('build');
});