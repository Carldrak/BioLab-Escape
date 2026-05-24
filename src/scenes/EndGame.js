export default class EndGame extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

init(data = {}) {
    this.puntuacion = data.puntuacion || 0;
    this.tiempoRestante = data.tiempoRestante || 0;
  }

  create() {
    this.add.text(400, 220, "GAME OVER", {
      fontFamily: "Arial",
      fontSize: "48px",
      color: "#ff4444",
    }).setOrigin(0.5);

    this.add.text(400, 290, `Puntos: ${this.puntuacion}`, {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(400, 330, `Tiempo restante: ${this.tiempoRestante}`, {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(400, 400, "Pulsa ESPACIO para reiniciar", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("GameScene");
    });
  }
}
