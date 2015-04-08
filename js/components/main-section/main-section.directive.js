(function() {
  'use strict';

  angular
    .module('app')
    .directive('mainSection', ['TodoActions', MainSection]);

  function MainSection(TodoActions) {
    return {
      restrict: 'E',
      templateUrl: 'js/components/main-section.html',
      scope: {
        allTodos: '=',
        areAllComplete:'='
      },
      link: function(scope, elem, attrs) {
        scope.toggleCompleteAll = function() {
          TodoActions.toggleCompleteAll();
        }
      }
    };
  }
})();
