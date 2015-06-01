'use strict';

describe('MainSection', function() {

  var TodoRecord = Immutable.Record({
    id: cuid(),
    complete: false,
    text: "Experiment with Angular and Reflux"
  });

  var template,
      controller;

  beforeEach(function() {
    module('app');
    inject(function($compile, $rootScope) {
      var $scope = $rootScope.$new();
      $rootScope.todos = Immutable.List([
        new TodoRecord({ id: cuid(), complete: true }),     
        new TodoRecord({ id: cuid(), complete: true }),
        new TodoRecord({ id: cuid() })
      ]);
      var element = angular.element('<main-section todos=todos></main-section>');
      template = $compile(element)($scope);
      $rootScope.$digest();
      controller = element.controller('mainSection');
    });
  });

  describe('template', function() {
    it('contains a todo list', function() {
      expect(template.html()).toContain('class="todo-list"');
    });
  });

  describe('controller', function() {
    describe('._toggleCompleteAll', function() {
      beforeEach(function() {
        spyOn(controller.TodoActions, 'toggleCompleteAll');
      });
      it('triggers the toggleCompleteAll action', function() {
        controller._toggleCompleteAll();
        expect(controller.TodoActions.toggleCompleteAll).toHaveBeenCalled();
      });
      it('toggles all todos to the expected completion state', function() {
        var allComplete = controller.todos.every(function(todo) {
          return todo.complete;
        });
        controller._toggleCompleteAll();
        expect(controller.TodoActions.toggleCompleteAll).toHaveBeenCalledWith(!allComplete);
      });
    });
  });
});
