'use strict';

describe('TodoItem', () => {

  var element,
      controller;

  beforeEach(() => {
    module('app');
    inject(($compile, $rootScope, TodoRecord) => {
      var $scope = $rootScope.$new();
      var template = angular.element('<todo-item todo=todo></footer-section>');
      $rootScope.todo = new TodoRecord({id: cuid(), complete: false});
      element = $compile(template)($scope);
      $rootScope.$digest();
      controller = element.controller('todoItem');
    });
  });

  describe('template', () => {
    describe('when not editing', () => {
      it('shows the todo view', () => {
        expect(element.find('.view').hasClass('ng-hide')).toBe(false);
      });
      it('hides the todo text input', () => {
        expect(element.find('.edit-container').length).toBe(0);
      });
    });

    describe('when editing', () => {
      beforeEach(inject($rootScope => {
        controller._isEditing = true;
        $rootScope.$digest();
      }));
      it('displays a todo text input', () => {
        expect(element.find('.edit-container').length).toBe(1);
      });
      it('hides the todo view', () => {
        expect(element.find('.view').hasClass('ng-hide')).toBe(true);
      });
    });
  });

  describe('controller', () => {
    describe('._onDestroyClick', () => {
      it('triggers the destroy action with this todo id', () => {
        spyOn(controller.TodoActions, 'destroy');
        controller._onDestroyClick();
        expect(controller.TodoActions.destroy).toHaveBeenCalledWith(controller.todo.id);
      });
    });
    describe('._onSave', () => {
      it('triggers the update action with this todo id and entered text', () => {
        spyOn(controller.TodoActions, 'updateText');
        var text = 'new todo text';
        controller._onSave(text);
        expect(controller.TodoActions.updateText).toHaveBeenCalledWith(controller.todo.id, text);
      });
    });
    describe('._complete', () => {
      it('toggles the todo completion state when called with an argument', () => {
        spyOn(controller.TodoActions, 'toggleComplete');
        controller._complete('ignored argument');
        expect(controller.TodoActions.toggleComplete).toHaveBeenCalledWith(controller.todo.id);
      });
      it('returns the todo completion state when called without an argument', () => {
        expect(controller._complete()).toBe(controller.todo.complete);
      });
    });
  });
});
