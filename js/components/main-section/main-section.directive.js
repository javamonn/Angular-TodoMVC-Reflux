(() => {
  'use strict';

  let MainSectionController = function(TodoActions) {
    this.TodoActions = TodoActions;

    this.toggleCompleteAll = () => {
      this.TodoActions.toggleCompleteAll(true);
    }
  }

  let MainSection = () => ({
    restrict: 'E',
    templateUrl: './js/components/main-section/main-section.html',
    scope: {
      todos: '=',
    },
    controllerAs: 'mainSection',
    controller: ['TodoActions', MainSectionController],
    bindToController: true,
    replace: true
  });

  angular
    .module('app')
    .directive('mainSection', [MainSection]);

})();
