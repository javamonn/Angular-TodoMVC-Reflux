(() => {
  'use strict';

  class TodoAppController {

    constructor(TodoStore, $scope) {
      this.TodoStore = TodoStore;
      this.$scope = $scope;
      this.state = this.getTodoState();

      TodoStore.addChangeListener(() =>  {
        TodoStore.addChangeListener(this.onChange);
      });
      $scope.$on('$destroy', function() {
        TodoStore.removeChangeLister(this.onChange);
      });
    }

    getTodoState() {
      return {
        allTodos: this.TodoStore.getAll(),
        areAllComplete: this.TodoStore.areAllComplete()
      }
    }

    onChange() {
      this.state = getTodoState();
    }
  }

  let todoApp = () => ({
    restrict: 'E',
    replace: true,
    templateUrl: './js/layout/todo-app.html',
    controllerAs: 'todoApp',
    controller: ['TodoStore', '$scope', TodoAppController]
  });
  
  angular
    .module('app')
    .directive('todoApp', [todoApp]);

})();
