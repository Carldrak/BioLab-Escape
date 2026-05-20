

/*
=========================================
SCENES
=========================================
*/

import MenuScene from "./src/scenes/MenuScene.js";
//import ControlsScene from "./scenes/ControlsScene.js";
import GameScene from "./src/scenes/GameScene.js";
//import WinScene from "./scenes/WinScene.js";
//import GameOverScene from "./scenes/GameOverScene.js";

/*
=========================================
GAME CONFIG
=========================================
*/

const config = {

  type: Phaser.AUTO,

  parent: "game-container",

  width: 960,
  height: 540,

  backgroundColor: "#111827",

  pixelArt: true,

  physics: {
    default: "arcade",

    arcade: {
      gravity: {
        y: 900,
      },

      debug: false,
    },
  },

  scale: {

    mode: Phaser.Scale.FIT,

    autoCenter:
      Phaser.Scale.CENTER_BOTH,
  },

  scene: [

    MenuScene,
    //ControlsScene,
    GameScene,
   // WinScene,
    //GameOverScene,
  ],
};

/*
=========================================
START GAME
=========================================
*/

new Phaser.Game(config);