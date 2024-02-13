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
    this.x = 220;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }


  /**
   * Sets the percentage of bottles in the status bar.
   * @param {number} percentage - The percentage of bottles to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }


  /**
   * Resolves the index of the image path based on the current percentage.
   * @returns {number} The index of the image path.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 80) {
      return 4;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }


  /**
   * Increases the percentage of bottles in the status bar by 20%.
   */
  collectBottle() {
    if (this.percentage < 100) {
      this.percentage += 20;
      this.updateImage();
    }
  }


  /**
   * Updates the image of the status bar based on the current percentage.
   */
  updateImage() {
    let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  
  /**
   * Reduces the percentage of bottles in the status bar by 20%.
   */
  reduceBottlesStatusBar() {
    if (this.percentage >= 20) {
      this.percentage -= 20;
      this.updateImage();
    }
  }
}