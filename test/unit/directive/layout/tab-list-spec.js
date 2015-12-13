import {LayoutTabListController} from '../../../../src/js/directive/layout/tab-list.js';

describe('Directive Layout TabList', () => {
  let getController;

  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .controller('LayoutTabListController', LayoutTabListController);
    angular.mock.module('caliopenApp-test', ($translateProvider) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
    });

  });

  beforeEach(inject(($controller, $state, $ngRedux, TabsActions) => {
    getController = (scope, bindToController = {}) => {
      return $controller('LayoutTabListController', { $scope: scope, $state, $ngRedux, TabsActions }, bindToController);
    };
  }));

  describe('constructor', () => {
    it('has no tabs', inject(($rootScope) => {
      let scope = $rootScope.$new();
      let ctrl = getController(scope);
      expect(ctrl.tabs).toEqual([]);
    }));

    it('has tabs', inject(($rootScope, $ngRedux, TabsActions) => {
      $ngRedux.dispatch(TabsActions.createTab({foo: 'bar'}));
      $ngRedux.dispatch(TabsActions.createTab({foo: 'barbar'}));
      let scope = $rootScope.$new();
      let ctrl = getController(scope);
      expect(ctrl.tabs).toEqual([{foo: 'bar'}, {foo: 'barbar'}]);
    }));
  });

  it('remove', inject(($rootScope, $ngRedux, TabsActions) => {
    let tab = {foo: 'bar'};
    $ngRedux.dispatch(TabsActions.createTab(tab));
    $ngRedux.dispatch(TabsActions.createTab({foo: 'barbar'}));
    let scope = $rootScope.$new();
    let ctrl = getController(scope);
    ctrl.remove(tab);
    expect(ctrl.tabs).toEqual([{ foo: 'barbar' }]);
  }));
});
