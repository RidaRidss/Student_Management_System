/**
 * Created by Administrator on 2/13/2016.
 */
/// <reference path='./typings/tsd.d.ts' />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
var PATHS = {
    src: 'src/**/*.ts'
};
gulp.task('clearBuildDir', function () {
    return gulp.src('build').pipe(rimraf());
});
gulp.task('buildServer', ['clearBuildDir'], function () {
     var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');
    var tScriptResult = gulp .src(PATHS.src)
        .pipe(typescript(tscConfig.compilerOptions));
    return tScriptResult.js.pipe(gulp.dest('build/'));
});
gulp.task('nodemon', ['buildServer', 'watchYou'], function () {
    nodemon({
        script: './build/app.js'
    }).on('restart', function () {
        console.log('nodemon restarted server.js');
    });
});
gulp.task('watchYou', function () {
    gulp.watch('src/**/*.ts', ['buildServer']);
});
gulp.task('default', ['watchYou']);
//# sourceMappingURL=gulpfile.js.map
