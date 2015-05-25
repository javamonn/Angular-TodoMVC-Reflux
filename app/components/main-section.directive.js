(() => {
  'use strict';

  let MainSectionTemplate = `
    <section class="main">
        <input class="toggle-all" type="checkbox" ng-click="mainSection._toggleCompleteAll()" />
        <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <todo-item todo="todo" ng-repeat="todo in mainSection.todos | footerFilter:mainSection._filterState"></todo-item>
      </ul>
    </section>
  `;


  let MainSectionController = function(TodoActions, StateActions, $scope) {
    this.TodoActions = TodoActions;
    this._filterState = 'all'

    StateActions.filter.listen(filter => {
      this._filterState = filter;
      $scope.$apply();
    });

    this._toggleCompleteAll = () => {
      let areAllComplete = this.todos.every(todo => todo.complete);
      this.TodoActions.toggleCompleteAll(!areAllComplete);
    };
  }

  let FooterFilter = function() {
    return (todos, filterState) => {
      switch(filterState) {
        case 'all':
          return todos.toArray();
        case 'active':
          return todos.filterNot(todo => todo.complete).toArray();
        case 'completed':
          return todos.filter(todo => todo.complete).toArray();
      }
    }
  };

  let MainSection = () => ({
    restrict: 'E',
    template: MainSectionTemplate,
    scope: {
      todos: '=',
    },
    controllerAs: 'mainSection',
    controller: ['TodoActions', 'StateActions', '$scope', MainSectionController],
    bindToController: true,
    replace: true
  });

  angular
    .module('app')
    .filter('footerFilter', [FooterFilter])
    .directive('mainSection', [MainSection]);
})();
