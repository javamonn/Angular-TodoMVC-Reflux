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
        
        var update =  jasmine.createSpy('update').and.callFake(function() {
          // noop
        });

        return {
          initialize: initialize,
          update: update
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

  describe('.initialize', function() {
    it("returns a list of todos", inject(function($rootScope) {
      var todos;
      this.TodoStore.initialize().then(function(data) {
        todos = data; 
      });
      $rootScope.$digest();
      expect(todos.size).toBeGreaterThan(0);
    }));
  });

  describe('listenables', function() {

    // Initialize and configure a listener that exposes the most recent update
    // to the tests.
    beforeEach(inject(function($rootScope) {
      this.TodoStore.initialize();
      $rootScope.$digest();
      var self = this;
      this.TodoStore.listen(function(_todos) {
        self.todos = _todos;
      });
    }));

    describe('.onCreate', function() {
      it("publishes the updated todo list with the created todo", function() {
        var text = 'new todo test'
        this.TodoStore.onCreate(text);
        expect(this.todos.last().text).toBe(text);
      });
      it("creates todos with a unique id", function() {
        var text = 'new todo test'
        this.TodoStore.onCreate(text); 
        var todo1 = this.todos.last();
        this.TodoStore.onCreate(text);
        var todo2 = this.todos.last();
        expect(todo1.id).not.toBe(todo2.id);
      });
    });

    describe('.onUpdateText', function() {
      beforeEach(inject(function($rootScope) {
        this.TodoStore.onCreate('test');
      }));
      it("updates the text of the todo", function() {
        var oldText = this.todos.last().text;
        var id = this.todos.last().id;
        this.TodoStore.onUpdateText(id, 'new todo text');
        expect(this.todos.last().text).not.toBe(oldText);
      });
      it("doesn't update the todo id", function() {
        var id = this.todos.last().id;
        this.TodoStore.onUpdateText(id, 'new todo text');
        expect(this.todos.last().id).toBe(id);
      });
      it("doesn't update the todo completion status", function() {
        var id = this.todos.last().id;
        var oldComplete = this.todos.last().complete;
        this.TodoStore.onUpdateText(id, 'new todo text');
        expect(this.todos.last().complete).toBe(oldComplete);
      });
    });

    describe('.onToggleComplete', function() {
      beforeEach(inject(function($rootScope) {
        this.TodoStore.onCreate('test');
      }));
      it('toggles the completion status of a todo', function() {
        var oldComplete = this.todos.last().complete;
        var id = this.todos.last().id;
        this.TodoStore.onToggleComplete(id);
        expect(this.todos.last().complete).not.toBe(oldComplete);
      });
    });

    describe('.onToggleCompleteAll', function() {
      beforeEach(inject(function($rootScope) {
        for (var i = 0; i < 10; i++) {
          this.TodoStore.onCreate('test ' + i);
        }
      }));
      it('sets all todos to complete when checked is true', function() {
        this.TodoStore.onToggleCompleteAll(true); 
        var allComplete = this.todos.every(function(todo) {
          return todo.complete;
        });
        expect(allComplete).toBe(true);
      });
      it('sets all todos to incomplete when checked is false', function() {
        this.TodoStore.onToggleCompleteAll(false); 
        var allIncomplete = this.todos.every(function(todo) {
          return !todo.complete;
        });
        expect(allIncomplete).toBe(true);
      });
    });

    describe('.onDestroy', function() {
      beforeEach(inject(function($rootScope) {
        this.TodoStore.onCreate('test');
      }));
      it('removes the todo from the todo list', function() {
        var id = this.todos.last().id;
        this.TodoStore.onDestroy(id);
        var containsTodo = this.todos.find(function(todo){
          return todo.id == id;
        });
        expect(containsTodo).toBeUndefined();
      });
    });

    describe('.onDestroyCompleted', function() {
      beforeEach(inject(function($rootScope) {
        for (var i = 0; i < 10; i++) {
          this.TodoStore.onCreate('test ' + i);
          // set half as complete
          if (i % 2 == 0) {
            var id = this.todos.last().id;
            this.TodoStore.onToggleComplete(id);
          }
        }
      }));
      it('destroys the todos with a complete status', function() {
        var count = this.todos.size;
        var completedCount = this.todos.count(function(todo) {
          return todo.complete 
        });
        this.TodoStore.onDestroyCompleted();
        var allIncomplete = this.todos.every(function(todo) {
          return !todo.complete;
        });
        expect(this.todos.size).toBe(count - completedCount);
        expect(allIncomplete).toBe(true);
      });
    });
  });
});
