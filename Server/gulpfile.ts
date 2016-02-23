/**
 * Created by Administrator on 2/13/2016.
 */
/// <reference path='./typings/tsd.d.ts' />
let gulp = require('gulp');
let ts = require('gulp-typescript');
let rimraf = require('gulp-rimraf');
let nodemon = require('gulp-nodemon');

gulp.task('clearBuildDir', function(){
    return gulp.src('build').pipe(rimraf());
});

gulp.task('buildServer' ,['clearBuildDir'], function () {
    var tScriptResult = gulp.src('src/**/*.ts')
        .pipe(ts({module: 'CommonJS'}));
    return tScriptResult.js.pipe(gulp.dest('build/'));
});

gulp.task('nodemon', ['buildServer','watchYou'], function(){
    nodemon({
        script: './build/app.js'

    }).on('restart', function(){
        console.log('nodemon restarted server.js');
    })
});
gulp.task('watchYou', function() {
    gulp.watch('src/**/*.ts', ['buildServer']);
});
gulp.task('default', ['watchYou']);