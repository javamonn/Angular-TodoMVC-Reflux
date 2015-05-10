(() => {
  'use strict';

  let TodoItemController = function(TodoActions) {
    this.TodoActions = TodoActions;

    this._onDestroyClick = () => {
      this.TodoActions.destroy(this.todo.id);
    };

    this._onSave = () => {
      this.TodoActions.updateText(this.todo.id, this._todo.text); 
    }

    this._complete = arg => {
      if (arg != undefined) {
        this.TodoActions.toggleComplete(this.todo.id);
      } else {
        return this.todo.complete;
      }
    };

    this._onDoubleClick = () => {
      this._isEditing = true;
    };
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
