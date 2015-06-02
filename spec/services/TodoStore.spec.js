'use strict';

describe('TodoStore', function() {

  var TodoStore;
  
  beforeEach(() => {
    var PersistStoreMock = {};
    const TodoRecord = Immutable.Record({
      id: cuid(),
      complete: false,
      text: "Experiment with Angular and Reflux"
    });

    module('app', $provide => {
      $provide.service('PersistStore', $q => {
        var initialize = jasmine.createSpy('initialize').and.callFake(() => {
          var deferred = $q.defer();
          var promise = deferred.promise;
          deferred.resolve(Immutable.List([new TodoRecord]));
          return promise;
        });
        
        var update =  jasmine.createSpy('update').and.callFake(() => {
          // noop
        });

        return {
          initialize: initialize,
          update: update
        };
      });
    });

    inject((_TodoStore_, $q, $rootScope) => {
      TodoStore = _TodoStore_;
    });
  });
  it("defines a TodoStore", () => {
    expect(TodoStore).toBeDefined();
  });

  describe('.initialize', () => {
    it("returns a list of todos", inject($rootScope => {
      var todos;
      TodoStore.initialize().then(data => todos = data);
      $rootScope.$digest();
      expect(todos.size).toBeGreaterThan(0);
    }));
  });

  describe('listenables', () => {

    var todos;

    // Initialize and configure a listener that exposes the most recent update
    // to the tests.
    beforeEach(inject($rootScope => {
      TodoStore.initialize();
      $rootScope.$digest();
      TodoStore.listen(_todos => todos = _todos);
    }));

    describe('.onCreate', () => {
      it("publishes the updated todo list with the created todo", () => {
        var text = 'new todo test';
        TodoStore.onCreate(text);
        expect(todos.last().text).toBe(text);
      });
      it("creates todos with a unique id", () => {
        var text = 'new todo test'
        TodoStore.onCreate(text); 
        var todo1 = todos.last();
        TodoStore.onCreate(text);
        var todo2 = todos.last();
        expect(todo1.id).not.toBe(todo2.id);
      });
    });

    describe('.onUpdateText', () => {
      beforeEach(inject($rootScope => {
        TodoStore.onCreate('test');
      }));
      it("updates the text of the todo", () => {
        var oldText = todos.last().text;
        var id = todos.last().id;
        TodoStore.onUpdateText(id, 'new todo text');
        expect(todos.last().text).not.toBe(oldText);
      });
      it("doesn't update the todo id", () => {
        var id = todos.last().id;
        TodoStore.onUpdateText(id, 'new todo text');
        expect(todos.last().id).toBe(id);
      });
      it("doesn't update the todo completion status", () => {
        var id = todos.last().id;
        var oldComplete = todos.last().complete;
        TodoStore.onUpdateText(id, 'new todo text');
        expect(todos.last().complete).toBe(oldComplete);
      });
    });

    describe('.onToggleComplete', () => {
      beforeEach(inject($rootScope => {
        TodoStore.onCreate('test');
      }));
      it('toggles the completion status of a todo', () => {
        var oldComplete = todos.last().complete;
        var id = todos.last().id;
        TodoStore.onToggleComplete(id);
        expect(todos.last().complete).not.toBe(oldComplete);
      });
    });

    describe('.onToggleCompleteAll', () => {
      beforeEach(inject($rootScope => {
        for (let i = 0; i < 10; i++) {
          TodoStore.onCreate('test ' + i);
        }
      }));
      it('sets all todos to complete when checked is true', () => {
        TodoStore.onToggleCompleteAll(true); 
        var allComplete = todos.every(todo => todo.complete);
        expect(allComplete).toBe(true);
      });
      it('sets all todos to incomplete when checked is false', () => {
        TodoStore.onToggleCompleteAll(false); 
        var allIncomplete = todos.every(todo => !todo.complete);
        expect(allIncomplete).toBe(true);
      });
    });

    describe('.onDestroy', () => {
      beforeEach(inject($rootScope => {
        TodoStore.onCreate('test');
      }));
      it('removes the todo from the todo list', () => {
        var id = todos.last().id;
        TodoStore.onDestroy(id);
        var containsTodo = todos.find(todo => todo.id == id );
        expect(containsTodo).toBeUndefined();
      });
    });

    describe('.onDestroyCompleted', () => {
      beforeEach(inject($rootScope => {
        for (let i = 0; i < 10; i++) {
          TodoStore.onCreate('test ' + i);
          // set half as complete
          if (i % 2 == 0) {
            var id = todos.last().id;
            TodoStore.onToggleComplete(id);
          }
        }
      }));
      it('destroys the todos with a complete status', () => {
        var count = todos.size;
        var completedCount = todos.count(todo => todo.complete);
        TodoStore.onDestroyCompleted();
        var allIncomplete = todos.every(todo => !todo.complete);
        expect(todos.size).toBe(count - completedCount);
        expect(allIncomplete).toBe(true);
      });
    });
  });
});
