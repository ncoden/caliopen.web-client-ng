// import { v1 as uuidV1 } from 'uuid';
/* eslint-disable max-len */
import { RecipientController } from '../../../../../src/js/component/module/recipient-list/recipient.js';
import { findObjectIndex } from '../../../../../src/js/component/module/recipient-list/recipient.js';
/* eslint-enable max-len */

describe('component recipient', () => {
  let getController;
  const unknownRecipient = {
    protocol: {
      type: 'unknown',
    },
  };

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('RecipientController', RecipientController);
    angular.mock.module('caliopenApp-test', ($provide, $translateProvider) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });

        return $delegate;
      });
    });
  });

  beforeEach(inject(($controller) => {
    getController = (bindToController = {}, $scope) => {
      const ctrl = $controller('RecipientController', { $scope }, bindToController);
      ctrl.$onInit();

      return ctrl;
    };
  }));

  describe('setUnkownRecipientProtocolType', () => {
    it('should change type', inject(($rootScope) => {
      const $scope = $rootScope.$new();
      const props = {
        recipient: { ...unknownRecipient },
        onChangeRecipient: jasmine.createSpy('onChangeRecipient'),
      };
      const ctrl = getController(props, $scope);
      const type = 'email';
      ctrl.setUnkownRecipientProtocolType(type);

      expect(ctrl.protocol.type).toEqual(type);
      expect(props.onChangeRecipient).toHaveBeenCalledWith({
        recipient: {
          ...unknownRecipient,
          protocol: { ...unknownRecipient.protocol, type },
        },
      });
    }));
  });

  describe('setKnownRecipientProtocol', () => {
    it('should change protocol', inject(($rootScope) => {
      const $scope = $rootScope.$new();
      const props = {
        recipient: { ...unknownRecipient },
        onChangeRecipient: jasmine.createSpy('onChangeRecipient'),
      };
      const ctrl = getController(props, $scope);
      const protocol = { type: 'mail', identifier: 'foo@bar' };
      ctrl.setKnownRecipientProtocol(protocol);
      $scope.$digest();

      expect(ctrl.protocol).toEqual(protocol);
      expect(props.onChangeRecipient).toHaveBeenCalledWith({
        recipient: {
          ...unknownRecipient,
          protocol,
        },
      });
    }));
  });

  describe('findObjectIndex', () => {
    const myColl = [
      { foo: 'bar', rab: 'oof' },
      { foo: 'lar', rab: 'ool' },
      { foo: 'lar', rab: 'oof' },
      { foo: 'barbar', rab: 'ool' },
    ];
    const myIndex = 1;
    const myItem = { ...myColl[myIndex] };
    const myAlternateItem = { foo: 'unknown', rab: 'ool' };

    it('find an index in cloned objects', () => {
      expect(findObjectIndex(myColl, myItem)).toEqual(myIndex);
    });
    it('doesn\'t find an index in cloned objects', () => {
      expect(findObjectIndex(myColl, myAlternateItem)).toEqual(-1);
    });
    it('find an index for specific keys', () => {
      expect(findObjectIndex(myColl, myAlternateItem, ['rab'])).toEqual(myIndex);
    });
    it('doesn`t find an index for specific keys', () => {
      expect(findObjectIndex(myColl, myAlternateItem, ['foo'])).toEqual(-1);
    });
  });
});
