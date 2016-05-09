import { ContactListController } from '../../../../src/js/component/section/contact-list.js';

describe('component Contacts', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('ContactListController', ContactListController);

    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
      $provide.decorator('$httpBackend', ($delegate) => {
        $delegate.when('GET', /contacts/).respond(200, { contacts: [{ foo: 'bar' }] });

        return $delegate;
      });

      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
    });
  });

  beforeEach(inject(($controller, $ngRedux, ContactsActions) => {
    getController = (scope, bindToController = {}) =>
      $controller(
        'ContactListController',
        { $scope: scope, $ngRedux, ContactsActions },
        bindToController);
  }));

  it('has contacts', inject(($rootScope, $httpBackend) => {
    const $scope = $rootScope.$new();
    const ctrl = getController($scope, { });
    $httpBackend.flush();

    expect(ctrl.contacts).toEqual([{ foo: 'bar' }]);
  }));
});
