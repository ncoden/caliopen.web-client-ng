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

      const contact = element(by.css('contact-card'));
      expect(contact.element(by.css('avatar-letter')).isPresent()).toBe(true);
      expect(contact.element(by.css('contact-title')).getText()).toEqual('zoidberg');
      expect(
        element(by.cssContainingText('tab-list .m-tab__link', 'zoidberg'))
          .isPresent()
      ).toBe(true);
      expect(
        contact.element(by.cssContainingText('contact-title', 'zoidberg'))
          .isPresent()
      ).toBe(true);
    });

    describe('edit contact details', () => {
      it('renders forms', () => {
        browser.get('/');
        switchApplication.switch('Contacts');
        element(by.cssContainingText('contact-item', 'bender')).click();

        const contact = element(by.css('contact-card'));
        contact.element(by.cssContainingText('contact-details button', 'Edit')).click();

        expect(contact.element(by.css('form[name=email_form]')).isPresent()).toBe(true);
        expect(contact.element(by.css('form[name=address_form]')).isPresent()).toBe(true);
        expect(contact.element(by.css('form[name=im_form]')).isPresent()).toBe(true);
      });

      it('fails to add an email', () => {
        const email = 'foo@bar.tld';
        browser.get('/');
        switchApplication.switch('Contacts');
        element(by.cssContainingText('contact-item', 'bender')).click();
        const contact = element(by.css('contact-card'));
        contact.element(by.cssContainingText('contact-details button', 'Edit')).click();
        const emailForm = contact.element(by.css('add-contact-email-form'));

        emailForm
          .element(by.cssContainingText('.s-contact-detail-form__group', 'Address'))
          .element(by.css('input')).sendKeys(email);

        emailForm.element(by.cssContainingText('button', 'Add')).click();
        expect(emailForm.element(by.css('.callout.alert')).getText())
          .toEqual('type is missing');
      });

      fit('success to add and remove an email', () => {
        const email = 'foo@bar.tld';
        const type = 'Professional';
        browser.get('/');
        switchApplication.switch('Contacts');
        element(by.cssContainingText('contact-item', 'bender')).click();
        const contact = element(by.css('contact-card'));
        contact.element(by.cssContainingText('contact-details button', 'Edit')).click();
        const emailForm = contact.element(by.css('add-contact-email-form'));

        emailForm
          .element(by.cssContainingText('.s-contact-detail-form__group', 'Address'))
          .element(by.css('input')).sendKeys(email);
        emailForm
          .element(by.cssContainingText('.s-contact-detail-form__group', 'Type'))
          .element(by.cssContainingText('select option', type)).click();

        emailForm.element(by.cssContainingText('button', 'Add')).click();
        expect(contact.element(by.css('contact-details')).getText()).toContain(email);
        contact.element(by.cssContainingText('contact-details button', 'Edit')).click();
        contact.element(by.cssContainingText('contact-details li', email))
          .element(by.cssContainingText('button', 'Delete')).click();
        expect(contact.element(by.css('contact-details')).getText()).not.toContain(email);
      });
    });
  });
});
