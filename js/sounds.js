let allSounds = [
  new Audio("audio/running-sound.mp3"),
  new Audio("audio/jump.mp3"),
  new Audio("audio/bottle.mp3"),
  new Audio("audio/coin.mp3"),
  new Audio("audio/bottle-splash.mp3"),
  new Audio("audio/chicken-squish.mp3"),
  new Audio("audio/endboss-hit.mp3"),
  new Audio("audio/character-hurt.mp3"),
  new Audio("audio/background-music.mp3"),
  new Audio("audio/cheering.mp3"),
  new Audio("audio/gameOver.mp3"),
];
let sound = false;

function init() {
  muteSound();
}

function toggleSound() {
  let volumeIcon = document.getElementById("volumeIcon");

  if (sound) {
    volumeIcon.src = "./img/10_icons/volume-off.png";
    muteSound();
  } else {
    volumeIcon.src = "./img/10_icons/volume-on.png";
    unmuteSound();
  }
}

function muteSound() {
  allSounds.forEach((sound) => {
    sound.muted = true;
    sound.pause();
  });
  sound = false;
}

function unmuteSound() {
  allSounds.forEach((sound) => {
    sound.muted = false;
  });
  sound = true;

  if (sound) {
    allSounds[8].play();
    allSounds[8].volume = 0.1;
    allSounds[8].loop = true;
  }
}