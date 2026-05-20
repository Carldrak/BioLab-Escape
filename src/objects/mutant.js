import Enemy from "./Enemy.js";

export default class Mutant extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "mutant", 2);

    this.speed = 80;
    this.direction = 1;

    this.setCollideWorldBounds(true);
    this.setVelocityX(this.speed);
  }

  update() {
    if (this.body.blocked.left || this.body.blocked.right) {
      this.direction *= -1;
      this.setVelocityX(this.speed * this.direction);
      this.flipX = this.direction < 0;
    }
  }
}