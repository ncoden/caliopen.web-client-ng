// eslint-disable-next-line max-len
import { AvatarLetterController } from '../../../../src/js/component/module/avatar-letter.js';

describe('component AvatarLetter', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('AvatarLetterController', AvatarLetterController);
    angular.mock.module('caliopenApp-test', ($provide) => {
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });

        return $delegate;
      });
    });
  });

  beforeEach(inject(($controller, ContactHelper) => {
    getController = (bindToController = {}) =>
      $controller('AvatarLetterController', { ContactHelper }, bindToController);
  }));

  it('has css class', () => {
    const ctrl = getController({ contact: { title: 'Prof. Farnsworth' } });

    expect(ctrl.contactLetterStylesheetClass).toEqual('m-letter--p');
  });
});
