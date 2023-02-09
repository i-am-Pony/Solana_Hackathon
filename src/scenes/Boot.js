import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
    constructor() {
        super("Boot")
    }
    preload () {
        // Need to: configure to our game
       // this.preload.image("loading", "asserts/OUR-GAME/loading.png");
    }
    create() {
        this.scene.start("Preloader");
    }
}