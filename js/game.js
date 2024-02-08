let canvas;
let world;
let keyboard = new Keyboard();
let running_sound = new Audio('audio/running-sound.mp3');
let jumping_sound = new Audio('audio/jump.mp3');
let bottle_sound = new Audio('audio/bottle.mp3');
let coin_sound = new Audio('audio/coin.mp3');
let bottleSplash_sound = new Audio('audio/bottle-splash.mp3')
let chicken_sound = new Audio('audio/chicken-squish.mp3')


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

function toggleSound() {
  // Array zum Speichern der Audio-Objekte
  let audioElements = [];
  
  // Hinzufügen aller Audio-Objekte aus der Weltklasse
  audioElements.push(world.running_sound);
  audioElements.push(world.jumping_sound);
  audioElements.push(world.bottle_sound);
  audioElements.push(world.coin_sound);
  
  // Iteration über alle Audio-Objekte und Stoppen der Wiedergabe
  audioElements.forEach(audio => {
      audio.pause();
  });
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