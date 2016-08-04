import { CallToActionController } from '../../../../src/js/component/layout/call-to-action.js';

describe('component Layout CallToAction', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('CallToActionController', CallToActionController);
    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });

        return $delegate;
      });
    });
  });

  beforeEach(inject((
    $controller, $ngRedux, $state, $translate, FlashMessageHelper, CaliopenDiscussion
  ) => {
    getController = (bindToController = {}, $scope) => {
      const ctrl = $controller(
        'CallToActionController',
        { $scope, $ngRedux, $state, $translate, FlashMessageHelper, CaliopenDiscussion },
        bindToController
      );
      ctrl.$onInit();

      return ctrl;
    };
  }));

  it('init', inject(($rootScope) => {
    const $scope = $rootScope.$new();
    const ctrl = getController({}, $scope);

    expect(ctrl.principalAction.label).toEqual('call-to-action.action.compose');
    expect(ctrl.availableActions.length).toEqual(1);
  }));
});
