const userUtil = require('../utils/user-util.js');
const switchApplication = require('../utils/switch-application.js');
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
    switchApplication.switch('Discussions');
    expect(element(by.css('co-layout-tab-list')).getText()).toContain('Discussions');
    expect(element(by.xpath('//co-discussions-thread[1]')).getText())
      .toContain('test@caliopen.local, zoidberg@caliopen.local');
    expect(element.all(by.css('co-discussions-thread')).count()).toEqual(2);
    expect(element(by.cssContainingText('co-discussions a', 'Load more')).isPresent())
      .toBe(false);
  });

  describe('thread', () => {
    it('render and contacts describes the thread', () => {
      browser.get('/');
      expect(element(by.xpath('//co-layout-tab-list')).getText()).toContain('Discussions');
      element(by.xpath('//co-discussions-thread[1]')).click();
      expect(element(by.css('.m-tab.is-active .m-tab__link')).getText())
        .toContain('test@caliopen.local, zoidberg@caliopen.local');
    });
  });
});
