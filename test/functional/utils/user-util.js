module.exports = {
  login: (login, password) => {
    login = login || 'julien.muetton@gandi.net';
    password = password || '123456';
    const ignoreSync = browser.ignoreSynchronization;
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:4000/auth/login');
    element(by.css('input[name=username]')).sendKeys(login);
    element(by.css('input[name=password]')).sendKeys(password);
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
