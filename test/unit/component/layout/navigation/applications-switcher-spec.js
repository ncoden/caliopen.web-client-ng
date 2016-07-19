// eslint-disable-next-line max-len
import { ApplicationSwitcherController } from '../../../../../src/js/component/layout/navigation/application-switcher.js';

describe('component Layout Navigation Application Switcher', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('ApplicationSwitcherController', ApplicationSwitcherController);
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
    getController = (scope, bindToController = {}) => {
      const ctrl = $controller(
        'ApplicationSwitcherController',
        { $scope: scope, $ngRedux },
        bindToController);
      ctrl.$onInit();

      return ctrl;
    };
  }));

  it('application is set', inject(($rootScope) => {
    const scope = $rootScope.$new();
    const ctrl = getController(scope, { });
    $rootScope.$digest();

    expect(ctrl.currentApplication.name).toEqual('discussions');
  }));

  it('applications is set', inject(($rootScope) => {
    const scope = $rootScope.$new();
    const ctrl = getController(scope, { });
    $rootScope.$digest();

    expect(ctrl.applications.length).toEqual(2);
  }));
});
