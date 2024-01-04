class MoveableObject{
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;

    //loadImage('./img/test.png')
    loadImage(path){
        this.img = new Image(); //Image muss nicht neu definiert werden -> hier dasselbe wie this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    moveRight(){ //nicht notwendig function davor zu schreiben, da in class dies automatisch als Funktion deklariert wird
        console.log('moving right');
    }

    moveLeft(){
        
    }
}