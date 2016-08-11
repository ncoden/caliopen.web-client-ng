import { stateGo } from 'redux-ui-router';
const moduleName = 'caliopenApp';

describe('component Contact Add Email Form', () => {
  const contact = {
    contact_id: 'foo',
    emails: [],
  };
  const successfulAddress = 'foo@bar.tld';
  const failAddress = 'foo@bar';

  let $componentController;

  beforeEach(() => {
    // TODO: dependency on root app component to remove
    angular.mock.module(moduleName, ($provide, $translateProvider) => {
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });
        $delegate.when('POST', `${ApiUrl}/contacts/${contact.contact_id}/emails`)
          .respond((method, url, data) => {
            const entity = JSON.parse(data);
            switch (entity.address) {
              case successfulAddress:
                return [201, entity];
              case failAddress:
                return [400, { errors: ['invalid'] }];
              default:
                return [500, 'DUUUH'];
            }
          });

        return $delegate;
      });

      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
    });
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  it('init form', inject(($rootScope, $ngRedux) => {
    $ngRedux.dispatch(stateGo('contact', { contactId: contact.contact_id }));
    $rootScope.$digest();
    const ctrl = $componentController('addContactEmailForm', null, { contact });

    expect(ctrl.contactDetail).toEqual({});
  }));


  it('add email', inject(($rootScope, $ngRedux, $httpBackend, ApiUrl) => {
    $ngRedux.dispatch(stateGo('contact', { contactId: contact.contact_id }));
    $rootScope.$digest();
    const ctrl = $componentController('addContactEmailForm', null, { contact });
    ctrl.contactDetail.address = successfulAddress;
    expect(ctrl.loading).toBe(false);

    ctrl.addContactDetail();
    expect(ctrl.loading).toBe(true);

    $httpBackend.expectGET(`${ApiUrl}/contacts/${contact.contact_id}`)
      .respond(200, { contacts: contact });
    $httpBackend.flush();
    $rootScope.$digest();

    expect(ctrl.loading).toBe(false);
    expect(ctrl.contactDetail).toEqual({});
  }));

  it('fails to add email', inject(($rootScope, $ngRedux, $httpBackend) => {
    $ngRedux.dispatch(stateGo('contact', { contactId: contact.contact_id }));
    $rootScope.$digest();
    const ctrl = $componentController('addContactEmailForm', null, { contact });
    expect(ctrl.loading).toBe(false);
    expect(ctrl.errors.length).toEqual(0);

    ctrl.contactDetail = {
      address: failAddress,
      type: 'home',
      is_primary: 1,
    };
    ctrl.addContactDetail();
    expect(ctrl.loading).toBe(true);

    $httpBackend.flush();
    expect(ctrl.loading).toBe(false);
    expect(ctrl.contactDetail).toEqual({
      address: failAddress,
      type: 'home',
      is_primary: 1,
    });
    expect(ctrl.errors).toEqual(['invalid']);
  }));
});
