// XXX: it seems translate cannot be loadined multiple times
// import contactModule from '../../index.js';
const moduleName = 'caliopenApp';

describe('component RemoteIdentityEmail', () => {
  let $componentController;

  beforeEach(() => {
    angular.mock.module(moduleName);
  });

  beforeEach(angular.mock.inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  it('init form', () => {
    const ctrl = $componentController('remoteIdentityEmail', null, { });

    expect(ctrl).toBeDefined();
    ctrl.$onInit();
    expect(ctrl.phase).toEqual(1);
  });

  describe('updateParams', () => {
    it('on new item', () => {
      const ctrl = $componentController('remoteIdentityEmail', null, { });

      ctrl.$onInit();
      ctrl.$onChanges({ remoteIdentity: true });

      const property = 'login';
      const $event = {
        model: 'foo',
      };
      ctrl.updateParams(property, $event);

      expect(JSON.stringify(ctrl.remoteIdentity.params)).toEqual(JSON.stringify({
        login: $event.model,
      }));
    });

    it('on existing item', () => {
      const bindings = {
        remoteIdentity: {
          params: {
            foo: 'bar',
          },
        },
      };
      const ctrl = $componentController('remoteIdentityEmail', null, bindings);

      ctrl.$onInit();
      ctrl.$onChanges({ remoteIdentity: true });

      const property = 'login';
      const $event = {
        model: 'foo',
      };
      ctrl.updateParams(property, $event);

      expect(JSON.stringify(ctrl.remoteIdentity.params)).toEqual(JSON.stringify({
        ...bindings.remoteIdentity.params,
        login: $event.model,
      }));
    });
  });

  it('disconnect', () => {
    const bindings = {
      remoteIdentity: {
        params: {
          foo: 'bar',
        },
      },
      onDisconnect: jasmine.createSpy('onDisconnect'),
    };
    const ctrl = $componentController('remoteIdentityEmail', null, bindings);

    ctrl.$onInit();
    ctrl.$onChanges({ remoteIdentity: true });

    ctrl.disconnect();

    expect(bindings.onDisconnect).toHaveBeenCalled();
  });

  describe('finish', () => {
    it('not validated', () => {
      const bindings = {
        remoteIdentity: {
          params: {
            foo: 'bar',
          },
        },
        onConnect: jasmine.createSpy('onConnect'),
      };
      const ctrl = $componentController('remoteIdentityEmail', null, bindings);

      ctrl.$onInit();
      ctrl.$onChanges({ remoteIdentity: true });

      ctrl.finish();

      expect(bindings.onConnect).not.toHaveBeenCalled();
      expect(Object.keys(ctrl.formErrors).length).toEqual(6);
    });

    it('connect', () => {
      const bindings = {
        remoteIdentity: {
          params: {
            login: 'foo',
            password: 'bar',
            mailProtocol: 'IMAP',
            incommingMailServer: 'foobar',
            mailPort: '998',
            fetchMethod: 'from_now',
          },
        },
        onConnect: jasmine.createSpy('onConnect'),
      };
      const ctrl = $componentController('remoteIdentityEmail', null, bindings);

      ctrl.$onInit();
      ctrl.$onChanges({ remoteIdentity: true });

      ctrl.finish();

      expect(bindings.onConnect).toHaveBeenCalled();
    });
  });
});
