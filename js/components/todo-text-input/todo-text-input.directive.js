(() => { 
  'use strict';

  let TodoTextInputLink = function(scope, elem) {
    let onSave = scope.onSave();
    elem.val(scope.value ? scope.value : '');

    let enterStream = elem
      .asEventStream('keyup')
      .filter(e => e.keyCode == 13);

    let blurStream = elem
      .asEventStream('focusout');

    let inputProp = Bacon.mergeAll(enterStream, blurStream)
      .map(() => elem.val())
      .onValue(val => {
        onSave(val);
        elem.val('');
      });
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
    link: TodoTextInputLink
  });

  angular
    .module('app')
    .directive('todoTextInput', TodoTextInput);
})();
