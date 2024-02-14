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

  /**
   * Resets the level by respawning enemies, bottles, and coins.
   */
  resetLevel() {
    this.level.bottles = [];
    this.level.coins = [];
    this.level.enemies = [];

    for (let i = 0; i < 5; i++) {
      this.level.bottles.push(new Bottle());
    }
    for (let i = 0; i < 5; i++) {
      this.level.coins.push(new Coin());
    }
    for (let i = 0; i < 3; i++) {
      this.level.enemies.push(new Chicken());
    }
    for (let i = 0; i < 3; i++) {
      this.level.enemies.push(new ChickenSmall());
    }
    this.level.enemies.push(new Endboss());
  }

  /**
   * Restarts the game by resetting energies, level, and intervals.
   */
  restartGame() {
    this.resetEnergies();
    this.resetLevel();
    this.clearRunAndBossInterval();
    this.run();
  }

  /**
   * Resets the energy of enemies and the player character.
   */
  resetEnergies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.reset();
      }
    });
    this.character.resetCharacterEnergy();
  }

  /**
   * Displays the game won screen, plays cheering sound and clears intervals.
   */
  gameWon() {
    let wonScreen = document.getElementById("gameWonScreen");
    wonScreen.style.display = "flex";
    playWonSound();
    this.clearRunAndBossInterval();
    clearInterval(this.runInterval);
    clearInterval(this.checkDistanceToEndboss);
  }

  /**
   * Displays the game lost screen, plays loose sound and clears intervals.
   */
  gameLost() {
    let lostScreen = document.getElementById("gameLostScreen");
    lostScreen.style.display = "flex";
    playLostSound();
    this.clearRunAndBossInterval();
    clearInterval(this.runInterval);
    clearInterval(this.checkDistanceToEndboss);
  }

  /**
   * Sets references to the world in character class.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Updates the behavior of the end boss based on the player's position.
   */
  updateBossBehavior() {
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss
    );
    const distanceToBoss = Math.abs(this.character.x - endboss.x);
    if (!endboss || endboss.endBossEnergy <= 0) {
      return;
    }
    if (distanceToBoss < 450 && distanceToBoss > 250) {
      endboss.playAnimation(endboss.ENDBOSS_WALKING);
      if (this.character.x < endboss.x) {
        endboss.moveLeft();
      }
    } else if (distanceToBoss < 250) {
      endboss.playAnimation(endboss.ENDBOSS_ATTACK);
      endboss.moveLeft();
    } else {
      endboss.playAnimation(endboss.ENDBOSS_ALERT);
    }
  }

  /**
   * Starts the game loop and checks collisions and distance between character and endboss.
   */
  run() {
    this.runInterval = setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsWithBottles();
      this.checkCollisionsWithCoins();
      this.checkThrowObjects();
      this.checkCollisionsWithThrowables();
    }, 50);
    this.checkDistanceToEndboss = setInterval(() => {
      this.updateBossBehavior();
    }, 100);
  }

  /**
   * Clears the game loop intervals.
   */
  clearRunAndBossInterval() {
    clearInterval(this.runInterval);
    clearInterval(this.checkDistanceToEndboss);
  }

  /**
   * Checks if the character can throw objects and handles the throwing action.
   */
  checkThrowObjects() {
    if (this.keyboard.D && !this.prevDState && this.collectedBottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.statusBar_Bottles
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
    }
    this.prevDState = this.keyboard.D;
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.isCharacterCollidingWithEnemy(enemy)) {
        this.handleCollision(enemy);
      }
    });
  }

  /**
   * Checks if the character is colliding with a specific enemy.
   *
   * @param {Object} enemy - The enemy to check for collision.
   */
  isCharacterCollidingWithEnemy(enemy) {
    return (
      this.character.x + this.character.width > enemy.x &&
      this.character.y + this.character.height > enemy.y &&
      this.character.x < enemy.x + enemy.width &&
      this.character.y < enemy.y + enemy.height
    );
  }

  /**
   * Handles actions when a collision between the character and an enemy occurs.
   *
   * @param {Object} enemy - The enemy with which the character collided.
   */
  handleCollision(enemy) {
    if (!this.character.isAboveGround()) {
      this.character.hit();
      this.statusBar_Health.setPercentage(this.character.energy);
    } else if (
      this.character.isAboveGround() &&
      this.character.speedY < 0 &&
      (enemy instanceof Chicken || enemy instanceof ChickenSmall)
    ) {
      enemy.die();
    }
  }

  /**
   * Checks collisions between the character and bottles, and removes collected bottles.
   */
  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.removeBottle(bottle);
      }
    });
  }

  /**
   * Checks collisions between throwable objects and enemies, and handles damage to both the end boss and other enemies.
   */
  checkCollisionsWithThrowables() {
    this.throwableObjects.forEach((throwableObject) => {
      if (!throwableObject.collidedWithEndBoss) {
        this.checkCollisionWithEndboss(throwableObject);
        this.checkCollisionWithOtherEnemies(throwableObject);
      }
    });
  }

  /**
   * Checks collision between a throwable object and the end boss, and handles the damage dealt to the end boss.
   */
  checkCollisionWithEndboss(throwableObject) {
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss
    );
    if (endboss && throwableObject.isColliding(endboss)) {
      throwableObject.collidedWithEndBoss = true;
      throwableObject.splashBottle();
      setTimeout(() => {
        this.removeThrowableObject(throwableObject);
      }, 500);
      endboss.endBossHurt();
      this.statusBar_EndBoss.setPercentage(endboss.endBossEnergy);
      if (endboss.endBossEnergy <= 0) {
        this.gameWon();
      }
    }
  }

  /**
   * Checks collision between a throwable object and other enemies, and handles the damage dealt to those enemies.
   */
  checkCollisionWithOtherEnemies(throwableObject) {
    this.level.enemies.forEach((enemy) => {
      if (!(enemy instanceof Endboss)) {
        const collisionX =
          throwableObject.x < enemy.x + enemy.width &&
          throwableObject.x + throwableObject.width > enemy.x;
        const collisionY =
          throwableObject.y < enemy.y + enemy.height &&
          throwableObject.y + throwableObject.height > enemy.y;
        if (collisionX && collisionY) {
          throwableObject.splashBottle();
          setTimeout(() => {
            this.removeThrowableObject(throwableObject);
          }, 500);
          if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
            enemy.die();
          }
        }
      }
    });
  }

  /**
   * Checks collisions between the character and coins, and removes collected coins.
   */
  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.removeCoin(coin);
      }
    });
  }

  /**
   * Removes a throwable object from the game world.
   */
  removeThrowableObject(throwableObject) {
    const index = this.throwableObjects.indexOf(throwableObject);
    if (index !== -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

  /**
   * Removes a bottle from the game world and updates the bottle status bar.
   */
  removeBottle(bottle) {
    const index = this.level.bottles.indexOf(bottle);
    if (index !== -1) {
      this.statusBar_Bottles.collectBottle();
      this.level.bottles.splice(index, 1);
      this.collectedBottles++;
      playBottleSound();
    }
  }

  /**
   * Removes a coin from the game world and updates the coin status bar.
   */
  removeCoin(coin) {
    const index = this.level.coins.indexOf(coin);
    if (index !== -1) {
      this.statusBar_Coins.collectCoin();
      this.level.coins.splice(index, 1);
      this.collectedCoins++;
      playCoinSound();
    }
  }

  /**
   * Draws the game world on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0); // Back
    this.ctx.translate(this.camera_x, 0); // Forward
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(
      this.level.bottles.filter((bottle) => !bottle.removed)
    );
    this.addObjectsToMap(this.level.coins.filter((bottle) => !bottle.removed));
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar_Bottles);
    this.addToMap(this.statusBar_Coins);
    this.addToMap(this.statusBar_Health);
    this.addToMap(this.statusBar_EndBoss);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds objects to be drawn to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a moveable object on the canvas.
   */
  addToMap(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
  }

  /**
   * Flips the image horizontally for moveable objects.
   */
  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
    this.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }

  /**
   * Restores the image's original orientation after flipping.
   */
  flipImageBack(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }
}
