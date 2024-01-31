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
      if (this.y >= 330) {
        clearInterval(throwInterval);

        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);

        clearInterval(this.gravityInterval);

        setTimeout(() => {
          this.img = new Image();
        }, 200);
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
}
