const userUtil = require('../utils/user-util.js');
const isTestEnv = process.env.NODE_ENV === 'test';

describe('Discussions', () => {
  beforeAll(() => {
    if (!isTestEnv) {
      userUtil.login();
    }
  });
  afterAll(() => {
    if (!isTestEnv) {
      userUtil.logout();
    }
  });

  it('list', () => {
    browser.get('/');
    browser.takeScreenshot().then(data => {
      const fs = require('fs');
      fs.appendFile('list.png', data);
    });
    element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Discussions")]'))
      .click();
    expect(element(by.css('.co-layout__tabs')).getText()).toContain('Discussions');
  });
});
