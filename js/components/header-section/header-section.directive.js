(function() {
  'use strict';

  angular
    .module('app')
    .directive('headerSection', ['TodoActions', HeaderSection]);

  function HeaderSection(TodoActions) {
    return {
      restrict: 'E',
      templateUrl: 'js/components/header-section/header-section.html',
      replace: true,
      link: function(scope, elem, attrs) {
        scope.onSave = function(text) {
          if (text.trim()) {
            TodoActions.create(text);
          }
        };
      }
    };
  }
})();
