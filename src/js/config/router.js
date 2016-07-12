export function RouterConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  const uiView = { template: '<co-layout-application-wrapper></co-layout-application-wrapper>' };

  $stateProvider
    .state('front', {
      abstract: true,
      views: {
        header: {
          template: '<co-layout-header></co-layout-header>',
        },
        'off-canvas': {
          template: '<co-layout-navigation-alt></co-layout-navigation-alt>',
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
    .state('front.thread', {
      url: '/threads/{threadId}',
      views: {
        '@': uiView,
      },
    })
    // TODO: API needs to support draft
    .state('front.draft', {
      url: '/thread-draft/{messageId}',
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
    .state('front.contact', {
      url: '/contacts/{contactId}',
      views: {
        '@': uiView,
      },
    });

  $urlRouterProvider.otherwise('/');
}
