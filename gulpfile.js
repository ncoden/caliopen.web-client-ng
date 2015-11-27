var gulp = require('gulp');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var gulpSequence = require('gulp-sequence');
var sass = require('gulp-sass');
var conventionalChangelog = require('gulp-conventional-changelog');
var path = require('path');
var del = require('del');

var config = {
  publicDirectory: 'dist',
  publicJsDirectory: 'dist/js',
  publicStylesDirectory: 'dist/css',
  systemBuildDirectory: 'tmp',
  jsSource: 'src/js/app.js',
  jsSourceFiles: 'src/**/*.js',
  htmlSource: 'src/index.html',
  sassSource: 'src/styles/main.scss',
  sassSourceFiles: 'src/styles/**/*.scss',
  vendorFiles: [
    './node_modules/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js'
  ],
  assetsSource: 'src/assets/**/*',
  appDestFilename: 'app.js',
  // cssDestFilename: 'app.css',
  vendorDestFilename: 'vendor.js'
};

gulp.task('build:vendor', function() {
  return gulp.src(config.vendorFiles)
    .pipe(concat(config.vendorDestFilename))
    .pipe(gulp.dest(config.publicJsDirectory));
});

gulp.task('build:assets', ['build:assetsIndex', 'build:assetsFiles']);

gulp.task('build:assetsIndex', function() {
  return gulp.src(config.htmlSource)
    .pipe(gulp.dest(config.publicDirectory));
});

gulp.task('build:assetsFiles', function() {
  return gulp.src(config.assetsSource)
    .pipe(gulp.dest(config.publicDirectory));
});

gulp.task('build:sass', function () {
  gulp.src(config.sassSource)
    .pipe(sass()) //.on('error', sass.logError))
    .pipe(gulp.dest(config.publicStylesDirectory));
});

gulp.task('build:js', function() {
  return gulp.src(config.jsSource)
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
          }
        ]
      },
      output: {
        filename: config.appDestFilename,
      },
    }))
    .pipe(gulp.dest(config.publicJsDirectory));
});

gulp.task('clean', function() {
  return del(config.publicDirectory);
});


gulp.task('watch', function() {
  gulp.watch(config.jsSourceFiles, ['build:js']);
  gulp.watch(config.sassSourceFiles, ['build:sass']);
  gulp.watch(config.htmlSource, ['build:assetsIndex']);
  gulp.watch(config.assetsSource, ['build:assetsFiles']);
  gulp.watch(config.vendorFiles, ['build:vendor']);
});

gulp.task('release:changelog', function() {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('release', ['release:changelog']);
gulp.task('build', gulpSequence('clean', ['build:assets', 'build:vendor', 'build:sass', 'build:js']));
gulp.task('default', ['build']);
