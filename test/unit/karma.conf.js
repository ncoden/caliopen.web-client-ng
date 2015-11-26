module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      '../../node_modules/angular/angular.js',
      '../../node_modules/angular-ui-router/release/angular-ui-router.js',
      '../../node_modules/angular-mocks/angular-mocks.js',
      '../../src/js/app.js',
      './**/*-spec.js'
    ],
    preprocessors: {
      '../../src/js/app.js': [ 'webpack' ],
      './**/*-spec.js': [ 'webpack' ]
    },
    browsers: ['PhantomJS'],
    webpack: {
      module: {
        loaders: [ { test: /\.js/, exclude: /node_modules/, loader: 'babel' } ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};
