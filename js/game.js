let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  let loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.display = "flex";
  
  setTimeout(function() {
    startGame();
  }, 1000);
}

function startGame(){
  let canvas = document.getElementById("canvas");
  let startScreen = document.getElementById("startScreen");

  loadingScreen.style.display = "none";
  canvas.style.display = "block";
  
  let world = new World(canvas, keyboard);
  
  startScreen.style.display = "none";
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