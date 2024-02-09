class World {
  character = new Character(); //let wird in Klassen nicht benötigt
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  bottles = level1.bottles;
  coins = level1.coins;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar_Health = new StatusBar_Health();
  statusBar_Bottles = new StatusBar_Bottles();
  statusBar_Coins = new StatusBar_Coins();
  statusBar_EndBoss = new StatusBar_EndBoss();
  throwableObjects = [];
  bottle_sound = allSounds[2];
  coin_sound = allSounds[3];
  collectedBottles = 0;
  collectedCoins = 0;


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  gameLost(){
    let lostScreen = document.getElementById("gameLostScreen");
    lostScreen.style.display = "flex";
    // this.character.stopAnimating();
    // this.enemies.forEach(enemy => {
    //   if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
    //     enemy.stopWalkingAnimation(); // Hier rufst du die stopAnimating() Methode für jeden Huhn-Feind auf
    //   }
    // });
    // this.bottles.forEach(bottle =>{
    //   if(bottle instanceof Bottle){
    //     bottle.stopBottleAnimation();
    //   }
    // })
    // this.coins.forEach(coin => {
    //   if(coin instanceof Coin){
    //     coin.stopCoinAnimation();
    //   }
    // })
  }

  
  setWorld() {
    this.character.world = this;
  
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }
  

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsWithBottles();
      this.checkCollisionsWithCoins();
      this.checkThrowObjects();
      this.checkCollisionsWithThrowables();
    }, 50);
  }


  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.statusBar_Bottles);
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.keyboard.D = false;
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
            if (!this.character.isAboveGround()) {
                this.character.hit();
                this.statusBar_Health.setPercentage(this.character.energy);
            } else if (this.character.isAboveGround() && this.character.speedY < 0 && (enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
                enemy.die();
            }
        }
    });
}



  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.removeBottle(bottle);
      }
    });
  }
  
  checkCollisionsWithThrowables() {
    this.throwableObjects.forEach((throwableObject) => {
        if (!throwableObject.collidedWithEndBoss) {
            this.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy)) {
                    throwableObject.collidedWithEndBoss = true; 
                    throwableObject.splashBottle();
                    setTimeout(() => {
                        this.removeThrowableObject(throwableObject);
                    }, 200);
                    if (enemy instanceof Endboss) {
                        enemy.endBossHurt();
                        this.statusBar_EndBoss.setPercentage(enemy.endBossEnergy);
                    }
                }
            });
        }
    });
}


  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.removeCoin(coin);
      }
    });
  }

  removeThrowableObject(throwableObject) {
    const index = this.throwableObjects.indexOf(throwableObject);
    if (index !== -1) {
      this.throwableObjects.splice(index, 1);
    }
  }


  removeBottle(bottle) {
    const index = this.level.bottles.indexOf(bottle);
    if (index !== -1) {
      this.statusBar_Bottles.collectBottle();
      this.level.bottles.splice(index, 1);

      this.collectedBottles++;
      this.bottle_sound.volume = 0.5;
      this.bottle_sound.play();
    }
  }

  removeCoin(coin){
    const index = this.level.coins.indexOf(coin);
    if (index !== -1) {
      this.statusBar_Coins.collectCoin();
      this.level.coins.splice(index, 1);

      this.collectedCoins++;
      this.coin_sound.volume = 0.5;
      this.coin_sound.play();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0); // Back
    this.ctx.translate(this.camera_x, 0); // Forward

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles.filter(bottle => !bottle.removed));
    this.addObjectsToMap(this.level.coins.filter(bottle => !bottle.removed));
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar_Bottles);
    this.addToMap(this.statusBar_Coins);
    this.addToMap(this.statusBar_Health);
    this.addToMap(this.statusBar_EndBoss);

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

    // moveableObject.drawFrame(this.ctx);

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