$( document ).ready(function() {
  var strictMode = false;
  var colors = ['green', 'red', 'yellow', 'blue'];
  var history = [];
  var guessesCount = -1;
  var level = 0;
  var waitingForInput = false;

  // Sounds to play when a color lights up.
  var sounds = {
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
  };

  // Event on clicking the start/reset button.
  $('.start').on('click', function() {
    resetGame();
    play();
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

  // Event on clicking one of the colors.
  $('.game-btn').on('click', function() {
    if (waitingForInput) {
      // get the color
      var thisColor = $(this).data("color");
      // play the corresponding sound
      sounds[thisColor].play();
      guessesCount++;
      checkPlayerGuess(thisColor, guessesCount);
    }
  });

  // Starts or increments one interation of the game loop.
  function play() {
    // Increment the level and display it
    level++;
    $('.level').text(level);
    // pick a random color
    var color = colors[Math.floor(Math.random() * (colors.length))];
    // Push the color to history array
    history.push(color);
    // play the sequence of colors up to the last one
    displaySequence();
  }

  // Displays the generated sequence of colors and
  // plays each corresponding sound.
  function displaySequence() {
    waitingForInput = false;
    for (var i = 0; i < history.length; i++) {
      (function (i) {
        window.setTimeout(activateColor, 1000 * (i + 1), i);
      })(i);
    }
  }

  // Resets color sequence, player guesses and level.
  function resetGame() {
    history = [];
    guessesCount = -1;
    level = 0;
    $('.level').text(level);
  }

  // Lights up a specific color for 800ms and plays its sound.
  function activateColor(index) {
    color = history[index];
    toggleColor(color);
    sounds[color].play();
    window.setTimeout(toggleColor, 800, color);
    // If we reached the last color in sequence allow user input
    if (index === history.length - 1) {
      waitingForInput = true;
    }
  }

  // Checks if the current guess is correct and follows the sequence order.
  function checkPlayerGuess(playerColor, guessNumber) {
    // If player is correct check if it levels up or victory achieved.
    if (history[guessNumber] === playerColor) {
      if(guessNumber === history.length - 1) {
        if (guessNumber === 19) {
          // Victory
          alertPlayer(true);
          window.setTimeout(resetGame, 2000);
          window.setTimeout(play, 2500);
        } else {
          // level up
          guessesCount = -1;
          window.setTimeout(play, 500);
        }
      } else {
        // continue guessing the next color in sequence.
        return true;
      }
    } else if (strictMode) { // If guess is not correct and stric mode is on.
      // Alert player
      alertPlayer(false);
      // reset game and start from level 1
      window.setTimeout(resetGame, 1000);
      window.setTimeout(play, 1500);
    } else {
      // Reset the guess sequence and give player another chance
      guessesCount = -1;
      alertPlayer(false);
      window.setTimeout(displaySequence, 500);
    }
    return false;
  }

  // Alert the player that either she made a mistake or won.
  function alertPlayer(victory) {
    var alertTime = 1000;
    toggleColor('green');
    toggleColor('red');
    toggleColor('yellow');
    toggleColor('blue');
    if (victory) {
      alertTime = 2000;
      $('.level').text(':)');
    } else {
      $('.level').text('!!');
    }
    window.setTimeout(toggleColor, alertTime, 'green');
    window.setTimeout(toggleColor, alertTime, 'red');
    window.setTimeout(toggleColor, alertTime, 'yellow');
    window.setTimeout(toggleColor, alertTime, 'blue');
    window.setTimeout(function() {
      $('.level').text(level);
    }, alertTime);
  }

  function toggleColor(color) {
    $('.' + color).toggleClass(color + '-on');
  }

});
