class MoveableObject extends DrawableObject {
  speed = 0.15; //0.15 Pixel werden abgezogen
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  hurt_sound = allSounds[7];
  

  /**
   * Applies gravity to the moveable object.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }


  /**
   * Checks if the moveable object is above the ground.
   * @returns {boolean} True if the moveable object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject){
        return true;
    } else {    
        return this.y < 155;
    };
  }


  /**
   * Checks if the moveable object is colliding with another moveable object.
   * @param {MoveableObject} moveableObject - The other moveable object to check collision with.
   * @returns {boolean} True if the moveable object is colliding with the other moveable object, false otherwise.
   */
  isColliding(moveableObject){
    if (moveableObject && moveableObject.x !== undefined && moveableObject.y !== undefined) {
        return this.x + this.width > moveableObject.x &&
               this.y + this.height > moveableObject.y &&
               this.x < moveableObject.x &&
               this.y < moveableObject.y + (moveableObject.height - 120);
    }
  }


  /**
   * Handles a hit on the moveable object.
   */
  hit() {
    this.energy -= 1;
    this.hurt_sound.volume = 0.5;
    this.hurt_sound.play();
    if(this.energy < 0) {
      return this.energy = 0;
    } else{
      this.lastHit = new Date().getTime();
    }
  }
  

  /**
   * Checks if the moveable object is currently hurt.
   * @returns {boolean} True if the moveable object is hurt, false otherwise.
   */
  isHurt(){
    let timePassed = new Date().getTime() - this.lastHit; //Differenz in Millisekunden
    timePassed = timePassed / 1000; //Differenz in Sekunden
    return timePassed < 1;
  }


  /**
   * Checks if the moveable object is dead.
   * @returns {boolean} returns the energy of 0.
   */
  isDead(){
    return this.energy == 0;
  }


  /**
   * Plays an animation for the moveable object.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * Moves the moveable object to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }


  /**
   * Moves the moveable object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  
  /**
   * Makes the moveable object jump.
   */
  jump() {
    this.speedY = 30;
  }
}