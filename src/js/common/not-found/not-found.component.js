const NotFoundComponent = {
  transclude: {
    title: '?title',
    'sub-title': '?subTitle',
    message: '?message',
    'still-lost': '?stillLost',
  },
  template: `
    <div class="m-not-found">
      <div class="m-subtitle m-subtitle--hr">
        <h3 class="m-subtitle__text" ng-transclude="title">
          {{ 'not-found.title'|translate}}
        </h3>
      </div>
      <div class="m-not-found__sub-title" ng-transclude="sub-title">
        <p>{{ 'not-found.sub-title'|translate}}</p>
        <div class="m-not-found__unicorn"></div>
      </div>
      <div class="m-not-found__message" ng-transclude="message"></div>
      <div class="m-not-found__still-lost" ng-transclude="still-lost">
        {{ 'not-found.still-lost'|translate}}
        <a class="m-link" ui-sref="discussions">{{ 'not-found.action.back-to-home'|translate }}</a>
      </div>
    </div>
  `,
};

export default NotFoundComponent;
