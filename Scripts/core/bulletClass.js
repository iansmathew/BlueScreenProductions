/////////////////////////////////////////////////////////////////
////                DEFAULT BULLET CLASS                     ////
/////////////////////////////////////////////////////////////////

Bullet = function (game, key, dmg) {
    Phaser.Sprite.call(this, game, 0, 0, key);

    this.anchor.set(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.dmg = dmg;
    this.tracking = false;
    this.scaleSpeed = 0;


};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || -1000;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);
};

Bullet.prototype.update = function () {

    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }

};

/////////////////////////////////////////////////////////////////
////                       WEAPON  CLASS                     ////
/////////////////////////////////////////////////////////////////

var Weapon = {};

/////////////////////////////////////////////////////////////////
////                       SINGLE SHOT                       ////
/////////////////////////////////////////////////////////////////

Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;
    //this.dmg = 30;
    var ammo = 64;

    for (var i = 0; i < ammo; i++)
    {
        this.add(new Bullet(game, 'bullet', 10), true);
    }

    return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source, angle) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;
    var y = source.y;
    if (this.getFirstExists(false) == null)
        return;
    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0);



    this.nextFire = this.game.time.time + this.fireRate;

};

Weapon.SingleBullet.prototype.collide = function (weapon, enemy) {
    console.log(enemy.hp);
};

/////////////////////////////////////////////////////////////////
////                       MACHINE GUN                       ////
/////////////////////////////////////////////////////////////////

Weapon.ScatterShot = function (game) {

    Phaser.Group.call(this, game, game.world, 'Scatter Shot', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 40;

    for (var i = 0; i < 32; i++)
    {
        this.add(new Bullet(game, 'bullet', 10), true);
    }

    return this;

};

Weapon.ScatterShot.prototype = Object.create(Phaser.Group.prototype);
Weapon.ScatterShot.prototype.constructor = Weapon.ScatterShot;

Weapon.ScatterShot.prototype.fire = function (source, angle) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = (source.x) + this.game.rnd.between(-10, 10);
    var y = source.y;
    if (this.getFirstExists(false) == null)
        return;
    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0);



    this.nextFire = this.game.time.time + this.fireRate;

};