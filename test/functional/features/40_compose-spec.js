const userUtil = require('../utils/user-util.js');
const isTestEnv = process.env.NODE_ENV === 'test';

describe('Compose', () => {
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

  describe('new message', () => {
    it('should render a form', () => {
      browser.get('/');
      element(by.cssContainingText('.l-topbar__col-action a', 'Compose')).click();
      expect(element(by.css('co-layout-navigation-tab-list')).getText())
        .toContain('Compose Message');
      expect(element(by.css('co-discussion-draft co-recipient-list')).isPresent()).toBe(true);
      expect(element(by.css('co-discussion-draft .s-discussion-draft__body-input')).isPresent())
        .toBe(true);
    });

    it('should add a known recipient', () => {
      const searchTerms = 'bender';
      browser.get('/');
      element(by.cssContainingText('.l-topbar__col-action a', 'Compose')).click();
      element(by.css('co-recipient-list .m-recipient-list__search-input'))
        .sendKeys(searchTerms, protractor.Key.ENTER);

      expect(element(by.cssContainingText('co-recipient', searchTerms))
        .isPresent()).toBe(true);
    });

    it('should change known recipient\'s protocol', () => {
      const contact = 'bender';
      browser.get('/');
      element(by.cssContainingText('.l-topbar__col-action a', 'Compose')).click();
      element(by.css('co-recipient-list .m-recipient-list__search-input'))
        .sendKeys(contact, protractor.Key.ENTER);
      element(by.cssContainingText('co-recipient', contact)).click();
      expect(element(by.cssContainingText(
        'co-recipient .m-dropdown .m-menu__item-content.is-active',
        '+01100110011'
      )).isPresent()).toBe(true);
      element(by.cssContainingText(
        'co-recipient .m-dropdown .m-menu__item-content',
        'bender@planet-express.fake'
      )).click();
      expect(element(by.cssContainingText(
        'co-recipient .m-dropdown .m-menu__item-content.is-active',
        'bender@planet-express.fake'
      )).isPresent()).toBe(true);
      expect(element(by.css('co-recipient a.m-link .fa-envelope')).isPresent()).toBe(true);
    });

    it('should add an unknown recipient', () => {
      const address = 'foo@bar.tld';
      browser.get('/');
      element(by.cssContainingText('.l-topbar__col-action a', 'Compose')).click();
      element(by.css('co-recipient-list .m-recipient-list__search-input'))
        .sendKeys(address, protractor.Key.ENTER);

      element(by.cssContainingText('co-recipient', address)).click();
      expect(element(by.cssContainingText('co-recipient', address))
        .isPresent()).toBe(true);
    });

    it('should change unknown recipient protocol', () => {
      const address = 'foo@bar.tld';
      browser.get('/');
      element(by.cssContainingText('.l-topbar__col-action a', 'Compose')).click();
      element(by.css('co-recipient-list .m-recipient-list__search-input'))
        .sendKeys(address, protractor.Key.ENTER);
      element(by.cssContainingText('co-recipient', address)).click();
      element(by.cssContainingText(
        'co-recipient .m-dropdown .m-menu__item-content',
        'Facebook'
      )).click();
      expect(element(by.css('co-recipient a.m-link .fa-facebook')).isPresent()).toBe(true);
    });

    it('should remove a recipient', () => {
      browser.get('/');
      element(by.cssContainingText('.l-topbar__col-action a', 'Compose')).click();
      element(by.css('co-recipient-list .m-recipient-list__search-input'))
        .sendKeys('bender', protractor.Key.ENTER);
      element(by.css('co-recipient-list .m-recipient-list__search-input'))
        .sendKeys('zoid', protractor.Key.ENTER);

      expect(element(by.cssContainingText('co-recipient', 'zoidberg')).isPresent()).toBe(true);
      element(by.cssContainingText('co-recipient', 'zoidberg')).click();
      element(by.cssContainingText('co-recipient', 'zoidberg'))
        .element(by.cssContainingText('.m-dropdown a', 'Remove'))
        .click();
      expect(element(by.cssContainingText('co-recipient', 'zoidberg')).isPresent()).toBe(false);

      expect(element(by.cssContainingText('co-recipient', 'bender')).isPresent()).toBe(true);
      element(by.css('co-recipient-list .m-recipient-list__search-input'))
        .sendKeys(protractor.Key.BACK_SPACE);
      expect(element(by.cssContainingText('co-recipient', 'bender')).isPresent()).toBe(false);
    });
  });
});
