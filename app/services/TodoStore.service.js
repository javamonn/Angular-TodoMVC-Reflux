(() => {
  'use strict';

  let TodoStore = function(TodoActions, PersistStore, TodoRecord) {

    let _todos;

    let todoStore = Reflux.createStore({
      listenables: [TodoActions],
      onCreate(text) {
        _updateTodos(_todos.push(new TodoRecord({
          text: text,
          id: cuid()
        })));
      },
      onUpdateText(id, text) {
        let [index, todo] = _todos.findEntry(todo => todo.id == id);
        _updateTodos(_todos.set(index, todo.set("text", text)))
      },
      onToggleComplete(id) {
        let [index, todo] = _todos.findEntry(todo => todo.id == id);
        _updateTodos(_todos.set(index, todo.set("complete", !todo.complete)));
      }, 
      onToggleCompleteAll(checked) {
        _updateTodos(_todos.map(todo => todo.set("complete", checked)));
      },
      onDestroy(id) {
        let [index, todo] = _todos.findEntry(todo => todo.id == id);
        _updateTodos(_todos.delete(index));
      },
      onDestroyCompleted() {
        _updateTodos(_todos.filter(todo => !todo.complete));
      },
      initialize() {
        return PersistStore.initialize()
          .then(todos => {
             _todos = todos;
             return todos;
          });
      }
    });

    let _updateTodos = function(todos) {
      _todos = todos;
      todoStore.trigger(_todos);
      PersistStore.update(todos);
    };

    return todoStore;
  };

  angular
    .module('app')
    .service('TodoStore', ['TodoActions', 'PersistStore', 'TodoRecord', TodoStore]);
})();
