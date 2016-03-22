const userUtil = require('../utils/user-util.js');
const isTestEnv = process.env.NODE_ENV === 'test';

describe('Tab', () => {
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

  it('creates on threads', () => {
    browser.get('/');
    expect(element(by.css('.co-layout__tabs')).getText()).toContain('Discussions');

    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]')).isPresent()).toBe(false);
    element(by.xpath('//co-discussions-thread[1]/*[contains(@class, "co-threads__thread")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]')).isPresent()).toBe(true);
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][3]')).isPresent()).toBe(false);
    element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Discussions")]')).click();
    element(by.xpath('//co-discussions-thread[2]/*[contains(@class, "co-threads__thread")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][3]')).isPresent()).toBe(true);
  });

  it('creates on contacts', () => {
    browser.get('/');
    element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Contacts")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]')).isPresent()).toBe(false);
    element(by.xpath('//co-contacts-contact[1]/*[contains(@class, "co-list__item--link")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]')).isPresent()).toBe(true);
  });

  it('Tab mixes contacts and threads', () => {
    browser.get('/');
    element(by.xpath('//co-discussions-thread[1]/*[contains(@class, "co-threads__thread")]')).click();
    element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Contacts")]')).click();
    element(by.xpath('//co-contacts-contact[1]/*[contains(@class, "co-list__item--link")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]')).isPresent()).toBe(true);
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][3]')).isPresent()).toBe(true);
  });
  it('Tab is Active', () => {
    browser.get('/');
    element(by.xpath('//co-discussions-thread[1]/*[contains(@class, "co-threads__thread")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]//*[contains(@class, "co-layout__tabs__item__link--active")]')).isPresent()).toBe(true);
    element(by.xpath('//co-layout-tab-list//a[contains(string(), "Discussions")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]//*[contains(@class, "co-layout__tabs__item__link--active")]')).isPresent()).toBe(false);
    expect(element(by.xpath('//co-layout-tab-list//a[contains(string(), "Discussions")][contains(@class, "co-layout__tabs__item__link--active")]')).isPresent()).toBe(true);
    element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]//*[contains(@class, "co-layout__tabs__item__link")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]//*[contains(@class, "co-layout__tabs__item__link--active")]')).isPresent()).toBe(true);
    expect(element(by.xpath('//co-layout-tab-list//a[contains(string(), "Discussions")][contains(@class, "co-layout__tabs__item__link--active")]')).isPresent()).toBe(false);
  });
  it('Tab deletion', () => {
    browser.get('/');
    element(by.xpath('//co-discussions-thread[1]/*[contains(@class, "co-threads__thread")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]')).isPresent()).toBe(true);
    element(by.xpath('//co-layout-tab-list//*[contains(@class, "co-layout__tabs__item__del-btn")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]')).isPresent()).toBe(false);
  });
  it('Reload app creates tab on the fly', () => {
    browser.get('/');
    element(by.xpath('//co-discussions-thread[1]/*[contains(@class, "co-threads__thread")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]//*[contains(@class, "co-layout__tabs__item__link--active")]')).isPresent()).toBe(true);
    browser.refresh();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " co-layout__tabs__item ")][2]//*[contains(@class, "co-layout__tabs__item__link--active")]')).isPresent()).toBe(true);
  });
});
