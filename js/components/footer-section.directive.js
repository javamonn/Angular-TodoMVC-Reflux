(() => {
  'use strict';
  
  let FooterSectionTemplate = `
    <footer id="footer">
      <span id="todo-count">
        {{FooterSection.notCompletedCount()}} {{FooterSection.notCompletedCount() == 1 ? 'todo' : 'todos'}} left
      </span>
      <ul id="filters">
        <li><a>All</a></li>
        <li><a>Active</a></li>
        <li><a>Completed</a></li>
      </ul>
      <button 
        id="clear-completed"
        ng-click="FooterSection._clearCompleted()"
        ng-show="FooterSection.completedCount() >= 1">
        Clear Completed ({{FooterSection.completedCount()}})
      </button>
    </footer>
  `;

  let FooterSectionController = function(TodoActions) {
    this.completedCount = () => this.todos.count(todo => todo.complete);
    this.notCompletedCount = () => this.todos.count(todo => !todo.complete);
    this._clearCompleted = () => {
      TodoActions.destroyCompleted();  
    };
  };
  
  let FooterSection = () => ({
    restrict: 'E',
    template: FooterSectionTemplate,
    replace: true,
    scope: {
      todos: '='
    },
    controller: ['TodoActions', FooterSectionController],
    controllerAs: 'FooterSection',
    bindToController: true
  });

  angular
    .module('app')
    .directive('footerSection', [FooterSection]);
})();
