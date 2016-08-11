function GetFocusDirective() {
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      scope.$on(attrs.getFocus, () => {
        element.focus();
      });
    },
  };
}

export default GetFocusDirective;
