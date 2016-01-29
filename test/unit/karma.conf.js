module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      '../../src/js/app.js',
      '../../node_modules/angular-mocks/angular-mocks.js',
      './**/*-spec.js'
    ],
    preprocessors: {
      '../../src/js/app.js': [ 'webpack' ],
      './**/*-spec.js': [ 'webpack' ]
    },
    browsers: ['PhantomJS'],
    webpack: {
      module: {
        loaders: [
          { test: /jquery\.js$/, loader: 'expose?jQuery' },
          { test: /\.js/, exclude: /node_modules/, loader: 'babel' }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};
