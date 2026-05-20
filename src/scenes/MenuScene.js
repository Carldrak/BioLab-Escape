
export default class MenuScene extends Phaser.Scene {

  constructor() {
    super("MenuScene");
  }

  preload() {

    /*
    =========================================
    PLAYER
    =========================================
    */


    /*
    =========================================
    ENEMIES
    =========================================
    */

    this.load.image(
      "mutant",
      "assets/sprites/enemies/mutant.png"
    );

    this.load.image(
      "drone",
      "assets/sprites/enemies/drone.png"
    );

    this.load.image(
      "camera",
      "assets/sprites/enemies/camera.png"
    );

    this.load.image(
      "bullet",
      "assets/sprites/enemies/bullet.png"
    );

    /*
    =========================================
    BACKGROUND / MAP
    =========================================
    */


    /*
    =========================================
    ITEMS
    =========================================
    */


    /*
    =========================================
    AUDIO
    =========================================
    */


  }

  create() {

    /*
    =========================================
    BACKGROUND
    =========================================
    */

    this.add.image(
      480,
      270,
      "background"
    )
      .setDisplaySize(960, 540);

    /*
    =========================================
    DARK OVERLAY
    =========================================
    */

    this.add.rectangle(
      480,
      270,
      960,
      540,
      0x000000,
      0.45
    );

    /*
    =========================================
    TITLE
    =========================================
    */

    this.add.text(
      480,
      120,
      "BIOLAB SCAPE",
      {
        fontSize: "56px",
        fontStyle: "bold",
        color: "#00ffcc",

        stroke: "#000000",
        strokeThickness: 6,
      }
    ).setOrigin(0.5);

    /*
    =========================================
    PLAY BUTTON
    =========================================
    */

    const playButton = this.add.text(
      480,
      250,
      "JUGAR",
      {
        fontSize: "34px",
        color: "#ffffff",

        backgroundColor: "#1f2937",

        padding: {
          x: 24,
          y: 12,
        },
      }
    )
      .setOrigin(0.5)
      .setInteractive();

    /*
    =========================================
    PLAY BUTTON HOVER
    =========================================
    */

    playButton.on("pointerover", () => {

      playButton.setStyle({
        color: "#00ffcc",
      });

      playButton.setScale(1.05);
    });

    playButton.on("pointerout", () => {

      playButton.setStyle({
        color: "#ffffff",
      });

      playButton.setScale(1);
    });

    /*
    =========================================
    START GAME
    =========================================
    */

    playButton.on("pointerdown", () => {
      console.log ("Clic en jugar");
      this.scene.start("GameScene");
    });

    /*
    =========================================
    CONTROLS BUTTON
    =========================================
    */

    const controlsButton = this.add.text(
      480,
      340,
      "CONTROLES",
      {
        fontSize: "30px",
        color: "#ffffff",

        backgroundColor: "#1f2937",

        padding: {
          x: 24,
          y: 12,
        },
      }
    )
      .setOrigin(0.5)
      .setInteractive();

    /*
    =========================================
    CONTROLS HOVER
    =========================================
    */

    controlsButton.on("pointerover", () => {

      controlsButton.setStyle({
        color: "#00ffcc",
      });

      controlsButton.setScale(1.05);
    });

    controlsButton.on("pointerout", () => {

      controlsButton.setStyle({
        color: "#ffffff",
      });

      controlsButton.setScale(1);
    });

    /*
    =========================================
    OPEN CONTROLS SCENE
    =========================================
    */

    controlsButton.on("pointerdown", () => {

      this.scene.start("ControlsScene");
    });

  }
}