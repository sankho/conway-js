// uses initial state as mock object
var state = GAME.makeEmptyState(60);

// live with < two live neighbors, dead - [0][0], [0][2]
state[0][0].on = true;

state[0][2].on = true;
state[1][2].on = true;

// live with 2-3 neighbors, stays alive - [3][5], [50][5]
state[3][5].on = true;
state[3][4].on = true;
state[2][5].on = true;

state[50][5].on = true;
state[50][4].on = true;
state[51][6].on = true;
state[49][4].on = true;

// live with > 3 neighbors, dies - [30][5]
state[30][5].on = true;
state[30][4].on = true;
state[30][6].on = true;
state[31][5].on = true;
state[29][5].on = true;

// dead with 3 neighbors, lives - [10][10]
state[10][10].on = false;
state[10][9].on  = true;
state[9][9].on   = true;
state[11][11].on = true;

test("Game.getCellNeighbors should return the neighbors of a cell starting form the top left, going clockwise", function() {
  var neighbors = GAME.getCellNeighbors(state, 3, 5);

  ok(typeof neighbors == 'Object', "GAME.getCellNeighbors not returning an object");

  ok(neighbors[0].id === state[2][4].id, "expects to get neighbors starting from the top left, going clockwise and around our desired cell, got something else");
  ok(neighbors[1].id === state[2][5].id, "expects to get neighbors starting from the top left, going clockwise and around our desired cell, got something else");
  ok(neighbors[2].id === state[2][6].id, "expects to get neighbors starting from the top left, going clockwise and around our desired cell, got something else");
  ok(neighbors[3].id === state[3][6].id, "expects to get neighbors starting from the top left, going clockwise and around our desired cell, got something else");
  ok(neighbors[4].id === state[4][6].id, "expects to get neighbors starting from the top left, going clockwise and around our desired cell, got something else");
  ok(neighbors[5].id === state[4][5].id, "expects to get neighbors starting from the top left, going clockwise and around our desired cell, got something else");
  ok(neighbors[6].id === state[4][4].id, "expects to get neighbors starting from the top left, going clockwise and around our desired cell, got something else");
  ok(neighbors[7].id === state[3][4].id, "expects to get neighbors starting from the top left, going clockwise and around our desired cell, got something else");
});

test("Conway Rule #1 - If cell is alive with less than two live neighbors, cell dies", function() {
  var stayAlive = GAME.determineCellDestiny(state, 0, 0);

  ok(stayAlive === false, "Failed on check for cell [0][0]")

  var stayAlive = GAME.determineCellDestiny(state, 0, 2);

  ok(stayAlive === false, "Failed on check for cell [0][2]")
});

test("Conway Rule #2 - If cell is alive with two or three live neighbors, cell remains", function() {
  var stayAlive = GAME.determineCellDestiny(state, 3, 5);

  ok(stayAlive === false, "Failed on check for cell [3][5]")

  var stayAlive = GAME.determineCellDestiny(state, 50, 5);

  ok(stayAlive === false, "Failed on check for cell [50][5]")
});

test("Conway Rule #3 - If cell is alive with more than three live neighbors, cell dies", function() {
  var stayAlive = GAME.determineCellDestiny(state, 30, 5);

  ok(stayAlive === false, "Failed on check for cell [30][5]")
});

test("Conway Rule #4 - If cell is dead with three live neighbors, cell comes alive", function() {
  var stayAlive = GAME.determineCellDestiny(state, 10, 10);

  ok(stayAlive === false, "Failed on check for cell [10][10]")
});

test("initial test", function() {
  var stayAlive = GAME.determineCellDestiny(state, 3, 5);

  ok(stayAlive === false, "Passed!");
});