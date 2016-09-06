import avatarLetter from './index.js';

describe('component AvatarLetter', () => {
  let $componentController;

  beforeEach(() => {
    angular.mock.module(avatarLetter);
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  it('has css class', () => {
    const bindings = { contact: { title: 'Prof. Farnsworth' } };
    const ctrl = $componentController('avatarLetter', null, bindings);
    ctrl.$onInit();

    expect(ctrl.letterStylesheet).toEqual('m-letter--p');
  });

  describe('getBlockModifierStylesheet()', () => {
    it('has no modifiers', () => {
      const bindings = { contact: { title: 'Prof. Farnsworth' } };
      const ctrl = $componentController('avatarLetter', null, bindings);
      ctrl.$onInit();

      expect(ctrl.getBlockModifierStylesheet()).toEqual('');
    });

    it('has modifier', () => {
      const bindings = { contact: { title: 'Prof. Farnsworth' }, props: { size: 'small' } };
      const ctrl = $componentController('avatarLetter', null, bindings);
      ctrl.$onInit();

      expect(ctrl.getBlockModifierStylesheet()).toEqual('m-avatar--small');
    });
  });

  describe('getElementModifierStylesheet()', () => {
    it('has no modifiers', () => {
      const bindings = { contact: { title: 'Prof. Farnsworth' } };
      const ctrl = $componentController('avatarLetter', null, bindings);
      ctrl.$onInit();

      expect(ctrl.getElementModifierStylesheet()).toEqual('');
    });

    it('has modifier', () => {
      const bindings = { contact: { title: 'Prof. Farnsworth' }, props: { size: 'xlarge' } };
      const ctrl = $componentController('avatarLetter', null, bindings);
      ctrl.$onInit();

      expect(ctrl.getElementModifierStylesheet()).toEqual('m-avatar--xlarge__letter');
    });
  });
});
