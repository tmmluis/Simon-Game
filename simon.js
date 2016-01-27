$( document ).ready(function() {
  var strictMode = false;
  var buttons = ['green', 'red', 'yellow', 'blue'];
  var history = [];

  // Event on clicking the start button.
  $('.start').on('click', function() {
    start();
  });

  // Event on clicking the strict button.
  $('.strict').on('click', function() {
    $(this).toggleClass("strict-on");
    if (strictMode) {
      strictMode = false;
    } else {
      strictMode = true;
    }
  });

  // Starts the game loop.
  function start() {
    // pick a random color
    // light it up and play sound
    // add the color to history array
    // wait for player input (same number of plays)
    // compare input with history
      // if wrong repeat
      // if strictMode reset
  }

});
