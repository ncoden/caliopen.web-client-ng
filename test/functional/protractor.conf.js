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
  const branch = (process.env.TRAVIS_PULL_REQUEST_BRANCH.length > 0) ?
    process.env.TRAVIS_PULL_REQUEST_BRANCH :
    process.env.TRAVIS_BRANCH;

  cfg.sauceUser = process.env.SAUCE_USERNAME;
  cfg.sauceKey = process.env.SAUCE_ACCESS_KEY;
  cfg.multiCapabilities = [
    {
      browserName: 'firefox',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      build: process.env.TRAVIS_JOB_NUMBER,
      name: `CaliOpen e2e - ${branch}`,
    },
    // {
    //   browserName: 'Internet Explorer',
    //   plateform: 'Windows 10',
    //   version: '11.103',
    //   'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    //   build: process.env.TRAVIS_JOB_NUMBER,
    //   name: `CaliOpen e2e - ${branch}`,
    // },
    // {
    //   browserName: 'Safari',
    //   plateform: 'OS X 10.11',
    //   version: '9.0',
    //   'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    //   build: process.env.TRAVIS_JOB_NUMBER,
    //   name: `CaliOpen e2e - ${branch}`,
    // },
  ];
}

exports.config = cfg;
