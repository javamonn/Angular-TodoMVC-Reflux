(() => {
  'use strict';

  var TodoRecord = Record({
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
    complete: false,
    text: "Experiment with Angular and Reflux"
  });

  let TodoStore = function(TodoActions) {

    let updateTodos = todos => {
      this._todos = todos;
      this.trigger(this._todos);
    };

    let onCreate = text => {
      updateTodos(this._todos.push(new TodoRecord({text})));
    };

    let onUpdateText = id, text => {
      var [index, todo] = this._todos.findEntry(todo => todo.id == id);
      udpateTodos(this._todos.set(index, todo.set({text})))
    };

    let onToggleComplete = id => {
      var [index, todo] = this._todos.findEntry(todo => todo.id == id);
      updateTodos(this._todos.set(index, todo.set({complete: !todo.complete})));
    };

    let onToggleCompleteAll = checked => {
      updateTodos(this._todos.map(todo => todo.set({complete: checked})));
    };

    let onDestroy = id => {
      var [index, todo] = this._todos.findEntry(todo => todo.id == id);
      updateTodos(this._todos.delete(index));
    };

    let onDestroyCompleted = () => {
      updateTodos(this._todos.filter(todo => !todo.complete));
    };

    let getInitialState = () => {
      this._todos = Immutable.List({
        new TodoRecord()
      });
      return this._todos;
    }

    return Reflux.createStore({
      listenables: [TodoActions],
      onCreate,
      onUpdateText,
      onToggleComplete,
      onToggleCompleteAll,
      onDestroy,
      onDestroyCompleted,
      getInitialState
    });
  };

  angular
    .module('app')
    .service('TodoStore', ['TodoActions', TodoStore]);
})();
