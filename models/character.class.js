class Character extends MoveableObject {
  height = 280;
  width = 140;
  y = 70; //155 Position auf x-Achse stehend
  speed = 10;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  world;
  running_sound = new Audio('audio/running-sound.mp3');

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();

    this.animate();
  }

  animate() {

    setInterval(() => { 
    //character auf x-Achse bewegen
      this.running_sound.pause();
      if (this.world.keyboard.RIGHT  && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.running_sound.volume = 0.5;
        this.running_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.running_sound.volume = 0.5;
        this.running_sound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.speedY = 30;
      }

      this.world.camera_x = -this.x + 100;

    }, 1000 / 60);

    setInterval(() => {
      if(this.isAboveGround()){
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 150);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { 
        //walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    },50)
  }

  jump() {}
}
