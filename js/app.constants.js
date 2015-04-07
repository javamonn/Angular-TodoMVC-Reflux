(function() {
  'use strict';

  angular
    .module('app')
    .contant('TodoConstants', {
      TODO_CREATE: 'TODO_CREATE',
      TODO_COMPLETE: 'TODO_COMPLETE',
      TODO_DESTROY: 'TODO_DESTROY',
      TODO_DESTROY_COMPLETED: 'TODO_DESTROY_COMPLETED',
      TODO_TOGGLE_COMPLETE_ALL: 'TODO_TOGGLE_COMPLETE_ALL',
      TODO_UNDO_COMPLETE: 'TODO_UNDO_COMPLETE',
      TODO_UPDATE_TEXT: 'TODO_UPDATE_TEXT'
    });
})();
