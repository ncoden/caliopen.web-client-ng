import { ApplicationHelper } from '../../../../src/js/service/helper/application-helper.js';

describe('Service Helper ApplicationHelper', () => {
  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .service('ApplicationHelper', ApplicationHelper);

    angular.mock.module('caliopenApp-test', ($translateProvider) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
    });
  });

  let applicationHelper;
  let $state;
  let $rootScope;

  beforeEach(inject((_ApplicationHelper_, _$state_, _$rootScope_) => {
    applicationHelper = _ApplicationHelper_;
    $state = _$state_;
    $rootScope = _$rootScope_;
  }));

  describe('getCurrentInfos', () => {
    it('give default state infos', () => {
      $rootScope.$digest();

      expect(applicationHelper.getCurrentInfos()).toEqual({
        name: 'discussions',
        route: 'front.discussions',
      });
    });

    it('give current state infos', () => {
      $state.go('front.contacts');
      $rootScope.$digest();

      expect(applicationHelper.getCurrentInfos()).toEqual({
        name: 'contacts',
        route: 'front.contacts',
      });
    });
  });
});
