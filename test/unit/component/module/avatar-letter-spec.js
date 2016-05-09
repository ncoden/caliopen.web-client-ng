// eslint-disable-next-line max-len
import { avatarLetterController } from '../../../../src/js/component/module/avatar-letter.js';

describe('component AvatarLetter', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('avatarLetterController', avatarLetterController);
    angular.mock.module('caliopenApp-test');
  });

  beforeEach(inject(($controller, ContactHelper) => {
    getController = (bindToController = {}) =>
      $controller('avatarLetterController', { ContactHelper }, bindToController);
  }));

  it('has css class', () => {
    const ctrl = getController({ contact: { title: 'Prof. Farnsworth' } });

    expect(ctrl.contactLetterStylesheetClass).toEqual('m-letter--p');
  });
});