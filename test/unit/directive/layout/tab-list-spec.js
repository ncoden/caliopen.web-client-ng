import {LayoutTabListController} from '../../../../src/js/directive/layout/tab-list.js';
import {v1 as uuidV1} from 'uuid';

describe('Directive Layout TabList', () => {
  let getController, fakeTab1, fakeTab2;

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

    fakeTab1  = {
      id: uuidV1(),
      route: 'front.discussions',
    };
    fakeTab2  = {
      id: uuidV1(),
      route: 'front.contacts',
    };
  }));

  describe('constructor', () => {
    it('has no tabs', inject(($rootScope) => {
      let scope = $rootScope.$new();
      let ctrl = getController(scope);
      expect(ctrl.tabs).toEqual([]);
    }));

    it('has tabs', inject(($rootScope, $ngRedux, TabsActions) => {
      $ngRedux.dispatch(TabsActions.addTab( fakeTab1 ));
      $ngRedux.dispatch(TabsActions.addTab( fakeTab2 ));

      let scope = $rootScope.$new();
      let ctrl = getController(scope);
      expect(ctrl.tabs).toEqual([ fakeTab1 ,  fakeTab2 ]);
    }));
  });

  it('remove', inject(($rootScope, $ngRedux, TabsActions) => {
    let tab =  fakeTab1 ;
    $ngRedux.dispatch(TabsActions.addTab(tab));
    $ngRedux.dispatch(TabsActions.addTab( fakeTab2 ));

    let scope = $rootScope.$new();
    let ctrl = getController(scope);
    ctrl.remove(tab);
    expect(ctrl.tabs).toEqual([ fakeTab2 ]);
  }));
});
