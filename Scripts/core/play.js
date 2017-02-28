var playState = function(game){};
playState.prototype = {
    create: function(){
        this.map = game.add.tilemap('tileMap');
        this.map.addTilesetImage('tileSet1');
        this.background = this.map.createLayer('Tile Layer 2');
        this.foreground = this.map.createLayer('Tile Layer 1');
        this.map.setCollisionBetween(1, 1000, true, this.foreground);

        game.physics.arcade.gravity.y = 1000;

        this.player1 = new Player(game, 1150, 636, 'player1');
        this.player2 = new Player(game, 120, 636, 'player2');

        this.players = game.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);

        this.powerUps = game.add.group();
        this.powerUps.enableBody = true;

        this.enemies = new Enemies(game);

        this.gameMusic = game.add.audio("gameMusic");
        this.gameMusic.loopFull(0.4);

        this.scoreCounter1 = game.add.text(70, 10,'P1 Score: ' + this.player1.score,
            {font: '20px Times New Roman', fill: '#ffffff' });

        this.scoreCounter2 = game.add.text(1120, 10,'P2 Score: ' + this.player2.score,
            {font: '20px Times New Roman', fill: '#ffffff' });


        game.time.events.loop(2000, this.enemies.spawnEnemies, this.enemies); //loop that spawns enemies
        game.time.events.loop(2000, function () {
            if(!this.players.getFirstAlive()) {
                this.gameMusic.stop();
                game.state.start('gameOver');
            }
        }, this);

    },

    update: function(){
        game.physics.arcade.collide(this.players, this.foreground);
        game.physics.arcade.collide(this.enemies, this.foreground);

        game.physics.arcade.collide(this.powerUps, this.foreground);

        game.physics.arcade.overlap(this.players, this.enemies, function (player, enemy) {
            player.damagePlayer(enemy);
        });

        game.physics.arcade.collide(this.player1.weapon, this.foreground, function (bullet) {
            bullet.kill();
        }, null, this);
        game.physics.arcade.collide(this.player2.weapon, this.foreground, function (bullet) {
            bullet.kill();
        }, null, this);


        game.physics.arcade.overlap(this.player1.weapon[this.player1.currentWeapon], this.enemies, function (bullet, enemy) {
            this.enemies.takeDamage(bullet, enemy, this.powerUps, this.scoreCounter1, this.player1);
            if (enemy.hp <=0)
                this.enemies.splitEnemy(enemy);
        }, null, this);

        game.physics.arcade.overlap(this.player2.weapon[this.player2.currentWeapon], this.enemies, function (bullet, enemy) {
            this.enemies.takeDamage(bullet, enemy, this.powerUps, this.scoreCounter2, this.player2);
            if (enemy.hp <=0) {
                this.enemies.splitEnemy(enemy);
            }
        }, null, this);

        game.physics.arcade.overlap(this.players, this.powerUps, function (player, powerUp) {
            player.powerUp(powerUp);
        });

       /* console.log("MAX: " + waveProperties.max);
        console.log("ACTIVE: " + waveProperties.active);
        console.log("COUNTER: " + waveProperties.counter);*/


    },

    /*render: function () {
        this.enemies.forEachAlive(function (member) {
            game.debug.body(member);
        })
    },*/

    shutdown: function () {
        waveProperties = {
            level: 1,
            max: 12,
            active: 0,
            counter: 24,
        };

        game.global.score1 = this.player1.score;
        game.global.score2 = this.player2.score;
    }
};
