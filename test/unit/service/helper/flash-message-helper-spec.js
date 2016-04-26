describe('Service Helper FlashMessageHelper', () => {
  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp']);
    angular.mock.module('caliopenApp-test');
  });

  describe('constructor', () => {
    it('has no flash messages', inject(($rootScope) => {
      expect($rootScope.flashes.length).toEqual(0);
    }));
  });

  describe('message', () => {
    it('show messages', inject(($rootScope, FlashMessageHelper) => {
      FlashMessageHelper.message('Flash message 1');
      FlashMessageHelper.success('Flash message 2');
      FlashMessageHelper.info('Flash message 3');
      FlashMessageHelper.warning('Flash message 4');
      FlashMessageHelper.alert('Flash message 5');

      expect($rootScope.flashes.length).toEqual(5);
    }));
  });
});
