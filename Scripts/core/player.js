Player = function(game, x, y, p_num, group){
    Phaser.Sprite.call(this, game, x, y, (p_num == 1) ? 'player1' : 'player2');

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 1500;
    this.body.setSize(50, 70, 5, 13); //reducing the player collision box
    this.body.collideWorldBounds = true;

    this.hp = 100;
    this.weapon = null;
    this.invulnerable = false;
    this.color = (p_num == 1) ? "red" : "blue";
    this.group = group;
    this.animations.add('right', [0, 1], 8, true);
    this.animations.add('left', [3, 4], 8, true);
    this.shootSfx = game.add.audio('bulletSfx');
    this.shootSfx.allowMultiple = false;

    this.wEmitter  = game.add.emitter(0,0,100);
    this.wEmitter.makeParticles('FireworkVFX',1);
    this.wEmitter.gravity = -1500;
    this.wEmitter.setScale(0.5,0,0.5,0,500);
    this.wEmitter.setYSpeed(-16,16);
    this.wEmitter.setXSpeed(16,-16);

    this.pEmitter = game.add.emitter(0,0,100);
    this.pEmitter.makeParticles('bloodVfx');
    this.pEmitter.gravity = -1200;
    this.pEmitter.setYSpeed(-500, 500);
    this.pEmitter.setXSpeed(-500, 500);
    this.pEmitter.setScale(0.5,0,0.5,0,300);

    this.createKeys();
    this.setWeapon();

    //at the very end
    game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//update is called automatically by Phaser
Player.prototype.update = function(){
    this.movePlayer();
};

Player.prototype.movePlayer = function(){
    if (!this.alive)
        return;
    
    this.weapon.fireAngle = -(90 + 90 * -this.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X));

    if (this.cursor.left.isDown || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)< -0.1){ //move left
            this.body.velocity.x = -300;
            this.animations.play('left');
        }
    else if (this.cursor.right.isDown || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)>0.1){ //move right
            this.body.velocity.x = 300;
            this.animations.play('right');
        }
    else {
            this.body.velocity.x = 0;
            this.animations.stop();
            this.frame = 2;
        }
    if ((this.cursor.up.isDown || this.pad.justPressed(Phaser.Gamepad.XBOX360_A)) && this.body.onFloor()){ //jump
            this.body.velocity.y = -999;
            this.wEmitter.x = this.x;
            this.wEmitter.y = this.y-16;
            this.wEmitter.start(true,500,null,3);
        }
    if(this.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)|| this.pad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)){
            this.weapon.fire();
            this.shootSfx.play(null, null, 1, false, false);
        }
    if (this.fireButton.isDown && this.cursor.left.isDown){
            this.weapon.fireAngle = -135;
            this.weapon.fire();
            this.shootSfx.play(null, null, 1, false, false);
        }
    else if (this.fireButton.isDown && this.cursor.right.isDown){
        this.weapon.fireAngle = -45;
        this.weapon.fire();
        this.shootSfx.play(null, null, 1, false, false);
    }
    else if (this.fireButton.isDown) { //firing straight up
        this.weapon.fireAngle = Phaser.ANGLE_UP;
        this.weapon.fire();
        this.shootSfx.play(null, null, 1, false, false);
    }
};

Player.prototype.createKeys = function(){
    if (this.color == "red") {

            this.cursor = game.input.keyboard.createCursorKeys();
            this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
            this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
            this.pad = game.input.gamepad.pad2;
        }
};

Player.prototype.setWeapon = function() {
    this.weapon = game.add.weapon(30, 'bullet'); //
    this.weapon.enableBody = true;
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletGravity.y =-1000;
    this.weapon.bulletSpeed = 850;
    this.weapon.fireRate = 200;
    this.weapon.trackSprite(this);
};


