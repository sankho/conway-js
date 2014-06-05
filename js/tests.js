// uses initial state as mock object
var state = GAME.makeInitialState();

test("initial test", function() {
  var stayAlive = GAME.determineCellDestiny(state, 3, 5);

  ok(stayAlive === false, "Passed!");
});