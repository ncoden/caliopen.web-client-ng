import { DiscussionsThreadController } from '../../../../../src/js/component/section/discussions/thread.js';

describe('component Discussions Thread', () => {
  let getController;
  let $rootScope;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('DiscussionsThreadController', DiscussionsThreadController);
      angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
        $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
          $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });

          return $delegate;
        });
      });
  });

  beforeEach(inject((_$rootScope_, $controller, $state, $ngRedux, TabsActions) => {
    $rootScope = _$rootScope_;
    getController = ($scope, bindToController = {}) =>
      $controller(
        'DiscussionsThreadController',
        { $scope, $state, $ngRedux, TabsActions },
        bindToController);
  }));

  it('thread has no unread', () => {
    const $scope = $rootScope.$new();
    const ctrl = getController($scope, { thread: { unread_count: 0 } });
    expect(ctrl.hasUnread).toEqual(false);
  });
  it('thread has unread', () => {
    const $scope = $rootScope.$new();
    const ctrl = getController($scope, { thread: { unread_count: 3 } });
    expect(ctrl.hasUnread).toEqual(true);
  });
});
