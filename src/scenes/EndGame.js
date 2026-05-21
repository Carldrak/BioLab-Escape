export default class EndGame extends Phaser.Scene {
    constructor() {
        super('endGameScene');
    }

    preload() {
        this.load.image('space', '../assets/fondo.png');
        this.load.image('logo', '../assets/gameOver.png');
        this.load.image('mars','../assets/mars.png')
    }
    create() {
        this.add.image(400, 265, 'space').setScale(2);
        this.add.image(400, 150, 'logo');
        this.add.image(85, 424, 'mars').setScale(0.15);

        this.add.text(200,250, 'Player 1: '+ player.score + ' Points', {fontFamily: "font1", fontSize: "32px", fontStyle: "bold", fill: "#fff" });
       if(playerQuantity==2){
        this.add.text(200,300, 'Player 2: '+ secondPlayer.score + ' Points', {fontFamily: "font1", fontSize: "32px", fontStyle: "bold", fill: "#fff" });
       }
        this.add.text(500,400, 'Level:  '+ levelName, {fontFamily: "font1", fontSize: "32px", fontStyle: "bold", fill: "#fff" });
        this.add.text(500,450, 'Mode: '+ modeName, {fontFamily: "font1", fontSize: "32px", fontStyle: "bold", fill: "#fff" });   

        const backOption = this.add.zone( 0,0,800,530);
        backOption.setOrigin(0);
        backOption.setInteractive();
        backOption.once('pointerdown',()=> this. redirectScene ('menuScene'));
    }

    redirectScene(sceneName)
    {
        this.scene.start(sceneName);
    }

}
