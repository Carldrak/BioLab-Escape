export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.player = null;
    this.cursors = null;
    this.platforms = null;
    this.enemigos = null;
    this.enemigosVoladores = null;
    this.bomba = null;
    this.direccionJugador = 1; // 1 = derecha, -1 = izquierda
    this.gameOver = false;

    this.cantidadEnemigosTerrestres = 10;
    this.cantidadEnemigosVoladores = 10;

    this.vidaMaxima = 3;
    this.vida = 3;
    this.cantidadPowerUpsVida = 5;

    this.powerUpsVida = null;
    this.textoVida = null;

  }

  preload() {
    // --------------------------------------------------------
    // 1. CARGA DE ASSETS (Mapas, Sprites, Audios)
    // --------------------------------------------------------
    this.load.tilemapTiledJSON("mapa", "./assets/maps/mapa.json");
    this.load.image("rock_packed", "./assets/maps/rock_packed.png");
    
    // Entorno y Objetos
    this.load.image('llaveOro', 'assets/sprites/key_gold.png');
    this.load.image('llavePlata', 'assets/sprites/key_silver.png');
    this.load.image('llaveBronce', 'assets/sprites/key_bronze.png');
    this.load.image('puerta', 'assets/sprites/door.png');
    this.load.image('bomba', 'assets/sprites/bomba.png');
    this.load.spritesheet('corazon', 'assets/sprites/heart.png', {frameWidth: 32,frameHeight: 32});

    // Jugador
    this.load.spritesheet('dude1', './assets/sprites/dude1.png', { frameWidth: 32, frameHeight: 48 });
    
    // Enemigo Terrestre
    this.load.spritesheet('enemigo', './assets/sprites/EnemigoAndar.png', { frameWidth: 160, frameHeight: 160 });
    this.load.spritesheet('enemigo_ataque', './assets/sprites/EnemigoAtaque.png', { frameWidth: 160, frameHeight: 160 });
    
    // Enemigo Volador (Fantasma)
    this.load.spritesheet('enemigo_fantasma', './assets/sprites/EnemigoFantasma.png', { frameWidth: 32, frameHeight: 32 });
    
    // Efectos
    this.load.spritesheet('explosion', './assets/sprites/Explosion.png', { frameWidth: 96, frameHeight: 96 });
    
    // Audios
    this.load.audio('getKey', './assets/sounds/rise.mp3');
    this.load.audio('disparo', './assets/sounds/crash.mp3'); 
    this.load.audio('muerte_enemigo', './assets/sounds/MuerteEnemigo.wav');
    this.load.audio('muerte_fantasma', './assets/sounds/MuerteFantasma.wav');
  }

  create() {
    this.gameOver = false;
    this.vida = this.vidaMaxima;

    // --------------------------------------------------------
    // 2. CREACIÓN DEL ESCENARIO
    // --------------------------------------------------------
    const map = this.make.tilemap({ key: "mapa" });
    const tileset = map.addTilesetImage("rock_packed", "rock_packed");

    if (!tileset) {
      this.showError("No se pudo cargar el tileset rock_packed.");
      return;
    }

    this.platforms = map.createLayer("plataformas", tileset, 0, 0);

    if (!this.platforms) {
      this.showError("No se encontró la capa 'plataformas' en el mapa.");
      return;
    }

    this.platforms.setCollisionByExclusion([-1, 0]);

    // --------------------------------------------------------
    // 3. CREACIÓN Y CONFIGURACIÓN DEL JUGADOR
    // --------------------------------------------------------
    const spawn = this.findSafeSpawn(map, this.platforms);
    this.player = this.physics.add.sprite(spawn.x, spawn.y, "dude1");
    this.player.setDisplaySize(36, 36);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.02);
    this.player.body.setSize(22, 30);
    this.player.body.setOffset((this.player.width - 22) / 2, this.player.height - 34);

    // --------------------------------------------------------
    // 4. CREACIÓN DE ANIMACIONES GLOBALES
    // --------------------------------------------------------
    this.crearAnimaciones();

    // --------------------------------------------------------
    // 5. CÁMARA Y CONTROLES
    // --------------------------------------------------------
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.4);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.teclaDisparo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    // --------------------------------------------------------
    // 6. SISTEMA DE COMBATE, ENEMIGOS Y POWER UPS
    // --------------------------------------------------------
    // Bombas
    this.bomba = this.physics.add.group({ allowGravity: false });
    this.disparoSound = this.sound.add('disparo');
    this.muerteEnemigoSound = this.sound.add('muerte_enemigo');
    this.muerteFantasmaSound = this.sound.add('muerte_fantasma');

    // Enemigos Terrestres (creación aleatoria  )
    this.enemigos = this.physics.add.group();

    for (let i = 0; i < this.cantidadEnemigosTerrestres; i++) {
    const pos = this.findRandomGroundSpawn(map, this.platforms);
    const enemigo = this.enemigos.create(pos.x, pos.y, 'enemigo');
    enemigo.setDisplaySize(36, 36);
    enemigo.setCollideWorldBounds(true);
    enemigo.direccion = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
    enemigo.anims.play('caminar_enemigo', true);
}

    // Enemigos Voladores (Fantasmas) (creación aleatoria)
    this.enemigosVoladores = this.physics.add.group({ allowGravity: false });

    for (let i = 0; i < this.cantidadEnemigosVoladores; i++) {
    const pos = this.findRandomAirSpawn(map, this.platforms);
    const fantasma = this.enemigosVoladores.create(pos.x, pos.y, 'enemigo_fantasma');
    fantasma.setCollideWorldBounds(true);
    fantasma.direccion = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
    fantasma.startX = fantasma.x;
    fantasma.rangoPatrulla = Phaser.Math.Between(90, 180);
    fantasma.persiguiendo = false;         
    fantasma.anims.play('fantasma_enemigo', true);
}
    // Power-Ups de Vida (corazones) (creación aleatoria)
    this.crearPowerUpsVida(map);
    // --------------------------------------------------------
    // 7. COLISIONES
    // --------------------------------------------------------
    // Entorno
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemigos, this.platforms);
    // Nota: El fantasma atraviesa las plataformas intencionalmente, 
    // por lo que NO le añadimos colisión con this.platforms.

    // Destrucción de la bomba al tocar el escenario o salir de pantalla
    this.physics.world.on('worldbounds', (body) => {
      if (body.gameObject && body.gameObject.texture.key === 'bomba') {
        body.gameObject.destroy();
      }
    });
    this.physics.add.collider(this.bomba, this.platforms, (bomba) => bomba.destroy());

    // Ataque del Jugador (Overlap para no empujar)
    this.physics.add.overlap(this.bomba, this.enemigos, this.matarEnemigo, null, this);
    this.physics.add.overlap(this.bomba, this.enemigosVoladores, this.matarEnemigo, null, this);

    // Daño al Jugador (Collider)
    this.physics.add.collider(this.player, this.enemigos, this.danoJugador, null, this);
    this.physics.add.collider(this.player, this.enemigosVoladores, this.danoJugador, null, this);

    // Recolección de Power-Ups de Vida
    this.physics.add.overlap(this.player, this.powerUpsVida, this.recogerPowerUpVida, null, this);
    // --------------------------------------------------------
    // 8. UI
    // --------------------------------------------------------
    this.add.text(12, 12, "MVP funcional: mapa Tiled + personaje Phaser", {
      fontFamily: "Arial",
      fontSize: "14px",
      color: "#ffffff",
      backgroundColor: "rgba(0,0,0,0.45)",
      padding: { x: 8, y: 5 },
    }).setScrollFactor(0).setDepth(10);

    this.textoVida = this.add.text(12, 76, "", {
      fontFamily: "Arial",
      fontSize: "16px",
      color: "#ffffff",
      backgroundColor: "rgba(0,0,0,0.55)",
      padding: { x: 8, y: 5 },
}).setScrollFactor(0).setDepth(10);
    this.actualizarTextoVida();
  }

  // ========================================================================
  // BUCLE PRINCIPAL (Ejecutado cada frame)
  // ========================================================================
  update() {
    if (this.gameOver) return;

    this.actualizarJugador();
    this.actualizarEnemigosTerrestres();
    this.actualizarEnemigosFantasmas();
    this.actualizarPowerUpsVida();
  }

  // ========================================================================
  // MÉTODOS DE ACTUALIZACIÓN (Separados por limpieza)
  // ========================================================================
  
  actualizarJugador() {
    // Movimiento Horizontal
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left1', true);
      this.direccionJugador = -1;
    } else if (this.cursors.right.isDown) {        
      this.player.setVelocityX(160);
      this.player.anims.play('right1', true);
      this.direccionJugador = 1;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn1', true);
    }   
    
    // Salto
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-500);
    }
    
    // Disparo
    if (Phaser.Input.Keyboard.JustDown(this.teclaDisparo)) {
      this.disparar();
    }
  }

  actualizarEnemigosTerrestres() {
    this.enemigos.getChildren().forEach((enemigo) => {
      const distancia = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemigo.x, enemigo.y);
      const distanciaY = Math.abs(this.player.y - enemigo.y); 
      const debajoY = enemigo.y + (enemigo.displayHeight / 2) + 5; 

      // ESTADOS 1 y 2: PERSEGUIR Y ATACAR
      if (distancia < 250 && distanciaY < 60) {
        const direccionHaciaJugador = this.player.x > enemigo.x ? 1 : -1;
        enemigo.setFlipX(direccionHaciaJugador === 1);

        const frenteX_haciaJugador = enemigo.x + (enemigo.displayWidth / 2 * direccionHaciaJugador);
        const tileAlBorde_haciaJugador = this.platforms.getTileAtWorldXY(frenteX_haciaJugador, debajoY);
        
        const hayPrecipicioHaciaJugador = !tileAlBorde_haciaJugador && enemigo.body.blocked.down;
        const hayParedHaciaJugador = (direccionHaciaJugador === 1 && enemigo.body.blocked.right) || 
                                     (direccionHaciaJugador === -1 && enemigo.body.blocked.left);

        if (hayPrecipicioHaciaJugador || hayParedHaciaJugador) {
          enemigo.setVelocityX(0);
          if (distancia < 60) {
             enemigo.anims.play('ataque_enemigo', true); 
          } else {
             enemigo.anims.stop(); 
          }
        } else {
          enemigo.direccion = direccionHaciaJugador;
          enemigo.setVelocityX(80 * enemigo.direccion); 
          
          if (distancia < 60) {
            enemigo.anims.play('ataque_enemigo', true); 
          } else {
            enemigo.anims.play('caminar_enemigo', true); 
          }
        }
      } 
      // ESTADO 3: PATRULLAR
      else {
        const frenteX = enemigo.x + (enemigo.displayWidth / 2 * enemigo.direccion);
        const tileAlBorde = this.platforms.getTileAtWorldXY(frenteX, debajoY);
        const hayPrecipicio = !tileAlBorde && enemigo.body.blocked.down;
        const hayPared = enemigo.body.blocked.right || enemigo.body.blocked.left;

        if (hayPrecipicio || hayPared) {
          enemigo.direccion *= -1; 
        }
        
        enemigo.setVelocityX(50 * enemigo.direccion);
        enemigo.anims.play('caminar_enemigo', true);
        enemigo.setFlipX(enemigo.direccion === 1);
      }
    });
  }

  actualizarEnemigosFantasmas() {
    this.enemigosVoladores.getChildren().forEach((fantasma) => {
      const distancia = Phaser.Math.Distance.Between(this.player.x, this.player.y, fantasma.x, fantasma.y);

      // Si estás cerca (rango de agresión)
      if (distancia < 200) {
        // Persigue al jugador en línea recta flotando a través de obstáculos
        this.physics.moveToObject(fantasma, this.player, 70); 
        fantasma.setFlipX(fantasma.body.velocity.x > 0);
      } 
      // Si estás lejos (Patrulla)
      else {
        fantasma.setVelocityX(40 * fantasma.direccion);
        // Oscilación matemática (Seno) para el efecto de flotar
        fantasma.setVelocityY(Math.sin(this.time.now / 300) * 30);
        fantasma.setFlipX(fantasma.direccion === 1);

        // Si choca contra los límites del mundo (o paredes si les pones colisión)
        if (fantasma.body.blocked.right || fantasma.body.blocked.left) {
          fantasma.direccion *= -1;
        }
      }
    });
  }

  // ========================================================================
  // ACCIONES Y LÓGICA DE JUEGO
  // ========================================================================
  crearPowerUpsVida(map) {
    this.powerUpsVida = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    for (let i = 0; i < this.cantidadPowerUpsVida; i++) {
      const pos = this.findRandomAirSpawn(map, this.platforms);
      const corazon = this.powerUpsVida.create(pos.x, pos.y, 'corazon');

      corazon.setDisplaySize(24, 24);
      corazon.body.setSize(24, 24);
      corazon.startY = corazon.y;
      corazon.movimientoOffset = Phaser.Math.Between(0, 1000);
      corazon.anims.play('corazon_anim', true);
    }
  }

  actualizarPowerUpsVida() {
    this.powerUpsVida.getChildren().forEach((corazon) => {
      corazon.y = corazon.startY + Math.sin((this.time.now + corazon.movimientoOffset) / 300) * 8;
    });
  }

  actualizarTextoVida() {
    if (this.textoVida) {
      this.textoVida.setText(`Vida: ${this.vida}/${this.vidaMaxima}`);
    }
  }

  recogerPowerUpVida(jugador, corazon) {
    if (this.vida >= this.vidaMaxima) {
      return;
    }

    corazon.destroy();

    this.vida = Math.min(this.vida + 1, this.vidaMaxima);
    this.actualizarTextoVida();

    this.sound.play('getKey');
  }
  disparar() {
    this.disparoSound.play();
    const bomba = this.bomba.create(
      this.player.x + this.direccionJugador * 25,
      this.player.y,
      'bomba'
    );
    bomba.setVelocityX(500 * this.direccionJugador);
    bomba.setCollideWorldBounds(true);
    bomba.body.onWorldBounds = true;
  }

  matarEnemigo(bomba, enemigo) {
    const expX = enemigo.x;
    const expY = enemigo.y;

    bomba.destroy();
    enemigo.destroy();

    const explosion = this.add.sprite(expX, expY, 'explosion');
    explosion.play('efecto_explosion');

    explosion.on('animationcomplete', () => {
      explosion.destroy();
    });
    if (enemigo.texture.key === 'enemigo') {
      this.muerteEnemigoSound.play();
    } else {
      this.muerteFantasmaSound.play();
    }
  }

  danoJugador(jugador, enemigo) {
    if (jugador.invulnerable || this.gameOver) {
      return;
    }

    this.vida = Math.max(this.vida - 1, 0);
    this.actualizarTextoVida();

    jugador.invulnerable = true;
    jugador.setTint(0xff0000);

    this.time.delayedCall(800, () => {
      if (!this.gameOver) {
        jugador.clearTint();
        jugador.invulnerable = false;
      }
    });

    if (this.vida <= 0) {
      this.gameOver = true;
      this.physics.pause();
      jugador.setTint(0xff0000);
      jugador.anims.play('turn1');

      this.time.delayedCall(1000, () => {
        this.scene.restart();
      });
    }
  }

  // ========================================================================
  // UTILIDADES
  // ========================================================================

  crearAnimaciones() {
    // Animaciones del Jugador
    this.anims.create({ key: 'left1', frames: this.anims.generateFrameNumbers('dude1', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'turn1', frames: [ { key: 'dude1', frame: 4 } ], frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'right1', frames: this.anims.generateFrameNumbers('dude1', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });

    // Animaciones Enemigos Terrestres
    this.anims.create({ key: 'caminar_enemigo', frames: this.anims.generateFrameNumbers('enemigo', { start: 0, end: 5 }), frameRate: 8, repeat: -1 });
    this.anims.create({ key: 'ataque_enemigo', frames: this.anims.generateFrameNumbers('enemigo_ataque', { start: 0, end: 7 }), frameRate: 10, repeat: -1 });

    // Animaciones Fantasma
    this.anims.create({ key: 'fantasma_enemigo', frames: this.anims.generateFrameNumbers('enemigo_fantasma', { start: 0, end: 6 }), frameRate: 6, repeat: -1 });

    // Efectos
    this.anims.create({ key: 'efecto_explosion', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 12 }), frameRate: 15, repeat: 0, hideOnComplete: true });

    // Animación Corazón (Power-Up de Vida)
    this.anims.create({ key: 'corazon_anim', frames: this.anims.generateFrameNumbers('corazon', { start: 0, end: 9 }), frameRate: 10, repeat: -1 });
  }

  findSafeSpawn(map, layer) {
    for (let y = 1; y < map.height - 2; y += 1) {
      for (let x = 1; x < map.width - 1; x += 1) {
        const current = layer.getTileAt(x, y);
        const above = layer.getTileAt(x, y - 1);
        const below = layer.getTileAt(x, y + 1);

        const isEmpty = !current || current.index === -1 || current.index === 0;
        const isAboveEmpty = !above || above.index === -1 || above.index === 0;
        const hasFloor = below && below.index > 0;

        if (isEmpty && isAboveEmpty && hasFloor) {
          return {
            x: x * map.tileWidth + map.tileWidth / 2,
            y: y * map.tileHeight - 12,
          };
        }
      }
    }
    return { x: 90, y: 90 };
  }
  
  findRandomGroundSpawn(map, layer) {
  const maxIntentos = 200;

  for (let i = 0; i < maxIntentos; i++) {
    const tileX = Phaser.Math.Between(1, map.width - 2);
    const tileY = Phaser.Math.Between(1, map.height - 3);

    const current = layer.getTileAt(tileX, tileY);
    const above = layer.getTileAt(tileX, tileY - 1);
    const below = layer.getTileAt(tileX, tileY + 1);

    const isEmpty = !current || current.index === -1 || current.index === 0;
    const isAboveEmpty = !above || above.index === -1 || above.index === 0;
    const hasFloor = below && below.index > 0;

    if (isEmpty && isAboveEmpty && hasFloor) {
      return {
        x: tileX * map.tileWidth + map.tileWidth / 2,
        y: tileY * map.tileHeight,
      };
    }
  }

  return { x: 120, y: 120 };
}

  findRandomAirSpawn(map, layer) {
    const maxIntentos = 200;

    for (let i = 0; i < maxIntentos; i++) {
      const tileX = Phaser.Math.Between(1, map.width - 2);
      const tileY = Phaser.Math.Between(1, map.height - 3);

      const current = layer.getTileAt(tileX, tileY);
      const above = layer.getTileAt(tileX, tileY - 1);

      const isEmpty = !current || current.index === -1 || current.index === 0;
      const isAboveEmpty = !above || above.index === -1 || above.index === 0;

    if (isEmpty && isAboveEmpty) {
      return {
        x: tileX * map.tileWidth + map.tileWidth / 2,
        y: tileY * map.tileHeight + map.tileHeight / 2,
      };
    }
  }

  return { x: 200, y: 100 };
}

  showError(message) {
    this.add.text(30, 30, message, {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#ffdddd",
      backgroundColor: "#5c1111",
      padding: { x: 12, y: 8 },
      wordWrap: { width: 850 },
    });
    console.error(message);
  }
  actualizarEnemigosFantasmas() {
    this.enemigosVoladores.getChildren().forEach((fantasma) => {
      const distancia = Phaser.Math.Distance.Between(this.player.x, this.player.y, fantasma.x, fantasma.y);

      // ESTADO 1: PERSEGUIR
      if (distancia < 200) {
        fantasma.persiguiendo = true; 
        this.physics.moveToObject(fantasma, this.player, 70); 
        
        // [CORREGIDO] Invertimos la lógica: ahora voltea si la velocidad en X es menor a 0
        fantasma.setFlipX(fantasma.body.velocity.x < 0); 
      } 
      // ESTADO 2: PATRULLAR
      else {
        if (fantasma.persiguiendo) {
          fantasma.persiguiendo = false;
          fantasma.startX = fantasma.x; 
        }

        fantasma.setVelocityX(40 * fantasma.direccion);
        fantasma.setVelocityY(Math.sin(this.time.now / 300) * 30); 
        
        // [CORREGIDO] Invertimos la lógica: ahora voltea si la dirección es -1
        fantasma.setFlipX(fantasma.direccion === -1);

        if (fantasma.x > fantasma.startX + fantasma.rangoPatrulla) {
          fantasma.direccion = -1;
        } 
        else if (fantasma.x < fantasma.startX - fantasma.rangoPatrulla) {
          fantasma.direccion = 1;
        }
      }
    });
  }
}
