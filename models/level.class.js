class Level{
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    level_end_x = 2200;

    constructor(backgroundObjects, enemies, clouds, bottles){
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
    }
}