class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;

  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height; //da BGO height 400 hat und unter world.class.js y mit 80 definiert ist, deshalb 480
  }
}