(function() {
  'use strict';

  let TodoAppController = function(TodoStore, $scope) {
    this.TodoStore = TodoStore;
    this.$scope = $scope;
    this.areAllComplete = false;

    TodoStore.listen(todos => {
      this.todos = todos;
      this.$scope.$apply();
    });
    this.todos = TodoStore.initialize();
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
