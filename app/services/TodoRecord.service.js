(() => {
  'use strict';

  const TodoRecord = Immutable.Record({
    id: cuid(),
    complete: false,
    text: "Experiment with Angular and Reflux"
  });

  let TodoRecordFactory = () => TodoRecord;

  angular
    .module('app')
    .factory('TodoRecord', [TodoRecordFactory]);
})();
