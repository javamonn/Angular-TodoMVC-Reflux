(function() {
  'use strict';

  let TodoAppController = function(TodoStore, $scope) {
    this.TodoStore = TodoStore;
    this.$scope = $scope;
    this.todos = this.TodoStore.getInitialState();

    TodoStore.listen(todos => {
      this.todos = todos;
    });
  };

  let todoApp = () => ({
    restrict: 'E',
    replace: true,
    templateUrl: './js/layout/todo-app.html',
    controllerAs: 'app',
    controller: ['TodoStore', '$scope', TodoAppController],
    bindToController: true
  });
  
  angular
    .module('app')
    .directive('todoApp', [todoApp]);

})();
