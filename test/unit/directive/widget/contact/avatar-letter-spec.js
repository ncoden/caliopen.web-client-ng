import {WidgetContactAvatarLetterController} from '../../../../../src/js/directive/widget/contact/avatar-letter.js';

describe('Directive Widget Contact AvatarLetter', () => {

  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('WidgetContactAvatarLetterController', WidgetContactAvatarLetterController);
    angular.mock.module('caliopenApp-test');
  });

  beforeEach(inject(($controller, ContactHelper) => {
    getController = (bindToController = {}) => {
      return $controller('WidgetContactAvatarLetterController', { ContactHelper }, bindToController);
    };
  }));

  it('has css class', () => {
    let ctrl = getController({ contact: { title: 'Prof. Farnsworth'} });

    expect(ctrl.contactLetterStylesheetClass).toEqual('co-letter--P');
  });
});
