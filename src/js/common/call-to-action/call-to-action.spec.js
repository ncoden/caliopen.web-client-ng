const moduleName = 'caliopenApp';

describe('component CallToAction', () => {
  let $componentController;

  beforeEach(() => {
    // TODO: dependency on root app component to remove
    angular.mock.module(moduleName);
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  it('init', () => {
    const ctrl = $componentController('callToAction');
    ctrl.$onInit();

    expect(ctrl.principalAction.label).toEqual('call-to-action.action.compose');
    expect(ctrl.availableActions.length).toEqual(1);
  });
});
