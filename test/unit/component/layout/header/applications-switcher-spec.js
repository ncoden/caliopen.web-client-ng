// eslint-disable-next-line max-len
import { LayoutApplicationSwitcherController } from '../../../../../src/js/component/layout/header/application-switcher.js';

describe('component Layout Application Switcher', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('LayoutApplicationSwitcherController', LayoutApplicationSwitcherController);
    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });

        return $delegate;
      });
    });
  });

  beforeEach(inject(($controller, $ngRedux) => {
    getController = (scope, bindToController = {}) =>
      $controller(
        'LayoutApplicationSwitcherController',
        { $scope: scope, $ngRedux },
        bindToController);
  }));

  it('application is set', inject(($rootScope) => {
    const scope = $rootScope.$new();
    const ctrl = getController(scope, { });
    $rootScope.$digest();

    expect(ctrl.currentApplication).toEqual('discussions');
  }));
});
