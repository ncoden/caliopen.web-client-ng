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

  describe('contact card', () => {
    it('render', () => {
      browser.get('/');
      element(by.xpath('//co-layout-application-switcher//a[contains(string(), "Contacts")]'))
        .click();
      element(by.xpath('//co-contact-list-contact[contains(string(), "zoidberg")]')).click();
      expect(element(by.css('co-layout-tab-list')).getText()).toContain('Contacts');
    });

    describe('edit contact details', () => {
      it('renders forms', () => {
        browser.get('/');
        element(by.cssContainingText('co-layout-application-switcher a', 'Contacts')).click();
        element(by.cssContainingText('co-contact-list-contact', 'bender')).click();
        element(by.cssContainingText('co-contact button', 'Edit')).click();
        expect(element(by.css('form[name=email_form]')).isPresent()).toBe(true);
        expect(element(by.css('form[name=address_form]')).isPresent()).toBe(true);
        expect(element(by.css('form[name=im_form]')).isPresent()).toBe(true);
      });

      it('fails to add an email', () => {
        const email = 'foo@bar.tld';
        browser.get('/');
        element(by.cssContainingText('co-layout-application-switcher a', 'Contacts')).click();
        element(by.cssContainingText('co-contact-list-contact', 'bender')).click();
        element(by.cssContainingText('co-contact button', 'Edit')).click();
        element(by.css('input#email_form_address')).sendKeys(email);
        element(by.cssContainingText('co-add-email-form button', 'Add')).click();
        expect(element(by.css('co-add-email-form .callout.alert')).getText())
          .toEqual('type is missing');
      });

      it('success to add and remove an email', () => {
        const email = 'foo@bar.tld';
        const type = 'Professional';
        browser.get('/');
        element(by.cssContainingText('co-layout-application-switcher a', 'Contacts')).click();
        element(by.cssContainingText('co-contact-list-contact', 'bender')).click();
        element(by.cssContainingText('co-contact button', 'Edit')).click();
        element(by.css('input#email_form_address')).sendKeys(email);
        element(by.cssContainingText('select#email_form_type option', type)).click();
        element(by.cssContainingText('co-add-email-form button', 'Add')).click();
        expect(element(by.css('.s-contact__col-datas-online')).getText()).toContain(email);
        element(by.cssContainingText('co-contact li', email))
          .element(by.cssContainingText('button', 'Delete')).click();
        expect(element(by.css('.s-contact__col-datas-online')).getText()).not.toContain(email);
      });
    });
  });
});
