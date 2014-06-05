// initial array

var GAME = (function() {

  var api = {};

  // private vars & constants
  var STEP_TIMEOUT = 750;

  /**
   * Inits the app or takes a provided state object and iterates to the next step.
   * Called recursively unless second parameter passed as true.
   *
   * @param {Array} state Double sided array
   * @param {Boolean} dontRecurse If true, won't trigger the next step after this one
   * @public
   */
  api.nextStep = function(state, dontRecurse) {
    state = state || api.makeInitialState();

    api.drawTableBasedOnState(state);
    var nextState = api.prepareNextStep(state);

    if (!dontRecurse) {
      setTimeout(function() {
        api.init(nextState);
      }, STEP_TIMEOUT);
    }
  }

  /**
   * Draws a table into the DOM based on the provided 
   * state array
   * 
   * @param  {Array} state Double sided array of objects containing an "on" key which is boolean
   * @public
   */
  api.drawTableBasedOnState = function(state) {

  }

  /**
   * Prepares a brand new double sided array to be the state used for
   * the next step
   *
   * @param {Array} state Previous state object
   * @returns {Array} Double sided array of objects; the state for the next step
   */
  api.prepareNextStep = function(state) {

  }

  /**
   * Determines whether a cell lives or die. Crux of the
   * app.
   * 
   * @param  {Array} state  Double sided array
   * @param  {Number} row    Index of the row
   * @param  {Number} column Index of column
   * @return {Boolean} Does it live or die?
   */
  api.determineCellDestiny = function(state, row, column) {
    
  }

  /**
   * Makes the initial double sided array of objects
   * representing each column
   * Expects that the return array[3][5].on == true
   *
   * @public
   */
  api.makeInitialState = function() {
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

GAME.nextStep(undefined, true);
