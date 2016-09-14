import 'angular-translate-handler-log';

export function TranslateConfig($translateProvider) {
  'ngInject';
  $translateProvider
    .useSanitizeValueStrategy('sanitize');
  $translateProvider.useStaticFilesLoader({
    prefix: 'translations/',
    suffix: '.json',
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useMissingTranslationHandlerLog();
}
