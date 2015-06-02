(() => {
  'use strict';

  let TodoItemTemplate = `
    <li ng-class="{'completed': TodoItem._complete(), 'editing': TodoItem._isEditing}">
      <div class="view" ng-show="!TodoItem._isEditing">
        <input 
          class="toggle" 
          type="checkbox" 
          ng-model="TodoItem._complete" 
          ng-model-options="{getterSetter: true}">
        </input>
        <label class="todo-text" >{{TodoItem.todo.text}}</label>
        <button class="destroy" ng-click="TodoItem._onDestroyClick()"></button>
      </div>
      <div ng-if="TodoItem._isEditing">
        <todo-text-input 
          class="edit" 
          on-save="TodoItem._onSave" 
          value="{{TodoItem.todo.text}}">
        </todo-text-input>
      </div>
    </li>
  `;


  let TodoItemController = function(TodoActions, $scope) {
    this.TodoActions = TodoActions;

    this._onDestroyClick = () => {
      this.TodoActions.destroy(this.todo.id);
    };

    this._onSave = text => {
      if (text.length > 0) {
        this.TodoActions.updateText(this.todo.id, text); 
      }
      this._isEditing = false;
    }

    this._complete = arg => {
      if (arg != undefined) {
        this.TodoActions.toggleComplete(this.todo.id);
      } else {
        return this.todo.complete;
      }
    };
  };

  let TodoItemLink = function(scope, elem) {
    elem.find('.todo-text')
      .asEventStream('dblclick')
      .onValue(() => {
        scope.$apply(scope.TodoItem._isEditing = true);
        elem.find('.todo-text-input').focus();
      });
  }

  let TodoItem = TodoActions => ({
    restrict: 'E',
    template: TodoItemTemplate,
    scope: {
      todo: '='
    },
    controller: ['TodoActions', '$scope', TodoItemController],
    link: TodoItemLink,
    controllerAs: 'TodoItem',
    bindToController: true,
  });
  
  angular
    .module('app')
    .directive('todoItem', ['TodoActions', TodoItem]);
})();
