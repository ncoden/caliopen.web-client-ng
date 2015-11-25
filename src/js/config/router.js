export /* @ngInject */ function RouterConfig ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('front', {
      abstract: true,
      views: {
        'header': {
          template: '<h1>Caliopen</h1>'
        }
      }
    })
    .state('front.discussions', {
      url: '/',
      views: {
        '@': {
          template: '<p>Hello world</p>'
        }
      }
    });

    $urlRouterProvider.otherwise('/');
}
