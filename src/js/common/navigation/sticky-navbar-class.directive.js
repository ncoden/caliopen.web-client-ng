function stickyNavbarClassDirective($document, $window) {
  'ngInject';

  return {
    link: (scope, element, attr) => {
      const cssClass = attr.stickyNavbarClass;

      $document.on('scroll', () => {
        const scrollSize = $document[0].documentElement.scrollTop || $window.scrollY;

        if (scrollSize < 10) {
          element.removeClass(cssClass);
        } else {
          element.addClass(cssClass);
        }
      });
    },
  };
}

export default stickyNavbarClassDirective;
