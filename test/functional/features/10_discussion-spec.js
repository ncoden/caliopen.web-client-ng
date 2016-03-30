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
    expect(element(by.css('.co-layout__tabs')).getText()).toContain('Discussions');
    expect(element(by.xpath('//co-discussions-thread[1]')).getText())
      .toContain('caliopdev@caliop.net, laurent@brainstorm.fr');
    expect(element.all(by.css('co-discussions-thread')).count()).toEqual(7);
  });

  describe('thread', () => {
    it('render and contacts describes the thread', () => {
      browser.get('/');
      element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Discussions")]'))
        .click();
      element(by.xpath('//co-discussions-thread[1]')).click();
      expect(element(by.css('.co-layout__tabs__item__link--active')).getText())
        .toEqual('');
        // FIXME: https://github.com/CaliOpen/Caliopen/issues/12
        // .toContain('caliopdev@caliop.net, laurent@brainstorm.fr');
    });
  });
});
