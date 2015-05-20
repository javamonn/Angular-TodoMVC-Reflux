(() => {
  'use strict';

  let TodoItemController = function(TodoActions, $scope) {
    this.TodoActions = TodoActions;

    this._onDestroyClick = () => {
      this.TodoActions.destroy(this.todo.id);
    };

    this._onSave = text => {
      this.TodoActions.updateText(this.todo.id, text); 
      this._isEditing = false;
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

  let TodoItemTemplate = `
    <li ng-class="{'completed': TodoItem._complete(), 'editing': TodoItem._isEditing}">
      <div class="view" ng-show="!TodoItem._isEditing">
        <input 
          class="toggle" 
          type="checkbox" 
          ng-model="TodoItem._complete" 
          ng-model-options="{getterSetter: true}">
        </input>
        <label ng-dblclick="TodoItem._onDoubleClick()">{{TodoItem.todo.text}}</label>
        <button class="destroy" ng-click="TodoItem._onDestroyClick()">X</button>
      </div>
      <div ng-show="TodoItem._isEditing">
        <todo-text-input 
          class="edit" 
          on-save="TodoItem._onSave" 
          value="{{TodoItem.todo.text}}">
        </todo-text-input>
      </div>
    </li>
  `;

  let TodoItem = TodoActions => ({
    restrict: 'E',
    template: TodoItemTemplate,
    scope: {
      todo: '='
    },
    controller: ['TodoActions', '$scope', TodoItemController],
    controllerAs: 'TodoItem',
    bindToController: true,
    replace: true
  });
  
  angular
    .module('app')
    .directive('todoItem', ['TodoActions', TodoItem]);
})();
