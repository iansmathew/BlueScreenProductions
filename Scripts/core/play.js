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

        this.players= game.add.group();
        this.players.add(this.player_1);
        this.players.add(this.player_2);


        /*-- creating enemy group --*/
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

        this.createEnemies();

        /*-- making emitters --*/
        this.pEmitter = game.add.emitter(0,0,100);
        this.pEmitterFunc();

        this.bEmitter = game.add.emitter(game.world.centerX,game.world.centerY,100);
        this.bEmitterFunc();

        this.wEmitter  = game.add.emitter(0,0,100);
        this.wEmitterFunc();

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

        /*-- making sounds --*/
        this.shootSfx = game.add.audio('bulletSfx');
        this.shootSfx.allowMultiple = false;

        this.bubbleSfx = game.add.audio('bubbleSfx');
        this.bubbleSfx.allowMultiple = false;

        /* --Setting enemy wave --*/
        //game.time.events.loop(waveProperties.timeCheck, this.spawnEnemies, this);

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
        render: function () {
            game.debug.body(this.player_1);
            game.debug.body(this.player_2);
            // call renderGroup on each of the alive members
            this.enemies.forEachAlive(renderGroup, this);
            this.player_1.weapon.bullets.forEachAlive(renderGroup, this);
            //render function for groups
            function renderGroup(member) {
                game.debug.body(member);
            }

        },

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
            this.wasd = {
                up: game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            };
            player.cursor = this.wasd;
            player.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        }


        //-- User defined properties for player --//
        player.hp = 100;
        player.invulnerable = false;

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
        this.wEmitter.makeParticles('FireworkVFX',[1]);
        this.wEmitter.gravity = -1500;
        this.wEmitter.setScale(0.5,0,0.5,0,500);
        this.wEmitter.setYSpeed(-16,16);
        this.wEmitter.setXSpeed(16,-16);

    },


    createEnemies: function () {
        //console.log("Fix this");
        this.enemies.createMultiple();
    },

    movePlayer: function (player) {
        if (!player.alive)
            return ;

        if (player.cursor.left.isDown){
            player.body.velocity.x = -300;
            player.animations.play('left');
        }
        else if (player.cursor.right.isDown){
            player.body.velocity.x = 300;
            player.animations.play('right');
        }
        else {
            player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 2;
        }

        //jump
        if (player.cursor.up.isDown && player.body.onFloor()){
            player.body.velocity.y = -999;
            //player.frame = 6;//Requires Fixing image only stays for 1 frame
        }

        //controller input
        if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
            this.indicator.animations.frame = 0;
        } else {
            this.indicator.animations.frame = 1;
        }
        if(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)< -0.1){
            this.player_1.body.velocity.x = -300;
            this.player_1.animations.play('left');
        }
        if(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)>0.1){
            this.player_1.body.velocity.x = 300;
            this.player_1.animations.play('right');

        }
        if(this.pad1.justPressed(Phaser.Gamepad.XBOX360_A)&& this.player_1.body.onFloor() ){
            this.player_1.body.velocity.y = -999;
            this.wEmitter.x = this.player_1.x;
            this.wEmitter.y = this.player_1.y-16;
            this.wEmitter.start(true,500,null,3);
            console.log("!");
        }

        //player 2 controller
        if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad2.connected) {
            this.indicator2.animations.frame = 0;
        } else {
            this.indicator2.animations.frame = 1;
        }
        if(this.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)< -0.1){
            this.player_2.body.velocity.x = -300;
            this.player_2.animations.play('left');
        }
        if(this.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)>0.1){
            this.player_2.body.velocity.x = 300;
            this.player_2.animations.play('right');

        }
        if(this.pad2.justPressed(Phaser.Gamepad.XBOX360_A)&& this.player_2.body.onFloor() ){
            this.player_2.body.velocity.y = -999;
            this.wEmitter.x = this.player_2.x;
            this.wEmitter.y = this.player_2.y-16;
            this.wEmitter.start(true,500,null,3);
            console.log("!");
        }

        this.player_1.weapon.fireAngle = -(90 + 90 * -this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X));
        this.player_2.weapon.fireAngle = -(90 + 90 * -this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X));

        if(this.pad1.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)|| this.pad1.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)){
            this.player_1.weapon.fire();
        }
        if(this.pad2.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)|| this.pad2.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)){
            this.player_2.weapon.fire();
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
            //this.shootSfx.play(null, null, 1, false, false);
        }
    },

    killBullet: function (bullet, foreground) {
        bullet.kill();
    },
    
    spawnEnemies: function (type, num, prevX, prevY) {
        console.log("spawnEnemies fired..");
        /*for (var i =0; i < num; i++){
         if (type == 'null') //if the enemy that just died was a smallEnemy then don't spawn more
         return;

         var ball = this.enemies.create(prevX + (100*i), prevY, enemyProperties[type].img);
         ball.anchor.setTo(0.5, 0.5);
         ball.body.collideWorldBounds = true;
         ball.body.bounce.set(1); //ball bounces opposite way when it collides with anything
         ball.body.allowGravity = false;
         ball.body.velocity.y = enemyProperties[type].vel;
         ball.body.velocity.x = enemyProperties[type].vel * game.rnd.pick([-1, 1]);
         ball.nextSize = enemyProperties[type].nextSize;
         ball.hp = enemyProperties[type].hp;
         ball.dmg = enemyProperties[type].dmg;
         }*/
        while (waveProperties.active < waveProperties.min) {
            var enemy = this.bigEnemies.getFirstDead();
            if (!enemy) {
                console.log("No enemy left in group");
                return;
            }

            enemy.anchor.setTo(0.5, 0.5);
            enemy.reset(game.width/2, game.height/2);
            enemy.body.bounce.set(1);
            enemy.body.allowGravity = false;
            enemy.body.velocity.y = game.rnd.integerInRange(50, 60);
            enemy.body.velocity.x = game.rnd.integerInRange(50, 60);
            enemy.hp = 50;
        }
    },
    
    hitEnemy: function (bullet, enemy) {
        bullet.kill(); //bullet dies on impact
        enemy.hp -= 10;

        if (enemy.hp <= 0)
        {
            this.bEmitter.x = enemy.x;
            this.bEmitter.y = enemy.y;
            this.bEmitter.start(true,2000,null,20);
            enemy.kill();
            this.bubbleSfx.play();
            this.spawnEnemies(enemy.nextSize, 2, enemy.x, enemy.y);
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
                        game.time.events.add(1000, //delay game over by 1 sec for animation
                            function () {
                                game.state.start('gameOver');
                            }, this);
                }

                console.log(player.hp);
        }
    },

    setInvulnerable: function (player) {
        game.time.events.add(2000,
            function () {
                player.invulnerable = false;
        }, this);
    },
};

var enemyProperties = {
    enemyLarge: {hp: 100, vel: 50, img: 'bigBubble', nextSize: 'enemyMed', dmg: 50, points: 10},
    enemyMed: {hp: 50, vel: 100, img: 'medBubble', nextSize: 'enemySmall', dmg: 20, points: 5},
    enemySmall: {hp: 20, vel: 200, img: 'smallBubble', nextSize: 'null', dmg: 10, points: 1},
};


var waveProperties = {
    timeCheck: 1500,
    max: 24,
    min: 12,
    active: 0,

};
