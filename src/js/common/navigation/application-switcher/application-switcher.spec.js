const moduleName = 'caliopenApp';

describe('component Navigation Application Switcher', () => {
  let $componentController;

  beforeEach(() => {
    // TODO: dependency on root app component to remove
    angular.mock.module(moduleName);
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  it('application is set', () => {
    const ctrl = $componentController('applicationSwitcher');
    ctrl.$onInit();

    expect(ctrl.currentApplication.name).toEqual('discussions');
  });

  it('applications are set', () => {
    const ctrl = $componentController('applicationSwitcher', null, {});
    ctrl.$onInit();

    expect(ctrl.applications.length).toEqual(2);
  });
});
