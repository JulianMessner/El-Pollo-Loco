class Endboss extends MoveableObject {
  height = 400;
  width = 300;
  y = 50;
  endBossEnergy = 100;
  endBoss_hurt_sound = allSounds[6];

  ENDBOSS_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  ENDBOSS_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  ENDBOSS_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  ENDBOSS_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  ENDBOSS_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.ENDBOSS_WALKING[0]);
    this.loadImages(this.ENDBOSS_WALKING);
    this.loadImages(this.ENDBOSS_ALERT);
    this.loadImages(this.ENDBOSS_HURT);
    this.loadImages(this.ENDBOSS_DEAD);
    this.loadImages(this.ENDBOSS_ATTACK);
    this.x = 2500;
    this.speed = 4.8;
  }


  /**
   * Function to handle the end boss character getting hurt.
   */
  endBossHurt() {
    if (this.endBossEnergy >= 20) {
      this.endBossEnergy -= 20;
      let animationIndex = 0;
  
      this.playEndbossHurtSound();
  
      const intervalId = setInterval(() => {
        if (animationIndex < this.ENDBOSS_HURT.length) {
          this.playAnimation([this.ENDBOSS_HURT[animationIndex]]);
          animationIndex++;
        } else {
          clearInterval(intervalId);
          if (this.endBossEnergy <= 0) {
            clearInterval(intervalId);
            const deadIntervalId = setInterval(() => {
              this.playAnimation(this.ENDBOSS_DEAD);
            }, 200);
          }
        }
      }, 100);
    }
  }


  /**
   * Resets the end boss character's energy level.
   */
  reset() {
    this.endBossEnergy = 100;
  }

  
  /**
   * Plays the sound for the end boss character getting hurt.
   */
  playEndbossHurtSound(){
    this.endBoss_hurt_sound.volume = 0.1;
    this.endBoss_hurt_sound.play();
  }
}