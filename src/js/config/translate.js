export /* @ngInject */ function TranslateConfig($translateProvider) {
  $translateProvider
    .useSanitizeValueStrategy('sanitize');
  $translateProvider.useStaticFilesLoader({
        prefix: 'translations/',
        suffix: '.json'
    });
  $translateProvider.preferredLanguage('en') ;
}
