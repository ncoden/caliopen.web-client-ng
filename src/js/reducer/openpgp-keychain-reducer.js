import * as actions from '../action/action-types.js';

const initialState = {
  isLoading: false,
  keychainByFingerprint: {},
  privateKeys: [],
  importForm: {},
};

const initialImportFormState = {
  errors: {},
};

function importFormReducer(state = initialImportFormState, action) {
  switch (action.type) {
    case actions.OPENPGP_IMPORT_PUBLIC_KEY:
      return {
        ...initialImportFormState,
        publicKeyArmored: action.payload.publicKeyArmored,
      };
    case actions.OPENPGP_IMPORT_KEY_PAIR:
      return {
        ...initialImportFormState,
        publicKeyArmored: action.payload.publicKeyArmored,
        privateKeyArmored: action.payload.privateKeyArmored,
      };
    case actions.OPENPGP_IMPORT_FAILED:
      return { ...state, errors: action.payload.errors };
    case actions.OPENPGP_IMPORT_SUCCEED:
    case actions.OPENPGP_IMPORT_CANCEL:
      return initialImportFormState;
    default:
      return state;
  }
}

function privateKeysReducer(state = [], action) {
  if (action.type !== actions.OPENPGP_RECEIVE_ALL) {
    return state;
  }

  return Object.keys(action.payload.keychainByFingerprint)
    .filter(fingerprint => !!action.payload.keychainByFingerprint[fingerprint].privateKeyArmored);
}

function openPGPKeychainReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.OPENPGP_GENERATE:
      return { ...state, isLoading: true };
    case actions.OPENPGP_GENERATION_SUCCEED:
      return { ...state, isLoading: false };
    case actions.OPENPGP_IMPORT_KEY_PAIR:
    case actions.OPENPGP_IMPORT_PUBLIC_KEY:
    case actions.OPENPGP_IMPORT_FAILED:
    case actions.OPENPGP_IMPORT_SUCCEED:
    case actions.OPENPGP_IMPORT_CANCEL:
      return { ...state, importForm: importFormReducer(state.importForm, action) };
    case actions.OPENPGP_RECEIVE_ALL:
      return {
        ...state,
        keychainByFingerprint: action.payload.keychainByFingerprint,
        privateKeys: privateKeysReducer(state.privateKeys, action),
      };
    default:
      return state;
  }
}

export default openPGPKeychainReducer;
