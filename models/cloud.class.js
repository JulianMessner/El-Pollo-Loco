class Cloud extends MoveableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 2200; //beliebige Zahl zwischen 0 und 500
        this.animate();

    }

    animate(){
        setInterval(() => {
            this.x -= this.speed;
          }, 1000 / 40); //60x pro Sekunde wird diese Funktion ausgeführt

        this.moveLeft();
    }

}