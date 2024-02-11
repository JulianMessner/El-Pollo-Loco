class ChickenSmall extends MoveableObject {
    height = 60;
    width = 60;
    chicken_sound = allSounds[5];
      
    CHICKEN_SMALL_WALKING = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
  
    CHICKEN_SMALL_DEAD = [
      "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];
  
    constructor() {
      super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
      this.loadImages(this.CHICKEN_SMALL_WALKING);
      this.loadImages(this.CHICKEN_SMALL_DEAD);
      this.x = 400 + Math.random() * 2000;
      this.y = 370;
      this.speed = 0.85 + Math.random() * 0.85;
      this.animate();
    }
  
    animate() {
      this.walkingInterval = setInterval(() => {
        this.x -= this.speed;
      }, 1000 / 60); //60x pro Sekunde wird diese Funktion ausgeführt
  
      this.moveLeft();
  
      this.walkingAnimationInterval = setInterval(() => {
        this.playAnimation(this.CHICKEN_SMALL_WALKING);
      }, 100);
    }
  
    die() {
      this.stopWalkingAnimation();
      this.playAnimation(this.CHICKEN_SMALL_DEAD);
      this.chicken_sound.volume = 0.1;
      this.chicken_sound.play();
    
      setTimeout(() => {
        this.img = new Image();
        this.y = 0;
      }, 80);
    } 
      
      stopWalkingAnimation() {
        clearInterval(this.walkingInterval);
        clearInterval(this.walkingAnimationInterval);
      }
  }