var playState = function(game){};
playState.prototype = {
    create: function() {
        //Leave Background Color this for second stage.
        //Keep Alpha for all images.
        //TO CHANGE MAP change the Number of backgroundmap,tileMap and TileSet to either 1 or 2 atm


        this.background = game.add.image(0, 0, game.global.MapArray[0][game.global.MapSelect]);
        this.map = game.add.tilemap(game.global.MapArray[1][game.global.MapSelect]);
        this.map.addTilesetImage(game.global.TileSetArray[game.global.MapSelect]);
        this.foreground = this.map.createLayer('Tile Layer 1');
        this.map.setCollisionBetween(1, 10000, true, this.foreground);
        game.physics.arcade.gravity.y = 1000;
        if (game.global.MapSelect === 2){
            this.player1 = new Player(game, 80, 636, game.global.CharacterArray[game.global.Player1Select[0]][game.global.Player1Select[1]], 1); // first player == 1
            this.player2 = new Player(game, 1200, 636, game.global.CharacterArray[game.global.Player2Select[0]][game.global.Player2Select[1]], 2);//second player == 2
        }
        else if (game.global.MapSelect === 3){
            this.player1 = new Player(game, 60, 400, game.global.CharacterArray[game.global.Player1Select[0]][game.global.Player1Select[1]], 1); // first player == 1
            this.player2 = new Player(game,  1210, 400,game.global.CharacterArray[game.global.Player2Select[0]][game.global.Player2Select[1]], 2);//second player == 2
        }

        else if (game.global.MapSelect === 5){
            this.player1 = new Player(game,  60, 400,game.global.CharacterArray[game.global.Player1Select[0]][game.global.Player1Select[1]], 1); // first player == 1
            this.player2 = new Player(game, 1200, 400, game.global.CharacterArray[game.global.Player2Select[0]][game.global.Player2Select[1]], 2);//second player == 2
        }
        else{
            this.player1 = new Player(game, 80, 636,game.global.CharacterArray[game.global.Player1Select[0]][game.global.Player1Select[1]], 1); // first player == 1
            this.player2 = new Player(game,  1200, 636, game.global.CharacterArray[game.global.Player2Select[0]][game.global.Player2Select[1]], 2);//second player == 2
        }

        this.players = game.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);

        this.player1.checkWorldBounds = true;
        this.player2.checkWorldBounds = true;

        this.player1.events.onOutOfBounds.add(this.player1.onWorldOutBounds, this.player1);

        this.player2.events.onOutOfBounds.add(this.player2.onWorldOutBounds, this.player2);

        this.powerUps = game.add.group();
        this.powerUps.enableBody = true;

        this.enemies = new Enemies(game, this.players);

        this.music = game.global.LevelMusicArray[game.global.MusicSelect];
        this.gameMusic = game.add.audio(this.music);
        this.gameMusic.loopFull(0.4);

        this.scoreCounter1 = game.add.bitmapText(70, 10, "KennyFont",  'P1 Score: ' + this.player1.score, 20);
        this.scoreCounter2 = game.add.bitmapText(950, 10, "KennyFont",  'P2 Score: ' + this.player2.score, 20);


        /*this.scoreCounter1 = game.add.text(70, 10,'P1 Score: ' + this.player1.score,
            {font: '20px Times New Roman', fill: '#ffffff' });*/
/*
        this.scoreCounter2 = game.add.text(1120, 10,'P2 Score: ' + this.player2.score,
            {font: '20px Times New Roman', fill: '#ffffff' });*/


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

        if (game.input.keyboard.addKey(Phaser.Keyboard.P).isDown || game.input.gamepad.pad1.justPressed(Phaser.Gamepad.BUTTON_9) || game.input.gamepad.pad2.justPressed(Phaser.Gamepad.BUTTON_9))
            game.paused = !game.paused;





       /* console.log("MAX: " + waveProperties.max);
        console.log("ACTIVE: " + waveProperties.active);
        console.log("COUNTER: " + waveProperties.counter);*/
    },

    /*render: function () {
        this.enemies.forEachAlive(function (member) {
            game.debug.body(member);
        })
    },*/

    paused: function () {
        this.pauseText1 = game.add.text(500, 80, 'GAME PAUSED ');
        this.pauseText2 = game.add.text(470, 120, 'Press ESC to Unpause ');

    },

    pauseUpdate: function () {
        var pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        if (pauseButton.justDown) {
            this.pauseText1.destroy();
            this.pauseText2.destroy();
            game.paused = !game.paused;
        }
    },

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
