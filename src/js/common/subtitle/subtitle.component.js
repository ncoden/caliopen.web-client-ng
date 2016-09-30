const SubtitleComponent = {
  bindings: {
    props: '<?',
  },
  transclude: {
    text: 'text',
    actions: '?actions',
  },
  template: `
    <div class="m-subtitle" ng-class="{ 'm-subtitle--hr': !!$ctrl.props.hr }">
      <h3 class="m-subtitle__text" ng-transclude="text"></h3>
      <span ng-transclude="actions"></span>
    </div>
  `,
};

export default SubtitleComponent;
