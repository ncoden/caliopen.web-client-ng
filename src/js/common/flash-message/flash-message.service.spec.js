describe('Service FlashMessage', () => {
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
    it('show messages', inject(($rootScope, FlashMessage) => {
      FlashMessage.message('Flash message 1');
      FlashMessage.success('Flash message 2');
      FlashMessage.info('Flash message 3');
      FlashMessage.warning('Flash message 4');
      FlashMessage.alert('Flash message 5');

      expect($rootScope.flashes.length).toEqual(5);
    }));
  });
});
