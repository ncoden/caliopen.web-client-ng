export class UserRepository {
  constructor($http, BaseUrl) {
    'ngInject';
    this.$http = $http;
    this.BaseUrl = BaseUrl;
  }

  getUser() {
    return this.$http.get(this.BaseUrl + '/auth/user-info')
      .then(response => response.data);;
  }
}
