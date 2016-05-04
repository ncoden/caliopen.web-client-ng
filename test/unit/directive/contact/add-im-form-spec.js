import { AddContactDetailFormController } from '../../../../src/js/directive/contact/add-im-form.js';
import { stateGo } from 'redux-ui-router';

describe('Directive Contact Add Im Form', () => {
  const contact = {
    contact_id: 'foo',
    ims: [],
  };
  const successfulContactDetail = {
    street: 'foobar',
  };
  const failContactDetail = {
    type: 'unknown',
  };

  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('AddImFormController', AddContactDetailFormController);

    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.when('POST', `${ApiUrl}/contacts/${contact.contact_id}/ims`).respond((method, url, data, headers, params) => {
          const entity = JSON.parse(data);
          if (JSON.stringify(entity) === JSON.stringify(successfulContactDetail)) {
            return [201, entity];
          }

          if (JSON.stringify(entity) === JSON.stringify(failContactDetail)) {
            return [400, { errors: ['invalid'] }];
          }

          return [500, 'DUUUH'];
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
        'AddImFormController',
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


  it('add im', inject(($rootScope, $ngRedux, $httpBackend, ApiUrl) => {
    const $scope = $rootScope.$new();
    $ngRedux.dispatch(stateGo('front.contacts.contact', { contactId: contact.contact_id }));
    $rootScope.$digest();
    const ctrl = getController($scope, { contact });
    ctrl.contactDetail = successfulContactDetail;
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

  it('fails to add im', inject(($rootScope, $ngRedux, $httpBackend) => {
    const $scope = $rootScope.$new();
    $ngRedux.dispatch(stateGo('front.contacts.contact', { contactId: contact.contact_id }));
    $rootScope.$digest();
    const ctrl = getController($scope, { contact });
    expect(ctrl.loading).toBe(false);
    expect(ctrl.errors.length).toEqual(0);

    ctrl.contactDetail = failContactDetail;
    ctrl.addContactDetail();
    expect(ctrl.loading).toBe(true);

    $httpBackend.flush();
    expect(ctrl.loading).toBe(false);
    expect(ctrl.contactDetail).toEqual(failContactDetail);
    expect(ctrl.errors).toEqual(['invalid']);
  }));
});
