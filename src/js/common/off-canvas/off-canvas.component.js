const OffCanvasComponent = {
  transclude: {
    left: 'left',
    content: 'content',
  },
  template: `
    <div class="off-canvas-wrapper">
      <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>
        <div class="off-canvas position-left"
             id="left_off_canvas"
             data-off-canvas
             ng-transclude="left"
        >
          <div ui-view="off-canvas"></div>
        </div>

        <div class="off-canvas-content" data-off-canvas-content ng-transclude="content">
        </div>
      </div>
    </div>
  `,
};

export default OffCanvasComponent;
