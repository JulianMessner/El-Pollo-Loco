class Coin extends MoveableObject {
    y = 380;
    width = 100;
    height = 100;
    removed = false;
    IMAGES_COINS_GROUND = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_COINS_GROUND[0]);
        this.loadImages(this.IMAGES_COINS_GROUND);
        this.x = 100 + Math.random() * 2000;
        this.y = 50 + Math.random() * 300;

        this.animate();
    }

    removeCoin() {
        this.removed = true;
      }

    animate() {
        setInterval(() => {
          this.playAnimation(this.IMAGES_COINS_GROUND);
        }, 200);
    }
  }