(() => {
  'use strict';

  class HeaderSectionController {
    contstructor(TodoActions) {
      this.TodoActions = TodoActions;
    }
    onSave(text) {
      if (text.trim()) {
        this.TodoActions.create(text);
      }
    }
  };

  let HeaderSection = () => ({
    restrict: 'E',
    templateUrl: 'js/components/header-section/header-section.html',
    controller: ['TodoActions', HeaderSectionController],
    controllerAs: 'mainSection'
  });

  angular
    .module('app')
    .directive('headerSection', ['TodoActions', HeaderSection]);
})();
