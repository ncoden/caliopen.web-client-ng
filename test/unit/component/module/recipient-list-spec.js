import { v1 as uuidV1 } from 'uuid';
// eslint-disable-next-line max-len
import { RecipientListController } from '../../../../src/js/component/module/recipient-list.js';

describe('component recipient-list', () => {
  let getController;
  /* eslint-disable max-len */
  const recipients = [
    { recipient_id: uuidV1(), contact_id: '', name: 'foo bar', protocol: { identifier: '+033 000 000 000', type: 'sms', privacy_index: 10 } },
    { recipient_id: uuidV1(), contact_id: '', name: 'bar bar rian', protocol: { identifier: 'barbar@rian.tld', type: 'email', privacy_index: 10 } },
    { recipient_id: uuidV1(), contact_id: '', name: 'John doerémifasol', protocol: { identifier: 'john.doe', type: 'facebook', privacy_index: 10 } },
  ];
  /* eslint-enable max-len */

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('RecipientListController', RecipientListController);
    angular.mock.module('caliopenApp-test', ($provide) => {
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });

        return $delegate;
      });
    });
  });

  beforeEach(inject(($controller) => {
    getController = (bindToController = {}, $scope) => {
      const ctrl = $controller('RecipientListController', { $scope }, bindToController);
      ctrl.$onInit();

      return ctrl;
    };
  }));

  describe('remove a recipient', () => {
    it('should remove a recipient', inject(($rootScope) => {
      const $scope = $rootScope.$new();
      const props = {
        recipients: recipients.slice(),
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = getController(props, $scope);

      expect(ctrl.recipients.length).toEqual(recipients.length);
      ctrl.removeRecipient(ctrl.recipients[1]);

      expect(ctrl.recipients.length).toEqual(recipients.length - 1);
      expect(props.onRecipientsChange).toHaveBeenCalled();
    }));

    it('should edit a recipient eventually', inject(($rootScope) => {
      const $scope = $rootScope.$new();
      const props = {
        recipients: recipients.slice(),
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = getController(props, $scope);

      expect(ctrl.recipients.length).toEqual(recipients.length);
      ctrl.eventuallyEditRecipient();

      expect(ctrl.recipients.length).toEqual(recipients.length - 1);
      expect(props.onRecipientsChange).toHaveBeenCalled();
    }));

    it('should not remove a recipient eventually', inject(($rootScope) => {
      const $scope = $rootScope.$new();
      const props = {
        recipients: recipients.slice(),
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = getController(props, $scope);

      expect(ctrl.recipients.length).toEqual(recipients.length);
      ctrl.searchTerms = 'foobar';
      ctrl.eventuallyEditRecipient();

      expect(ctrl.recipients.length).toEqual(recipients.length);
      expect(props.onRecipientsChange).not.toHaveBeenCalled();
    }));
  });

  describe('add a recipient', () => {
    it('should add an unknown recipient', inject(($rootScope) => {
      const $scope = $rootScope.$new();
      const props = {
        recipients: [],
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = getController(props, $scope);

      ctrl.addUnknownRecipient('foo@bar.tld');
      expect(ctrl.recipients.length).toEqual(1);
      expect(ctrl.recipients[0].protocol.identifier).toEqual('foo@bar.tld');
      expect(ctrl.recipients[0].protocol.type).toEqual('email');
      expect(props.onRecipientsChange).toHaveBeenCalled();
    }));

    it('should add an unknown recipient with unknown protocol', inject(($rootScope) => {
      const $scope = $rootScope.$new();
      const props = {
        recipients: [],
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = getController(props, $scope);

      ctrl.addUnknownRecipient('foo@');
      expect(ctrl.recipients.length).toEqual(1);
      expect(ctrl.recipients[0].protocol.identifier).toEqual('foo@');
      expect(ctrl.recipients[0].protocol.type).toEqual('unknown');
      expect(props.onRecipientsChange).toHaveBeenCalled();
    }));
  });
});
