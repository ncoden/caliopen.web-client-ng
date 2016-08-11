import applicationManager from './index.js';

describe('Service ApplicationManager', () => {
  let ApplicationManager;

  beforeEach(() => {
    angular.mock.module(applicationManager);
  });

  beforeEach(inject((_ApplicationManager_) => {
    ApplicationManager = _ApplicationManager_;
  }));

  describe('getInfos', () => {
    it('give infos', () => {
      expect(ApplicationManager.getInfos('discussions')).toEqual({
        name: 'discussions',
        route: 'discussions',
        icon: 'fa-comments',
      });
    });

    it('give infos', () => {
      expect(ApplicationManager.getInfos('contacts')).toEqual({
        name: 'contacts',
        route: 'contact-list',
        icon: 'fa-users',
      });
    });
  });

  describe('getInfosFromRoute', () => {
    it('retrieves an app', () => {
      expect(ApplicationManager.getInfosFromRoute('contact-list')).toEqual({
        name: 'contacts',
        route: 'contact-list',
        icon: 'fa-users',
      });
    });

    it('does not retrieve an app', () => {
      expect(ApplicationManager.getInfosFromRoute('contact')).toEqual(undefined);
    });
  });

  it('getApplications', () => {
    expect(ApplicationManager.getApplications().length).toEqual(2);
  });
});
