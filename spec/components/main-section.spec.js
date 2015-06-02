'use strict';

describe('MainSection', () => {

  const TodoRecord = Immutable.Record({
    id: cuid(),
    complete: false,
    text: "Experiment with Angular and Reflux"
  });

  var template,
      controller;

  beforeEach(() => {
    module('app');
    inject(($compile, $rootScope) => {
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

  describe('template', () => {
    it('contains a todo list', () => {
      expect(template.find('.todo-list')).toBeTruthy();
    });
    it('contains a todo element for each todo', () => {
      expect(template.find('todo-item').length).toBe(3);
    });
  });

  describe('controller', () => {
    describe('._toggleCompleteAll', () => {
      beforeEach(() => {
        spyOn(controller.TodoActions, 'toggleCompleteAll');
      });
      it('triggers the toggleCompleteAll action', () => {
        controller._toggleCompleteAll();
        expect(controller.TodoActions.toggleCompleteAll).toHaveBeenCalled();
      });
      it('toggles all todos to the expected completion state', () => {
        var allComplete = controller.todos.every(todo => todo.complete);
        controller._toggleCompleteAll();
        expect(controller.TodoActions.toggleCompleteAll).toHaveBeenCalledWith(!allComplete);
      });
    });
  });
});
