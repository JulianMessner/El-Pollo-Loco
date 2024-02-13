let canvas;
let world;
let keyboard = new Keyboard();
let showFullScreen = true;
let worldInstance;

async function playGame() {
  let loadingScreen = document.getElementById("loadingScreen");
  let gameLostScreen = document.getElementById("gameLostScreen");
  let wonScreen = document.getElementById("gameWonScreen");

  allSounds[9].pause();
  allSounds[10].pause();

  gameLostScreen.style.display = "none";
  wonScreen.style.display = "none";
  loadingScreen.style.display = "flex";

  setTimeout(function () {
    startGame();
  }, 1000);
}

function startGame() {
  hideElements();
  showElements();
  createWorldInstance();
}

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

function showElements() {
  let canvas = document.getElementById("canvas");
  let mobileKeys = document.getElementById("mobileKeysOverlay");

  canvas.style.display = "block";
  mobileKeys.style.display = "flex";
}

function createWorldInstance() {
  let canvas = document.getElementById("canvas");
  worldInstance = new World(canvas, keyboard);

  if (worldInstance) {
    worldInstance.restartGame();
  }
}


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
}

function toggleInfoDiv() {
  let infoDiv = document.getElementById("infoDiv");
  if (infoDiv.style.display === "none") {
    infoDiv.style.display = "flex";
    document.addEventListener("click", closeInfoDivOutside);
  } else if (infoDiv.style.display === "flex") {
    infoDiv.style.display = "none";
  }
}

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

document.addEventListener("click", function (event) {
  let storyDiv = document.getElementById("storyDiv");
  let gameScreen = document.getElementById("gameScreen");

  if (!gameScreen.contains(event.target) && storyDiv.style.display === "flex") {
    storyDiv.style.display = "none";
  }
});

function openStoryDiv() {
  let storyDiv = document.getElementById("storyDiv");
  storyDiv.style.display = "flex";
}

function closeStoryDiv() {
  let storyDiv = document.getElementById("storyDiv");
  storyDiv.style.display = "none";
}

function toggleFullScreen() {
  let fullScreen = document.getElementById("fullScreen");

  if (showFullScreen === false) {
    exitFullscreen();
    showFullScreen = true;
    fullScreen.style.backgroundImage = "none";
  } else if (showFullScreen === true) {
    enterFullscreen(fullScreen);
    showFullScreen = false;
    fullScreen.style.backgroundImage = "url(./img/5_background/layers/background-desert.png)";
  }
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

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
