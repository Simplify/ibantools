"use strict";

const gulp = require('gulp');
const ts = require('gulp-typescript');
const shell = require('gulp-shell');
const mocha = require('gulp-mocha');
const merge = require('merge2');

gulp.task('default', ['build_commonjs', 'build_commonjs_tests', 'watch']);

gulp.task('package', ['definition', 'doc']);

// Create JSDoc documentation
gulp.task('doc', shell.task([
  './node_modules/.bin/jsdoc src/IBANTools.js -d docs -r README.md'
]));

// Compile typescript sources
gulp.task('build_commonjs', function() {
  let build_result = gulp.src(['src/**/*.ts'])
        .pipe(ts({module: 'commonjs',
                  target: 'ES5',
                  declaration: true}));
  return merge([build_result.dts.pipe(gulp.dest('./dist')),
                build_result.js.pipe(gulp.dest('./src'))]);
});

// Compile typescript tests
gulp.task('build_commonjs_tests', function() {
  gulp.src(['test/**/*.ts'])
    .pipe(ts({module: 'commonjs',
							target: 'ES5'}))
    .js
    .pipe(gulp.dest('./test'));
});

// Run tests
gulp.task('test', function() {
  return gulp.src(['test/**/*.js'], {read: false})
    .pipe(mocha());
});

// Watch for changes
gulp.task('watch', function() {
  gulp.watch('./src/**/*.ts', ['build_commonjs','build_commonjs_tests']);
  gulp.watch('./test/**/*.ts', ['build_commonjs_tests','build_commonjs']);
});