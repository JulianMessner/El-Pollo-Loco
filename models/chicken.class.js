class Chicken extends MoveableObject {
  height = 80;
  width = 70;
  chicken_sound = allSounds[5];

  CHICKEN_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  
  CHICKEN_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.CHICKEN_WALKING);
    this.loadImages(this.CHICKEN_DEAD);
    this.x = 400 + Math.random() * 3000;
    this.y = 350;
    this.speed = 0.65 + Math.random() * 1.95;
    this.animate();
  }


  /**
   * Animates the chicken.
   */
  animate() {
    this.walkingInterval = setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
    this.moveLeft();
    this.walkingAnimationInterval = setInterval(() => {
      this.playAnimation(this.CHICKEN_WALKING);
    }, 100);
  }


  /**
   * Handles the chicken's death animation.
   */
  die() {
    this.stopWalkingAnimation();
    this.playAnimation(this.CHICKEN_DEAD);
    this.playChickenDeadSound();
    this.removeChicken();
  } 
  

  /**
   * Stops the walking animation of the chicken.
   */
  stopWalkingAnimation() {
    clearInterval(this.walkingInterval);
    clearInterval(this.walkingAnimationInterval);
  }


  /**
   * Removes the chicken from the game.
   */
  removeChicken(){
    setTimeout(() => {
      this.img = new Image();
      this.y = -100;
    }, 70);
  }

  
  /**
   * Plays the sound when chicken dies.
   */
  playChickenDeadSound(){
    this.chicken_sound.volume = 0.1;
    this.chicken_sound.play();
  }
}