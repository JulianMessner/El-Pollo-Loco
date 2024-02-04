class Endboss extends MoveableObject {

    height = 400;
    width = 300;
    y = 50;
    energy = 100;

    ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    ENDBOSS_HURT = [
      'img/4_enemie_boss_chicken/4_hurt/G21.png',
      'img/4_enemie_boss_chicken/4_hurt/G22.png',
      'img/4_enemie_boss_chicken/4_hurt/G23.png',

    ];

    ENDBOSS_DEAD = [
      'img/4_enemie_boss_chicken/5_dead/G24.png',
      'img/4_enemie_boss_chicken/5_dead/G25.png',
      'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]; 

    constructor(){
        super().loadImage(this.ENDBOSS_WALKING[0]);
        this.loadImages(this.ENDBOSS_WALKING);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 2500;
        this.animate();
    }

    animate() {
        setInterval(() => {
          this.playAnimation(this.ENDBOSS_WALKING);
        }, 100);
      } 

      hurt() {
        this.energy -= 20;
        this.playHurtAnimation();
      }

      playHurtAnimation() {
        let i = 0;
        const self = this;
    
        const intervalId = setInterval(() => {
          if (i < self.ENDBOSS_HURT.length) {
            self.img = self.imageCache[self.ENDBOSS_HURT[i]];
            i++;
          } else {
            clearInterval(intervalId);
            self.img = new Image();
          }
        }, 200);
      }
}