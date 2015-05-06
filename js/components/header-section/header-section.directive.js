(() => {
  'use strict';

  let HeaderSectionController = function(TodoActions) {
   
    this.TodoActions = TodoActions;
    this.placeholder = "test placeholder text";

    this.onSave = text => {
      console.log('header section save state');
      text = text.trim();
      if (text.length > 0) {
        this.TodoActions.create(text);
      }
    };
  };

  let HeaderSection = () => ({
    restrict: 'E',
    templateUrl: './js/components/header-section/header-section.html',
    controller: ['TodoActions', HeaderSectionController],
    controllerAs: 'headerSection',
    bindToController: true,
    replace: true
  });

  angular
    .module('app')
    .directive('headerSection', [HeaderSection]);
})();
