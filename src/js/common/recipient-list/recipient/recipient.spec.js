const moduleName = 'caliopenApp';
import { findObjectIndex } from './recipient.component.js';

describe('component recipient-list recipient', () => {
  let $componentController;

  beforeEach(() => {
    // TODO: dependency on root app component to remove
    angular.mock.module(moduleName);
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  const unknownRecipient = {
    protocol: {
      type: 'unknown',
    },
  };

  describe('setUnkownRecipientProtocolType', () => {
    it('should change type', () => {
      const props = {
        recipient: { ...unknownRecipient },
        onChangeRecipient: jasmine.createSpy('onChangeRecipient'),
      };
      const ctrl = $componentController('recipient', null, props);
      ctrl.$onInit();
      const type = 'email';
      ctrl.setUnkownRecipientProtocolType(type);

      expect(ctrl.protocol.type).toEqual(type);
      expect(props.onChangeRecipient).toHaveBeenCalledWith({
        recipient: {
          ...unknownRecipient,
          protocol: { ...unknownRecipient.protocol, type },
        },
      });
    });
  });

  describe('setKnownRecipientProtocol', () => {
    it('should change protocol', () => {
      const props = {
        recipient: { ...unknownRecipient },
        onChangeRecipient: jasmine.createSpy('onChangeRecipient'),
      };
      const ctrl = $componentController('recipient', null, props);
      ctrl.$onInit();
      const protocol = { type: 'mail', identifier: 'foo@bar' };
      ctrl.setKnownRecipientProtocol(protocol);

      expect(ctrl.protocol).toEqual(protocol);
      expect(props.onChangeRecipient).toHaveBeenCalledWith({
        recipient: {
          ...unknownRecipient,
          protocol,
        },
      });
    });
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
