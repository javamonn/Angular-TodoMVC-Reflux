(function() {
  'use strict';

  angular
    .module('app')
    .directive('todoTextInput', TodoTextInput);

  function TodoTextInput() {
    return {
      restrict: 'E',
      templateUrl: 'js/components/todo-text-input/todo-text-input.html',
      replace: true,
      scope: {
        placeholder: '@',
        onSave: '&'
      },
      link: function(scope, elem, attrs) {

        scope.inputValue = '';

        scope.saveState = function() {
          console.log(scope.inputValue);
          scope.onSave(scope.inputValue);
          scope.inputValue = '';
        };

        scope.onKeyDown = function(event) {
          if (event.keyCode == 13) {
            scope.saveState();
          }
        };

        scope.inputValue = scope.inputValue || '';
      }
    };
  }
})();
