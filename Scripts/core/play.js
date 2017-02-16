var playState = function(game){};
playState.prototype = {
    create: function(){
        game.input.gamepad.start();

        this.map = game.add.tilemap('tileMap');
        this.map.addTilesetImage('tileSet1');
        this.background = this.map.createLayer('Tile Layer 2');
        this.foreground = this.map.createLayer('Tile Layer 1');
        this.map.setCollisionBetween(1, 1000, true, this.foreground);

        this.spawnWaves = true; //bool to decide whether to spawn waves or not

        game.physics.arcade.gravity.y = 1000;

        //creating players
        this.players = game.add.group();
        this.player1 = new Player(game, 1150, 636, 1, this.players);
        this.player2 = new Player(game, 120, 636, 2, this.players);
        
        this.players.add(this.player1);
        this.players.add(this.player2);

        //creating enemy group
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

        this.scoreCounter1 = game.add.text(70, 10,'P1 Score: ' + this.player1.score,
            {font: '20px Times New Roman', fill: '#ffffff' });

        this.scoreCounter2 = game.add.text(1120, 10,'P2 Score: ' + this.player2.score,
            {font: '20px Times New Roman', fill: '#ffffff' });

        //making one emitter for all enemy deaths
        this.bEmitter = game.add.emitter(game.world.centerX,game.world.centerY,100);
        this.bEmitter.makeParticles('FireworkVFX',[1,2,3]);
        this.bEmitter.gravity = -1500;
        this.bEmitter.area = 500 * 500;
        this.bEmitter.bounce.setTo(0.5,0.5);
        this.bEmitter.setYSpeed(-500, 500);
        this.bEmitter.setXSpeed(-500, 500);
        this.bEmitter.minParticleSpeed.setTo(-200, -300);
        this.bEmitter.maxParticleSpeed.setTo(200, 400);
        this.bEmitter.setScale(0.5,0,0.5,0,1500);

        game.time.events.loop(this.waveProperties.timeCheck, this.spawnEnemyWave, this); //loop that spawns enemies

        this.powerUp = game.add.group();

    },

    update: function(){
        game.physics.arcade.collide(this.players, this.foreground);
        game.physics.arcade.collide(this.enemies, this.foreground);

        game.physics.arcade.collide(this.powerUp, this.foreground);

        game.physics.arcade.overlap( this.player1, this.powerUp, this.changeWeapon, null, this);
        game.physics.arcade.overlap(this.player2, this.powerUp, this.changeWeapon, null, this);

        game.physics.arcade.overlap(this.players, this.enemies, this.killPlayer, null, this);

        game.physics.arcade.collide(this.player1.weapon.bullets, this.foreground, this.killBullet, null, this);
        game.physics.arcade.collide(this.player2.weapon.bullets, this.foreground, this.killBullet, null, this);

        game.physics.arcade.overlap(this.player1.weapon.bullets, this.enemies, function (bullets, enemy) {
            this.hitEnemy(bullets, enemy, this.player1);
        }, null, this);
        game.physics.arcade.overlap(this.player2.weapon.bullets, this.enemies, function (bullets, enemy) {
            this.hitEnemy(bullets, enemy, this.player2);
        }, null, this);

    },

    shutdown: function () {
        //resetting wave properties
        this.waveProperties.timeCheck = 1500;
        this.waveProperties.max = 12;
        this.waveProperties.active = 0;
        this.waveProperties.counter = 24;
		
		game.global.score1 = this.player1.score;
		game.global.score2 = this.player2.score;
    }
}

var enemyProperties = {
    enemyLarge: {hp: 100, minV: 50, maxV: 80, img: 'bigBubble', nextSize: 'enemyMed', dmg: 50, points: 10, score: 100}, //DO NOT CHANGE POINTS!
    enemyMed: {hp: 50, minV: 100, maxV: 80, img: 'medBubble', nextSize: 'enemySmall', dmg: 20, points: 5, score: 50},
    enemySmall: {hp: 10, minV: 200, maxV: 80, img: 'smallBubble', nextSize: 'null', dmg: 10, points: 1, score: 25}
};

