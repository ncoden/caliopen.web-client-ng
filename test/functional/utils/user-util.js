module.exports = {
  login: (login, password) => {
    const loginKeys = login || 'test@caliopen.local';
    const passwordKeys = password || '123456';
    const ignoreSync = browser.ignoreSynchronization;
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:4000/auth/login');
    element(by.css('input[name=username]')).sendKeys(loginKeys);
    element(by.css('input[name=password]')).sendKeys(passwordKeys);
    element(by.css('input[value=Go]')).click();

    browser.ignoreSynchronization = ignoreSync;
  },
  logout: () => {
    const ignoreSync = browser.ignoreSynchronization;
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:4000/auth/logout');
    browser.ignoreSynchronization = ignoreSync;
  },
  showAccount: () => {
    const userMenu = element(by.css('user-menu'));
    userMenu.element(by.css('[data-toggle="co-user-menu__dropdown"]')).click();
    userMenu.element(by.cssContainingText('.m-menu__item-content', 'Account')).click();
    userMenu.element(by.css('[data-toggle="co-user-menu__dropdown"]')).click();
  },
};
