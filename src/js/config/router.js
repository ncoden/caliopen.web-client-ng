export function RouterConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  const uiView = { template: '<co-layout-application-wrapper></co-layout-application-wrapper>' };

  $stateProvider
    .state('front', {
      abstract: true,
      views: {
        header: {
          template: '<co-header></co-header>',
        },
        '@': uiView,
      },
    })
    .state('front.discussions', {
      url: '/',
      views: {
        '@': uiView,
      },
    })
    .state('front.discussions.thread', {
      url: 'threads/{threadId}',
      views: {
        '@': uiView,
      },
    })
    .state('front.contacts', {
      url: '/contacts',
      views: {
        '@': uiView,
      },
    })
    .state('front.contacts.contact', {
      url: '/{contactId}',
      views: {
        '@': uiView,
      },
    });

  $urlRouterProvider.otherwise('/');
}
