const STEP_SIZE = 200;
const SIZE_UNIT = 'px';

function HorizontalScrollDirective() {
  'ngInject';

  return {
    restrict: 'A',
    link: (scope, element) => {
      const $anchors = element.find('[horizontal-scroll-anchor]');
      const $container = element.find('[horizontal-scroll-container]')[0];
      const $visibleZone = element.find('[horizontal-scroll-visible-zone]')[0];

      const getAnchorDirection = ($element) =>
        $element.attributes['horizontal-scroll-anchor'].value;

      const init = () => {
        $container.style.left = 0;
      };

      const getDistance = (direction) => {
        const velocity = direction === 'right' ? -1 : 1;
        const remain = (direction === 'right') ?
          $container.clientWidth + $container.offsetLeft - $visibleZone.clientWidth :
          -1 * $container.offsetLeft;

        return velocity * Math.min(STEP_SIZE, Math.max(remain, 0));
      };

      const moveContainer = ({ direction }) => {
        const distance = getDistance(direction);
        if (!!distance) {
          $container.style.left = `${$container.offsetLeft + distance}${SIZE_UNIT}`;
        }
      };

      $anchors.on('click', (ev) => moveContainer({
        direction: getAnchorDirection(ev.currentTarget),
      }));

      init();
    },
  };
}

export default HorizontalScrollDirective;
