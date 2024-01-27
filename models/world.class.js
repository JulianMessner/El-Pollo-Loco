class World {
  character = new Character(); //let wird in Klassen nicht benötigt
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  bottles = level1.bottles;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar_Health = new StatusBar_Health();
  statusBar_Bottles = new StatusBar_Bottles();
  throwableObjects = [];


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run(){
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }


  checkThrowObjects() {
    if(this.keyboard.D){
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }


  checkCollisions(){
    this.level.enemies.forEach((enemy) => {
      if(this.character.isColliding(enemy)){
        this.character.hit();
        this.statusBar_Health.setPercentage(this.character.energy); //reduziert Energybar anhand von Kollision
      }
    });

    this.checkCollisionsWithBottles();
  }

  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.removeBottle(bottle);
      }
    });
  }
  
  removeBottle(bottle) {
    const index = this.level.bottles.indexOf(bottle);
    if (index !== -1) {
      this.statusBar_Bottles.collectBottle();
      this.level.bottles.splice(index, 1);
    }
  }



  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0); // Back
    this.ctx.translate(this.camera_x, 0); // Forward

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.bottles.filter(bottle => !bottle.removed));
    this.addObjectsToMap(this.throwableObjects);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar_Health);
    this.addToMap(this.statusBar_Bottles);

    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }

    moveableObject.draw(this.ctx);

    moveableObject.drawFrame(this.ctx);

    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
  }

  flipImage(moveableObject){
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
    this.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }

  flipImageBack(moveableObject){
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }
}