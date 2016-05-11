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
    element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Discussions")]'))
      .click();
    expect(element(by.xpath('//co-layout-tab-list')).getText()).toContain('Discussions');
    expect(element(by.xpath('//co-discussions-thread[1]')).getText())
      .toContain('test@caliopen.local, zoidberg@caliopen.local');
    expect(element.all(by.css('co-discussions-thread')).count()).toEqual(2);
  });

  describe('thread', () => {
    it('render and contacts describes the thread', () => {
      browser.get('/');
      element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Discussions")]'))
        .click();
      element(by.xpath('//co-discussions-thread[1]')).click();
      expect(element(by.css('.m-tab.is-active .m-tab__link')).getText())
        .toContain('test@caliopen.local, zoidberg@caliopen.local');
    });
  });
});
