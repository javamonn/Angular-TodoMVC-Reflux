'use strict';

describe('HeaderSection', () => {
  var element,
      controller;

  beforeEach(() => {
    module('app');
    inject(($compile, $rootScope) => {
      var $scope = $rootScope.$new();
      var template = angular.element('<header-section></header-section>');
      element = $compile(template)($scope);
      $rootScope.$digest();
      controller = element.controller('headerSection');
    });
  });

  describe('template', () => {
    it('contains an element to enter new todos', () => {
      expect(element.find('todo-text-input')).toBeTruthy();
    });
  });

  describe('controller', () => {
    it('triggers the create action with the entered text when saved', () => {
      spyOn(controller.TodoActions, 'create');
      var text = 'test text to be saved';
      controller.onSave(text);
      expect(controller.TodoActions.create).toHaveBeenCalledWith(text);
    });
  });
});
