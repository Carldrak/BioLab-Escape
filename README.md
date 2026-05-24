# BioScape - versión MVP funcional

Esta versión está preparada como prototipo mínimo viable para clase:

- `index.html` importa el CSS y el JavaScript modular.
- `css/style.css` contiene la parte visual de la página.
- `src/main.js` configura Phaser.
- `src/scenes` contiene la diversas escenas del juego: 
        - DifficultyScene: permite seleccionar la dificultad del juego
        - MenuScene: escena con el menú del juego
        - GameScene: contiene toda la lógica del juego
        - WinScene: escena de Victoria
        - EndGame: escena de derrota.
- `src/scenes/EndScene.js` carga la escena final del juego
- `src/scenes/MenuScene.js` carga la esceba de inicio del juego con el botón jugar
- `assets` contiene los mapas, archivos de audio, sonidos y sprites del juego
- `assets/sprites` contiene los sprites de las llaves, enemigos, puerta y el spritecheet del jugador

## Cómo abrirlo

No lo abras con doble clic. Usa Live Server / Live Preview en Visual Studio Code.

1. Abre la carpeta `BioScape_funcional` en Visual Studio Code.
2. Clic derecho sobre `index.html`.
3. Elige `Open with Live Server` o `Show Preview`.

## Controles

- Flecha izquierda/derecha: moverse.
- Flecha arriba: saltar.
- Tecla X: disparar

## Qué trabajo realizó cada componente del grupo:
- ## Raquel Álvarez Ramos: 
    Creación del GDD. Implementación del player con mecánicas de movimiento, salto y disparo. Creación de power ups de vida, sistema de puntuación por enemigo eliminado y creación de contador de tiempo. Efectos de sonido de disparo y recolección de vida. Pulido de las escenas de "Win" y "GameOver" añadiendo puntuación total y tiempo así como creación de texto indicativo de falta de llaves cuando el jugador interacciona con la puerta y no tiene las tres llaves necesarias.
- ## Victor Gago Paz: 
    Creación de interfaz de usuario con contadores de llaves y vidas y de la mecánica de interacción jugador-puerta. Inicio creación escenas de "Win" y "Game Over"
- ## Carlos Pablos Rivero: 
    Implementación de los enemigos terrestres que se mueven dentro de una plataforma y si ven al jugador van a por él y los fantasmas que atraviesan paredes y se mantienen moviéndose dentro de una zona y cuando ven al jugador también le persiguen. Efectos de sonido de daño de enemigos. Implementación de música. Creación de escena de selección del nivel de dificultad del juego.
- ## Juan Carlos Jibaja 
    Creación de mapa usando Tiles
