const moduleName = 'caliopenApp';
import { v1 as uuidV1 } from 'uuid';

describe('component recipient-list', () => {
  let $componentController;
  /* eslint-disable max-len */
  const recipients = [
    { recipient_id: uuidV1(), contact_id: '', name: 'foo bar', protocol: { identifier: '+033 000 000 000', type: 'sms', privacy_index: 10 } },
    { recipient_id: uuidV1(), contact_id: '', name: 'bar bar rian', protocol: { identifier: 'barbar@rian.tld', type: 'email', privacy_index: 10 } },
    { recipient_id: uuidV1(), contact_id: '', name: 'John doerémifasol', protocol: { identifier: 'john.doe', type: 'facebook', privacy_index: 10 } },
  ];
  /* eslint-enable max-len */

  beforeEach(() => {
    // TODO: dependency on root app component to remove
    const appTest = angular.module('appTest', [moduleName]).name;
    angular.mock.module(appTest);
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  describe('remove a recipient', () => {
    it('should remove a recipient', () => {
      // const $scope = $rootScope.$new();
      const props = {
        recipients: recipients.slice(),
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = $componentController('recipientList', null, props);
      ctrl.$onInit();

      expect(ctrl.recipients.length).toEqual(recipients.length);
      ctrl.removeRecipient(ctrl.recipients[1]);

      expect(ctrl.recipients.length).toEqual(recipients.length - 1);
      expect(props.onRecipientsChange).toHaveBeenCalled();
    });

    it('should edit a recipient eventually', () => {
      // const $scope = $rootScope.$new();
      const props = {
        recipients: recipients.slice(),
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = $componentController('recipientList', null, props);
      ctrl.$onInit();

      expect(ctrl.recipients.length).toEqual(recipients.length);
      ctrl.eventuallyEditRecipient();

      expect(ctrl.recipients.length).toEqual(recipients.length - 1);
      expect(props.onRecipientsChange).toHaveBeenCalled();
    });

    it('should not remove a recipient eventually', () => {
      const props = {
        recipients: recipients.slice(),
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = $componentController('recipientList', null, props);
      ctrl.$onInit();

      expect(ctrl.recipients.length).toEqual(recipients.length);
      ctrl.searchTerms = 'foobar';
      ctrl.eventuallyEditRecipient();

      expect(ctrl.recipients.length).toEqual(recipients.length);
      expect(props.onRecipientsChange).not.toHaveBeenCalled();
    });
  });

  describe('add a recipient', () => {
    it('should add an unknown recipient', () => {
      const props = {
        recipients: [],
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = $componentController('recipientList', null, props);
      ctrl.$onInit();

      ctrl.addUnknownRecipient('foo@bar.tld');
      expect(ctrl.recipients.length).toEqual(1);
      expect(ctrl.recipients[0].protocol.identifier).toEqual('foo@bar.tld');
      expect(ctrl.recipients[0].protocol.type).toEqual('email');
      expect(props.onRecipientsChange).toHaveBeenCalled();
    });

    it('should add an unknown recipient with unknown protocol', () => {
      const props = {
        recipients: [],
        onRecipientsChange: jasmine.createSpy('onRecipientsChange'),
      };
      const ctrl = $componentController('recipientList', null, props);
      ctrl.$onInit();

      ctrl.addUnknownRecipient('foo@');
      expect(ctrl.recipients.length).toEqual(1);
      expect(ctrl.recipients[0].protocol.identifier).toEqual('foo@');
      expect(ctrl.recipients[0].protocol.type).toEqual('unknown');
      expect(props.onRecipientsChange).toHaveBeenCalled();
    });
  });
});
