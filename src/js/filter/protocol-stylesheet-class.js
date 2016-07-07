export const UNKNOWN_PROTOCOL_TYPE = 'unknown';

export function protocolStylesheetClassFilter(protocolsConfig) {
  'ngInject';

  return (protocol) => {
    const type = (!!protocol && !!protocol.type) ? protocol.type : UNKNOWN_PROTOCOL_TYPE;

    return protocolsConfig[type].iconClass;
  };
}
