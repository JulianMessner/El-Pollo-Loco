class Bottle extends MoveableObject {
  y = 360;
  width = 70;
  height = 70;
  removed = false;
  IMAGES_BOTTLE_GROUND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE_GROUND[0]);
    this.loadImages(this.IMAGES_BOTTLE_GROUND);
    this.x = 200 + Math.random() * 2000;
    this.animate();
  }

  removeBottle() {
    this.removed = true;
  }

  animate() {
    this.bottleInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_GROUND);
    }, 200);
  }

  stopBottleAnimation() {
    clearInterval(this.bottleInterval);
  }
}