module.exports = function karmaConfig(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      '../../src/js/app.js',
      '../../node_modules/angular-mocks/angular-mocks.js',
      '../../src/js/**/*.spec.js',
    ],
    preprocessors: {
      '../../src/js/app.js': ['webpack'],
      '../../src/js/**/*.spec.js': ['webpack'],
    },
    // browsers: ['Firefox', 'PhantomJS'],
    browsers: ['PhantomJS'],
    webpack: {
      module: {
        loaders: [
          { test: /jquery\.js$/, loader: 'expose?jQuery' },
          { test: /\.js/, exclude: /node_modules/, loader: 'babel' },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
