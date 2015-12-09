import {DiscussionsThreadController} from '../../../../src/js/directive/discussions/thread.js';

describe('Directive Discussions Thread', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('DiscussionsThreadController', DiscussionsThreadController);
    angular.mock.module('caliopenApp-test');
  });

  beforeEach(inject(($controller) => {
    getController = (bindToController = {}) => {
      return $controller('DiscussionsThreadController', { }, bindToController);
    };
  }));

  it('thread has no unread', () => {
    let ctrl = getController({ thread: { unread_count: 0 } });
    expect(ctrl.hasUnread).toEqual(false);
  });
  it('thread has unread', () => {
    let ctrl = getController({ thread: { unread_count: 3 } });
    expect(ctrl.hasUnread).toEqual(true);
  });
});
