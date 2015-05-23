(() => {
  'use strict';

  let StateActions = function() {
    return Reflux.createActions([
      'filter'
    ]);
  };

  angular
    .module('app')
    .service('StateActions', [StateActions]);
})();
