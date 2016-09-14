import openPGPManager from './index.js';
const moduleName = 'caliopenApp';

describe('Service OpenPGPManager', () => {
  let OpenPGPManager;

  beforeEach(() => {
    angular.mock.module(openPGPManager);
    angular.mock.module(moduleName, ($provide, $translateProvider) => {
      $translateProvider.translations('en', {});
      $translateProvider.preferredLanguage('en');
    });
  });

  beforeEach(inject((_OpenPGPManager_) => {
    OpenPGPManager = _OpenPGPManager_;
  }));

  it('init', () => {
    expect(OpenPGPManager).toBeDefined();
  });
});
