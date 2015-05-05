(() => {
  'use strict';

  let TodoActions = function() {
    return Reflux.createActions([
      'create',
      'updateText',
      'toggleComplete',
      'toggleCompleteAll',
      'destroy',
      'destroyCompleted'
    ]);
  };

  angular
    .module('app')
    .service('TodoActions', [TodoActions]);
})();
