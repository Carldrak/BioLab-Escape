import Enemy from "./Enemy.js";

export default class Camera extends Enemy {
  constructor(scene, x, y, player, bulletsGroup) {
    super(scene, x, y, "camera", 2);

    this.player = player;
    this.bulletsGroup = bulletsGroup;
    this.detectionRange = 350;
    this.fireRate = 1500;
    this.lastShot = 0;

    this.body.allowGravity = false;
    this.setImmovable(true);
  }

  update(time) {
    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );

    if (distance < this.detectionRange && time > this.lastShot + this.fireRate) {
      this.shoot();
      this.lastShot = time;
    }
  }

  shoot() {
    const bullet = this.bulletsGroup.create(this.x, this.y, "enemyBullet");
    bullet.body.allowGravity = false;

    this.scene.physics.moveToObject(bullet, this.player, 180);
  }
}