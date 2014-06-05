// initial array

var GAME = (function() {

  var api = {};

  // private vars
  var _currentState,
      _nextState;

  api.init = function(state) {
    _currentState = state || makeInitialState();

    console.log(_currentState);
  }

  function makeInitialState() {
    var initialState = [];

    for (var i = 0; i < 10; i++) {
      var row = [];
      for (var j = 0; j < 10; j++) {
        row.push({
          on: false
        });
      }
      initialState.push(row);
    }

    initialState[3][5].on = true;
    return initialState;
  }

  return api;
}())

GAME.init();
