import { DiscussionsController } from '../../../../src/js/component/section/discussions.js';

describe('component Discussions', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('DiscussionsController', DiscussionsController);

    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });
        $delegate.when('GET', /threads/).respond(200, { threads: [{ foo: 'bar' }] });

        return $delegate;
      });
    });
  });

  beforeEach(inject(($controller, $ngRedux, DiscussionsActions) => {
    getController = (scope, bindToController = {}) =>
      $controller(
        'DiscussionsController',
        { $scope: scope, $ngRedux, DiscussionsActions },
        bindToController);
  }));

  it('has threads', inject(($rootScope, $httpBackend) => {
    const $scope = $rootScope.$new();
    const ctrl = getController($scope, { });
    ctrl.$onInit();
    $httpBackend.flush();

    expect(ctrl.threads).toEqual([{ foo: 'bar' }]);
  }));
});
