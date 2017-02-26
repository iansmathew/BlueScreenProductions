Player = function (game, x, y, image) {
    Phaser.Sprite.call(this, game, x, y, image); //calls constructor

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 1500;
    this.body.setSize(50, 70, 5, 13); //reducing the player collision box
    this.body.collideWorldBounds = true;

    /*---PROPERTIES---*/
    this.hp = 100;
    this.weapon = [];
    this.invulnerable = false;
    this.cursor = null;
    this.fireButton = null;
    this.pad = null;
    this.color = (image == 'player1') ? "red" : "blue";
    this.isWalking = true;
    this.score = 0;
    this.currentWeapon = 0;
    this.animations.add('right', [0, 1], 8, true);
    this.animations.add('left', [3, 4], 8, true);

    /*--CONSTRUCTOR FUNCTIONS--*/
    this.createKeys();
    //this.setPistol();

    this.weapon.push(new Weapon.SingleBullet(game));
    this.weapon.push(new Weapon.ScatterShot(game));


    game.add.existing(this);
};

/*--------------------------------------------------------*/
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
/*--------------------------------------------------------*/

//Player update automatically called by PHASER
Player.prototype.update = function () {
    this.movePlayer();
};

//Moves the player
Player.prototype.movePlayer = function () {
    if (!this.alive || !this.isWalking)
        return;

     this.fireAngle = -(90 + 90 * -this.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X));

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
    }
    if(this.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)|| this.pad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)){
        this.weapon[this.currentWeapon].fire(this, this.fireAngle);
        //this.shootSfx.play(null, null, 0.1, false, false);
    }
    if (this.fireButton.isDown && this.cursor.left.isDown){
        //this.weapon.fireAngle = -135;
        this.weapon[this.currentWeapon].fire(this, -180);
        //this.shootSfx.play(null, null, 0.1, false, false);
    }
    else if (this.fireButton.isDown && this.cursor.right.isDown){
        this.weapon.fireAngle = -45;
        this.weapon[this.currentWeapon].fire(this, 0);
       // this.shootSfx.play(null, null, 0.1, false, false);
    }
    else if (this.fireButton.isDown) { //firing straight up
        this.weapon.fireAngle = Phaser.ANGLE_UP;
        this.weapon[this.currentWeapon].fire(this, -90);
        //this.shootSfx.play(null, null, 0.1, false, false);
    }
};

//Creates cursor keys for player
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
        this.isWalking = false;
        this.body.velocity.x = (this.body.touching.right) ? -500 : 500;
        this.body.velocity.y = -300;

        this.hp -= enemy.dmg;
        /*this.pEmitter.x = this.x;
        this.pEmitter.y = this.y;
        this.pEmitter.start(true,300,null,10);*/

        this.invulnerable = true;
        this.setInvulnerable(this);

        if (this.hp <= 0)
        {
            /*this.pEmitter.x = this.x;
            this.pEmitter.y = this.y;
            this.pEmitter.start(true,2000,null,50);*/
            this.kill();
            this.cursor = game.input.keyboard.disable = false; //deleting window.eventListeneres
            this.fireButton = game.input.keyboard.disable = false; //deleting window.eventListeneres

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
    console.log(powerUp.item);
    switch (powerUp.item){
        case "MachineGun":
            this.currentWeapon = 1;
            break;
        default:
            return;
    }
};

