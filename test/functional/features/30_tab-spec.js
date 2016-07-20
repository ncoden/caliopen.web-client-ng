/* eslint-disable max-len */
const userUtil = require('../utils/user-util.js');
const switchApplication = require('../utils/switch-application.js');
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
    expect(
      element(by.cssContainingText(
        'co-layout-navigation-application-switcher .m-tab__link',
        'Discussions'
      )).isPresent()
    ).toBe(true);
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab')).count()).toBe(0);
    element(by.cssContainingText('.s-thread-list__thread', 'It\'s okay, Bender')).click();
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab')).count()).toBe(1);
    element(by.cssContainingText('co-layout-navigation-application-switcher .m-tab__link', 'Discussions')).click();
    element(by.cssContainingText('.s-thread-list__thread', 'Shut up and take my money')).click();
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab')).count()).toBe(2);
  });

  it('creates on contacts', () => {
    browser.get('/');
    switchApplication.switch('Contacts');
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab')).count()).toBe(0);
    element(by.cssContainingText('co-contact-list-contact .m-block-list__item-content', 'bender')).click();
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab')).count()).toBe(1);
  });

  it('Tab mixes contacts and threads', () => {
    browser.get('/');
    element(by.cssContainingText('.s-thread-list__thread', 'Shut up and take my money')).click();
    switchApplication.switch('Contacts', true);
    element(by.cssContainingText('co-contact-list-contact .m-block-list__item-content', 'bender')).click();
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab')).count()).toBe(2);
  });
  it('Tab is Active', () => {
    browser.get('/');
    element(by.cssContainingText('.s-thread-list__thread', 'Shut up and take my money')).click();
    expect(element(by.css('co-layout-navigation-tab-list .m-tab.m-navbar__item--is-active')).isPresent()).toBe(true);
    element(by.cssContainingText(
      'co-layout-navigation-application-switcher .m-tab__link',
      'Discussions'
    )).click();
    expect(element(by.css('co-layout-navigation-tab-list .m-tab.m-navbar__item--is-active')).isPresent()).toBe(false);
    expect(element(by.cssContainingText(
      'co-layout-navigation-application-switcher .m-navbar__item--is-active .m-tab__link',
      'Discussions'
    )).isPresent()).toBe(true);
    element(by.css('co-layout-navigation-tab-list .m-tab__link')).click();
    expect(element(by.css('co-layout-navigation-tab-list .m-tab.m-navbar__item--is-active')).isPresent()).toBe(true);
    expect(element(by.cssContainingText(
      'co-layout-navigation-application-switcher .m-navbar__item--is-active .m-tab__link',
      'Discussions'
    )).isPresent()).toBe(false);
  });
  it('Tab deletion', () => {
    browser.get('/');
    element(by.cssContainingText('.s-thread-list__thread', 'Shut up and take my money')).click();
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab')).count()).toBe(1);
    element(by.css('co-layout-navigation-tab-list .m-tab__button')).click();
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab')).count()).toBe(0);
  });
  it('Reload app creates tab on the fly', () => {
    browser.get('/');
    element(by.cssContainingText('.s-thread-list__thread', 'It\'s okay, Bender')).click();
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab.m-navbar__item--is-active')).count()).toBe(1);
    browser.refresh();
    expect(element.all(by.css('co-layout-navigation-tab-list .m-tab.m-navbar__item--is-active')).count()).toBe(1);
  });
});
