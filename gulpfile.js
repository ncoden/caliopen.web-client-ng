// -------------------------------------
//   Gulpfile
// -------------------------------------
// 
//   'build' (default)  : create JS application with its css and assets
//   'release'          : generate Changelog
//   'watch'            : watch for source changes to compile them
// 
// -------------------------------------

// --- Configuration ---

var config = {
  srcDirectory: 'src',
  buildDirectory: '.build',
  destDirectory: 'dist',

  htmlMain: 'src/index.html',
  jsMain: 'src/js/app.js',
  jsFiles: 'src/js/**/*.js',
  scssMain: 'src/styles/main.scss',
  scssFiles: [
    'src/styles/**/*.scss',
    '.build/icons/**/*.scss',
  ],

  iconsFiles: 'src/assets/icons/**/*.svg',
  assetsFiles: [
    './src/assets/@(fonts)/**/*',
    './src/assets/@(images)/**/*',
    './src/assets/@(translations)/**/*',
  ],

  scssVendorsNamespace: 'vendor',
  scssVendors: [
    './node_modules/bootstrap-sass/assets/stylesheets/**/*.scss',
    './node_modules/font-awesome/scss/**/*.scss',
  ],
  assetsVendorsNamespace: '',
  assetsVendors: [
    './node_modules/bootstrap-sass/assets/@(fonts)/**/*',
    './node_modules/font-awesome/@(fonts)/**/*',
  ],

  jsDestFile: 'dist/js/app.js',
  cssDestFile: 'dist/css/main.css',
  assetsDest: 'dist',
  fontsDest: 'dist/fonts',

  clientCssFontsPath: '../fonts',
};

var iconfontConfig = {
  iconsFontName: 'co-icons',
  iconsCssClass: 'co-icon',
};


// --- Dependencies ---

// gulp and tasks
var gulp = require('gulp');
var gulpPlumber = require('gulp-plumber');
var gulpSequence = require('gulp-sequence');

// file management
var del = require('del');
var pathParse = require('path-parse');
var rename = require("gulp-rename");

// build (JS)
var eslint = require('gulp-eslint');
var ngAnnotate = require('gulp-ng-annotate');
var webpack = require('gulp-webpack');
// build (scss)
var sass = require('gulp-sass');
// build (assets)
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

// release
var conventionalChangelog = require('gulp-conventional-changelog');


// --- Tasks ---

gulp.task('default', ['build']);

gulp.task('build', gulpSequence('clean', 'build:assets', ['build:scss', 'build:js']));
gulp.task('release', ['release:changelog']);

// config
var onError = function (err) {
  console.error(err);
  this.emit('end');
};
var runTimestamp = Math.round(Date.now()/1000);

// Build
gulp.task('build:assets', function(cb) {
  gulpSequence(['build:assetsVendors', 'build:assetsIndex', 'build:assetsIcons', 'build:assetsFiles'], cb);
});
gulp.task('build:assetsVendors', function() {
  return gulp.src(config.assetsVendors)
    .pipe(gulp.dest(config.assetsDest + '/' + config.assetsVendorsNamespace));
});
gulp.task('build:assetsIndex', function() {
  return gulp.src(config.htmlMain)
    .pipe(gulp.dest(config.destDirectory));
});
gulp.task('build:assetsIcons', function () {
  return gulp.src(config.iconsFiles)
    .pipe(iconfontCss({
      cssClass: iconfontConfig.iconsCssClass,
      fontName: iconfontConfig.iconsFontName,
      fontPath: config.clientCssFontsPath + '/' + iconfontConfig.iconsFontName + '/',
      targetPath: '../../../' + config.buildDirectory + '/icons/' + iconfontConfig.iconsFontName + '.scss'
    }))
    .pipe(iconfont({
      fontName: iconfontConfig.iconsFontName,
      formats: ['ttf', 'eot', 'svg', 'woff', 'woff2'],
      timestamp: runTimestamp, // recommended to get consistent builds when watching files 
    }))
    .pipe(gulp.dest(config.fontsDest + '/' + iconfontConfig.iconsFontName));
});
gulp.task('build:assetsFiles', function() {
  return gulp.src(config.assetsFiles)
    .pipe(gulp.dest(config.assetsDest));
});

gulp.task('build:scss', function(cb) {
  gulpSequence('build:scssVendors', 'build:scssPrepare', 'build:scssCompile', 'build:scssClean', cb);
});
gulp.task('build:scssVendors', function () {
  return gulp.src(config.scssVendors)
    .pipe(gulp.dest(config.buildDirectory + '/scss/' + config.scssVendorsNamespace));
});
gulp.task('build:scssPrepare', function () {
  return gulp.src(config.scssFiles)
    .pipe(gulp.dest(config.buildDirectory + '/scss'));
});
gulp.task('build:scssCompile', function () {
  var srcPath = pathParse(config.scssMain);
  var destPath = pathParse(config.cssDestFile);

  return gulp.src(config.buildDirectory + '/scss/' + srcPath.base)
    .pipe(gulpPlumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(rename(destPath.base))
    .pipe(gulp.dest(destPath.dir));
});
gulp.task('build:scssClean', function() {
  del(config.buildDirectory + '/scss');
});

gulp.task('build:js', ['lint'], function() {
  var path = pathParse(config.jsDestFile);

  return gulp.src(config.jsMain)
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
        filename: path.base
      }
    }))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(path.dir));
});

gulp.task('lint', function () {
  return gulp.src(config.jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', function() {
  return del(config.destDirectory + '/*')
      && del(config.buildDirectory);
});

// Release
gulp.task('release:changelog', function() {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

// Development
gulp.task('watch', function() {
  gulp.watch(config.htmlMain, ['build:assetsIndex']);
  gulp.watch(config.assetsFiles, ['build:assetsFiles']);
  gulp.watch(config.iconsFiles, ['build:assetsIcons', 'build:scss']);
  gulp.watch(config.scssFiles, ['build:scss']);
  gulp.watch(config.jsFiles, ['build:js']);
});
