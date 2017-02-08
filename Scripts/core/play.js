var playState = function(game){};
playState.prototype = {
    create: function(){
        game.input.gamepad.start();

        this.map = game.add.tilemap('tileMap');
        this.map.addTilesetImage('tileSet1');
        this.background = this.map.createLayer('Tile Layer 2');
        this.foreground = this.map.createLayer('Tile Layer 1');
        this.map.setCollisionBetween(1, 1000, true, this.foreground);

        game.physics.arcade.gravity.y = 1000;

        this.players = game.add.group();
        this.player1 = new Player(game, game.width/2, game.height/2, 1, this.players);
        this.player2 = new Player(game, game.width/2, game.height/2, 2, this.players);
        
        this.players.add(this.player1);
        this.players.add(this.player2);

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

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

        game.time.events.loop(this.waveProperties.timeCheck, this.spawnEnemies, this);
    },

    update: function(){
       game.physics.arcade.collide(this.players, this.foreground);
        game.physics.arcade.collide(this.enemies, this.foreground);
        game.physics.arcade.overlap(this.players, this.enemies, this.killPlayer, null, this);
        game.physics.arcade.overlap(this.player1.weapon.bullets, this.enemies, this.hitEnemy, null, this);
        game.physics.arcade.collide(this.player1.weapon.bullets, this.foreground, this.killBullet, null, this);
        game.physics.arcade.overlap(this.player2.weapon.bullets, this.enemies, this.hitEnemy, null, this);
        game.physics.arcade.collide(this.player2.weapon.bullets, this.foreground, this.killBullet, null, this);
    },

    shutdown: function () {
        //resetting wave properties
        this.waveProperties.timeCheck = 1500;
        this.waveProperties.max = 24;
        this.waveProperties.active = 0;
        this.waveProperties.counter = 24;
    }
}

var enemyProperties = {
    enemyLarge: {hp: 100, minV: 50, maxV: 80, img: 'bigBubble', nextSize: 'enemyMed', dmg: 50, points: 10},
    enemyMed: {hp: 50, minV: 100, maxV: 80, img: 'medBubble', nextSize: 'enemySmall', dmg: 20, points: 5},
    enemySmall: {hp: 10, minV: 200, maxV: 80, img: 'smallBubble', nextSize: 'null', dmg: 10, points: 1}
};

