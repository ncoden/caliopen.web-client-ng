export /* @ngInject */ function RouterConfig ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('front', {
      abstract: true,
      views: {
        'header': {
          template: '<co-header></co-header>'
        },
        '@': {
          template: '<co-layout-application-wrapper></co-layout-application-wrapper>'
        }
      }
    })
    .state('front.discussions', {
      url: '/',
    });

    $urlRouterProvider.otherwise('/');
}
