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
  
  setTimeout(function() {
    startGame();
  }, 1000);
}

function startGame(){
  let canvas = document.getElementById("canvas");
  let startButton = document.getElementById("startGameButton");
  let loadingScreen = document.getElementById("loadingScreen");

  startButton.style.display = "none";
  loadingScreen.style.display = "none";
  canvas.style.display = "block";
  
  worldInstance = new World(canvas, keyboard);

  startScreen.style.display = "none";

  if (worldInstance) {
    worldInstance.restartGame();
}
}


function backToHome(){
  let lostScreen = document.getElementById("gameLostScreen");
  let canvas = document.getElementById("canvas");
  let startButton = document.getElementById("startGameButton");
  let startScreen = document.getElementById("startScreen");
  let wonScreen = document.getElementById("gameWonScreen");

  lostScreen.style.display = "none";
  wonScreen.style.display = "none";
  canvas.style.display = "none";
  startButton.style.display = "flex";
  startScreen.style.display = "flex";
}

function toggleInfoDiv() {
  let infoDiv = document.getElementById('infoDiv');
  if (infoDiv.style.display === 'none') {
      infoDiv.style.display = 'flex';
      document.addEventListener('click', closeInfoDivOutside);

  } else if(infoDiv.style.display === 'flex') {
      infoDiv.style.display = 'none';
  }
}

function closeInfoDivOutside(event) {
  let infoDiv = document.getElementById('infoDiv');
  let infoIcon = document.getElementById('infoIcon');
  if (event.target !== infoDiv && event.target !== infoIcon && !infoDiv.contains(event.target)) {
      infoDiv.style.display = 'none';
      document.removeEventListener('click', closeInfoDivOutside);
  }
}

function toggleFullScreen(){
  let fullScreen = document.getElementById("fullScreen");

  if (showFullScreen === false){
    exitFullscreen()
    showFullScreen = true;
    fullScreen.style.backgroundImage = "none";
  } else if (showFullScreen === true){
    enterFullscreen(fullScreen);
    showFullScreen = false;
    fullScreen.style.backgroundImage = "url(./img/5_background/layers/background-desert.png)";
  }
}

function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

window.addEventListener("keydown", (event) => {
  if(event.keyCode == 39){
    keyboard.RIGHT = true;
  }

  if(event.keyCode == 37){
    keyboard.LEFT = true;
  }

  if(event.keyCode == 38){
    keyboard.UP = true;
  }

  if(event.keyCode == 40){
    keyboard.DOWN = true;
  }

  if(event.keyCode == 32){
    keyboard.SPACE = true;
  }

  if(event.keyCode == 68){
    keyboard.D = true;
  }

} )

window.addEventListener("keyup", (event) => {
  if(event.keyCode == 39){
    keyboard.RIGHT = false;
  }

  if(event.keyCode == 37){
    keyboard.LEFT = false;
  }

  if(event.keyCode == 38){
    keyboard.UP = false;
  }

  if(event.keyCode == 40){
    keyboard.DOWN = false;
  }

  if(event.keyCode == 32){
    keyboard.SPACE = false;
  }

  if(event.keyCode == 68){
    keyboard.D = false;
  }

} )