export /* @ngInject */ function RouterConfig ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('front', {
      abstract: true,
      views: {
        'header': {
          template: '<co-header></co-header>'
        }
      }
    })
    .state('front.discussions', {
      url: '/',
      views: {
        '@': {
          template: '<co-discussions></co-discussions>'
        }
      }
    });

    $urlRouterProvider.otherwise('/');
}
