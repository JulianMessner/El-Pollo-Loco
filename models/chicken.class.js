class Chicken extends MoveableObject {
  height = 80;
  width = 70;
  isDead = false;

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
    this.x = 200 + Math.random() * 2000;
    this.y = 350;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    this.walkingInterval = setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60); //60x pro Sekunde wird diese Funktion ausgeführt

    this.moveLeft();

    this.walkingAnimationInterval = setInterval(() => {
      this.playAnimation(this.CHICKEN_WALKING);
    }, 100);
  }

  die() {
    this.isDead = true; // Markiere das Huhn als tot
    this.stopWalkingAnimation(); // Stoppe die Laufanimation des Huhns
    this.playAnimation(this.CHICKEN_DEAD); // Starte die Todesanimation des Huhns
    
    setTimeout(() => {
      this.img = new Image();
    }, 300);
  }

  hideDeadImage() {
    // Setze das Bild auf null oder ein anderes leeres Bild, um es auszublenden
    this.img = null; // Oder this.img = new Image(); mit einem leeren Bildpfad
  }
  
  
  stopWalkingAnimation() {
    clearInterval(this.walkingInterval); // Stoppe die Laufanimation des Huhns
    clearInterval(this.walkingAnimationInterval); // Stoppe die Laufanimations-Interval des Huhns
  }
  
}
