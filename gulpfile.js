var gulp = require('gulp');
var ts = require('gulp-typescript');
var shell = require('gulp-shell');

gulp.task('default', ['ts', 'tts', 'watch']);

gulp.task('doc', shell.task([
	'./node_modules/.bin/jsdoc src/IBANTools.js -d docs -r README.md'
]));


// Compile typescript sources
gulp.task('ts', function() {
  gulp.src(['src/**/*.ts'])
    .pipe(ts({module: 'commonjs'}))
    .js
    .pipe(gulp.dest('./src'));
});

// Compile typescript tests
gulp.task('tts', function() {
  gulp.src(['test/**/*.ts'])
    .pipe(ts({module: 'commonjs'}))
    .js
    .pipe(gulp.dest('./test'));
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.ts', ['ts']);
  gulp.watch('./test/**/*.ts', ['tts']);
});