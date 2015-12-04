"use strict";

const gulp = require('gulp');
const ts = require('gulp-typescript');
const shell = require('gulp-shell');
const mocha = require('gulp-mocha');
const merge = require('merge2');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const Server = require('karma').Server;

gulp.task('default', ['build_commonjs', 'build_commonjs_tests', 'watch']);

gulp.task('package', ['build_commonjs', 'build_commonjs_tests', 'build_amd', 'doc', 'test', 'karma']);

// Run karma tests only one time
gulp.task('karma', function (done) {
  new Server({
	  configFile: __dirname + '/karma.conf.js',
	  singleRun: true
	}, done).start();
});

// Create JSDoc documentation
gulp.task('doc', shell.task([
  './node_modules/.bin/jsdoc build/ibantools.js -d docs -r README.md'
]));

// Compile typescript sources - commonjs
gulp.task('build_commonjs', function() {
  let build_result = gulp.src(['src/**/*.ts'])
        .pipe(ts({module: 'commonjs',
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

// Compile typescript sources - amd
gulp.task('build_amd', function() {
  let build_result = gulp.src(['src/**/*.ts'])
        .pipe(ts({module: 'amd',
                  target: 'ES5',
                  declaration: true}));
  return merge([build_result.dts
								.pipe(rename("ibantools.d.ts"))
								.pipe(gulp.dest('./dist')),
                build_result.js
								.pipe(uglify({preserveComments: "license"}))
								.pipe(rename("ibantools.js"))
								.pipe(gulp.dest('./dist'))]);
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
  gulp.watch('./test/**/*.ts', ['build_commonjs','build_commonjs_tests']);
});