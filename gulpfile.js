const gulp    = require('gulp')
const jasmine = require('gulp-jasmine')
const uglify  = require('gulp-uglify')
const pump    = require('pump')
const rename  = require('gulp-rename')
const guppy   = require('git-guppy')(gulp)

// https://www.npmjs.com/package/gulp-jasmine
gulp.task('tests', () => {
  gulp.src('tests/core.test.js')
    // gulp-jasmine works on filepaths so you can't have any plugins before it
    .pipe(jasmine({
        verbose     : true,
        errorOnFail : true
    }))
})

gulp.task('build', [ 'tests' ], (cb) => {
  pump([
    gulp.src('src/*.js'),
    uglify(),
    rename('is.js'),
    gulp.dest('dist')
  ],
  cb)
})

gulp.task('pre-commit', [ 'build' ]);