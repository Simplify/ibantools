var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', ['ts', 'tts', 'watch']);

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