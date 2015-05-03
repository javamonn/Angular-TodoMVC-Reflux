(() => {
  'use strict';

  class HeaderSectionController {
    contstructor(TodoActions) {
      this.TodoActions = TodoActions;
      this.text = "hello world";
    }
    onSave(text) {
      if (text.trim()) {
        TodoActions.create(text);
      }
    }
  };

  function HeaderSection(TodoActions) {
    return {
      restrict: 'E',
      templateUrl: 'js/components/header-section/header-section.html',
      replace: true,
      controller: ['TodoActions', HeaderSectionController],
      controllerAs: 'mainSection'
    };
  }

  angular
    .module('app')
    .directive('headerSection', ['TodoActions', HeaderSection]);
})();
