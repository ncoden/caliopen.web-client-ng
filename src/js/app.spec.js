const moduleName = 'caliopenApp';

describe('Caliopen App', () => {
  let $componentController;

  beforeEach(() => {
    angular.mock.module(moduleName);
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  it('does not fail', inject(($rootScope) => {
    expect($rootScope).toBeDefined();
  }));

  it('has a root component', () => {
    expect($componentController('app')).toBeDefined();
  });
});
