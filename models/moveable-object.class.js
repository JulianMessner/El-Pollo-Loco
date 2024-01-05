class MoveableObject{
    x = 120;
    y = 300;
    img;
    height = 150;
    width = 100;
    imageCache = [];

    //loadImage('./img/test.png')
    loadImage(path){
        this.img = new Image(); //Image muss nicht neu definiert werden -> hier dasselbe wie this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    loadImages(array){
            array.forEach(path => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = path;
            });
    }

    moveRight(){ //nicht notwendig function davor zu schreiben, da in class dies automatisch als Funktion deklariert wird
        console.log('moving right');
    }

    moveLeft(){
        
    }
}