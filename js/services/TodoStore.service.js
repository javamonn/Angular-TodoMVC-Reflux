(function() {
  'use strict';

  var TodoRecord = Immutable.Record({
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
    complete: false,
    text: "Experiment with Angular and Reflux"
  });

  let TodoStore = function(TodoActions) {
    return Reflux.createStore({
      listenables: [TodoActions],
      onCreate: function(text) {
        this.updateTodos(this._todos.push(new TodoRecord({
          text: text,
          id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
        })));
      },
      onUpdateText:function(id, text) {
        let [index, todo] = this._todos.findEntry(todo => todo.id == id);
        this.updateTodos(this._todos.set(index, todo.set("text", text)))
      },
      onToggleComplete: function(id) {
        let [index, todo] = this._todos.findEntry(todo => todo.id == id);
        this.updateTodos(this._todos.set(index, todo.set("complete", !todo.complete)));
      }, 
      onToggleCompleteAll: function(checked) {
        this.updateTodos(this._todos.map(todo => todo.set("complete", checked)));
      },
      onDestroy: function(id) {
        let [index, todo] = this._todos.findEntry(todo => todo.id == id);
        this.updateTodos(this._todos.delete(index));
      },
      onDestroyCompleted: function() {
        this.updateTodos(this._todos.filter(todo => !todo.complete));
      },
      getInitialState: function() {
        this._todos = Immutable.List([
          new TodoRecord()
        ]);
        return this._todos;
      },
      updateTodos: function(todos) {
        this._todos = todos;
        this.trigger(this._todos);
      }
    });
  };

  angular
    .module('app')
    .service('TodoStore', ['TodoActions', TodoStore]);
})();
