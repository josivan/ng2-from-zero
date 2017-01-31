'use strict';

const
  gulp  = require('gulp'),
  browserify  = require('browserify'),
  tsify       = require('tsify'),
  source      = require('vinyl-source-stream'),
  ts    = require('gulp-typescript'),
  babelify = require('babelify'),
  babel = require('gulp-babel');

gulp.task('ts-babel', () => {
  var tsProject = ts.createProject(__dirname + "/tsconfig.json");
  var tsResult = gulp.src("src/**/*.ts").pipe(tsProject());
  return tsResult.js.pipe(gulp.dest("release"));
});

gulp.task('default', () => {
  return browserify({
      basedir: '.',
      debug: true,
      entries: [
        'src/app/app.component.ts',
        'src/app/app.module.ts',
        'src/app/main.ts'
      ],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
});