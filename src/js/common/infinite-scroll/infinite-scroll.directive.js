const THROTTLE_INTERVAL = 1000;

export default function infiniteScrollDirective($document, $window, $timeout) {
  'ngInject';

  return {
    link: (scope, elem, attr) => {
      const rawTarget = $document[0].documentElement;
      let isThrottling = false;

      const onScrollHandler = () => {
        const scrollSize = rawTarget.scrollTop || $window.scrollY;
        const scrollHeight = rawTarget.scrollHeight;
        const clientHeight = rawTarget.clientHeight;

        if (!isThrottling && scrollHeight - (clientHeight + scrollSize) <= 100) {
          scope.$eval(attr.infiniteScroll);
          isThrottling = true;
          $timeout(() => {
            isThrottling = false;
          }, THROTTLE_INTERVAL);
        }
      };

      $document.on('scroll', onScrollHandler);
      scope.$on('$destroy', () => $document.off('scroll', onScrollHandler));
    },
  };
}
