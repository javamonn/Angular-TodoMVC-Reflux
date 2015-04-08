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

      var onChange = function() {
        scope.todoState = getTodoState();
      };

      /**
       * Event handler for 'change' events coming from the TodoStore.
       */
      TodoStore.addChangeListener(function() {
        TodoStore.addChangeListener(this.onChange);
      });

      scope.$on('$destroy', function() {
        TodoStore.removeChangeLister(this.onChange);
      });
      scope.todoState = getTodoState();
    }

    return {
      restrict: 'E',
      replace: true,
      templateUrl: './js/layout/todo-app.html',
      link: link
    };
  }
})();
