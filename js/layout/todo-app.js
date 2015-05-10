(function() {
  'use strict';

  let TodoAppController = function(TodoStore, $scope) {
    this.TodoStore = TodoStore;
    this.$scope = $scope;
    this.todos = this.TodoStore.getInitialState();
    this.areAllComplete = false;

    TodoStore.listen(todos => {
      this.todos = todos;
      this.areAllComplete = this.TodoStore.areAllComplete();
      this.$scope.$apply();
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
