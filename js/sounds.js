/**
 * Array containing all the audio files used in the game.
 */
let allSounds = [
  new Audio("audio/running-sound.mp3"),
  new Audio("audio/jump.mp3"),
  new Audio("audio/bottle.mp3"),
  new Audio("audio/coin.mp3"),
  new Audio("audio/bottle-splash-short.mp3"),
  new Audio("audio/chicken-squish.mp3"),
  new Audio("audio/endboss-hit.mp3"),
  new Audio("audio/character-hurt.mp3"),
  new Audio("audio/background-music.mp3"),
  new Audio("audio/cheering.mp3"),
  new Audio("audio/gameOver.mp3"),
];
let sound = false;
bottle_sound = allSounds[2];
coin_sound = allSounds[3];
cheering_sound = allSounds[9];
lost_sound = allSounds[10];

/**
 * Initializes the game by muting all sounds.
 */
function init() {
  muteSound();
}

/**
 * Toggles the sound on/off and updates the volume icon accordingly.
 */
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

/**
 * Mutes all sounds.
 */
function muteSound() {
  allSounds.forEach((sound) => {
    sound.muted = true;
    sound.pause();
  });
  sound = false;
}

/**
 * Unmutes all sounds and plays the background music.
 */
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


/**
 * Plays sound when collecting coin.
 */
function playCoinSound() {
  coin_sound.volume = 0.5;
  coin_sound.play();
}


/**
 * Plays sound when collecting bottle.
 */
function playBottleSound() {
  bottle_sound.volume = 0.5;
  bottle_sound.play();
}


/**
 * Plays the sound for winning the game.
 */
function playWonSound() {
  cheering_sound.play();
  cheering_sound.volume = 0.3;
}


/**
 * Plays the sound for losing the game.
 */
function playLostSound() {
  lost_sound.play();
  lost_sound.volume = 0.3;
}

/**
 * Pauses win/loose sound when restarting game or going back to main page.
 */
function pauseWinLooseSounds(){
  allSounds[9].pause();
  allSounds[10].pause();
}