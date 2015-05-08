(() => {
  'use strict';

  let TodoItemController = function(TodoActions) {
      this.TodoActions = TodoActions;

      this._complete = arg => {
        if (arguments.length) {
          this.TodoActions.toggleComplete(this.todo.id);
        } else {
          return this.todo.complete;
        }
      };

      this._onDestroyClick = () => {
        this.TodoActions.destroy(this.todo.id);
      };

      this._onDoubleClick = () => {
        this._todo.isEditing = true;
      };

      this._onSave = () => {
        this.TodoActions.updateText(this.todo.id, this._todo.text); 
      }
  };

  let TodoItem = TodoActions => ({
    restrict: 'E',
    templateUrl: 'js/components/todo-item/todo-item.html',
    scope: {
      todo: '='
    },
    controller: ['TodoActions', TodoItemController],
    controllerAs: 'TodoItem',
    bindToController: true,
    replace: true
  });
  
  angular
    .module('app')
    .directive('todoItem', ['TodoActions', TodoItem]);
})();
