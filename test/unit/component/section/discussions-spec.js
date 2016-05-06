import { DiscussionsController } from '../../../../src/js/component/section/discussions.js';

describe('component Discussions', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('DiscussionsController', DiscussionsController);

    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
      $provide.decorator('$httpBackend', ($delegate) => {
        $delegate.when('GET', /threads/).respond(200, { threads: [{ foo: 'bar' }] });

        return $delegate;
      });

      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
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
    $httpBackend.flush();

    expect(ctrl.threads).toEqual([{ foo: 'bar' }]);
  }));
});
