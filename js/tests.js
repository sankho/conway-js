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


test("initial test", function() {
  var stayAlive = GAME.determineCellDestiny(state, 3, 5);

  ok(stayAlive === false, "Passed!");
});