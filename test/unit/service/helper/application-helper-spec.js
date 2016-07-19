import { ApplicationHelper } from '../../../../src/js/service/helper/application-helper.js';

describe('Service Helper ApplicationHelper', () => {
  beforeEach(() => {
    angular.module('caliopenApp-test', ['caliopenApp'])
      .service('ApplicationHelper', ApplicationHelper);

    angular.mock.module('caliopenApp-test', ($translateProvider, $provide) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
      $provide.decorator('$httpBackend', ($delegate, ApiUrl) => {
        $delegate.whenRoute('GET', `${ApiUrl}/me`).respond(200, { });

        return $delegate;
      });
    });
  });

  let applicationHelper;

  beforeEach(inject((_ApplicationHelper_) => {
    applicationHelper = _ApplicationHelper_;
  }));

  describe('getInfos', () => {
    it('give infos', () => {
      expect(applicationHelper.getInfos('discussions')).toEqual({
        name: 'discussions',
        route: 'front.discussions',
        icon: 'fa-comments',
      });
    });

    it('give infos', () => {
      expect(applicationHelper.getInfos('contacts')).toEqual({
        name: 'contacts',
        route: 'front.contacts',
        icon: 'fa-users',
      });
    });
  });

  describe('getInfosFromRoute', () => {
    it('retrieves an app', () => {
      expect(applicationHelper.getInfosFromRoute('front.contacts')).toEqual({
        name: 'contacts',
        route: 'front.contacts',
        icon: 'fa-users',
      });
    });

    it('does not retrieve an app', () => {
      expect(applicationHelper.getInfosFromRoute('front.contact')).toEqual(undefined);
    });
  });

  it('getApplications', () => {
    expect(applicationHelper.getApplications().length).toEqual(2);
  });
});
