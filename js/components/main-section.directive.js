(() => {
  'use strict';

  let MainSectionController = function(TodoActions) {
    this.TodoActions = TodoActions;

    this._toggleCompleteAll = () => {
      this.TodoActions.toggleCompleteAll(true);
    }
  }

  let MainSectionTemplate = `
    <section id="main">
        <input id="toggle-all" type="checkbox" ng-click="mainSection._toggleCompleteAll()" />
        <label for="toggle-all">Mark all as complete</label>
      <ul id="todo-list">
        <todo-item todo="todo" ng-repeat="todo in mainSection.todos.toArray()"></todo-item>
      </ul>
    </section>
  `;

  let MainSection = () => ({
    restrict: 'E',
    template: MainSectionTemplate,
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
