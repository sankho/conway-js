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
    var html = '';

    for (var i = 0; i < state.length; i++) {
      var row = state[i];
      html += '<div class="row">';

      for (var j = 0; j < state.length; j++) {
        var col = row[j];

        if (col.on) {
          html += '<div class="cell on"></div>';
        } else {
          html += '<div class="cell"></div>';
        }
      }

      html += '</div>';
    }

    document.getElementById('table').innerHTML = html;
  }



  /**
   * Prepares a brand new double sided array to be the state used for
   * the next step
   *
   * @param {Array} state Previous state object
   * @returns {Array} Double sided array of objects; the state for the next step
   * @public
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
    var neighbors   = api.getCellNeighbors(state, row, column),
        cell        = state[row][column],
        isCellAlive = cell.on,
        livingCount = 0;

    for (var i = 0; i < neighbors.length; i++) {
      if (neighbors[i] && neighbors[i].on) {
        livingCount++;
      }
    }

    if (isCellAlive) {
      if (livingCount < 2) {
        return false;
      } else if (livingCount < 4) {
        return  true;
      } else {
        return false;
      }
    } else {
      if (livingCount === 3) {
        return true;
      }
    }
  }


  /**
   * Returns an array of the neighbors surrounding the
   * cell
   * 
   * @param  {Array} state  Double sided array
   * @param  {Number} row    Index of the row
   * @param  {Number} column Index of column
   * @return {Array} 8 objects representing each surrounding cell
   */
  api.getCellNeighbors = function(state, row, column) {
    var neighbors = [
      row > 0 && column > 0 ? state[row-1][column-1] : undefined,
      row > 0 ? state[row-1][column] : undefined,
      row > 0 ? state[row-1][column+1] : undefined,
      state[row][column+1],
      row + 1 < state.length ? state[row+1][column+1] : undefined,
      row + 1 < state.length ? state[row+1][column] : undefined,
      row + 1 < state.length ? state[row+1][column-1] : undefined,
      state[row][column-1]
    ];

    return neighbors;
  }


  /**
   * Makes the initial double sided array of objects
   * representing each column
   *
   * @param {Number} size Represents the number of rows to be printed, uses this for columns as well
   * @public
   */
  api.makeInitialState = function() {
    var state = this.makeEmptyState(10);

    state[0][0].on = true;

    state[0][2].on = true;
    state[1][2].on = true;

    // live with 2-3 neighbors, stays alive - [3][5], [50][5]
    state[3][5].on = true;
    state[3][4].on = true;
    state[2][5].on = true;

    // dead with 3 neighbors, lives - [10][10]
    state[9][9].on = false;
    state[8][9].on = true;
    state[8][8].on = true;
    state[9][8].on = true;

    return state;
  }



  /**
   * Makes an empty double sided array to be used
   * 
   * @param  {Number} size Length of rows & columns
   * @public
   */
  api.makeEmptyState = function(size) {
    var emptyState = [],
        idCounter  = 0;

    for (var i = 0; i < size; i++) {
      var row = [];
      for (var j = 0; j < size; j++) {
        idCounter++;
        row.push({
          on: false,
          id: idCounter
        });
      }
      emptyState.push(row);
    }

    return emptyState;
  }


  return api;


}())

GAME.nextStep(undefined, true);