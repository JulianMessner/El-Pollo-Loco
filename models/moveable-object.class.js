class MoveableObject{
    x = 120;
    y = 300;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;  //0.15 Pixel werden abgezogen
    otherDirection = false;

    //loadImage('./img/test.png')
    loadImage(path){
        this.img = new Image(); //Image muss nicht neu definiert werden -> hier dasselbe wie this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    loadImages(array){
            array.forEach(path => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // dasselbe wie z.B. let i = 0 % 6; ->  0:6 = 0,Rest 0
        // i = 0, 1, 2, 3, 4, 5, 6, dann 0, 1, 2, 3, 4, 5, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(){ //nicht notwendig function davor zu schreiben, da in class dies automatisch als Funktion deklariert wird
        console.log('moving right');
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); //60x pro Sekunde wird diese Funktion ausgeführt
    }
}