class World {
    character = new Character(); //let wird in Klassen nicht benötigt
    enemies = [ //let wird in Klassen nicht benötigt
      new Chicken(),
      new Chicken(),
      new Chicken(),
    ];
    clouds = [
      new Cloud()
    ];
    backgroundObjects = [
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 100)
    ];
    canvas;
    ctx;

    constructor(canvas){
      this.ctx = canvas.getContext("2d");
      this.canvas = canvas;
      this.draw();
    }

    draw(){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.addToMap(this.character);
      this.addObjectsToMap(this.clouds);
      this.addObjectsToMap(this.enemies);
      this.addObjectsToMap(this.backgroundObjects);

      //draw() wird immer wieder aufgerufen
      let self = this; 
      requestAnimationFrame(function(){
        self.draw();
      });
    }

    addObjectsToMap(objects){
      objects.forEach(o => {
        this.addToMap(o);
      });
    }

    addToMap(moveableObjevt) {
      this.ctx.drawImage(moveableObjevt.img, moveableObjevt.x, moveableObjevt.y, moveableObjevt.width, moveableObjevt.height);
    }
}