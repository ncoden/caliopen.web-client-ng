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

    expect(ctrl.contactLetterStylesheetClass).toEqual('m-letter--p');
  });
});
