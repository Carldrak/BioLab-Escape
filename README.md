# BioScape - versión MVP funcional

Esta versión está preparada como prototipo mínimo viable para clase:

- `index.html` importa el CSS y el JavaScript modular.
- `css/style.css` contiene la parte visual de la página.
- `src/main.js` configura Phaser.
- `src/scenes/GameScene.js` carga el mapa de Tiled y el personaje.
- `src/scenes/EndScene.js` carga la escena final del juego
- `src/scenes/MenuScene.js` carga la esceba de inicio del juego con el botón jugar
- `assets/maps/mapa.json` contiene el tileset incrustado para evitar el fallo del `.tsx` externo.
- `assets/sprites` contiene los sprites de las llaves, enemigos, puerta y el spritecheet del jugador

## Cómo abrirlo

No lo abras con doble clic. Usa Live Server / Live Preview en Visual Studio Code.

1. Abre la carpeta `BioScape_funcional` en Visual Studio Code.
2. Clic derecho sobre `index.html`.
3. Elige `Open with Live Server` o `Show Preview`.

## Controles

- Flecha izquierda/derecha: moverse.
- Flecha arriba: saltar.

## Qué se corrigió

- Rutas de mapa y sprites más simples: todo está dentro de la misma carpeta del proyecto.
- Mapa JSON modificado para que Phaser lea el tileset sin depender de `rock_packed.tsx`.
- Estructura modular limpia.
- Spawn automático del personaje en una zona segura del mapa.
- Movimiento personaje y salto y se crearon animaciones
