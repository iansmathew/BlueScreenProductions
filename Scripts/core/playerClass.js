Player = function (game, x, y, image, playerNum) {
    Phaser.Sprite.call(this, game, x, y, image); //calls constructor

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 1000;
    this.body.setSize(50, 70, 5, 13); //reducing the player collision box
    //this.body.outOfBoundsKill = true;
    //this.body.checkWorldBounds = true;
    //this.body.collideWorldBounds = true;


    /*---PROPERTIES---*/
    this.hp = 100;
    this.hearts = [];
    this.currHeart = 4;
    this.weapon = [];
    this.invulnerable = false;
    this.cursor = null;
    this.fireButton = null;
    this.pad = null;
    this.color = (playerNum == 1) ? "red" : "blue";
    this.isWalking = true;
    this.score = 0;
    this.currentWeapon = 0;
    this.animations.add('right', [0, 1], 8, true);
    this.animations.add('left', [3, 4], 8, true);
    this.facingRight = false;
    this.initialPos = {
        x: x,
        y: y
    };

    this.gunProp = [    {x: 0.3, y:0, pX: -2, pY: 10, fRate: 60}, //pistol
                        {x: 0.3, y:0, pX: -2, pY: 5, fRate: 60}, //machinegun
                        {x: 0.3, y:0, pX: -2, pY: 5, fRate: 3}, //shotgun
                        {x: 0.5, y:0.5, pX: 0, pY: 15, fRate: 60}, //electric
                        {x: 0.3, y:0, pX: -2, pY: 5, fRate: 60}, //flamethrower
                        {x: 0.3, y:0, pX: -2, pY: 10, fRate: 60}, //null
                        {x: 0.3, y:0, pX: -2, pY: 10, fRate: 60}]; //null

    this.gunImages = [this.addChild(game.make.sprite(this.gunProp[0].pX, this.gunProp[0].pY, 'pistol')),
                      this.addChild(game.make.sprite(this.gunProp[1].pX, this.gunProp[1].pY, 'machineGun')),
                      this.addChild(game.make.sprite(this.gunProp[2].pX, this.gunProp[2].pY, 'shotgun')),
                      this.addChild(game.make.sprite(this.gunProp[3].pX, this.gunProp[3].pY, 'orb')),
                      this.addChild(game.make.sprite(this.gunProp[4].pX, this.gunProp[4].pY, 'flamethrower')),
                      this.addChild(game.make.sprite(this.gunProp[5].pX, this.gunProp[5].pY, 'machineGun')), //this gun will never be used
                      this.addChild(game.make.sprite(this.gunProp[6].pX, this.gunProp[6].pY, 'machineGun'))]; //this gun will never be used



    for(var i=0; i < this.gunImages.length; i++)
    {
        this.gunImages[i].visible = false;
        this.gunImages[i].animations.add('fire', [1, 0], this.gunProp[i].fRate, true);
    }

    this.gunImages[this.currentWeapon].visible = true;

    this.fireAngle = 0;
    this.gun = this.gunImages[this.currentWeapon]; //this.gunImages[0];
    this.gun.anchor.setTo(this.gunProp[this.currentWeapon].x, this.gunProp[this.currentWeapon].y);

    //pistol set achor to 0.2, 0.5

    /*--CONSTRUCTOR FUNCTIONS--*/
    this.createKeys();
    this.createHearts();
    this.JumpEmitterCreate();
    this.DeathEmitterCreate();



    this.weapon.push(new Weapon.SingleBullet(game));
    this.weapon.push(new Weapon.ScatterShot(game)); //machine gun
    this.weapon.push(new Weapon.Shotgun(game));
	this.weapon.push(new Weapon.Splitter(game)); //electric ball
    this.weapon.push(new Weapon.FlameThrower(game));
    this.weapon.push(new Weapon.Blaster(game));
    this.weapon.push(new Weapon.Rocket(game));


    this.gunImages[0].animations.add('fire', [0, 1], 60, true);

    game.add.existing(this);
};

/*--------------------------------------------------------*/
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
/*--------------------------------------------------------*/

//Player update automatically called by PHASER
Player.prototype.update = function () {
    this.movePlayer();
    this.facingRight = (this.fireAngle >= -90);
};

Player.prototype.createHearts = function () {
    var heartX = (this.color == "red") ? 6 : 1250;
    var heartY = 120;
    for (var i = 0; i < 5; i++) {
        if (i >= 1) {
            heartY = heartY + 50;
        }
        this.hearts[i] = new Heart(game, heartX, heartY, 'heart');

    }
};

Player.prototype.JumpEmitterCreate = function(){
    this.JumpEmitter  = game.add.emitter(0,0,100);
    this.JumpEmitter.makeParticles('whitePuff');
    this.JumpEmitter.gravity = -1200;
    this.JumpEmitter.setScale(0.1,0,0.1,0,500);
    this.JumpEmitter.setYSpeed(-16,16);
    this.JumpEmitter.setXSpeed(16,-16);
};

Player.prototype.DeathEmitterCreate = function(){
    this.DeathEmitter = game.add.emitter(0,0,100);
    this.DeathEmitter.makeParticles('bloodVfx');
    this.DeathEmitter.gravity = -1000;
    this.DeathEmitter.setYSpeed(-500, 500);
    this.DeathEmitter.setXSpeed(-500, 500);
    this.DeathEmitter.setScale(0.5,0,0.5,0,300);
};

//Moves the player
Player.prototype.movePlayer = function () {
    if (!this.alive || !this.isWalking || this.cursor == false)
        return;

    var anim = (Math.abs(this.fireAngle) > 90) ? "left" : "right";
    this.fireAngle = -(90 + 90 * -this.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X));

    this.gun.angle = this.fireAngle;
    this.gun.scale.y = (this.fireAngle < -90) ? -1 : 1;

    if (this.cursor.left.isDown || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)< -0.1){ //move left
        this.body.velocity.x = -300;
        this.animations.play(anim);
    }
    else if (this.cursor.right.isDown || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)>0.1){ //move right
        this.body.velocity.x = 300;
        this.animations.play(anim);
    }
    else {
        this.body.velocity.x = 0;
        this.animations.stop();
        this.frame = 2;
    }
    if ((this.cursor.up.isDown || this.pad.justPressed(Phaser.Gamepad.XBOX360_A)) && this.body.onFloor()){ //jump
        this.body.velocity.y = -980;
        this.JumpEmitter.x = this.x;
        this.JumpEmitter.y = this.y;
        this.JumpEmitter.start(true,500,null,3);
    }
    if(this.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)|| this.pad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)){
        this.weapon[this.currentWeapon].fire(this, this.fireAngle);
        this.gunImages[this.currentWeapon].animations.play('fire');
    }

    else {
        this.gunImages[this.currentWeapon].animations.stop();
        this.gunImages[this.currentWeapon].frame = 0;
    }
    if (this.fireButton.isDown && this.cursor.left.isDown){
        this.fireAngle = -180;
        this.weapon[this.currentWeapon].fire(this, -180);
    }
    else if (this.fireButton.isDown && this.cursor.right.isDown){
        this.weapon.fireAngle = 0;
        this.weapon[this.currentWeapon].fire(this, 0);
    }
    else if (this.fireButton.isDown) { //firing straight up
        this.weapon.fireAngle = Phaser.ANGLE_UP;
        this.weapon[this.currentWeapon].fire(this, -90);
    }
};

//Creates cursor keys for player
Player.prototype.createKeys = function(){
    if (this.color === "blue") {

        this.cursor = game.input.keyboard.createCursorKeys();
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.pad = game.input.gamepad.pad1;
    }
    else {
        var wasd =
            {
                up: game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D)
            };
        this.cursor = wasd;
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.pad = game.input.gamepad.pad2;
    }
};

//Creates this.weapon for player
Player.prototype.setPistol = function() {
    this.weapon = game.add.weapon(30, 'bullet'); //
    this.weapon.enableBody = true;
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletGravity.y =-1000;
    this.weapon.bulletSpeed = 850;
    this.weapon.fireRate = 200;
    this.weapon.trackSprite(this);
    this.weapon.damage = 10;
    this.shootSfx = this.pistolSfx;


};

//Damages the player on collision with enemy
Player.prototype.damagePlayer = function (enemy) {
    if (this.invulnerable == false) {
        game.add.tween(this.scale).to({x: 1.2, y: 1.2}, 100).yoyo(true).start();

        this.isWalking = false;
        this.body.velocity.x = (this.body.touching.right) ? -500 : 500;
        this.body.velocity.y = -300;

        this.hp -= enemy.dmg;
        this.damageHearts(enemy.dmg);
        this.invulnerable = true;
        this.setInvulnerable(this);

        if (this.hp <= 0)
        {
            game.camera.shake(0.01, 500);
            this.DeathEmitter.x = this.x;
            this.DeathEmitter.y = this.y;
            this.DeathEmitter.start(true,2000,null,50);
            this.kill();
            this.cursor = game.input.keyboard.disable = false; //deleting window.eventListeneres
            this.fireButton = game.input.keyboard.disable = false; //deleting window.eventListeneres

        }
    }
};

Player.prototype.damageHearts = function (eDamage) {
    while(eDamage > 0)
    {
        var abDamage = this.hearts[this.currHeart].hitHeart(eDamage);
        eDamage -= abDamage; //reduces eDamage by the damage absorbed by previous heart

        if(this.hearts[0].hp <= 0) //this line could be replaced with if (this.currHeart == 0)
        {
            break; //break the while loop if last heart is 0
        }

        if (this.hearts[this.currHeart].hp <= 0 && this.currHeart > 0){ //only i-- the curr heart  if the previous heart is dead and if currHeart is between 2 & 4
            this.currHeart--;
        }
    }
};

//Sets the player to invulnerable and does not allow walking for a period of time after damagePlayer
Player.prototype.setInvulnerable =  function (player) {
    game.time.events.add(100,
        function () {
            this.isWalking = true;
        }, this);

    game.time.events.add(2000,
        function () {
            this.invulnerable = false;
        }, this);
};

Player.prototype.powerUp = function (powerUp) {
    powerUp.destroy();
    switch (powerUp.item) {
        case "MachineGun":
            this.gunImages[this.currentWeapon].visible = false;
            this.currentWeapon = 1;
            this.gunImages[this.currentWeapon].visible = true;
            this.gun = this.gunImages[this.currentWeapon];
            this.gun.anchor.setTo(this.gunProp[this.currentWeapon].x, this.gunProp[this.currentWeapon].y);
            break;

        case "Shotgun":
            this.gunImages[this.currentWeapon].visible = false;
            this.currentWeapon = 2;
            this.gunImages[this.currentWeapon].visible = true;
            this.gun = this.gunImages[this.currentWeapon];
            this.gun.anchor.setTo(this.gunProp[this.currentWeapon].x, this.gunProp[this.currentWeapon].y);

            break;

        case "Splitter":
            this.gunImages[this.currentWeapon].visible = false;
            this.currentWeapon = 3;
            this.gunImages[this.currentWeapon].visible = true;
            this.gun = this.gunImages[this.currentWeapon];
            this.gun.anchor.setTo(this.gunProp[this.currentWeapon].x, this.gunProp[this.currentWeapon].y);

            break;

        case "FlameThrower":
            this.gunImages[this.currentWeapon].visible = false;
            this.currentWeapon = 4;
            this.gunImages[this.currentWeapon].visible = true;
            this.gun = this.gunImages[this.currentWeapon];
            this.gun.anchor.setTo(this.gunProp[this.currentWeapon].x, this.gunProp[this.currentWeapon].y);

            break;

        default:
            console.log("Invalid powerup");
            return;
    }
};

Player.prototype.increaseHealth = function () {
    this.hp = 100;
    this.currHeart = 4;

    for(var i = 0; i < this.hearts.length; i++)
    {
        this.hearts[i].hp = 20;
        this.hearts[i].frame = 0;

    }

};

Player.prototype.mercyRevive = function () {
    this.cursor = false;

    this.reset(this.initialPos.x, this.initialPos.y);
    this.increaseHealth();

    this.createKeys();

    this.gunImages[this.currentWeapon].visible = false;
    this.currentWeapon = 0;
    this.gunImages[this.currentWeapon].visible = true;
    this.gun = this.gunImages[this.currentWeapon];
    this.gun.anchor.setTo(this.gunProp[this.currentWeapon].x, this.gunProp[this.currentWeapon].y);
};

Player.prototype.onWorldOutBounds = function () {

    game.camera.shake(0.01, 500);
    var currHp = this.hp;
    this.hp -= this.hp;
    this.damageHearts(currHp);
    this.invulnerable = true;
    this.setInvulnerable(this);

    if (this.hp <= 0)
    {
        this.DeathEmitter.x = this.x;
        this.DeathEmitter.y = this.y;
        this.DeathEmitter.start(true,2000,null,50);
        this.kill();
        this.cursor = game.input.keyboard.disable = false; //deleting window.eventListeneres
        this.fireButton = game.input.keyboard.disable = false; //deleting window.eventListeneres

    }
};