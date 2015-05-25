(() => {
  'use strict';
  
  let FooterSectionTemplate = `
    <footer class="footer">
      <span class="todo-count">
        {{FooterSection.notCompletedCount()}} {{FooterSection.notCompletedCount() == 1 ? 'todo' : 'todos'}} left
      </span>
      <ul class="filters">
        <li><a href ng-class="{selected: FooterSection._filterState == 'all'}" ng-click="FooterSection._filter('all')">All</a></li>
        <li><a href ng-class="{selected: FooterSection._filterState == 'active'}" ng-click="FooterSection._filter('active')">Active</a></li>
        <li><a href ng-class="{selected: FooterSection._filterState == 'completed'}" ng-click="FooterSection._filter('completed')">Completed</a></li>
      </ul>
      <button 
        class="clear-completed"
        ng-click="FooterSection._clearCompleted()"
        ng-show="FooterSection.completedCount() >= 1">
        Clear Completed ({{FooterSection.completedCount()}})
      </button>
    </footer>
  `;

  let FooterSectionController = function(TodoActions, StateActions) {
    this.TodoActions = TodoActions;
    this.StateActions = StateActions;
    this._filterState = 'all';
    this.completedCount = () => this.todos.count(todo => todo.complete);
    this.notCompletedCount = () => this.todos.count(todo => !todo.complete);
    this._clearCompleted = () => {
      TodoActions.destroyCompleted();  
    };

    this._filter = filterLabel => {
      this._filterState = filterLabel
      StateActions.filter(filterLabel);
    };
  };
  
  let FooterSection = () => ({
    restrict: 'E',
    template: FooterSectionTemplate,
    replace: true,
    scope: {
      todos: '='
    },
    controller: ['TodoActions', 'StateActions', FooterSectionController],
    controllerAs: 'FooterSection',
    bindToController: true
  });

  angular
    .module('app')
    .directive('footerSection', [FooterSection]);
})();
