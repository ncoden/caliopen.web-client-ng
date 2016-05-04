import { AddContactDetailFormController } from '../../../../src/js/directive/contact/add-email-form.js';
import { stateGo } from 'redux-ui-router';

describe('Directive Contact Add Email Form', () => {
  const contact = {
    contact_id: 'foo',
    emails: [],
  };
  const successfulAddress = 'foo@bar.tld';
  const failAddress = 'foo@bar';

  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('AddEmailFormController', AddContactDetailFormController);

    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.when('POST', `${ApiUrl}/contacts/${contact.contact_id}/emails`).respond((method, url, data, headers, params) => {
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

  beforeEach(inject(($controller, $ngRedux, ContactsActions) => {
    getController = (scope, bindToController = {}) =>
      $controller(
        'AddEmailFormController',
        { $scope: scope, $ngRedux, ContactsActions },
        bindToController);
  }));

  it('init form', inject(($rootScope, $ngRedux) => {
    const $scope = $rootScope.$new();
    $ngRedux.dispatch(stateGo('front.contacts.contact', { contactId: contact.contact_id }));
    $rootScope.$digest();
    const ctrl = getController($scope, { contact });

    expect(ctrl.contactDetail).toEqual({});
  }));


  it('add email', inject(($rootScope, $ngRedux, $httpBackend, ApiUrl) => {
    const $scope = $rootScope.$new();
    $ngRedux.dispatch(stateGo('front.contacts.contact', { contactId: contact.contact_id }));
    $rootScope.$digest();
    const ctrl = getController($scope, { contact });
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
    const $scope = $rootScope.$new();
    $ngRedux.dispatch(stateGo('front.contacts.contact', { contactId: contact.contact_id }));
    $rootScope.$digest();
    const ctrl = getController($scope, { contact });
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
