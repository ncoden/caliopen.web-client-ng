const userUtil = require('../utils/user-util.js');
const isTestEnv = process.env.NODE_ENV === 'test';

describe('Contact', () => {
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
    element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Contacts")]'))
      .click();
    expect(element(by.css('co-layout-tab-list')).getText()).toContain('Contacts');
  });
});
