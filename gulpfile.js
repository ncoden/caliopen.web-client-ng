var gulp = require('gulp');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var gulpSequence = require('gulp-sequence');
var gulpPlumber = require('gulp-plumber');
var sass = require('gulp-sass');
var conventionalChangelog = require('gulp-conventional-changelog');
var ngAnnotate = require('gulp-ng-annotate');
var eslint = require('gulp-eslint');
var path = require('path');
var del = require('del');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var config = {
  publicDirectory: 'dist',
  publicJsDirectory: 'dist/js',
  publicStylesDirectory: 'dist/css',
  publicFontsDirectory: 'dist/fonts',
  systemBuildDirectory: '.build',
  jsSource: 'src/js/app.js',
  jsSourceFiles: 'src/**/*.js',
  htmlSource: 'src/index.html',
  sassMainFile: 'main.scss',
  sassSourceFiles: [
    './.build/icons/**/*.scss',
    './src/styles/**/*.scss',
    './node_modules/bootstrap-sass/assets/stylesheets/**/*.scss',
    './node_modules/font-awesome/scss/**/*.scss',
  ],
  vendorFiles: [
  ],
  assetsSource: [
    './src/assets/@(fonts)/**/*',
    './src/assets/@(images)/**/*',
    './src/assets/@(translations)/**/*',
    './node_modules/bootstrap-sass/assets/@(fonts)/**/*',
    './node_modules/font-awesome/@(fonts)/**/*',
  ],
  iconsFontName: 'co_icons',
  iconsSource: './src/assets/icons/**/*.svg',
  iconsCssClass: 'co-icon',
  iconsCssDestFilename: '_co-icons.scss',
  appDestFilename: 'app.js',
  vendorDestFilename: 'vendor.js'
};

var runTimestamp = Math.round(Date.now()/1000);

// Prevent watch end
var onError = function (err) {
  console.error(err);
  this.emit('end');
};

gulp.task('build:vendor', function() {
  return gulp.src(config.vendorFiles)
    .pipe(concat(config.vendorDestFilename))
    .pipe(gulp.dest(config.publicJsDirectory));
});

gulp.task('build:assets', function(cb) {
  gulpSequence(['build:assetsIndex', 'build:assetsIcons', 'build:assetsFiles'], cb);
});
gulp.task('build:assetsIndex', function() {
  return gulp.src(config.htmlSource)
    .pipe(gulp.dest(config.publicDirectory));
});
gulp.task('build:assetsIcons', function () {
  return gulp.src(config.iconsSource)
    .pipe(iconfontCss({
      cssClass: config.iconsCssClass,
      fontName: config.iconsFontName,
      fontPath: '../fonts/' + config.iconsFontName + '/',
      targetPath: '../../../' + config.systemBuildDirectory + '/icons/' + config.iconsCssDestFilename
    }))
    .pipe(iconfont({
      fontName: config.iconsFontName,
      formats: ['ttf', 'eot', 'svg', 'woff', 'woff2'],
      timestamp: runTimestamp, // recommended to get consistent builds when watching files 
    }))
    .pipe(gulp.dest(config.publicFontsDirectory + '/' + config.iconsFontName));
});
gulp.task('build:assetsFiles', function() {
  return gulp.src(config.assetsSource)
    .pipe(gulp.dest(config.publicDirectory));
});

gulp.task('build:sass', function(cb) {
  gulpSequence('build:sassPrepare', 'build:sassCompile', 'build:sassClean', cb);
});
gulp.task('build:sassPrepare', function () {
  return gulp.src(config.sassSourceFiles)
    .pipe(gulp.dest(config.systemBuildDirectory + '/sass'));
});
gulp.task('build:sassCompile', function () {
    return gulp.src(config.systemBuildDirectory + '/sass/' + config.sassMainFile)
      .pipe(gulpPlumber({ errorHandler: onError }))
      .pipe(sass())
      .pipe(gulp.dest(config.publicStylesDirectory));
});
gulp.task('build:sassClean', function() {
  del(config.systemBuildDirectory + '/sass');
});

gulp.task('build:js', ['lint'], function() {
  return gulp.src(config.jsSource)
    .pipe(webpack({
      module: {
        loaders: [
          { test: /jquery\.js$/, loader: 'expose?jQuery' },
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel'] // 'babel-loader' is also a legal name to reference
          },
        ]
      },
      output: {
        filename: config.appDestFilename,
      }
    }))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(config.publicJsDirectory));
});

gulp.task('clean', function() {
  return del(config.publicDirectory + '/*')
      && del(config.systemBuildDirectory);
});

gulp.task('lint', function () {
  return gulp.src(config.jsSourceFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  gulp.watch(config.htmlSource, ['build:assetsIndex']);
  gulp.watch(config.assetsSource, ['build:assetsFiles']);
  gulp.watch(config.iconsSource, ['build:assetsIcons', 'build:sass']);
  gulp.watch(config.vendorFiles, ['build:vendor']);
  gulp.watch(config.sassSourceFiles, ['build:sass']);
  gulp.watch(config.jsSourceFiles, ['build:js']);
});

gulp.task('release:changelog', function() {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('release', ['release:changelog']);
gulp.task('build', gulpSequence('clean', 'build:assets', ['build:vendor', 'build:sass', 'build:js']));
gulp.task('default', ['build']);
