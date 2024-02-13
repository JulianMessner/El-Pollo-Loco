class Coin extends MoveableObject {
  y = 380;
  width = 120;
  height = 120;
  removed = false;
  IMAGES_COINS_GROUND = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage(this.IMAGES_COINS_GROUND[0]);
    this.loadImages(this.IMAGES_COINS_GROUND);
    this.x = 300 + Math.random() * 2000;
    this.y = 50 + Math.random() * 300;
    this.animate();
  }


  /**
   * Removes the coin from the game by setting removed to true.
   */
  removeCoin() {
    this.removed = true;
  }


  /**
   * Animates the coin.
   */
  animate() {
    this.coinAnimation = setInterval(() => {
      this.playAnimation(this.IMAGES_COINS_GROUND);
    }, 200);
  }

  
  /**
   * Stops the coin animation.
   */
  stopCoinAnimation() {
    clearInterval(this.coinAnimation);
  }
}