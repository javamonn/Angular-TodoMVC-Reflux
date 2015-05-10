(() => {
  'use strict';

  let HeaderSectionController = function(TodoActions, TodoStore) {
   
    this.TodoActions = TodoActions;
    this.TodoStore = TodoStore;

    this.onSave = text => {
      text = text.trim();
      if (text.length > 0) {
        this.TodoActions.create(text);
      }
    };
    
    this._toggleCompleteAll = () => {
      this.TodoActions.toggleCompleteAll(!this.areAllComplete);
    };

  };

  let HeaderSection = () => ({
    restrict: 'E',
    templateUrl: './js/components/header-section/header-section.html',
    controller: ['TodoActions', 'TodoStore', HeaderSectionController],
    scope: {
      areAllComplete: '='
    },
    controllerAs: 'HeaderSection',
    bindToController: true,
    replace: true
  });

  angular
    .module('app')
    .directive('headerSection', [HeaderSection]);
})();
