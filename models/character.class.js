class Character extends MoveableObject {
  height = 280;
  width = 140;
  y = 70; //155 Position auf x-Achse stehend
  speed = 10;
  CHARACTER_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png"
  ];

  CHARACTER_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];

  CHARACTER_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];

  CHARACTER_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  world;
  running_sound = new Audio('audio/running-sound.mp3');

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.CHARACTER_WALKING);
    this.loadImages(this.CHARACTER_JUMPING);
    this.loadImages(this.CHARACTER_DEAD);
    this.loadImages(this.CHARACTER_HURT);
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
        this.jump();
      }

      this.world.camera_x = -this.x + 100;

    }, 1000 / 60);

    setInterval(() => {

      if(this.isDead()){
        this.playAnimation(this.CHARACTER_DEAD);
      } else if(this.isHurt()) {
        this.playAnimation(this.CHARACTER_HURT);
      } else if(this.isAboveGround()){
        this.playAnimation(this.CHARACTER_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { {
          this.playAnimation(this.CHARACTER_WALKING);
        }
      }
    }, 150);

  }

}
