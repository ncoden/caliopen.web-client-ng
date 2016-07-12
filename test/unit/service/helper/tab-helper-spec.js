import { TabHelper } from '../../../../src/js/service/helper/tab-helper.js';

describe('Service Helper TabHelper', () => {
  const tabHelper = new TabHelper();

  describe('getRouteAndParamsForTab', () => {
    it('get a simple route', () => {
      expect(tabHelper.getRouteAndParamsForTab({
        type: 'thread',
        item: { thread_id: '$p3ci4l' },
      })).toEqual({
        route: 'front.thread',
        params: { threadId: '$p3ci4l' },
      });
    });
  });
});
