const moduleName = 'caliopenApp';

describe('component ContactList', () => {
  let $componentController;

  beforeEach(() => {
    // TODO: dependency on root app component to remove
    angular.mock.module(moduleName, ($provide, $translateProvider) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.when('GET', /contacts/).respond(200, { contacts: [{ foo: 'bar' }] });
        $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });

        return $delegate;
      });
    });
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  it('has contacts', inject(($rootScope, $httpBackend) => {
    const ctrl = $componentController('contactList');
    ctrl.$onInit();
    $httpBackend.flush();

    expect(ctrl.contacts).toEqual([{ foo: 'bar' }]);
  }));
});
