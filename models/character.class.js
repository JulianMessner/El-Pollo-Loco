class Character extends MoveableObject {
  height = 280;
  width = 140;
  y = 70; //155 Position auf x-Achse stehend
  speed = 10;
  isMoving = false; 
  lastKeyPressTime = new Date().getTime();
  world;

  CHARACTER_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  CHARACTER_IDLE_LONG = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

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

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.CHARACTER_IDLE);
    this.loadImages(this.CHARACTER_IDLE_LONG);
    this.loadImages(this.CHARACTER_WALKING);
    this.loadImages(this.CHARACTER_JUMPING);
    this.loadImages(this.CHARACTER_DEAD);
    this.loadImages(this.CHARACTER_HURT);
    this.applyGravity();

    this.animate();
  }

  animate() {
    setInterval(() => {
      // character auf x-Achse bewegen
      running_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.isMoving = true;
        running_sound.volume = 0.5;
        running_sound.play();
        this.lastKeyPressTime = new Date().getTime();
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.isMoving = true;
        this.otherDirection = true;
        running_sound.volume = 0.5;
        running_sound.play();
        this.lastKeyPressTime = new Date().getTime();
      } else {
        this.isMoving = false; 
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        jumping_sound.volume = 0.5;
        jumping_sound.play();
        this.lastKeyPressTime = new Date().getTime();
      }

      this.world.camera_x = -this.x + 100;
      
    }, 1000 / 60);

    setInterval(() => {
      const currentTime = new Date().getTime();
      const timeSinceLastKeyPress = (currentTime - this.lastKeyPressTime) / 1000;
  
      if (this.isDead()) {
        this.playAnimation(this.CHARACTER_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.CHARACTER_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.CHARACTER_JUMPING);
      } else if (this.isMoving) {
        this.playAnimation(this.CHARACTER_WALKING);
      } else if (timeSinceLastKeyPress >= 8 && timeSinceLastKeyPress < 16){
          this.playAnimation(this.CHARACTER_IDLE_LONG);
      } else if (timeSinceLastKeyPress <= 8){
        this.playAnimation(this.CHARACTER_IDLE);
      }    
    }, 150);
  }

}
