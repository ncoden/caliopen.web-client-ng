export function GetFocusDirective() {
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      scope.$on(attrs.getFocus, () => {
        element.focus();
      });
    },
  };
}
