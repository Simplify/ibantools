"use strict";

const gulp = require('gulp');
const ts = require('gulp-typescript');
const shell = require('gulp-shell');
const mocha = require('gulp-mocha');
const merge = require('merge2');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const Server = require('karma').Server;

gulp.task('default', ['build', 'build_tests', 'watch']);

// Run karma tests only one time
gulp.task('karma', function (done) {
  new Server({
	  configFile: __dirname + '/karma.conf.js',
	  singleRun: true
	}, done).start();
});

// Create JSDoc documentation
gulp.task('doc', shell.task([
  './node_modules/.bin/jsdoc dist/ibantools.js -d docs -r README.md'
]));

// Compile typescript sources - for bower, no uglifier
gulp.task('build_bower', function() {
  let build_result = gulp.src(['src/**/*.ts'])
        .pipe(ts({module: 'umd',
                  target: 'ES5',
                  declaration: true}));
  return merge([build_result.dts
								.pipe(rename("ibantools.d.ts"))
								.pipe(gulp.dest('./dist')),
                build_result.js
								.pipe(rename("ibantools.js"))
								.pipe(gulp.dest('./dist'))]);
});

// Compile typescript sources - umd
gulp.task('build', function() {
  let build_result = gulp.src(['src/**/*.ts'])
        .pipe(ts({module: 'umd',
                  target: 'ES5',
                  declaration: true}));
  return merge([build_result.dts
								.pipe(rename("ibantools.d.ts"))
								.pipe(gulp.dest('./build')),
                build_result.js
								.pipe(uglify({preserveComments: "license"}))
								.pipe(rename("ibantools.js"))
								.pipe(gulp.dest('./build'))]);
});

// Compile typescript tests
gulp.task('build_tests', function() {
  gulp.src(['test/**/*.ts'])
    .pipe(ts({module: 'umd',
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
  gulp.watch('./src/**/*.ts', ['build','build_tests']);
  gulp.watch('./test/**/*.ts', ['build','build_tests']);
});