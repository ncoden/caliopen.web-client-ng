import protocolIcon from './index.js';

import { PROTOCOLS } from './protocol-icon.component.js';

describe('protocolIcon component', () => {
  let $componentController;

  beforeEach(() => {
    angular.mock.module(protocolIcon);
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  it('should be unknown', inject(() => {
    const bindings = { protocol: { } };
    const ctrl = $componentController('protocolIcon', null, bindings);
    ctrl.$onChanges();
    expect(ctrl.protocolClass).toEqual(PROTOCOLS.unknown);
  }));

  it('should be email', inject(() => {
    const bindings = { protocol: { type: 'email' } };
    const ctrl = $componentController('protocolIcon', null, bindings);
    ctrl.$onChanges();
    expect(ctrl.protocolClass).toEqual(PROTOCOLS.email);
  }));
});
