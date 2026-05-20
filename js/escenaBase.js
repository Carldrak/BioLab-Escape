// Importar la clase del jugador y enemigos desde el archivo externo


export default class EscenaBase extends Phaser.Scene {
  constructor() {
    super({ key: 'EscenaBase' });
  }

  preload() {
    
// Cargar los recursos del juego
// Tiles del mapa
// Mapa en formato JSON
// Imagen del jugador
// Imagen enemigos
// Música 
// Sonido

  }

  create() {
    // Crear el mapa y su capa de plataformas


    // Reproducir música de fondo


    // Cargar sonidos


    // Crear el jugador 

    // Crear enemigos

    // Mostrar texto


    // Crear temporizador que actualiza el tiempo cada segundo

    // Crear botón para reiniciar el juego (oculto al inicio)
    this.botonReiniciar = this.add.text(500, 300, 'Reiniciar (ENTER)', {
      fontSize: '30px',
      fill: '#fff',
      backgroundColor: '#000',
      padding: { x: 20, y: 10 }
    }).setInteractive().setVisible(false);

    // Reiniciar al hacer clic
    this.botonReiniciar.on('pointerdown', () => this.scene.restart());

    // Reiniciar al presionar ENTER
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {

  }

  // Funciones auxiliares

  // Función para recolectar llaves
  recolectarLlave(jugador, llave) {
    llave.disableBody(true, true); // Desactivar llave recolectada
    this.sonidoRecolectar.play(); // Reproducir sonido
    this.llave += 1; // Sumar llaves
    this.txtPuntos.setText('Llaves: ' + this.llave); // Actualizar marcador de llaves
  }

  // Función para reiniciar el juego
  finDelJuego() {
    this.physics.pause(); // Detener físicas
    this.jugador.setTint(0xff0000); // Cambiar color del jugador
    this.botonReiniciar.setVisible(true); // Mostrar botón para reiniciar
    this.temporizador.remove(); // Detener el temporizador para que no siga restando tiempo
  }
}