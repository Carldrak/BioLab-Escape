import Enemy from "./Enemy.js";

export default class Drone extends Enemy {
  constructor(scene, x, y, player) {
    super(scene, x, y, "drone", 3);

    this.player = player;
    this.speed = 100;
    this.detectionRange = 250;

    this.body.allowGravity = false;
  }

  update() {
    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );

    if (distance < this.detectionRange) {
      this.scene.physics.moveToObject(this, this.player, this.speed);
      this.flipX = this.player.x < this.x;
    } else {
      this.setVelocity(0);
    }
  }
}