import {DiscussionsContactsIconController} from '../../../../src/js/directive/discussions/contacts-icon.js';

describe('Directive Discussions contactIcon', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('DiscussionsContactsIconController', DiscussionsContactsIconController);
    angular.mock.module('caliopenApp-test');
  });

  beforeEach(inject(($controller, ContactHelper) => {
    getController = (bindToController = {}) => {
      return $controller('DiscussionsContactsIconController', { ContactHelper }, bindToController);
    };
  }));

  it('thread has 3 contacts', () => {
    let ctrl = getController({ thread: { contacts: [
      { title: 'Prof. Farnsworth'},
      { title: 'Leela' },
      { title: 'Bender'},
    ] } });
    expect(ctrl.lettersStylesheetClass).toEqual(['co-letter--P', 'co-letter--L', 'co-letter--B']);
    expect(ctrl.iconClass).toEqual('co-avatars__letter--3')
  });
  it('thread has 4 contacts', inject((ThreadRepository, MessageRepository) => {
    let ctrl = getController({ thread: { contacts: [
      { title: 'Prof. Farnsworth'},
      { title: 'Leela' },
      { title: 'Bender'},
      { title: 'Fry' },
    ] } });
    expect(ctrl.lettersStylesheetClass).toEqual(['co-letter--P', 'co-letter--L', 'co-letter--B', 'co-letter--F']);
    expect(ctrl.iconClass).toEqual('co-avatars__letter--4')
  }));
  it('thread has many contacts', inject((ThreadRepository, MessageRepository) => {
    let ctrl = getController({ thread: { contacts: [
      { title: 'Prof. Farnsworth'},
      { title: 'Leela' },
      { title: 'Bender'},
      { title: 'Fry' },
      { title: 'Dr Zoïdberg'},
    ] } });
    expect(ctrl.lettersStylesheetClass).toEqual(['co-letter--P', 'co-letter--L', 'co-letter--B', 'co-letter--plus']);
    expect(ctrl.iconClass).toEqual('co-avatars__letter--4')
  }));
});
