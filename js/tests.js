// uses initial state as mock object
var state = GAME.makeEmptyState(100);

// live with < two live neighbors, dead - [0][0], [0][2]
state[0][0].on = true;

state[0][2].on = true;
state[1][2].on = true;

// live with 2 neighbors, stays alive - [3][5]
state[3][5].on = true;
state[3][4].on = true;
state[2][5].on = true;

// live with 3 neighbors, stays alive - [3][5]
state[3][5].on = true;
state[3][4].on = true;
state[2][5].on = true;


test("initial test", function() {
  var stayAlive = GAME.determineCellDestiny(state, 3, 5);

  ok(stayAlive === false, "Passed!");
});