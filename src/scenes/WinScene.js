export default class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinScene' });
  }

  init(data = {}) {
    this.puntuacion = data.puntuacion || 0;
    this.tiempoRestante = data.tiempoRestante || 0;
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.sound.stopAll();
    this.sound.play('musica_victoria', { loop: false, volume: 0.6 });

    this.add.text(centerX, centerY - 110, 'Has ganado', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#6cff7c',
    }).setOrigin(0.5);

    this.add.text(centerX, centerY - 35, `Puntos por enemigos: ${this.puntuacion}`, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 5, `Tiempo restante: ${this.tiempoRestante}`, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 80, 'Pulsa ESPACIO para jugar otra vez', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 115, 'Pulsa R para volver al menu', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });

    this.input.keyboard.once('keydown-R', () => {
      this.scene.start('MenuScene');
    });
  }
}
