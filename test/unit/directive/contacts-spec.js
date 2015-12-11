import {ContactsController} from '../../../src/js/directive/contacts.js';

describe('Directive Contacts', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('ContactsController', ContactsController);
    angular.mock.module('caliopenApp-test', function($provide, $translateProvider) {
          $provide.decorator('$httpBackend', function($delegate) {
              $delegate.when('GET', /contacts/).respond(200, { contacts: [{ foo: 'bar' }] });

              return $delegate;
          });

          $translateProvider.translations('en', {});
          $translateProvider.preferredLanguage('en');
      });
  });

  beforeEach(inject(($controller, $ngRedux, ContactsActions) => {
    getController = (scope, bindToController = {}) => {
      return $controller('ContactsController', { $scope: scope, $ngRedux, ContactsActions }, bindToController);
    };
  }));

  it('has contacts', inject(($rootScope, $httpBackend) => {
    let $scope = $rootScope.$new();
    let ctrl = getController($scope, { });
    $httpBackend.flush();

    expect(ctrl.contacts).toEqual([{ foo: 'bar' }]);
  }));
});
