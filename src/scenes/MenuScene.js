export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.add.text(350, 180, 'BIOLAB SCAPE', {
      fontSize: '56px',
      color: '#6cff7c'
    });

    const play = this.add.text(480, 330, 'JUGAR', {
      fontSize: '36px',
      color: '#ffffff',
      backgroundColor: '#1f5f3a',
      padding: { x: 20, y: 10 }
    }).setInteractive();

    play.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

  }
}