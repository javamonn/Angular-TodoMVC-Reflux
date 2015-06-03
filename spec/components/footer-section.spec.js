'use strict'; 

describe('FooterSection', () => {

  const TodoRecord = Immutable.Record({
    id: cuid(),
    complete: false,
    text: "Experiment with Angular and Reflux"
  });

  var element,
      controller;

  beforeEach(() => {
    module('app');
    inject(($compile, $rootScope) => {
      var $scope = $rootScope.$new();
      var template = angular.element('<footer-section todos=todos></footer-section>');
      $rootScope.todos = Immutable.List([
        new TodoRecord({ id: cuid(), complete: true }),     
        new TodoRecord({ id: cuid(), complete: true }),
        new TodoRecord({ id: cuid() })
      ]);
      element = $compile(template)($scope);
      $rootScope.$digest();
      controller = element.controller('footerSection');
    });
  });

  describe('template', () => {
    describe('representing todos', () => {
      it('displays the count of todos left', () => {
        expect(element.find('.todo-count').text().trim()).toBe('1 todo left');
      });
      it('displays the completed count to be cleared', () => {
        expect(element.find('.clear-completed').text().trim()).toBe('Clear Completed (2)');
      });
    });
  });

  describe('controller', () => {
    describe('.completedCount', () => {
      it('returns the number of completed todos', () => {
        expect(controller.completedCount()).toBe(2);
      });
    });
    describe('.notCompletedCount', () => {
      it('returns the number of incomplete todos', () => {
        expect(controller.notCompletedCount()).toBe(1);
      });
    });
    describe('._clearCompleted', () => {
      it('triggers the destroyCompleted action', () => {
        spyOn(controller.TodoActions, 'destroyCompleted'); 
        controller._clearCompleted();
        expect(controller.TodoActions.destroyCompleted).toHaveBeenCalled();
      });
    });

    describe('._filter', () => {
      it('triggers the filter state action with the correct state', () => {
        spyOn(controller.StateActions, 'filter');
        var state = 'active';
        controller._filter(state);
        expect(controller.StateActions.filter).toHaveBeenCalledWith(state);
      });
    });
  });
});
