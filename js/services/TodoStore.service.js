(function() {
  'use strict';

  angular
    .module('app')
    .service('TodoStore', ['$rootScope', 'TodoDispatcher', 'TodoConstants', TodoStore]);

  var CHANGE_EVENT = 'change';

  var _todos = {};

  function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
      id: id,
      complete: false,
      text: text
    }
  }

  function update(id, update) {
    _todos[id] = R.merge(_todos[id], update);
  }

  function updateAll(updates) {
    _todos.forEach(function(todo) {
      update(todo.id, updates);
    });
  }

  function destroy(id) {
    delete _todos[id];
  }

  function destroyCompleted() {
    _todos.forEach(function(todo) {
      if (todo.complete) {
        destroy(todo.id);
      }
    });
  }

  function TodoStore($rootScope, TodoDispatcher, TodoConstants) {
    TodoDispatcher.register(function(action) {
      var text;
      switch(action.actionType) {
        case TodoConstants.TODO_CREATE:
          text = action.text.trim();
          if (text != '') {
            create(text);
            TodoStore.emitChange(CHANGE_EVENT);
          }
          break;
        case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
          if (TodoStore.areAllComplete()) {
            updateAll({complete: 'false'});
          }
          else {
            updateAll({complete: 'true'});
          }
          TodoStore.emitChange(CHANGE_EVENT);
          break;
        case TodoConstants.TODO_UNDO_COMPLETE:
          update(action.id, {complete: 'false'});
          TodoStore.emitChange(CHANGE_EVENT);
          break;
        case TodoConstants.TODO_COMPLETE:
          update(action.id, {complete: 'true'});
          TodoStore.emitChange(CHANGE_EVENT);
          break;
        case TodoConstants.TODO_UPDATE_TEXT:
          text = action.text.trim();
          if (text != '') {
            update(action.id, {text: text});
            TodoStore.emitChange(CHANGE_EVENT);
          }
          break;
        case TodoConstants.TODO_DESTROY:
          destroy(action.id);
          TodoStore.emitChange(CHANGE_EVENT);
          break;
        case TodoConstants.TODO_DESTROY_COMPLETED:
          destroyCompleted();
          TodoStore.emitChange(CHANGE_EVENT);
          break;
        case default:
          // nop
      }
    });

    registeredListeners = [];

    return {
      areAllComplete: function() {
        R.defaultTo(true, 
          R.forEach(_todos, function(todo) {
            if (!todo.complete) {
              return false;
            }
          })
        );
      },
      getAll: function() {
        return _todos;
      },
      emitChange: function() {
        $rootScope.emit(CHANGE_EVENT); 
      },
      addChangeListener: function(callback) {
        registeredListeners.push($rootScope.on(CHANGE_EVENT, callback));
      },
      removeChangeListener: function(callback) {
        var fn = R.find(callback, registeredListeners);
        if (fn) {
          fn();
        }
      }
    };
  }

})();
