(function() {
  'use strict';

  angular
    .module('app')
    .service('TodoActions', ['TodoDispatcher', 'TodoConstants', TodoActions]);

  function TodoActions(TodoDispatcher, TodoConstants) {
    var create = function(text) {
      TodoDispatcher.dispatch({
        actionType: TodoConstants.TODO_CREATE,
        text: text
      });
    };

    var updateText = function(id, text) {
      TodoDispatcher.dipatch({
        actionType: TodoConstants.TODO_UPDATE_TEXT,
        id: id,
        text: text
      });
    };

    var toggleComplete = function(todo) {
      var id = todo.id;
      if (todo.complete) {
        TodoDispatcher.dispatch({
          actionType: TodoConstants.TODO_UNDO_COMPLETE,
          id: id
        });
      } else {
        TodoDispatcher.dispatch({
          actionType: TodoConstants.TODO_COMPLETE,
          id: id
        });
      }
    };

    var toggleCompleteAll = function() {
      TodoDispatcher.dispatch({
        actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
      });
    };

    var destroy = function(id) {
      TodoDispatcher.dispatch({
        actionType: TodoConstants.TODO_DESTROY,
        id: id
      });
    };

    var destroyCompleted = function() {
      TodoDispatcher.dispatch({
        actionType: TodoConstants.TODO_DESTROY_COMPLETED
      });
    };

    return {
      create: create,
      updateText: updateText,
      toggleComplete: toggleComplete,
      toggleCompleteAll: toggleCompleteAll,
      destroy: destroy,
      desrtoyCompleted: destroyCompleted
    };
  }
})();
