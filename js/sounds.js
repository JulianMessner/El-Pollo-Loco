let allSounds = [
    new Audio('audio/running-sound.mp3'),
    new Audio('audio/jump.mp3'),
    new Audio('audio/bottle.mp3'),
    new Audio('audio/coin.mp3'),
    new Audio('audio/bottle-splash.mp3'),
    new Audio('audio/chicken-squish.mp3')
  ];
let sound = true;

function toggleSound() {
    if (sound === true) {
        muteSound();
    } else if (sound === false) {
        unmuteSound();
    }

    document.getElementById("muteButton").blur();
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
        allSounds[0].play(); // an dieser Stelle muss dann die Standardmusik ausgewählt sein!
    });
    sound = true;
}
