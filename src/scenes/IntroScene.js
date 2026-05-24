export default class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' });
  }

  init(data = {}) {
    this.dificultadSeleccionada = data.dificultad || 'normal';
  }

  create() {
    const centroX = this.scale.width / 2;
    const centroY = this.scale.height / 2;

    this.add.text(centroX, centroY - 220, 'Biolab Escape', {
      fontSize: '40px',
      color: '#6cff7c',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);

    const textoHistoria =
      "Laboratorio de maxima seguridad\n" +
      "Eres Exp-00, una criatura experimental\n\n" +
      "Gracias a un fallo de seguridad has logrado escapar\n" +
      "colandote por el sistema interno de alcantarillas...\n" +
      "lograras escapar del laberinto enfrentandote a las criaturas que lo habitan?\n\n" +
      "CONTROLES:\n" +
      "Moverse: Flechas del teclado\n" +
      "Saltar: Flecha Arriba\n" +
      "Disparar: Tecla X\n\n" +
      "Encuentra las 3 llaves de seguridad y llega a la puerta final.";

    this.add.text(centroX, centroY, textoHistoria, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 10,
      wordWrap: { width: this.scale.width - 80 }
    }).setOrigin(0.5);

    const btnContinuar = this.add.text(centroX, centroY + 220, 'INICIAR ESCAPE', {
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#1f5f3a',
      padding: { x: 20, y: 10 },
      align: 'center'
    }).setOrigin(0.5).setInteractive();

    btnContinuar.once('pointerdown', () => {
      this.scene.start('GameScene', { dificultad: this.dificultadSeleccionada });
    });
  }
}
