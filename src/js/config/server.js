export function BaseUrlFactory($location) {
  'ngInject';
  const defaultAssoc = { http: 80, https: 443 };

  const baseUrl = `${$location.protocol()}://${$location.host()}`;
  if (defaultAssoc[$location.protocol()] === $location.port()) {
    return baseUrl;
  }

  return `${baseUrl}:${$location.port()}`;
}

export function ApiUrlFactory(BaseUrl) {
  'ngInject';
  const API_NAMESPACE = 'api/v1';

  return `${BaseUrl}/${API_NAMESPACE}`;
}

export function ApiInterceptorConfig($httpProvider) {
  'ngInject';
  $httpProvider.interceptors.push(($q, $rootScope, $window, BaseUrl) => {
    'ngInject';

    return {
      responseError: rejection => {
        if (rejection.status === 401) {
          $window.location.href = BaseUrl; // eslint-disable-line no-param-reassign
        }

        return $q.reject(rejection); // eslint-disable-line newline-before-return
      },
    };
  });
}
