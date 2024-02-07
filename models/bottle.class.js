class Bottle extends MoveableObject {
    y = 380;
    width = 50;
    height = 50;
    removed = false;
    bottle_sound = new Audio('audio/bottle.mp3')
    IMAGES_BOTTLE_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_BOTTLE_GROUND[0]);
        this.loadImages(this.IMAGES_BOTTLE_GROUND);
        this.x = 100 + Math.random() * 2000;

        this.animate();
    }

    removeBottle() {
      this.bottle_sound.volume = 0.5;
      this.bottle_sound.play();
      this.removed = true;
      }

    animate() {
        setInterval(() => {
          this.playAnimation(this.IMAGES_BOTTLE_GROUND);
        }, 200);
    }
  }