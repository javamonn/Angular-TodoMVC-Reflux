(() => { 
  'use strict';

  let TodoTextInputTemplate = `
    <input class="todo-text-input" placeholder="{{TodoText.placeholder}}"></input>
  `;

  let TodoTextInputLink = function(scope, elem) {
    let onSave = scope.onSave();
    elem.val(scope.value ? scope.value : '');

    let enterStream = elem
      .asEventStream('keyup')
      .filter(e => e.keyCode == 13);

    let blurStream = elem
      .asEventStream('blur');

    let inputProp = Bacon.mergeAll(enterStream, blurStream)
      .map(() => elem.val())
      .onValue(val => {
        elem.val('');
        onSave(val);
      });
  };

  let TodoTextInput = () => ({
    restrict: 'E',
    template: TodoTextInputTemplate,
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
