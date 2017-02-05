//state is the actual game
var playState = {
    //code to make assets goes here
    create: function(){

        /*--Initializing TileMap --*/
        this.map = game.add.tilemap('tileMap');
        this.map.addTilesetImage('tileSet1');
        this.background = this.map.createLayer('Tile Layer 2');
        this.foreground = this.map.createLayer('Tile Layer 1');
        this.map.setCollisionBetween(1, 1000, true, this.foreground);

        /*-- setting world properties --*/
        game.physics.arcade.gravity.y = 1000;

        //-- creating players and player group --//
        this.player_1 = this.createPlayer(1);
        this.player_1.weapon = this.setWeapon(this.player_1);

        this.player_2 = this.createPlayer(2);
        this.player_2.weapon = this.setWeapon(this.player_2);

        this.players = game.add.group();
        this.players.add(this.player_1);
        this.players.add(this.player_2);

        /*-- player game pad init --*/
        game.input.gamepad.start();
        this.indicator = game.add.sprite(16,16,'FireworkVFX');
        this.indicator2 = game.add.sprite(1232,16,'FireworkVFX');
        this.indicator.scale.x = this.indicator.scale.y = 1;
        this.indicator2.scale.x = this.indicator2.scale.y = 1;
        this.indicator.animations.frame =1;
        this.indicator2.animations.frame =1;

        this.pad1 = game.input.gamepad.pad1;
        this.pad2 = game.input.gamepad.pad2;

        /*-- creating enemy group --*/
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

        /*-- making emitters --*/
        this.pEmitter = game.add.emitter(0,0,100);
        this.pEmitterFunc();

        this.bEmitter = game.add.emitter(game.world.centerX,game.world.centerY,100);
        this.bEmitterFunc();

        this.wEmitter  = game.add.emitter(0,0,100);
        this.wEmitterFunc();

        /*-- making sounds --*/
        this.shootSfx = game.add.audio('bulletSfx');
        this.shootSfx.allowMultiple = false;

        this.bubbleSfx = game.add.audio('bubbleSfx');
        this.bubbleSfx.allowMultiple = false;

        /* --Setting enemy wave --*/
        game.time.events.loop(this.waveProperties.timeCheck, this.spawnEnemies, this);

    },

    //code to update the assets goes here //changes are reflected in game render
    update: function(){

        game.physics.arcade.collide(this.players, this.foreground);
        game.physics.arcade.collide(this.enemies, this.foreground);
        game.physics.arcade.overlap(this.players, this.enemies, this.killPlayer, null, this);
        game.physics.arcade.overlap(this.player_1.weapon.bullets, this.enemies, this.hitEnemy, null, this);
        game.physics.arcade.collide(this.player_1.weapon.bullets, this.foreground, this.killBullet, null, this);
        game.physics.arcade.overlap(this.player_2.weapon.bullets, this.enemies, this.hitEnemy, null, this);
        game.physics.arcade.collide(this.player_2.weapon.bullets, this.foreground, this.killBullet, null, this);
        this.movePlayer(this.player_1);
        this.movePlayer(this.player_2);

    },

    //this function is used solely to show th physics body and render other debug stuff.
    //Comment it out if you're not using it.
        /*render: function () {
            game.debug.body(this.player_1);
            game.debug.body(this.player_2);
            // call renderGroup on each of the alive members
            this.enemies.forEachAlive(renderGroup, this);
            this.player_1.weapon.bullets.forEachAlive(renderGroup, this);
            //render function for groups
            function renderGroup(member) {
                game.debug.body(member);
            }

        },*/

    createPlayer: function (p_num) {
        var player = game.add.sprite(game.width/2, 600, (p_num == 1) ? 'player1' : 'player2');
        player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(player);
        player.body.gravity.y = 1500;
        player.body.setSize(50, 70, 5, 13); //reducing the player collision box
        player.body.collideWorldBounds = true;

        if (p_num == 1) {

            player.cursor = game.input.keyboard.createCursorKeys();
            player.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        }
        else {
            this.wasd =
                {
                    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
                    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
                    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                    right: game.input.keyboard.addKey(Phaser.Keyboard.D)
                };
            player.cursor = this.wasd;
            player.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        }


        //-- User defined properties for player --//
        player.hp = 100;
        player.invulnerable = false;
        player.color = (p_num == 1) ? "red" : "blue";

        /*-- creating Player Animation --*/
        player.animations.add('right', [0, 1], 8, true);
        player.animations.add('left', [3, 4], 8, true);


        return player;
    },

    setWeapon: function (player) {
        player.weapon = game.add.weapon(30, 'bullet'); //
        player.weapon.enableBody = true;
        player.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        player.weapon.bulletGravity.y =-1000;
        player.weapon.bulletSpeed = 850;
        player.weapon.fireRate = 200;
        player.weapon.trackSprite(player);
       
        return player.weapon;
    },

    spawnEnemies: function () {
        if (this.waveProperties.counter > 0) {
            while (this.waveProperties.active < this.waveProperties.max / 2) {

                var type = Phaser.ArrayUtils.getRandomItem(["enemyLarge", "enemyMed", "enemySmall"]);

                var enemy = this.enemies.create(null, null, enemyProperties[type].img);
                enemy.reset(game.rnd.integerInRange(80, 1400), game.rnd.integerInRange(50, 400));
                enemy.anchor.setTo(0.5, 0.5);
                enemy.body.collideWorldBounds = true;
                enemy.body.bounce.set(1);
                enemy.body.allowGravity = false;

                enemy.body.velocity.y = game.rnd.integerInRange(enemyProperties[type].minV, enemyProperties[type].maxV) * game.rnd.pick([-1, 1]);
                enemy.body.velocity.x = game.rnd.integerInRange(enemyProperties[type].minV, enemyProperties[type].maxV) * game.rnd.pick([-1, 1]);
                enemy.nextSize = enemyProperties[type].nextSize;
                enemy.hp = enemyProperties[type].hp;
                enemy.dmg = enemyProperties[type].dmg;
                enemy.points = enemyProperties[type].points;
                this.waveProperties.counter -= enemyProperties[type].points;
                this.waveProperties.active += enemyProperties[type].points;

            }
        }
        else {
            this.increaseWave();


        }
    },

    increaseWave: function () {
        console.log("Next wave started..");
        //add text that shows PREPARE FOR NEXT WAVE here.
        this.waveProperties.max *= 2;
        this.waveProperties.timeCheck += this.waveProperties.timeCheck;
        this.waveProperties.counter = this.waveProperties.max;
    },

    movePlayer: function (player) {

        if (!player.alive)
            return ;

        var pad = (player.color == "red") ? this.pad1 : this.pad2;

        /*-- Movements --*/
        if (player.cursor.left.isDown || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)< -0.1){ //move left
            player.body.velocity.x = -300;
            player.animations.play('left');
        }
        else if (player.cursor.right.isDown || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)>0.1){ //move right
            player.body.velocity.x = 300;
            player.animations.play('right');
        }
        else {
            player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 2;
        }

        if ((player.cursor.up.isDown || pad.justPressed(Phaser.Gamepad.XBOX360_A)) && player.body.onFloor()){ //jump
            player.body.velocity.y = -999;
            this.wEmitter.x = player.x;
            this.wEmitter.y = player.y-16;
            this.wEmitter.start(true,500,null,3);
        }

        /*-- Firing --*/
        player.weapon.fireAngle = -(90 + 90 * -pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X));

        if(pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)|| this.pad1.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)){
            player.weapon.fire();
        }

        //firing angles
        if (player.fireButton.isDown && player.cursor.left.isDown){
            player.weapon.fireAngle = -135;
            player.weapon.fire();
        }
        else if (player.fireButton.isDown && player.cursor.right.isDown){
            player.weapon.fireAngle = -45;
            player.weapon.fire();
        }
        else if (player.fireButton.isDown) { //firing straight up
            player.weapon.fireAngle = Phaser.ANGLE_UP;
            player.weapon.fire();
            this.shootSfx.play(null, null, 1, false, false);
        }

        /*-- Are controllers active? --*/
        if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) { //indicators - player 1
            this.indicator.animations.frame = 0;
        } else {
            this.indicator.animations.frame = 1;
        }

        if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad2.connected) { //indicators - player 2
            this.indicator2.animations.frame = 0;
        } else {
            this.indicator2.animations.frame = 1;
        }

    },

    killBullet: function (bullet) {
        bullet.kill();
    },
    
    hitEnemy: function (bullet, enemy) {
        bullet.kill(); //bullet dies on impact
        enemy.hp -= 10;

        if (enemy.hp <= 0)
        {
            this.bEmitter.x = enemy.x;
            this.bEmitter.y = enemy.y;
            this.bubbleSfx.play();
            this.bEmitter.start(true,2000,null,20);
            enemy.destroy();
            this.splitEnemy(enemy.nextSize , enemy.x, enemy.y);
            this.waveProperties.active -= enemy.points;

        }
    },

    splitEnemy: function (enemy, prevX, prevY) {
        if (enemy == "null")
            return;

        for (var i=0; i < 2; i++) {
            var new_enemy = this.enemies.create(prevX, prevY, enemyProperties[enemy].img);
            new_enemy.anchor.setTo(0.5, 0.5);
            new_enemy.body.collideWorldBounds = true;
            new_enemy.body.bounce.set(1);
            new_enemy.body.allowGravity = false;

            new_enemy.body.velocity.y = game.rnd.integerInRange(enemyProperties[enemy].minV, enemyProperties[enemy].maxV) * game.rnd.pick([-1, 1]);
            new_enemy.body.velocity.x = game.rnd.integerInRange(enemyProperties[enemy].minV, enemyProperties[enemy].maxV) * game.rnd.pick([-1, 1]);
            new_enemy.nextSize = enemyProperties[enemy].nextSize;
            new_enemy.hp = enemyProperties[enemy].hp;
            new_enemy.dmg = enemyProperties[enemy].dmg;
            new_enemy.points = enemyProperties[enemy].points;
            this.waveProperties.counter -= enemyProperties[enemy].points;
            this.waveProperties.active += enemyProperties[enemy].points;
        }
    },

    killPlayer: function (player, enemy) {
        if (player.invulnerable == false) {
                player.hp -= enemy.dmg;
                this.pEmitter.x = player.x;
                this.pEmitter.y = player.y;
                this.pEmitter.start(true,300,null,10);

                player.invulnerable = true;
                this.setInvulnerable(player);

                if (player.hp <= 0)
                {
                    this.pEmitter.x = player.x;
                    this.pEmitter.y = player.y;
                    this.pEmitter.start(true,2000,null,50);
                    player.kill();
                    player.cursor = game.input.keyboard.disable = false; //deleting window.eventListeneres
                    player.fireButton = game.input.keyboard.disable = false; //deleting window.eventListeneres

                    /* -- deciding whether to quit the game -- */
                    if (!this.players.getFirstAlive()) //quits when there's no players alive
                        game.time.events.add(1000, function () { game.state.start('gameOver');}, this); //delay game over by 1 sec for animation
                }
        }
    },

    setInvulnerable: function (player) {
        game.time.events.add(2000,
            function () {
                player.invulnerable = false;
        }, this);
    },


    pEmitterFunc: function(){
        this.pEmitter.makeParticles('bloodVfx');
        this.pEmitter.gravity = -1200;
        this.pEmitter.setYSpeed(-500, 500);
        this.pEmitter.setXSpeed(-500, 500);
        this.pEmitter.setScale(0.5,0,0.5,0,300);
    },

    bEmitterFunc: function(){
        this.bEmitter.makeParticles('FireworkVFX',[1,2,3]);
        this.bEmitter.gravity = -1500;
        this.bEmitter.area = 500 * 500;
        this.bEmitter.bounce.setTo(0.5,0.5);
        this.bEmitter.setYSpeed(-500, 500);
        this.bEmitter.setXSpeed(-500, 500);
        this.bEmitter.minParticleSpeed.setTo(-200, -300);
        this.bEmitter.maxParticleSpeed.setTo(200, 400);
        this.bEmitter.setScale(0.5,0,0.5,0,1500);
    },

    //temp assigned to jump
    wEmitterFunc: function(){
        this.wEmitter.makeParticles('FireworkVFX',1);
        this.wEmitter.gravity = -1500;
        this.wEmitter.setScale(0.5,0,0.5,0,500);
        this.wEmitter.setYSpeed(-16,16);
        this.wEmitter.setXSpeed(16,-16);
    },

    waveProperties: {
        timeCheck: 1500,
        max: 24,
        active: 0,
        counter: 24,
    },

    /*-- This function is called when you switch from this state --*/
    //use it to reset anything
    shutdown: function () {
        //resetting wave properties
        this.waveProperties.timeCheck = 1500;
        this.waveProperties.max = 24;
        this.waveProperties.active = 0;
        this.waveProperties.counter = 24;
    }
};

var enemyProperties = {
    enemyLarge: {hp: 100, minV: 50, maxV: 80, img: 'bigBubble', nextSize: 'enemyMed', dmg: 50, points: 10},
    enemyMed: {hp: 50, minV: 100, maxV: 80, img: 'medBubble', nextSize: 'enemySmall', dmg: 20, points: 5},
    enemySmall: {hp: 20, minV: 200, maxV: 80, img: 'smallBubble', nextSize: 'null', dmg: 10, points: 1}
};