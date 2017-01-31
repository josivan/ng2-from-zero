'use strict';

const
  gulp  = require('gulp'),
  browserify  = require('browserify'),
  tsify       = require('tsify'),
  source      = require('vinyl-source-stream'),
  ts    = require('gulp-typescript'),
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
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
});