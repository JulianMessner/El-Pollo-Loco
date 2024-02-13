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


  /**
   * Removes the bottle from the game by putting removed on true.
   */
  removeBottle() {
    this.removed = true;
  }


  /**
   * Animates the bottle by cycling through its images.
   */
  animate() {
    this.bottleInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_GROUND);
    }, 200);
  }

  
   /**
   * Stops the bottle animation.
   */
  stopBottleAnimation() {
    clearInterval(this.bottleInterval);
  }
}