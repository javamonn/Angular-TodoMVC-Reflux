(function() {
  'use strict';
  
  angular
    .module('app')
    .directive('todoApp', ['TodoStore', todoApp]);

  function todoApp(TodoStore) {

    /**
     * Retrieve the current TODO data from the TodoStore.
     */
    function getTodoState() {
      return {
        allTodos: TodoStore.getAll(),
        areAllComplete: TodoStore.areAllComplete()
      };
    }

    function link(scope, elem, attrs) {
      scope.todoState = getTodoState();

      /**
       * Event handler for 'change' events coming from the TodoStore.
       */
      TodoStore.addChangeListener(function() {
        scope.todoState = getTodoState();
      });
    }

    return {
      restrict: 'A',
      templateUrl: 'components/todo-app.html',
      link: link
    };
  }
})();
