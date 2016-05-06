/* eslint-disable max-len */
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
    expect(element(by.css('co-layout-tab-list')).getText()).toContain('Discussions');
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2]')).isPresent()).toBe(false);
    element(by.cssContainingText('.s-thread-list__thread', 'discussion IRC')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2]')).isPresent()).toBe(true);
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][3]')).isPresent()).toBe(false);
    element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Discussions")]')).click();
    element(by.cssContainingText('.s-thread-list__thread', 'R=C3=A9union CaliOpen')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][3]')).isPresent()).toBe(true);
  });

  it('creates on contacts', () => {
    browser.get('/');
    element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Contacts")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2]')).isPresent()).toBe(false);
    element(by.xpath('//co-contact-list-contact[1]/*[contains(@class, "m-block-list__item-content")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2]')).isPresent()).toBe(true);
  });

  it('Tab mixes contacts and threads', () => {
    browser.get('/');
    element(by.cssContainingText('.s-thread-list__thread', 'discussion IRC')).click();
    element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Contacts")]')).click();
    element(by.xpath('//co-contact-list-contact[1]/*[contains(@class, "m-block-list__item-content")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2]')).isPresent()).toBe(true);
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][3]')).isPresent()).toBe(true);
  });
  it('Tab is Active', () => {
    browser.get('/');
    element(by.cssContainingText('.s-thread-list__thread', 'discussion IRC')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2][contains(@class, "is-active")]')).isPresent()).toBe(true);
    element(by.xpath('//co-layout-tab-list//a[contains(string(), "Discussions")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2][contains(@class, "is-active")]')).isPresent()).toBe(false);
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][contains(@class, "is-active")]//*[contains(string(), "Discussions")]')).isPresent()).toBe(true);
    element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2]//*[contains(@class, "m-tab__link")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2][contains(@class, "is-active")]')).isPresent()).toBe(true);
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][contains(@class, "is-active")]//*[contains(string(), "Discussions")]')).isPresent()).toBe(false);
  });
  it('Tab deletion', () => {
    browser.get('/');
    element(by.cssContainingText('.s-thread-list__thread', 'discussion IRC')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2]')).isPresent()).toBe(true);
    element(by.xpath('//co-layout-tab-list//*[contains(@class, "m-tab__button")]')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2]')).isPresent()).toBe(false);
  });
  it('Reload app creates tab on the fly', () => {
    browser.get('/');
    element(by.cssContainingText('.s-thread-list__thread', 'discussion IRC')).click();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2][contains(@class, "is-active")]')).isPresent()).toBe(true);
    browser.refresh();
    expect(element(by.xpath('//co-layout-tab-list//*[contains(concat(" ", normalize-space(@class), " "), " m-tab ")][2][contains(@class, "is-active")]')).isPresent()).toBe(true);
  });
});
