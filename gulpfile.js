// -------------------------------------
//   Gulpfile
// -------------------------------------
//
//   'build' (default)  : create JS application with its css and assets
//   'release'          : generate Changelog
//   'watch'            : watch for source changes to compile them
//
// -------------------------------------

/* eslint-disable no-console*/

// --- Configuration ---

const config = {
  srcDirectory: 'src',
  buildDirectory: '.build',
  destDirectory: 'dist',

  htmlMain: 'src/index.html',
  htmlMainTest: 'test/functional/index.html',
  jsMain: 'src/js/app.js',
  jsMainTest: 'test/functional/app_test.js',
  jsFiles: 'src/js/**/*.js',
  scssMain: 'src/styles/main.scss',
  scssFiles: [
    'src/styles/**/*.scss',
  ],

  iconsFiles: 'src/assets/icons/**/*.svg',
  assetsFiles: [
    './src/assets/@(fonts)/**/*',
    './src/assets/@(images)/**/*',
    './src/assets/@(translations)/**/*',
  ],

  scssVendorsNamespace: '',
  scssVendors: [
    '.build/icons/**/*.scss',
    './node_modules/@(compass-mixins)/lib/**/*.scss',
    './node_modules/@(font-awesome)/scss/**/*.scss',
    './node_modules/@(foundation-sites)/scss/**/*.scss',
  ],
  cssVendors: [
    './node_modules/angular-loading-bar/src/loading-bar.css',
    './node_modules/ui-select/dist/select.css',
  ],
  assetsVendorsNamespace: '',
  assetsVendors: [
    './node_modules/font-awesome/@(fonts)/**/*',
  ],

  jsDestFile: 'dist/js/app.js',
  cssDestFile: 'dist/css/main.css',
  cssVendorDestFile: 'dist/css/vendor.css',
  assetsDest: 'dist',
  fontsDest: 'dist/fonts',

  clientCssFontsPath: '../fonts',
};

const iconfontConfig = {
  iconsFontName: 'co-icons',
  iconsCssClass: 'm-icon',
};

const isTestEnv = (process.env.NODE_ENV === 'test');


// --- Dependencies ---

// gulp and tasks
const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpSequence = require('gulp-sequence');
const gulpConcat = require('gulp-concat');

// file management
const pathParse = require('path-parse');
const del = require('del');
const rename = require('gulp-rename');

// build (JS)
const eslint = require('gulp-eslint');
const ngAnnotate = require('gulp-ng-annotate');
const webpack = require('gulp-webpack');
// build (scss)
const sassLint = require('gulp-sass-lint');
const sass = require('gulp-sass');
// build (assets)
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');

// release
const conventionalChangelog = require('gulp-conventional-changelog');


// --- Tasks ---

gulp.task('default', ['build']);

gulp.task('build', gulpSequence(
  'clean',
  'build:assets',
  ['build:scss', 'build:cssVendor', 'build:js']));

gulp.task('lint', ['lint:scss', 'lint:js']);
gulp.task('release', ['release:changelog']);

// config
const onError = (err) => {
  console.error(err);
  this.emit('end');
};
const runTimestamp = Math.round(Date.now() / 1000);

// Build
gulp.task('build:assets', (cb) => {
  gulpSequence(
    ['build:assetsVendors', 'build:assetsIndex', 'build:assetsIcons', 'build:assetsFiles'],
    cb);
});

gulp.task('build:assetsVendors', () =>
  gulp.src(config.assetsVendors)
    .pipe(gulp.dest(`${config.assetsDest}/${config.assetsVendorsNamespace}`)));

gulp.task('build:assetsIndex', () => {
  const htmlMain = (!isTestEnv) ? config.htmlMain : config.htmlMainTest;

  return gulp.src(htmlMain)
    .pipe(gulp.dest(config.destDirectory));
});

gulp.task('build:assetsIcons', () =>
  gulp.src(config.iconsFiles)
    .pipe(iconfontCss({
      cssClass: iconfontConfig.iconsCssClass,
      fontName: iconfontConfig.iconsFontName,
      fontPath: `${config.clientCssFontsPath}/${iconfontConfig.iconsFontName}/`,
      targetPath: `../../../${config.buildDirectory}/icons/${iconfontConfig.iconsFontName}.scss`,
    }))
    .pipe(iconfont({
      fontName: iconfontConfig.iconsFontName,
      formats: ['ttf', 'eot', 'svg', 'woff', 'woff2'],
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
    .pipe(gulp.dest(`${config.fontsDest}/${iconfontConfig.iconsFontName}`)));

gulp.task('build:assetsFiles', () =>
  gulp.src(config.assetsFiles)
    .pipe(gulp.dest(config.assetsDest)));

gulp.task('build:scss', ['lint:scss'], (cb) => {
  gulpSequence(
    'build:scssVendors',
    'build:scssPrepare',
    'build:scssCompile',
    'build:scssClean',
    cb);
});

gulp.task('build:scssVendors', () =>
  gulp.src(config.scssVendors)
    .pipe(gulp.dest(`${config.buildDirectory}/scss/${config.scssVendorsNamespace}`)));

gulp.task('build:scssPrepare', () =>
  gulp.src(config.scssFiles)
    .pipe(gulp.dest(`${config.buildDirectory}/scss`)));

gulp.task('build:scssCompile', () => {
  const srcPath = pathParse(config.scssMain);
  const destPath = pathParse(config.cssDestFile);

  return gulp.src(`${config.buildDirectory}/scss/${srcPath.base}`)
    .pipe(gulpPlumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(rename(destPath.base))
    .pipe(gulp.dest(destPath.dir));
});

gulp.task('build:scssClean', () => {
  del(`${config.buildDirectory}/scss`);
});

gulp.task('build:cssVendor', () => {
  const destPath = pathParse(config.cssVendorDestFile);

  return gulp.src(config.cssVendors)
    .pipe(gulpConcat(destPath.base))
    .pipe(gulp.dest(destPath.dir));
});

gulp.task('build:js', ['lint:js'], () => {
  const path = pathParse(config.jsDestFile);
  const jsMain = (!isTestEnv) ? config.jsMain : config.jsMainTest;

  return gulp.src(jsMain)
    .pipe(webpack({
      module: {
        loaders: [
          { test: /jquery\.js$/, loader: 'expose?jQuery' },
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel'], // 'babel-loader' is also a legal name to reference
          },
        ],
      },
      output: {
        filename: path.base,
      },
    }))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(path.dir));
});

gulp.task('clean', () =>
  del(`${config.destDirectory}/*`)
      && del(config.buildDirectory));

// Lint
gulp.task('lint:scss', () => {
  gulp.src(config.scssFiles)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('lint:js', () =>
  gulp.src(config.jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

// Release
gulp.task('release:changelog', () =>
  gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular',
    }))
    .pipe(gulp.dest('./')));

// Development
gulp.task('watch', () => {
  gulp.watch(config.htmlMain, ['build:assetsIndex']);
  gulp.watch(config.assetsFiles, ['build:assetsFiles']);
  gulp.watch(config.iconsFiles, ['build:assetsIcons', 'build:scss']);
  gulp.watch(config.scssFiles, ['build:scss']);
  gulp.watch(config.jsFiles, ['build:js']);

  if (isTestEnv) {
    gulp.watch(config.jsMainTest, ['build:js']);
  }
});
