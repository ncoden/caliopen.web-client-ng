class LocalStorageHelper {
  constructor($window) {
    'ngInject';
    this.$window = $window;
  }

  findAll(namespace) {
    return Object.keys(this.$window.localStorage)
      .filter(name => name.indexOf(namespace) === 0)
      .map((name) => ({
        id: name.replace(`${namespace}.`, ''),
        value: this.$window.localStorage.getItem(name),
      }));
  }

  findOne(namespace, id) {
    return this.$window.localStorage.getItem(`${namespace}.${id}`);
  }

  save(namespace, id, value) {
    return this.$window.localStorage.setItem(`${namespace}.${id}`, value);
  }

  remove(namespace, id) {
    return this.$window.localStorage.removeItem(`${namespace}.${id}`);
  }
}

export default LocalStorageHelper;
