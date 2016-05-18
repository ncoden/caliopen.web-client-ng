module.exports = {
  switch: (application) => {
    const appSwitcherElement = element(by.css('co-layout-application-switcher'));
    appSwitcherElement
      .element(by.css('a[data-toggle="co-application-switcher__dropdown"]'))
      .click();
    appSwitcherElement.element(by.cssContainingText('a', application)).click();
  },
};
