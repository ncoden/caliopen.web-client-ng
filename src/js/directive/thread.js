class ThreadController {
  /* @ngInject */
  constructor($state) {
    const threadId = $state.params.threadId;
  }
}

export function ThreadDirective() {
  return {
    restrict: 'E',
    controller: ThreadController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="container-fluid">
        <co-thread-message ng-repeat="message in ctrl.messages"></co-thread-message>
      </div>`
  };
}
