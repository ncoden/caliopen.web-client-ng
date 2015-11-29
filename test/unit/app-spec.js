describe('Caliopen App', () => {
  beforeEach(() => {
    angular.mock.module('caliopenApp');
  });

  it('does not fail', inject(($rootScope) => {
    expect($rootScope).toBeDefined();
  }));
});
