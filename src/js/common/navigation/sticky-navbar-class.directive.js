function stickyNavbarClassDirective($document, $window) {
  'ngInject';

  return {
    link: (scope, element, attr) => {
      const cssClass = attr.stickyNavbarClass;

      const onScrollHandler = () => {
        const scrollSize = $document[0].documentElement.scrollTop || $window.scrollY;

        if (scrollSize < 10) {
          element.removeClass(cssClass);
        } else {
          element.addClass(cssClass);
        }
      };

      $document.on('scroll', onScrollHandler);
      scope.$on('$destroy', () => $document.off('scroll', onScrollHandler));
    },
  };
}

export default stickyNavbarClassDirective;
