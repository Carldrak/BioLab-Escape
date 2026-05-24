export default class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinScene' });
  }

  init(data = {}) {
    this.puntuacion = data.puntuacion || 0;
    this.tiempoRestante = data.tiempoRestante || 0;
  }

  create() {
    this.add.text(480, 270, '¡Has ganado!', {
      fontSize: '32px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 290, `Puntos por enemigos: ${this.puntuacion}`, {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(400, 330, `Tiempo restante: ${this.tiempoRestante}`, {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(400, 400, "Pulsa ESPACIO para jugar otra vez", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("GameScene");
    });
  }
}
