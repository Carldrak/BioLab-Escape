import GameScene from "./scenes/GameScene.js";
import MenuScene from "./scenes/MenuScene.js";
import EndGame from "./scenes/EndGame.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 960,
  height: 540,
  backgroundColor: "#0b1020",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 900 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MenuScene,GameScene,EndGame],
};

new Phaser.Game(config);
