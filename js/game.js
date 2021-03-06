// initial array

var GAME = (function() {


  var api = {};


  // private vars & constants
  var STEP_TIMEOUT = 15;



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
        api.nextStep(nextState);
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

      for (var j = 0; j < row.length; j++) {
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
    var newState = api.makeEmptyState(state.length);

    for (var i = 0; i < state.length; i++) {
      var row = state[i];
      for (var j = 0; j < row.length; j++) {
        var col = row[j];

        newState[i][j] = {
          on: this.determineCellDestiny(state, i, j),
          id: col.id
        };
      }
    }

    return newState;
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
    var state = this.makeEmptyState(50);

    state[5][7].on = true;
    state[7][7].on = true;
    state[7][6].on = true;
    state[6][9].on = true;
    state[7][10].on = true;
    state[7][11].on = true;
    state[7][12].on = true;

    state[25][27].on = true;
    state[27][27].on = true;
    state[27][26].on = true;
    state[26][29].on = true;
    state[27][30].on = true;
    state[27][31].on = true;
    state[27][32].on = true;

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



  /**
   * Returns a few different states for example purposes
   *
   * @param {Number} option Chooses which state array to return
   * @return {Array} state array
   * @public
   */
  api.getExampleState = function(option) {
    var state = api.makeEmptyState(50);

    if (option === 0) {
      state[15][15].on = true;
      state[15][16].on = true;
      state[16][15].on = true;
      state[16][16].on = true;

      state[15][24].on = true;
      state[16][24].on = true;
      state[17][24].on = true;

      state[14][25].on = true;
      state[18][25].on = true;

      state[13][26].on = true;
      state[19][26].on = true;
      state[13][27].on = true;
      state[19][27].on = true;

      state[16][28].on = true;

      state[14][29].on = true;
      state[18][29].on = true;

      state[15][30].on = true;
      state[16][30].on = true;
      state[17][30].on = true;

      state[16][31].on = true;

      state[13][34].on = true;
      state[14][34].on = true;
      state[15][34].on = true;
      state[13][35].on = true;
      state[14][35].on = true;
      state[15][35].on = true;

      state[12][36].on = true;
      state[16][36].on = true;

      state[11][38].on = true;
      state[12][38].on = true;
      state[16][38].on = true;
      state[17][38].on = true;

      state[13][48].on = true;
      state[14][48].on = true;
      state[13][49].on = true;
      state[14][49].on = true;
    } else if (option === 1) {

      // random      
      for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 50; j++) {
          state[i][j].on = Math.random() < 0.5
        }
      }
    }

    return state;
  }


  return api;


}())