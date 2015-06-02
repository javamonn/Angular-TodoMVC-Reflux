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
  };

  let HeaderSectionTemplate = `
    <section class="header">
      <h1>todos</h1>
      <header class="header-input">
        <todo-text-input 
          class="new-todo" 
          placeholder="What needs to get done?"
          on-save="HeaderSection.onSave">
        </todo-text-input>
      </header>
    </section>
  `;

  let HeaderSection = () => ({
    restrict: 'E',
    template: HeaderSectionTemplate,
    controller: ['TodoActions', 'TodoStore', HeaderSectionController],
    controllerAs: 'HeaderSection',
    bindToController: true
  });

  angular
    .module('app')
    .directive('headerSection', [HeaderSection]);
})();
