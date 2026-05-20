export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, health = 1) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.health = health;
    this.damage = 1;
  }

  takeDamage(amount = 1) {
    this.health -= amount;

    if (this.health <= 0) {
      this.destroy();
    }
  }
}