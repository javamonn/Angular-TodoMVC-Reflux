(function() {
  'use strict';

  angular
    .module('app')
    .service('TodoDispatcher', ['$q', TodoDispatcher]);

  function TodoDispatcher($q) {
    var _callbacks = [];
    var _promises = [];

    var Dispatcher = function() {};
    Dispatcher.prototype = R.merge(Dispatcher.prototype, {
        register: function(callback) {
          _callbacks.push(callback);
          return _callbacks.length - 1;
        },
        dispatch: function(payload) {
          var resolves = [];
          var rejects = [];
          
          _promises = _callbacks.map(function(_, i) {
            return $q(function(resolve, reject) {
              resolves[i] = resolve;
              rejects[i] = reject;
            });
          });

          _callbacks.forEach(function(callback, i) {
            $q.defer().resolve(callback(payload)).then(function() {
              resolves[i](payload);
            }, function() {
              rejects[i](new Error('Dispatcher callback unsuccessful!'));
            });
          });
        });
    });

    return Dispatcher;
  }
