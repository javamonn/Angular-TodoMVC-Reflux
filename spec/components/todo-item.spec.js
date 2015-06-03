'use strict';

describe('TodoItem', () => {
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
      var template = angular.element('<todo-item todo=todo></footer-section>');
      $rootScope.todo = new TodoRecord({id: cuid()});
      element = $compile(template)($scope);
      $rootScope.$digest();
      controller = element.controller('todoItem');
    });
  });

  describe('template', () => {
    describe('when not editing', () => {
      it('shows the todo view', () => {
        expect(element.find('.view').is(':visible')).toBe(true);
      });

      it('hides the todo text input', () => {
        expect(element.find('.edit-container').is(':visible')).toBe(false);
      });
    });

    describe('when editing', () => {
      beforeEach(inject($rootScope => {
        $rootScope.todo = new TodoRecord({id: cuid(), complete: true});
        $rootScope.$digest();
      }));

      it('displays a todo text input', () => {
        expect(element.find('.edit-container').length).toBe();
      });
      
      it('hides the todo view', () => {
        expect(element.find('.view').is(':visible')).toBe(false);
      });
    });
  });

  describe('controller', () => {

  });

});
