
import Mutant from "../objects/mutant.js";
import Drone from "../objects/drone.js";
import Camera from "../objects/camera.js";

export default class GameScene extends Phaser.Scene {

  constructor() {
    super("GameScene");
  }

  create() {

// VARIABLES
  
    this.playerHealth = 3;
    this.playerAmmo = 20;
    this.keysCollected = 0;
    this.gameStartTime = this.time.now;

// BACKGROUND
 
// PLAYER

//ENEMIES
 

    this.enemies = this.physics.add.group();

    this.enemyBullets = this.physics.add.group();

    const mutant = new Mutant(
      this,
      400,
      480
    );

    const drone = new Drone(
      this,
      700,
      150,
      this.player
    );

    const camera = new Camera(
      this,
      850,
      200,
      this.player,
      this.enemyBullets
    );

    this.enemies.add(mutant);
    this.enemies.add(drone);
    this.enemies.add(camera);

    this.physics.add.collider(
      this.enemies,
      this.platforms
    );


    //KEYS


   // EXIT DOOR
  

    this.exitDoor = this.add.rectangle(
      920,
      450,
      40,
      80,
      0x00ff00
    );

    this.physics.add.existing(this.exitDoor, true);

    this.physics.add.overlap(
      this.player,
      this.exitDoor,
      () => {

        if (this.keysCollected >= 3) {

          this.scene.start(
            "WinScene",
            {
              time:
                Math.floor(
                  (this.time.now - this.gameStartTime) / 1000
                ),
            }
          );
        }
      }
    );


    //PLAYER DAMAGE



   // PLAYER SHOOTING
  
    //CONTROLS

   // HUD

  }


  update() {

    
    //PLAYER MOVEMENT
   

    //JUMP

    // SHOOT
 
   // ENEMIES
 

    this.enemies.children.iterate((enemy) => {

      if (enemy && enemy.update) {

        enemy.update(this.time.now);
      }
    });


    //TIMER
   

    const currentTime =
      Math.floor(
        (this.time.now - this.gameStartTime) / 1000
      );

    this.timerText.setText(
      "TIEMPO: " + currentTime
    );
  }

  
 // SHOOT BULLET
 

  //HIT ENEMY
  

  hitEnemy(bullet, enemy) {

    bullet.destroy();

    enemy.takeDamage(1);
  }

}