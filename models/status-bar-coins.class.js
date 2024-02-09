class StatusBar_Coins extends DrawableObject {

    IMAGES_STATUS_COINS = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
      ];
    
      percentage = 0;
    
      constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_COINS);
        this.x = 220;
        this.y = 43;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
      }
    
      setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
      }
    
      resolveImageIndex(){
        if(this.percentage == 100){
            return 5;  
        } else if(this.percentage == 80){
            return 4;
        } else if(this.percentage == 60){
            return 3;
        } else if(this.percentage == 40){
            return 2;
        } else if(this.percentage == 20){
            return 1;
        } else {
            return 0;
        }
      }

      collectCoin() {
        if (this.percentage < 100) {
          this.percentage += 20;
          this.updateStatusCoinsImage();
        }
      }

      updateStatusCoinsImage() {
        let path = this.IMAGES_STATUS_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
      }

      reduceBottlesStatusBar() {
        if (this.percentage >= 20) {
          this.percentage -= 20;
          this.updateStatusCoinsImage();
        }
      }
  }