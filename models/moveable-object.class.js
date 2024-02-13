class MoveableObject extends DrawableObject {
  speed = 0.15; //0.15 Pixel werden abgezogen
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  hurt_sound = allSounds[7];
  
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject){
        return true;
    } else {    
        return this.y < 155;
    };
  }

  isColliding(moveableObject){
    if (moveableObject && moveableObject.x !== undefined && moveableObject.y !== undefined) {
        return this.x + this.width > moveableObject.x &&
               this.y + this.height > moveableObject.y &&
               this.x < moveableObject.x &&
               this.y < moveableObject.y + (moveableObject.height - 120);
    }
  }

  hit() {
    console.log("Hit method called");
    this.energy -= 1;
    this.hurt_sound.volume = 0.5;
    this.hurt_sound.play();
    if(this.energy < 0) {
      return this.energy = 0;
    } else{
      this.lastHit = new Date().getTime();
    }
  }
  

  isHurt(){
    let timePassed = new Date().getTime() - this.lastHit; //Differenz in Millisekunden
    timePassed = timePassed / 1000; //Differenz in Sekunden
    return timePassed < 1;
  }

  isDead(){
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}