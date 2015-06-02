(() => {
  'use strict';

  const db = new PouchDB('TodoMVC');
  const TodoRecord = Immutable.Record({
    id: cuid(),
    complete: false,
    text: "Experiment with Angular and Reflux"
  });
  
  const _todoListId = 'todoList';
  let _todoListRev = '';

  let PersistStore = () =>({
    update(todos) {
       return db.put({
        todos: todos.toJS(),
        _id: _todoListId,
        _rev: _todoListRev
      }).then(res => {
        _todoListRev = res.rev;
      });
    },
    initialize() {
      return db.info()
      .then(info => {
        if (info.doc_count > 0) {
          return db.get(_todoListId).then(mutableTodoList => {
            _todoListRev = mutableTodoList._rev;
            let todos = R.reduce((memo, mutableTodo) => {
              memo.push(new TodoRecord(mutableTodo)); 
              return memo
            }, [], mutableTodoList.todos);
            return Immutable.List(todos);
          });
        } else {
          let todos = Immutable.List([new TodoRecord]);
          return db.put({
            todos: todos.toJS(),
            _id: _todoListId
          }).then(res => {
            _todoListRev = res.rev;
            return todos;
          });
        }
      });
    }
  });

  angular
    .module('app')
    .service('PersistStore', [PersistStore])

})();
