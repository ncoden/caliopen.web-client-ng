const moduleName = 'caliopenApp';

describe('component Layout TabList', () => {
  let fakeTab1;
  let fakeTab2;
  let $componentController;

  beforeEach(() => {
    // TODO: dependency on root app component to remove
    angular.mock.module(moduleName);
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
    fakeTab1 = {
      routeName: 'thread',
      routeParams: { thread_id: 'foo' },
    };
    fakeTab2 = {
      routeName: 'contact',
      routeParams: { contact_id: 'bar' },
    };
  }));

  describe('constructor', () => {
    it('has no tabs', () => {
      const ctrl = $componentController('tabList');
      expect(ctrl.tabs).toEqual([]);
    });

    it('has tabs', inject(($ngRedux, TabsActions) => {
      $ngRedux.dispatch(TabsActions.addTab(fakeTab1));
      $ngRedux.dispatch(TabsActions.addTab(fakeTab2));

      const ctrl = $componentController('tabList');
      expect(ctrl.tabs).toEqual([fakeTab1, fakeTab2]);
    }));
  });

  it('remove', inject(($ngRedux, TabsActions) => {
    const tab = fakeTab1;
    $ngRedux.dispatch(TabsActions.addTab(tab));
    $ngRedux.dispatch(TabsActions.addTab(fakeTab2));

    const ctrl = $componentController('tabList');
    ctrl.remove(tab);
    expect(ctrl.tabs).toEqual([fakeTab2]);
  }));
});
