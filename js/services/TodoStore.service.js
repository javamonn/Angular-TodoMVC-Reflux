(function() {
  'use strict';

  angular
    .module('app')
    .service('TodoStore', ['$rootScope', 'TodoDispatcher', 'TodoConstants', TodoStore]);

  var CHANGE_EVENT = 'change';

  var store = {
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
    broadcastChange: function() {
      // TODO - Not sure if rootscope is the best way to do this
      //$rootScope.broadcast(CHANGE_EVENT); 
    },
    addChangeListener: function(callback) {
      // TODO
      //$rootScope.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      // TODO  
    }
  }

  function TodoStore($rootScope TodoDispatcher) {
    var text;
    TodoDispatcher.register(function(action) {
      switch(action.actionType) {
        case TodoConstants.TODO_CREATE:
              
      }
    });
    return store;
  }

})();
