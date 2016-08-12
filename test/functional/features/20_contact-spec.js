const userUtil = require('../utils/user-util.js');
const switchApplication = require('../utils/switch-application.js');
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
    switchApplication.switch('Contacts');
    const appSwitcher = element(by.css('application-switcher'));
    expect(appSwitcher.element(by.cssContainingText('.m-tab__link', 'Discussions')).isPresent())
      .toBe(true);
  });

  describe('contact card', () => {
    it('render', () => {
      browser.get('/');
      switchApplication.switch('Contacts');
      element(by.cssContainingText('contact-item', 'zoidberg')).click();
      expect(
        element(by.cssContainingText('tab-list .m-tab__link', 'zoidberg'))
          .isPresent()
      ).toBe(true);
      expect(
        element(by.cssContainingText('contact-card .m-contact-card__title', 'zoidberg')).isPresent()
      ).toBe(true);
    });

    describe('edit contact details', () => {
      it('renders forms', () => {
        browser.get('/');
        switchApplication.switch('Contacts');
        element(by.cssContainingText('contact-item', 'bender')).click();
        element(by.cssContainingText('contact-card button', 'Edit')).click();
        expect(element(by.css('form[name=email_form]')).isPresent()).toBe(true);
        expect(element(by.css('form[name=address_form]')).isPresent()).toBe(true);
        expect(element(by.css('form[name=im_form]')).isPresent()).toBe(true);
      });

      it('fails to add an email', () => {
        const email = 'foo@bar.tld';
        browser.get('/');
        switchApplication.switch('Contacts');
        element(by.cssContainingText('contact-item', 'bender')).click();
        element(by.cssContainingText('contact-card button', 'Edit')).click();
        element(by.css('input#email_form_address')).sendKeys(email);
        element(by.cssContainingText('add-contact-email-form button', 'Add')).click();
        expect(element(by.css('add-contact-email-form .callout.alert')).getText())
          .toEqual('type is missing');
      });

      it('success to add and remove an email', () => {
        const email = 'foo@bar.tld';
        const type = 'Professional';
        browser.get('/');
        switchApplication.switch('Contacts');
        element(by.cssContainingText('contact-item', 'bender')).click();
        element(by.cssContainingText('contact-card button', 'Edit')).click();
        element(by.css('input#email_form_address')).sendKeys(email);
        element(by.cssContainingText('select#email_form_type option', type)).click();
        element(by.cssContainingText('add-contact-email-form button', 'Add')).click();
        expect(element(by.css('.s-contact__col-datas-online')).getText()).toContain(email);
        element(by.cssContainingText('.s-contact__m-contact-detail-list li', email))
          .element(by.cssContainingText('button', 'Delete')).click();
        expect(element(by.css('.s-contact__col-datas-online')).getText()).not.toContain(email);
      });
    });
  });
});
