let canvas;
let world;
let keyboard = new Keyboard();
let showFullScreen = true;
let worldInstance;


/**
 * Plays the game by hiding loading and other screens and starting the game after a delay.
 */
async function playGame() {
  let loadingScreen = document.getElementById("loadingScreen");
  let gameLostScreen = document.getElementById("gameLostScreen");
  let wonScreen = document.getElementById("gameWonScreen");
  gameLostScreen.style.display = "none";
  wonScreen.style.display = "none";
  loadingScreen.style.display = "flex";
  pauseWinLooseSounds();
  setTimeout(function () {
    startGame();
  }, 1000);
}


/**
 * Starts the game by hiding elements and creating a new world instance.
 */
function startGame() {
  hideElements();
  showElements();
  createWorldInstance();
}


/**
 * Hides start screen HTML elements.
 */
function hideElements() {
  let startButton = document.getElementById("startGameButton");
  let loadingScreen = document.getElementById("loadingScreen");
  let storyButton = document.getElementById("storyButton");
  let startScreen = document.getElementById("startScreen");
  startButton.style.display = "none";
  loadingScreen.style.display = "none";
  storyButton.style.zIndex = "-100";
  startScreen.style.display = "none";
}


/**
 * Displays game start HTML elements.
 */
function showElements() {
  let canvas = document.getElementById("canvas");
  let mobileKeys = document.getElementById("mobileKeysOverlay");
  canvas.style.display = "block";
  mobileKeys.style.display = "flex";
}


/**
 * Creates a new instance of the game world.
 */
function createWorldInstance() {
  let canvas = document.getElementById("canvas");
  worldInstance = new World(canvas, keyboard);
  if (worldInstance) {
    worldInstance.restartGame();
  }
}


/**
 * Navigates back to the home screen by hiding game-related elements and displaying the start button and screen.
 */
function backToHome() {
  let lostScreen = document.getElementById("gameLostScreen");
  let canvas = document.getElementById("canvas");
  let startButton = document.getElementById("startGameButton");
  let startScreen = document.getElementById("startScreen");
  let wonScreen = document.getElementById("gameWonScreen");
  let mobileKeys = document.getElementById("mobileKeysOverlay");
  let storyButton = document.getElementById("storyButton");
  lostScreen.style.display = "none";
  wonScreen.style.display = "none";
  canvas.style.display = "none";
  storyButton.style.zIndex = "1";
  startButton.style.display = "flex";
  startScreen.style.display = "flex";
  mobileKeys.style.display = "none";
  pauseWinLooseSounds();
}


/**
 * Toggles the visibility of the info panel.
 */
function toggleInfoDiv() {
  let infoDiv = document.getElementById("infoDiv");
  if (infoDiv.style.display === "none") {
    infoDiv.style.display = "flex";
    document.addEventListener("click", closeInfoDivOutside);
  } else if (infoDiv.style.display === "flex") {
    infoDiv.style.display = "none";
  }
}


/**
 * Closes the info panel if the click event occurs outside of it.
 */
function closeInfoDivOutside(event) {
  let infoDiv = document.getElementById("infoDiv");
  let infoIcon = document.getElementById("infoIcon");
  if (
    event.target !== infoDiv &&
    event.target !== infoIcon &&
    !infoDiv.contains(event.target)
  ) {
    infoDiv.style.display = "none";
    document.removeEventListener("click", closeInfoDivOutside);
  }
}

/**
 * Handles click events to close the story panel when clicking outside of it.
 */
document.addEventListener("click", function (event) {
  let storyDiv = document.getElementById("storyDiv");
  let gameScreen = document.getElementById("gameScreen");
  if (!gameScreen.contains(event.target) && storyDiv.style.display === "flex") {
    storyDiv.style.display = "none";
  }
});


/**
 * Opens the story div.
 */
function openStoryDiv() {
  let storyDiv = document.getElementById("storyDiv");
  storyDiv.style.display = "flex";
}


/**
 * Closes the story panel.
 */
function closeStoryDiv() {
  let storyDiv = document.getElementById("storyDiv");
  storyDiv.style.display = "none";
}


/**
 * Toggles the full screen mode.
 */
function toggleFullScreen() {
  let gameScreen = document.getElementById("gameScreen");
  if (!document.fullscreenElement) {
    enterFullscreen(gameScreen);
  } else {
    exitFullscreen();
  }
}


/**
 * Enters full screen mode for the specified element.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
    applyFullScreenStyles();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
    applyFullScreenStyles();
  }
}

/**
 * Adds full screen styles for elements.
 */
function applyFullScreenStyles() {
  let startScreenDiv = document.getElementById("startScreen");
  let canvas = document.getElementById("canvas");
  let loadingScreen = document.getElementById("loadingScreen");

  startScreenDiv.style.width = "100%";
  startScreenDiv.style.height = "100%";
  startScreenDiv.style.backgroundSize = "100% 100%";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  loadingScreen.style.width = "100%";
  loadingScreen.style.height = "100%";
}


/**
 * Exits full screen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    removeFullScreenStyles();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
    removeFullScreenStyles();
  }
}


/**
 * Removes full screen styles for elements.
 */
function removeFullScreenStyles(){
  let startScreenDiv = document.getElementById("startScreen");
  let canvas = document.getElementById("canvas");
  let loadingScreen = document.getElementById("loadingScreen");

  startScreenDiv.style.width = "720px";
  startScreenDiv.style.height = "480px";
  startScreenDiv.style.backgroundSize = "720px 480px";
  canvas.style.width = "auto";
  canvas.style.height = "auto%";
  loadingScreen.style.width = "720px";
  loadingScreen.style.height = "480px";
}


/**
 * Handles keydown events to set keyboard flags.
 */
window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});


/**
 * Handles keyup events to unset keyboard flags.
 */
window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});


/**
 * Initializes touch event listeners for mobile controls.
 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mobileLeft").addEventListener("touchstart", () => {
    keyboard.LEFT = true;
  });
  document.getElementById("mobileLeft").addEventListener("touchend", () => {
    keyboard.LEFT = false;
  });
  document.getElementById("mobileRight").addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
  });
  document.getElementById("mobileRight").addEventListener("touchend", () => {
    keyboard.RIGHT = false;
  });
  document.getElementById("mobileJump").addEventListener("touchstart", () => {
    keyboard.SPACE = true;
  });
  document.getElementById("mobileJump").addEventListener("touchend", () => {
    keyboard.SPACE = false;
  });
  document.getElementById("mobileThrow").addEventListener("touchstart", () => {
    keyboard.D = true;
  });
  document.getElementById("mobileThrow").addEventListener("touchend", () => {
    keyboard.D = false;
  });
});
