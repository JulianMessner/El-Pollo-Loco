class Bottle extends MoveableObject {
    y = 380;
    width = 50;
    height = 50;

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 100 + Math.random() * 2000;
    }
  }