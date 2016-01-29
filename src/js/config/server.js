export function BaseUrlFactory($location) {
  'ngInject';
  const defaultAssoc = { http: 80, https: 443 };

  let baseUrl = $location.protocol() + '://' + $location.host();
  if (defaultAssoc[$location.protocol()] === $location.port()) {
    return baseUrl;
  }

  return baseUrl + ':' + $location.port();
}

export function ApiUrlFactory(BaseUrl) {
  'ngInject';
  const API_NAMESPACE = 'api/v1';

  return `${BaseUrl}/${API_NAMESPACE}`;
}
