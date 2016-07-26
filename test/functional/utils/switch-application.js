module.exports = {
  switch: (application, goToList) => {
    const appSwitcherElement = element(by.css('co-layout-navigation-application-switcher'));
    appSwitcherElement
      .element(by.css('a[data-toggle="co-application-switcher__dropdown"]'))
      .click();
    appSwitcherElement
      .element(by.cssContainingText('.m-application-switcher__dropdown', application))
      .click();
    if (!!goToList) {
      appSwitcherElement.element(by.cssContainingText('a', application)).click();
    }
  },
};
