import {LayoutApplicationSwitcherController} from '../../../../src/js/directive/layout/application-switcher.js';

describe('Directive Layout Application Switcher', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('LayoutApplicationSwitcherController', LayoutApplicationSwitcherController);
    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {

      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
    });
  });

  beforeEach(inject(($controller, $ngRedux) => {
    getController = (scope, bindToController = {}) => {
      return $controller('LayoutApplicationSwitcherController', { $scope: scope, $ngRedux }, bindToController);
    };
  }));

  it('application is set', inject(($rootScope) => {
    let scope = $rootScope.$new();
    let ctrl = getController(scope, { });
    $rootScope.$digest();

    expect(ctrl.currentApplication).toEqual('discussions');
  }));
});
