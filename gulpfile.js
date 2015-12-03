var gulp = require('gulp');
var ts = require('gulp-typescript');
var shell = require('gulp-shell');
const mocha = require('gulp-mocha');

gulp.task('default', ['ts', 'tts', 'watch']);

gulp.task('package', ['definition', 'doc']);

// Create JSDoc documentation
gulp.task('doc', shell.task([
	'./node_modules/.bin/jsdoc src/IBANTools.js -d docs -r README.md'
]));

// Create TypeScript definition file
gulp.task('definition', shell.task([
	'tsc --declaration src/IBANTools.ts --module commonjs --outFile ./dist/ibantools.d.ts',
	'rm ./src/IBANTools.d.ts'
]));

// Compile typescript sources
gulp.task('ts', function() {
  gulp.src(['src/**/*.ts'])
    .pipe(ts({module: 'commonjs', target: 'ES5'}))
    .js
    .pipe(gulp.dest('./src'));
});

// Compile typescript tests
gulp.task('tts', function() {
  gulp.src(['test/**/*.ts'])
    .pipe(ts({module: 'commonjs', target: 'ES5'}))
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
  gulp.watch('./src/**/*.ts', ['ts','tts']);
  gulp.watch('./test/**/*.ts', ['tts','ts']);
});