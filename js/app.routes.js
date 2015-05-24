(() => {
  'use strict';

  let routes = function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('app', {
        templateUrl: './js/layout/todo-app.html',
        controller: 'TodoApp',
        controllerAs: 'app',
        url: '/',
        resolve: {
          todos: ['TodoStore', function(TodoStore) {
            return TodoStore.initialize()
          }]
        }
      });
  };
  
  angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routes]);
})();
