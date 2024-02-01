class ThrowableObject extends MoveableObject {
  statusBarBottles;

  IMAGES_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, statusBarBottles) {
    super();
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.statusBarBottles = statusBarBottles;
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.throw();
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
  }

  throw() {
    this.speedY = 30;

    const throwInterval = setInterval(() => {
      this.checkCollisionWithEndboss();
      if (this.y >= 330) {
        clearInterval(throwInterval);
        this.splashBottle();
      } else {
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        this.x += 20;
      }
    }, 80);

    this.statusBarBottles.reduceBottlesStatusBar();

    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  checkCollisionWithEndboss() {
    console.log("Checking collision with Endboss");
    if (this.isCollidingWithEndboss()) {
      console.log("Collision with Endboss detected!");
      clearInterval(this.gravityInterval);
      this.splashBottle();
    }
  }

  isCollidingWithEndboss() {
    if (
      this.endboss &&
      this.endboss.x !== undefined &&
      this.endboss.y !== undefined
    ) {
      return (
        this.x < this.endboss.x + this.endboss.width &&
        this.y < this.endboss.y + this.endboss.height &&
        this.x + this.width > this.endboss.x &&
        this.y + this.height > this.endboss.y
      );
    }
    return false;
  }

  splashBottle() {
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);

    clearInterval(this.gravityInterval);

    setTimeout(() => {
      this.img = new Image();
    }, 200);
  }
}
