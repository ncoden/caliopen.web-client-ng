module.exports = {
  login: (login, password) => {
    const loginKeys = login || 'julien.muetton@gandi.net';
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
};
