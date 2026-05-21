export default class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinScene' });
  }

  init() {}

  create() {
    this.add.text(480, 270, '¡Has ganado!', {
      fontSize: '32px',
      fill: '#ffffff'
    }).setOrigin(0.5);
  }
}