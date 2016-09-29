const SpecReporter = require('jasmine-spec-reporter');
const isTestEnv = process.env.NODE_ENV === 'test';

const cfg = {
  capabilities: {
    browserName: 'firefox',
    maxInstances: 1,
  },
  specs: ['./features/**/*-spec.js'],
  jasmineNodeOpts: {
    showColors: true,
    print: () => {},
    defaultTimeoutInterval: 50 * 1000,
  },
  baseUrl: isTestEnv ? 'http://localhost:4200' : 'http://localhost:4000/app/',
  onPrepare: () => {
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'specs',
    }));
  },
};

if (!!process.env.SAUCE_USERNAME && !!process.env.SAUCE_ACCESS_KEY) {
  cfg.sauceUser = process.env.SAUCE_USERNAME;
  cfg.sauceKey = process.env.SAUCE_ACCESS_KEY;
  cfg.capabilities = {
    browserName: 'firefox',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_JOB_NUMBER,
    name: `CaliOpen e2e - ${process.env.TRAVIS_BRANCH}`,
  };
}

exports.config = cfg;
