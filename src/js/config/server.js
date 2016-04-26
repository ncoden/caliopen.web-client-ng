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
  $httpProvider.interceptors.push(($q, $rootScope, $window, BaseUrl, FlashMessageHelper) => {
    'ngInject';

    return {
      responseError: rejection => {
        switch (rejection.status) {
          case 401:
            $window.location.href = BaseUrl; // eslint-disable-line no-param-reassign
            break;
          case 500:
            FlashMessageHelper.alert('Internal Server Error');
            break;
          default:
            break;
        }

        return $q.reject(rejection); // eslint-disable-line newline-before-return
      },
    };
  });
}
