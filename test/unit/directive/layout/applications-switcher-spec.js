import {LayoutApplicationSwitcherController} from '../../../../src/js/directive/layout/application-switcher.js';

describe('Directive Layout Application Switcher', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('LayoutApplicationSwitcherController', LayoutApplicationSwitcherController);
    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
      $provide.service('$state', () => {
        return {
          includes: () => true,
          go: () => true
        };
      });

      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
    });
  });

  beforeEach(inject(($controller, $state, $ngRedux, ApplicationActions) => {
    getController = (scope, bindToController = {}) => {
      console.log(scope);
      return $controller('LayoutApplicationSwitcherController', { $scope: scope, $state, $ngRedux, ApplicationActions }, bindToController);
    };
  }));

  it('application is set', inject(($rootScope) => {
    let scope = $rootScope.$new();
    let ctrl = getController(scope, { });
    expect(ctrl.currentApplicationKey).toEqual('header.menu.discussions');
    expect(ctrl.currentApplicationRoute).toEqual('front.discussions');
  }));
});
