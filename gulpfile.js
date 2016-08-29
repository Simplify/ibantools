"use strict";

const gulp = require('gulp');
const ts = require('gulp-typescript');
const shell = require('gulp-shell');
const mocha = require('gulp-mocha');
const merge = require('merge2');
const rename = require('gulp-rename');
const Server = require('karma').Server;
const runSequence = require('run-sequence');

gulp.task('default', ['watch']);

// All build tasks and create documentation
gulp.task('all', function(callback) {
	runSequence('build',
							'build-tests',
							'build-bower',
              'build-es6',
							'doc',
							callback);
});

// all build tasks, documentation and all tests
gulp.task('all-with-tests', function(callback) {
	runSequence('all',
							'test',
							'karma',
							'coverage',
							callback);
});

// Build and run tests
gulp.task('test-it', function(callback) {
	runSequence('build',
							'build-tests',
							'test',
							callback);
});

// Build from source, build tests and run coverage task
gulp.task('coverage', function(callback) {
	runSequence('build',
							'build-tests',
							'istanbul',
							callback);
});

// Run karma tests only one time
gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// generate coverage report
gulp.task('istanbul', shell.task([
  'istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage'
]));

// Create JSDoc documentation
gulp.task('doc', shell.task([
  './node_modules/.bin/jsdoc dist/ibantools.js -d docs -r README.md'
]));

// Compile typescript sources - for bower - amd
gulp.task('build-bower', function() {
  let build_result = gulp.src(['src/**/*.ts'])
        .pipe(ts({module: 'amd',
                  target: 'ES5',
                  declaration: true}));
  return merge([build_result.dts
                .pipe(rename("ibantools.d.ts"))
                .pipe(gulp.dest('./dist')),
                build_result.js
                .pipe(rename("ibantools.js"))
                .pipe(gulp.dest('./dist'))]);
});

// Compile typescript sources - node package - commonjs es5
gulp.task('build', function() {
  let build_result = gulp.src(['src/**/*.ts'])
        .pipe(ts({module: 'commonjs',
                  target: 'ES5',
                  declaration: true}));
  return merge([build_result.dts
                .pipe(rename("ibantools.d.ts"))
                .pipe(gulp.dest('./build')),
                build_result.js
                .pipe(rename("ibantools.js"))
                .pipe(gulp.dest('./build'))]);
});

// compile es6 module - both bower and node, for "jsnext"
gulp.task('build-es6', function() {
  return gulp.src(['src/**/*.ts'])
        .pipe(ts({module: 'es6',
                  target: 'ES6'}))
        .js
        .pipe(rename("ibantools.js"))
        .pipe(gulp.dest('./es6'));
});

// Compile typescript tests, umd, I'll run tests from node and "browser"
gulp.task('build-tests', function() {
  return gulp.src(['test/**/*.ts'])
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
  gulp.watch('./src/**/*.ts', ['test-it']);
  gulp.watch('./test/**/*.ts', ['test-it']);
});
