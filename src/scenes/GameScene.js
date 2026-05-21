export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.player = null;
    this.cursors = null;
    this.keys = null;
    this.platforms = null;
  }

  preload() {
    this.load.tilemapTiledJSON("mapa", "./assets/maps/mapa.json");
    this.load.image("rock_packed", "./assets/maps/rock_packed.png");
    this.load.spritesheet('dude1', './assets/sprites/dude1.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
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

    const spawn = this.findSafeSpawn(map, this.platforms);
    this.player = this.physics.add.sprite(spawn.x, spawn.y, "dude1");
    this.player.setDisplaySize(36, 36);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.02);
    this.player.body.setSize(22, 30);
    this.player.body.setOffset((this.player.width - 22) / 2, this.player.height - 34);
   
    //animaciones jugador 
   this.anims.create({
        key: 'left1',
        frames: this.anims.generateFrameNumbers('dude1', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
        });
    this.anims.create({
        key: 'turn1',
        frames: [ { key: 'dude1', frame: 4 } ], 
        frameRate: 10,
        repeat: -1
        });
    this.anims.create({
        key: 'right1',
        frames: this.anims.generateFrameNumbers('dude1', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
        });

    this.physics.add.collider(this.player, this.platforms);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.4);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.add
      .text(12, 12, "MVP funcional: mapa Tiled + personaje Phaser", {
        fontFamily: "Arial",
        fontSize: "14px",
        color: "#ffffff",
        backgroundColor: "rgba(0,0,0,0.45)",
        padding: { x: 8, y: 5 },
      })
      .setScrollFactor(0)
      .setDepth(10);
  }

  update() {

        if (this.cursors.left.isDown) 
            {
            this.player.setVelocityX(-160);
            this.player.anims.play('left1', true);
            } else if (this.cursors.right.isDown) 
            {        
            this.player.setVelocityX(160);
            this.player.anims.play('right1', true);
            } else 
            {
            this.player.setVelocityX(0);
            this.player.anims.play('turn1', true);
            }   
    
        if (this.cursors.up.isDown && this.player.body.blocked.down)     
            {
            this.player.setVelocityY(-500);
            }
  }

  findSafeSpawn(map, layer) {
    // Busca una casilla vacía con suelo justo debajo. Así evita aparecer dentro de una pared.
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
}
