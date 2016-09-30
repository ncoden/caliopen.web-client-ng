import * as actions from '../action/action-types.js';

export function openPGPMiddleware(
  OpenPGPActions, OpenPGPKeychainRepository, OpenPGPManager
) {
  'ngInject';

  return store => next => action => {
    const result = next(action);

    if (action.type === actions.OPENPGP_FETCH_ALL) {
      store.dispatch(
        OpenPGPActions.receiveAll(OpenPGPKeychainRepository.getPrimaryKeysByFingerprint())
      );
    }

    if (action.type === actions.OPENPGP_GENERATE) {
      const { name, email, passphrase } = action.payload;
      OpenPGPManager.generateKey(name, email, passphrase)
        .then(generated => {
          const fingerprint = generated.key.primaryKey.fingerprint;
          const { publicKeyArmored, privateKeyArmored } = generated;
          store.dispatch(
            OpenPGPActions.generationSucceed(fingerprint, publicKeyArmored, privateKeyArmored)
          );
        });
    }

    if (action.type === actions.OPENPGP_IMPORT_PUBLIC_KEY) {
      const { publicKeyArmored } = action.payload;
      OpenPGPManager.validatePublicKeyChain(publicKeyArmored).then(({ key }) => {
        const { fingerprint } = key.primaryKey;
        store.dispatch(OpenPGPActions.importKeyChainSucceed(
          fingerprint,
          publicKeyArmored
        ));
      }).catch(errors => {
        store.dispatch(OpenPGPActions.importKeyChainFailed(errors));
      });
    }

    if (action.type === actions.OPENPGP_IMPORT_KEY_PAIR) {
      const { publicKeyArmored, privateKeyArmored } = action.payload;

      OpenPGPManager.validateKeyChainPair(publicKeyArmored, privateKeyArmored).then(({ key }) => {
        const { fingerprint } = key.primaryKey;
        store.dispatch(OpenPGPActions.importKeyChainSucceed(
          fingerprint,
          publicKeyArmored,
          privateKeyArmored
        ));
      }).catch(errors => {
        store.dispatch(OpenPGPActions.importKeyChainFailed(errors));
      });
    }

    const actionsRequireSave = [actions.OPENPGP_GENERATION_SUCCEED, actions.OPENPGP_IMPORT_SUCCEED];
    if (actionsRequireSave.indexOf(action.type) !== -1) {
      const { fingerprint, publicKeyArmored, privateKeyArmored } = action.payload;
      store.dispatch(OpenPGPActions.save(fingerprint, publicKeyArmored, privateKeyArmored));
    }

    if (action.type === actions.OPENPGP_SAVE) {
      const { fingerprint, publicKeyArmored, privateKeyArmored } = action.payload;
      OpenPGPKeychainRepository.saveKey(fingerprint, publicKeyArmored, privateKeyArmored);
      store.dispatch(OpenPGPActions.fetchAll());
    }

    if (action.type === actions.OPENPGP_DELETE) {
      const { fingerprint } = action.payload;
      OpenPGPKeychainRepository.deleteKey(fingerprint);
      store.dispatch(OpenPGPActions.fetchAll());
    }

    return result;
  };
}
