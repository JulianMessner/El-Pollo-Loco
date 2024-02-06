class MoveableObject extends DrawableObject {
  speed = 0.15; //0.15 Pixel werden abgezogen
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject){ // Throwable object should always fall
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

  hit(){
    this.energy -= 5;
    if(this.energy < 0) {
        this.energy = 0;
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
    let i = this.currentImage % images.length; // dasselbe wie z.B. let i = 0 % 6; ->  0:6 = 0,Rest 0
    // i = 0, 1, 2, 3, 4, 5, 6, dann 0, 1, 2, 3, 4, 5, ...
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