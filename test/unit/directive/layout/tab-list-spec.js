import { LayoutTabListController } from '../../../../src/js/directive/layout/tab-list.js';

describe('Directive Layout TabList', () => {
  let getController;
  let fakeTab1;
  let fakeTab2;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('LayoutTabListController', LayoutTabListController);
    angular.mock.module('caliopenApp-test', ($translateProvider) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
    });
  });

  beforeEach(inject(($controller, $state, $ngRedux, TabsActions) => {
    getController = (scope, bindToController = {}) =>
      $controller(
        'LayoutTabListController',
        { $scope: scope, $state, $ngRedux, TabsActions },
        bindToController);

    fakeTab1 = {
      route: 'front.discussions',
    };
    fakeTab2 = {
      route: 'front.contacts',
    };
  }));

  describe('constructor', () => {
    it('has no tabs', inject(($rootScope) => {
      const scope = $rootScope.$new();
      const ctrl = getController(scope);
      expect(ctrl.tabs).toEqual([]);
    }));

    it('has tabs', inject(($rootScope, $ngRedux, TabsActions) => {
      $ngRedux.dispatch(TabsActions.addTab(fakeTab1));
      $ngRedux.dispatch(TabsActions.addTab(fakeTab2));

      const scope = $rootScope.$new();
      const ctrl = getController(scope);
      expect(ctrl.tabs).toEqual([fakeTab1, fakeTab2]);
    }));
  });

  it('remove', inject(($rootScope, $ngRedux, TabsActions) => {
    const tab = fakeTab1;
    $ngRedux.dispatch(TabsActions.addTab(tab));
    $ngRedux.dispatch(TabsActions.addTab(fakeTab2));

    const scope = $rootScope.$new();
    const ctrl = getController(scope);
    ctrl.remove(tab);
    expect(ctrl.tabs).toEqual([fakeTab2]);
  }));
});
