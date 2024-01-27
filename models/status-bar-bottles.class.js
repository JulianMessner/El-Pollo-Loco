class StatusBar_Bottles extends DrawableObject {

    IMAGES_BOTTLES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
      ];
    
      percentage = 0;
    
      constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
      }
    
      setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
      }
    
      resolveImageIndex() {
        const index = Math.floor(this.percentage / 20);
        return Math.min(index, this.IMAGES_BOTTLES.length - 1);
      }

      collectBottle() {
        if (this.percentage < 100) {
          this.percentage += 20;
          this.updateImage();
        }
      }

      updateImage() {
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
      }
  }