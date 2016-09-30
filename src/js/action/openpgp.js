import * as actions from './action-types.js';

class OpenPGPActions {

  generate(name, email, passphrase) {
    return {
      type: actions.OPENPGP_GENERATE,
      payload: {
        name,
        email,
        passphrase,
      },
    };
  }

  generationSucceed(fingerprint, publicKeyArmored, privateKeyArmored) {
    return {
      type: actions.OPENPGP_GENERATION_SUCCEED,
      payload: {
        fingerprint,
        publicKeyArmored,
        privateKeyArmored,
      },
    };
  }

  importPublicKeyChain(publicKeyArmored) {
    return {
      type: actions.OPENPGP_IMPORT_PUBLIC_KEY,
      payload: { publicKeyArmored },
    };
  }

  importKeyPairChains(publicKeyArmored, privateKeyArmored) {
    return {
      type: actions.OPENPGP_IMPORT_KEY_PAIR,
      payload: { publicKeyArmored, privateKeyArmored },
    };
  }

  importKeyChainSucceed(fingerprint, publicKeyArmored, privateKeyArmored) {
    return {
      type: actions.OPENPGP_IMPORT_SUCCEED,
      payload: { fingerprint, publicKeyArmored, privateKeyArmored },
    };
  }

  importKeyChainFailed(errors) {
    return {
      type: actions.OPENPGP_IMPORT_FAILED,
      payload: { errors },
    };
  }

  importKeyChainCancel() {
    return {
      type: actions.OPENPGP_IMPORT_CANCEL,
      payload: {},
    };
  }

  save(fingerprint, publicKeyArmored, privateKeyArmored) {
    return {
      type: actions.OPENPGP_SAVE,
      payload: {
        fingerprint,
        publicKeyArmored,
        privateKeyArmored,
      },
    };
  }

  fetchAll() {
    return {
      type: actions.OPENPGP_FETCH_ALL,
      payload: {},
    };
  }

  receiveAll(keychainByFingerprint) {
    return {
      type: actions.OPENPGP_RECEIVE_ALL,
      payload: {
        keychainByFingerprint,
      },
    };
  }

  deleteKey(fingerprint) {
    return {
      type: actions.OPENPGP_DELETE,
      payload: {
        fingerprint,
      },
    };
  }
}

export default OpenPGPActions;
