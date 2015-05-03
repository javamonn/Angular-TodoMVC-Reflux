(() =>  {
  'use strict';

  class TodoTextInputController {
    contstructor() {
      this._inputValue = this._inputValue || '';
    }
    
    saveState() {
      this.onSave(this._inputValue);
      this._inputValue = '';
    }

    onKeyDown(event) {
      if (event.keyCode == 13) {
        this.saveState();
      }
    }
  }


  let TodoTextInput = () => ({
    restrict: 'E',
    templateUrl: 'js/components/todo-text-input/todo-text-input.html',
    replace: true,
    scope: {
      placeholder: '@',
      onSave: '&'
    },
    controller: [TodoTextInputController],
    controllerAs: 'todoText'
  });

  angular
    .module('app')
    .directive('todoTextInput', TodoTextInput);
})();
