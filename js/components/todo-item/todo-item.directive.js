(function() {
  
  angular
    .module('app')
    .directive('todoItem', ['TodoActions', TodoItem]);

  function TodoItem(TodoActions) {
    return {
      restrict: 'E',
      templateUrl: 'js/components/todo-item/todo-item.html',
      scope: {
        todo: '='
      },
      link: function(scope, elem, attrs) {
        scope._onToggleComplete = function() {
          TodoActions.toggleComplete(scope.todo);
        };

        scope._onDestroyClick = function() {
          TodoActions.destroy(scope.todo.id);
        };

        scope._onDoubleClick = function() {
          scope.state.isEditing = true;
        };

        scope._onSave = function() {
          TodoActions.updateText(scope.todo.id, scope.todo.text); 
        }
      }
    }
  }
})();
