'use strict';

describe('TodoStore', function() {
  
  beforeEach(function() {
    var PersistStoreMock = {};
    var TodoRecord = Immutable.Record({
      id: cuid(),
      complete: false,
      text: "Experiment with Angular and Reflux"
    });

    module('app', function($provide) {
      $provide.service('PersistStore', function($q) {
        var initialize = jasmine.createSpy('initialize').and.callFake(function() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          deferred.resolve(Immutable.List([new TodoRecord]));
          return promise;
        });

        return {
          initialize: initialize
        };
      });
    });

    inject(function(_TodoStore_, $q, $rootScope) {
      this.TodoStore = _TodoStore_;
    });
  });

  it("defines a TodoStore", function() {
    expect(this.TodoStore).toBeDefined();
  });


    it("returns a list of todos", inject(function($rootScope) {
      var todos;
      this.TodoStore.initialize().then(function(data) {
        todos = data; 
      });
      $rootScope.$digest();
      expect(todos.size).toBeGreaterThan(0);
    }));

    it("initializes an internal list of todos", inject(function($rootScope) {
      var todos;
      this.TodoStore.initialize().then(function(data) {
        todos = data; 
      });
      $rootScope.$digest();
      expect(this.TodoStore._todos.size).toBeGreaterThan(0);
    }));

});
