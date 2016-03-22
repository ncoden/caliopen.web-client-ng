import { DiscussionsThreadController } from '../../../../src/js/directive/discussions/thread.js';

describe('Directive Discussions Thread', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('DiscussionsThreadController', DiscussionsThreadController);
    angular.mock.module('caliopenApp-test');
  });

  beforeEach(inject(($controller, $state, $ngRedux, TabsActions) => {
    getController = (bindToController = {}) =>
      $controller(
        'DiscussionsThreadController',
        { $state, $ngRedux, TabsActions },
        bindToController);
  }));

  it('thread has no unread', () => {
    const ctrl = getController({ thread: { unread_count: 0 } });
    expect(ctrl.hasUnread).toEqual(false);
  });
  it('thread has unread', () => {
    const ctrl = getController({ thread: { unread_count: 3 } });
    expect(ctrl.hasUnread).toEqual(true);
  });
});
