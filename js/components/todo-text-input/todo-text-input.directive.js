(() => { 
  'use strict';

  let TodoTextInputController = function($scope) {
    this._inputValue = this.value || '';
    this._onSave = this.onSave();
    
    this._saveState = () => {
      this.onSave(this._inputValue);
      this._inputValue = '';
    };

    this.onKeyDown = event => {
      if (event.keyCode == 13) {
        this.saveState();
      }
    };
  };


  let TodoTextInput = () => ({
    restrict: 'E',
    templateUrl: './js/components/todo-text-input/todo-text-input.html',
    replace: true,
    scope: {
      placeholder: '@',
      value: '@',
      onSave: '&'
    },
    controller: ['$scope', TodoTextInputController],
    controllerAs: 'TodoText',
    bindToController: true
  });

  angular
    .module('app')
    .directive('todoTextInput', TodoTextInput);
})();
