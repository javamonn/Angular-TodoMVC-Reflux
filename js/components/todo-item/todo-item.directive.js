(function() {
  
  angular
    .module('app')
    .directive('todoItem', ['TodoActions', TodoItem]);

  function TodoItem(TodoActions) {
    return {
      restrict: 'E',
      templateUrl: 'js/components/todo-item/todo-item.html',
      scope: {
        todos: '='
      },
      link: function(scope, elem, attrs) {
            
      }
    }
  }
})();
