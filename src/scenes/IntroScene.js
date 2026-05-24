export default class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' });
  }

      init(data) {
    this.dificultadSeleccionada = data.dificultad || 'normal';
  }
  create() {
    const centroX = this.cameras.main.width / 2;



    this.add.text(centroX, 50, 'Biolab Escape', { 
      fontSize: '40px', 
      color: '#6cff7c',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // 2. Condensamos las líneas para que no ocupe tanto espacio vertical
    const textoHistoria = 
    "Eres un curioso explorador que se ha visto atrapado\n" +
    "en un laboratorio secreto.\n\n" +
    "Tu objetivo es abrirte paso entre los monstruos del complejo,\n" +
    "consiguiendo puntuación al derrotarlos y escapar.\n\n" +
    "CONTROLES:\n" +
    "Moverse: Flechas del teclado\n" +
    "Saltar: Flecha Arriba\n" +
    "Disparar: Tecla X\n\n" +
    "Encuentra las 3 llaves de seguridad y llega a la puerta final.";

    // 3. Colocamos el texto en la posición Y: 250 (justo en el medio)
    this.add.text(centroX, 250, textoHistoria, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 10 
    }).setOrigin(0.5);

    // 4. Bajamos el botón a la posición Y: 460
    const btnContinuar = this.add.text(centroX, 460, 'INICIAR ESCAPE', {
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#1f5f3a',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    btnContinuar.once('pointerdown', () => {
      this.scene.start('GameScene' , { dificultad: this.dificultadSeleccionada });
    });
  }
}