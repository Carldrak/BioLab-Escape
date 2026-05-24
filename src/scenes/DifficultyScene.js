export default class DifficultyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DifficultyScene' });
  }

  create() {
    const centroX = this.cameras.main.width / 2;

    this.add.text(centroX, 120, 'SELECCIONA LA DIFICULTAD', {
      fontFamily: 'Arial',
      fontSize: '40px',
      color: '#6cff7c',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Botones alineados verticalmente
    const btnFacil = this.add.text(centroX, 240, 'FÁCIL', {
      fontSize: '30px', color: '#ffffff', backgroundColor: '#1f5f3a', padding: { x: 40, y: 15 }
    }).setOrigin(0.5).setInteractive();

    const btnNormal = this.add.text(centroX, 340, 'NORMAL', {
      fontSize: '30px', color: '#ffffff', backgroundColor: '#9e9000', padding: { x: 40, y: 15 }
    }).setOrigin(0.5).setInteractive();

    const btnDificil = this.add.text(centroX, 440, 'INJUSTA', {
      fontSize: '30px', color: '#ffffff', backgroundColor: '#7a1c1c', padding: { x: 40, y: 15 }
    }).setOrigin(0.5).setInteractive();

    // Mandamos el dato a IntroScene en lugar de a GameScene
    btnFacil.once('pointerdown', () => {
      this.scene.start('IntroScene', { dificultad: 'facil' });
    });

    btnNormal.once('pointerdown', () => {
      this.scene.start('IntroScene', { dificultad: 'normal' });
    });

    btnDificil.once('pointerdown', () => {
      this.scene.start('IntroScene', { dificultad: 'dificil' });
    });
  }
}