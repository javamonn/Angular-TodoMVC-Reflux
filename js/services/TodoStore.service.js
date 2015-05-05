(() => {
  'use strict';

  var TodoRecord = Record({
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
    complete: false,
    text: "Experiment with Angular and Reflux"
  });

  let TodoStore = function(TodoActions) {

    let onCreate = text => {
      this._todos = this._todos.push(new TodoRecord({text}));
      this.trigger(this._todos);
    };

    let onUpdateText = id, text => {
      var [index, todo] = this._todos.findEntry(todo => todo.id == id);
      this._todos = this._todos.set(index, todo.set({text}));
     this.trigger(this._todos); 
    };

    let onToggleComplete = id => {
      var [index, todo] = this._todos.findEntry(todo => todo.id == id);
      this._todos = this._todos.set(index, todo.set({complete: !todo.complete}))
      this.trigger(this._todos);
    };

    let onToggleCompleteAll = checked => {
      this._todos = this._todos.map(todo => todo.set({complete: checked}));
      this.trigger(this._todos);
    };

    let onDestroy = id => {
      var [index, todo] = this._todos.findEntry(todo => todo.id == id);
      this._todos = this._todos.delete(index);
      this.trigger(this._todos);
    };

    let onDestroyCompleted = () => {
      this._todos = this._todos.filter(todo => !todo.complete);
      this.trigger(this._todos);
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
