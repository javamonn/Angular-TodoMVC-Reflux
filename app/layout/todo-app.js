(function() {
  'use strict';

  let TodoAppController = function(TodoStore, $scope, todos) {
    this.TodoStore = TodoStore;
    this.$scope = $scope;
    this.todos = todos;
    this.areAllComplete = false;

    TodoStore.listen(todos => {
      this.todos = todos;
      this.$scope.$apply();
    });
  };
  
  angular
    .module('app')
    .controller('TodoApp', ['TodoStore', '$scope', 'todos', TodoAppController]);

})();
