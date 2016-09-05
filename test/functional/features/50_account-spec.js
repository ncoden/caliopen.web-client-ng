const userUtil = require('../utils/user-util.js');
const isTestEnv = process.env.NODE_ENV === 'test';

describe('Account', () => {
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

  describe('profile', () => {
    it('should render', () => {
      browser.get('/');
      userUtil.showAccount();

      const account = element(by.css('account'));
      expect(account.isPresent()).toBe(true);
      expect(account.element(by.css('avatar-letter')).isPresent()).toBe(true);
      expect(account.element(by.css('contact-title')).getText()).toEqual('John Doe');
    });

    it('should change name', () => {
      browser.get('/');
      userUtil.showAccount();

      const account = element(by.css('account'));
      account.element(by.cssContainingText('contact-card-summary button', 'Edit')).click();
      account.element(
        by.cssContainingText('contact-card-summary text-field-group', 'Firstname')
      ).element(by.css('input')).sendKeys(protractor.Key.BACK_SPACE, 'Philip J.');
      account.element(
        by.cssContainingText('contact-card-summary text-field-group', 'Lastname')
      ).element(by.css('input')).sendKeys(protractor.Key.BACK_SPACE, 'Fry');
      account.element(
        by.cssContainingText('contact-card-summary button', 'Save')
      ).click();

      const ignoreSync = browser.ignoreSynchronization;
      browser.ignoreSynchronization = true;

      expect(element(by.css('flash-message')).getText())
        .toContain('Updating a contact is not yet available.');

      browser.ignoreSynchronization = ignoreSync;
    });

    it('should add an email', () => {
      const email = 'foo@bar.tld';
      const type = 'Professional';
      browser.get('/');
      userUtil.showAccount();
      element(by.cssContainingText('contact-details button', 'Edit')).click();
      element(by.css('input#email_form_address')).sendKeys(email);
      element(by.cssContainingText('select#email_form_type option', type)).click();
      element(by.cssContainingText('add-contact-email-form button', 'Add')).click();
      expect(element(by.css('contact-details')).getText()).toContain(email);
      element(by.cssContainingText('contact-details li', email))
        .element(by.cssContainingText('button', 'Delete')).click();
      expect(element(by.css('.s-contact__col-datas-online')).getText()).not.toContain(email);
    });

    it('should connect an email and disconnect', () => {
      const login = 'foo';
      const password = 'bar';
      const protocol = 'IMAP';
      const mailServer = 'imap.server.tld';
      const port = 998;
      const fetchMethod = 'Only all messages from now';

      browser.get('/');
      userUtil.showAccount();

      element(by.cssContainingText('contact-details button', 'Connect platform')).click();

      const remoteIdentityElement = element(
        by.cssContainingText('remote-identity-email', 'Connect an email server')
      );
      remoteIdentityElement.element(by.cssContainingText('button', 'Next')).click();
      expect(remoteIdentityElement.getText()).toContain('login is required');
      remoteIdentityElement.element(by.cssContainingText('text-field-group', 'Login'))
        .element(by.css('input'))
        .sendKeys(login);
      remoteIdentityElement.element(by.cssContainingText('text-field-group', 'Password'))
        .element(by.css('input'))
        .sendKeys(password);
      remoteIdentityElement.element(by.cssContainingText('button', 'Next')).click();
      expect(remoteIdentityElement.getText()).toContain('Incoming mail server');
      remoteIdentityElement.element(by.cssContainingText('button', 'Previous')).click();
      expect(remoteIdentityElement.getText()).toContain('Login');
      remoteIdentityElement.element(by.cssContainingText('button', 'Next')).click();
      const protocolSelectElement = remoteIdentityElement
        .element(by.cssContainingText('select-field-group', 'Protocol'))
        .element(by.css('select'));
      protocolSelectElement.click();
      protocolSelectElement.element(by.cssContainingText('option', protocol)).click();
      remoteIdentityElement.element(by.cssContainingText('text-field-group', 'mail server'))
        .element(by.css('input'))
        .sendKeys(mailServer);
      remoteIdentityElement.element(by.cssContainingText('text-field-group', 'Port'))
        .element(by.css('input'))
        .sendKeys(port);
      remoteIdentityElement.element(by.cssContainingText('button', 'Next')).click();
      remoteIdentityElement.element(by.cssContainingText('radio-field-group label', fetchMethod))
        .click();
      const ignoreSync = browser.ignoreSynchronization;
      browser.ignoreSynchronization = true;
      remoteIdentityElement.element(by.cssContainingText('button', 'Finish')).click();

      expect(element(by.css('flash-message')).getText()).toContain(
        'Connecting to a protocol is not yet implemented. Data fetching is fake actually.'
      );
      expect(element(by.css('.m-remote-identity__fetching-panel')).isPresent()).toBe(true);
      browser.ignoreSynchronization = false;
      expect(
        element(by.cssContainingText('contact-details button.m-link--success', 'Connect platform'))
        .isPresent()
      ).toBe(true);
      remoteIdentityElement.element(by.cssContainingText('button', 'Disconnect')).click();
      expect(
        element(by.cssContainingText('contact-details button.m-link--success', 'Connect platform'))
        .isPresent()
      ).toBe(false);
      browser.ignoreSynchronization = ignoreSync;
    });
  });
});
