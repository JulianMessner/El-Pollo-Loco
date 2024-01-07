class MoveableObject {
  x = 120;
  y = 300;
  img;
  height = 150;
  width = 100;
  imageCache = [];
  currentImage = 0;
  speed = 0.15; //0.15 Pixel werden abgezogen
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 155;
  }

  //loadImage('./img/test.png')
  loadImage(path) {
    this.img = new Image(); //Image muss nicht neu definiert werden -> hier dasselbe wie this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  // character.isColliding(chicken);
  isColliding(moveableObject){
    return this.x + this.width > moveableObject.x &&
        this.y + this.height > moveableObject.y &&
        this.x < moveableObject.x &&
        this.y < moveableObject.y + moveableObject.height;
  }

  hit(){
    this.energy -= 5;
    if(this.energy < 0) {
        this.energy = 0;
    }
  }

  isDead(){
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length; // dasselbe wie z.B. let i = 0 % 6; ->  0:6 = 0,Rest 0
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
