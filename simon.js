$( document ).ready(function() {
  var strictMode = false;
  var colors = ['green', 'red', 'yellow', 'blue'];
  var history = [];
  var guessesCount = -1;
  var counter = 0;
  var waitingForInput = false;

  // Sounds to play when a color lights up.
  var sounds = {
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
  };

  // Event on clicking the start button.
  $('.start').on('click', function() {
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
    // Increment the counter and display it
    counter++;
    $('.counter').text(counter);
    // pick a random color
    var color = colors[Math.floor(Math.random() * (colors.length))];
    // Push the color to history array
    history.push(color);
    console.log("Simon says: " + color);
    console.log("Squence so far: " + history);
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

  function checkPlayerGuess(playerColor, guessNumber) {
    // If player is correct check if it levels up
    console.log("Player color: " + playerColor + " Guess num: " + guessNumber);
    console.log("correct guess would have been: " + history[guessNumber]);
    if (history[guessNumber] === playerColor) {
      if(guessNumber === history.length - 1) {
        // level up
        console.log("You got the sequnce, level up!");
        guessesCount = -1;
        window.setTimeout(play, 1000);
      } else {
        console.log("got right color, finish the sequence!");
        return true;
      }
    } else if (strictMode) {
      // reset game and start from level 1
      history = [];
      guessesCount = -1;
      counter = 0;
      $('.counter').text(counter);
      window.setTimeout(play, 1000);
    } else {
      // Reset the guess sequence and give player another chance
      guessesCount = -1;
      window.setTimeout(displaySequence);
    }
    return false;
  }

  function toggleColor(color) {
    $('.' + color).toggleClass(color + '-on');
  }

});
