// eslint-disable-next-line max-len
import { DiscussionsContactsIconController } from '../../../../../src/js/component/section/discussions/contacts-icon.js';

describe('component Discussions contactIcon', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('DiscussionsContactsIconController', DiscussionsContactsIconController);
    angular.mock.module('caliopenApp-test');
  });

  beforeEach(inject(($controller, ContactHelper) => {
    getController = (bindToController = {}) =>
      $controller('DiscussionsContactsIconController', { ContactHelper }, bindToController);
  }));

  it('thread has 3 contacts', () => {
    const ctrl = getController({ thread: { contacts: [
      { title: 'Prof. Farnsworth' },
      { title: 'Leela' },
      { title: 'Bender' },
    ] } });
    expect(ctrl.lettersStylesheetClass).toEqual(['m-letter--p', 'm-letter--l', 'm-letter--b']);
    expect(ctrl.iconClass).toEqual('m-avatars__letter--3');
  });

  it('thread has 4 contacts', inject(() => {
    const ctrl = getController({ thread: { contacts: [
      { title: 'Prof. Farnsworth' },
      { title: 'Leela' },
      { title: 'Bender' },
      { title: 'Fry' },
    ] } });
    expect(ctrl.lettersStylesheetClass).toEqual([
      'm-letter--p',
      'm-letter--l',
      'm-letter--b',
      'm-letter--f',
    ]);
    expect(ctrl.iconClass).toEqual('m-avatars__letter--4');
  }));

  it('thread has many contacts', inject(() => {
    const ctrl = getController({ thread: { contacts: [
      { title: 'Prof. Farnsworth' },
      { title: 'Leela' },
      { title: 'Bender' },
      { title: 'Fry' },
      { title: 'Dr Zoïdberg' },
    ] } });
    expect(ctrl.lettersStylesheetClass).toEqual([
      'm-letter--p',
      'm-letter--l',
      'm-letter--b',
      'm-letter--plus',
    ]);
    expect(ctrl.iconClass).toEqual('m-avatars__letter--4');
  }));
});
