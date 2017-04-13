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

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy, life) {

    gx = gx || 0;
    gy = gy || -1000;

    this.reset(x, y);
    this.lifespan = null || life;
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

    this.fireRate = 250;
    this.shotSfx = game.add.audio("bulletSfx");
    this.dmg = 10;
    var ammo = 64;

    for (var i = 0; i < ammo; i++)
    {
        this.add(new Bullet(game, 'bPistol', this.dmg));
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
    this.shotSfx.play(false,false,0.1,false);
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

    this.bulletSpeed = 750;
    this.fireRate = 100;
    this.dmg = 10;
    this.shotSfx = game.add.audio("machineGunSfx");


    for (var i = 0; i < 32; i++)
    {
        this.add(new Bullet(game, 'bMachineGun', this.dmg));
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
    this.shotSfx.play(false,false,0.1,false);
};

/////////////////////////////////////////////////////////////////
////                          SHOTGUN                        ////
/////////////////////////////////////////////////////////////////

Weapon.Shotgun = function (game) {

    Phaser.Group.call(this, game, game.world, 'Shotgun', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 1000;
    this.bulletSpeed = 600;
    this.fireRate = 700;
    this.dmg = 10;
    this.shotSfx = game.add.audio("shotgunSfx");

    for (var i = 0; i < 32; i++)
    {
        this.add(new Bullet(game, 'bShotgun', this.dmg));
    }

    return this;

};

Weapon.Shotgun.prototype = Object.create(Phaser.Group.prototype);
Weapon.Shotgun.prototype.constructor = Weapon.Shotgun;

Weapon.Shotgun.prototype.fire = function (source, angle) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = (source.x);
    var y = source.y;


        this.getFirstExists(false).fire(x, y, angle - 10, this.bulletSpeed, 0, 0);
		this.getFirstExists(false).fire(x, y, angle - 5, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0);
		this.getFirstExists(false).fire(x, y, angle + 5, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, angle + 10, this.bulletSpeed, 0, 0);

    this.shotSfx.play(false,false,0.1,false);
    this.nextFire = this.game.time.time + this.fireRate;

};

/////////////////////////////////////////////////////////////////
////                          SPLITTER GUN                   ////
/////////////////////////////////////////////////////////////////

Weapon.Splitter = function (game) {

    Phaser.Group.call(this, game, game.world, 'Splitter', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 700;
    this.dmg = 10;
    this.fireRate = 350;
    this.life = 300;
    this.shotSfx = game.add.audio("ShockSfx")

    for (var i = 0; i < 32; i++)
    {
        this.add(new Bullet(game, 'bPistol', 10));
    }

    return this;

};

Weapon.Splitter.prototype = Object.create(Phaser.Group.prototype);
Weapon.Splitter.prototype.constructor = Weapon.Splitter;

Weapon.Splitter.prototype.fire = function (source, angle) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = (source.x);
    var y = source.y;


    this.getFirstExists(false).fire(x, y, angle - 90, this.bulletSpeed, 0, 0,this.life);
    this.getFirstExists(false).fire(x, y, angle - 45, this.bulletSpeed, 0, 0,this.life);
    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0,this.life);
    this.getFirstExists(false).fire(x, y, angle + 90, this.bulletSpeed, 0, 0,this.life);
    this.getFirstExists(false).fire(x, y, angle + 45, this.bulletSpeed, 0, 0,this.life);

    this.nextFire = this.game.time.time + this.fireRate;
    this.shotSfx.play(false,false,0.1,false);
};

/////////////////////////////////////////////////////////////////
////                      FLAMETHROWER GUN                          ////
/////////////////////////////////////////////////////////////////

Weapon.FlameThrower = function (game) {

    Phaser.Group.call(this, game, game.world, 'FlameThrower', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 400;
    this.fireRate = 0;
    this.dmg = 5;
    this.shotSfx = game.add.audio("FlameSfx");

    for (var i = 0; i < 150; i++)
    {
        this.add(new Bullet(game, 'bFlame', 1));
    }
    this.setAll("scaleSpeed", 0.10);

    return this;

};

Weapon.FlameThrower.prototype = Object.create(Phaser.Group.prototype);
Weapon.FlameThrower.prototype.constructor = Weapon.FlameThrower;

Weapon.FlameThrower.prototype.fire = function (source, angle) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = (source.x);
    var y = source.y;


    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0, 400);





    this.nextFire = this.game.time.time + this.fireRate;
    this.shotSfx.play(false,false,0.1,false);
};

/////////////////////////////////////////////////////////////////
////                          BLASTER                        ////
/////////////////////////////////////////////////////////////////

Weapon.Blaster = function (game) {

    Phaser.Group.call(this, game, game.world, 'Blaster', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 1000;
    this.bulletSpeed = 800;
    this.fireRate = 500;
    this.dmg = 20;
    this.life = 250;
    this.shotSfx = game.add.audio("shotgunSfx");

    for (var i = 0; i < 32; i++)
    {
        this.add(new Bullet(game, 'bShotgun', this.dmg));
    }

    return this;

};

Weapon.Blaster.prototype = Object.create(Phaser.Group.prototype);
Weapon.Blaster.prototype.constructor = Weapon.Blaster;

Weapon.Blaster.prototype.fire = function (source, angle) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = (source.x);
    var y = source.y;

    this.setAll("scaleSpeed", 0.10);


    this.getFirstExists(false).fire(x, y, angle - 10, this.bulletSpeed, 0, 0,this.life);
    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0,this.life);
    this.getFirstExists(false).fire(x, y, angle + 10, this.bulletSpeed, 0, 0,this.life);

    this.shotSfx.play(false,false,0.1,false);
    this.nextFire = this.game.time.time + this.fireRate;

};

/////////////////////////////////////////////////////////////////
////                          ROCKET                         ////
/////////////////////////////////////////////////////////////////

Weapon.Rocket = function (game) {

    Phaser.Group.call(this, game, game.world, 'Rocket', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 1000;
    this.bulletSpeed = 1000;
    this.fireRate = 500;
    this.dmg = 100;
    this.life = 450;
    this.shotSfx = game.add.audio("RocketSfx");

    for (var i = 0; i < 32; i++)
    {
        this.add(new Bullet(game, 'bShotgun', this.dmg));
    }

    return this;

};

Weapon.Rocket.prototype = Object.create(Phaser.Group.prototype);
Weapon.Rocket.prototype.constructor = Weapon.Rocket;

Weapon.Rocket.prototype.fire = function (source, angle) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = (source.x);
    var y = source.y;

    this.setAll("scaleSpeed", 0.30);

    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0,this.life);


    //this.shotSfx.play(false,false,0.1,false);
    this.nextFire = this.game.time.time + this.fireRate;

};


