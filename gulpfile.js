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
  sassMainFile: 'main.scss',
  sassSourceFiles: [
    './src/styles/**/*.scss',
    './node_modules/bootstrap-sass/assets/stylesheets/**/*.scss',
    './node_modules/font-awesome/scss/**/*.scss',
  ],
  vendorFiles: [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/angular/angular.js',
    './node_modules/angular-sanitize/angular-sanitize.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './node_modules/angular-translate/dist/angular-translate.js',
    './node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
    './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
  ],
  assetsSource: [
    './src/assets/**/*',
    './node_modules/bootstrap-sass/assets/@(fonts)/**/*',
    './node_modules/font-awesome/@(fonts)/**/*',
  ],
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

gulp.task('build:sass', gulpSequence('build:sassPrepare', 'build:sassCompile', 'build:sassClean'));
gulp.task('build:sassPrepare', function () {
  return gulp.src(config.sassSourceFiles)
    .pipe(gulp.dest('tmp'));
});
gulp.task('build:sassCompile', function () {
    return gulp.src('tmp/' + config.sassMainFile)
      .pipe(sass())
      .pipe(gulp.dest(config.publicStylesDirectory));
});
gulp.task('build:sassClean', function() {
  del('tmp');
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
