import {DiscussionsController} from '../../../src/js/directive/discussions.js';

describe('Directive Discussions', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('DiscussionsController', DiscussionsController);
    angular.mock.module('caliopenApp-test', function($provide, $translateProvider) {
          $provide.decorator('$httpBackend', function($delegate) {
              $delegate.when('GET', /threads/).respond(200, { threads: [{ foo: 'bar' }] });

              return $delegate;
          });

          $translateProvider.translations('en', {});
          $translateProvider.preferredLanguage('en');
      });
  });

  beforeEach(inject(($controller, $ngRedux, DiscussionsActions) => {
    getController = (scope, bindToController = {}) => {
      return $controller('DiscussionsController', { $scope: scope, $ngRedux, DiscussionsActions }, bindToController);
    };
  }));

  it('has threads', inject(($rootScope, $httpBackend) => {
    let $scope = $rootScope.$new();
    let ctrl = getController($scope, { });
    $httpBackend.flush();
    
    expect(ctrl.threads).toEqual([{ foo: 'bar' }]);
  }));
});
