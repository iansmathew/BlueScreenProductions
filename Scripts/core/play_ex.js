playState.prototype.waveProperties = {
    timeCheck: 1500, //delay to check if you need to spawn an enemy or not
    max: 12, //max amount of enemies on the screen at a time
    active: 0, //number of active enemies on the screen
    counter: 24 //maximum number of enemies in the wave
};

playState.prototype.spawnEnemyWave = function(){
    /*console.log("Spawn Enemies: " + this.spawnWaves);
    console.log("Active: " + this.waveProperties.active);
    console.log("Max: " + this.waveProperties.max);
    console.log("Counter: " + this.waveProperties.counter);*/

    if (this.waveProperties.counter > 0) {
        if (this.spawnWaves && this.waveProperties.active < this.waveProperties.max) {
            while (this.waveProperties.active < this.waveProperties.max)
            {
                var type = Phaser.ArrayUtils.getRandomItem(["enemyLarge", "enemyMed", "enemySmall"]);
                var posX = game.rnd.integerInRange(80, 1400);
                var posY = game.rnd.integerInRange(50, 400);
                this.createEnemy(type, posX, posY, true);

            }
        }
    }
    else if (this.enemies.getFirstAlive() == null) {
        this.spawnWaves = false;
        console.log("Get ready for next wave");
        if (this.spawnWaves == false) {
            var myText = game.add.text(500, 80, 'Get ready for next wave');
            game.add.tween(myText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
            game.add.tween(myText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);


            this.waveProperties.active = 0;
            this.waveProperties.counter = this.waveProperties.max * 4;
            this.waveProperties.max *= 2;
            this.spawnWaves = true;


        }
    }
};

playState.prototype.killPlayer = function(player, enemy){
    if (player.invulnerable == false) {
        player.isWalking = false;
        player.body.velocity.x = (player.body.touching.right) ? -500 : 500;
        player.body.velocity.y = -300;

        player.hp -= enemy.dmg;
        player.pEmitter.x = player.x;
        player.pEmitter.y = player.y;
        player.pEmitter.start(true,300,null,10);

        player.invulnerable = true;
        this.setInvulnerable(player);

        if (player.hp <= 0)
        {
            player.pEmitter.x = player.x;
            player.pEmitter.y = player.y;
            player.pEmitter.start(true,2000,null,50);
            player.kill();
            player.cursor = game.input.keyboard.disable = false; //deleting window.eventListeneres
            player.fireButton = game.input.keyboard.disable = false; //deleting window.eventListeneres

            /* -- deciding whether to quit the game -- */
            if (!this.players.getFirstAlive()) //quits when there's no players alive
                game.time.events.add(1000, function () { game.state.start('gameOver');}, this); //delay game over by 1 sec for animation
        }
    }
};

playState.prototype.setInvulnerable =  function (player) {
    game.time.events.add(100,
        function () {
            player.isWalking = true;
        }, this);

    game.time.events.add(2000,
        function () {
            player.invulnerable = false;
    }, this);
};

playState.prototype.killBullet = function(bullet){
    bullet.kill();
};

playState.prototype.hitEnemy = function(bullet, enemy, player){
    switch(bullet.key){ //checks which kind of weapon hit the enemy by looking at it's image name
        case 'bullet' :
            enemy.hp -= player.weapon.damage;
            break;
    }
    bullet.kill(); //bullet dies on impact


    if (enemy.hp <= 0)
    {
        player.score += enemy.score;

        enemy.body.enable = false;
        enemy.animations.play('pop');
        enemy.animations.currentAnim.onComplete.add(function () {
            enemy.destroy(); //call destroy when animation ends
        }, this);

        this.bEmitter.x = enemy.x;
        this.bEmitter.y = enemy.y;
        enemy.bubbleSfx.play(null, null, 0.1, false, false);
        this.bEmitter.start(true,2000,null,20);

        this.splitEnemy(enemy.nextSize , enemy.x, enemy.y);
        this.waveProperties.active -= enemy.newWave ? enemy.points : 0;
        this.updateCounter(player);

        console.log(enemy.powerUpChance);

        var roll = game.rnd.integerInRange(0, 100);
        if (roll <= enemy.powerUpChance) {
            console.log("WOOHOO");
            this.spawnPowerUp(enemy.x, enemy.y);
        }
    }
};

playState.prototype.spawnPowerUp = function (x, y) {
    var drop = game.add.sprite(x, y, 'bullet');
    game.physics.arcade.enable(drop);
    this.powerUp.add(drop);
};

playState.prototype.updateCounter = function (player) {
    var counter = (player.color == "red") ? this.scoreCounter1 : this.scoreCounter2;
    counter.text = (player.color == "red") ? "P1 Score: " + player.score : "P2 Score: " + player.score;
};

playState.prototype.splitEnemy = function(enemy, prevX, prevY){
     if (enemy == "null")
            return;

    for (var i=0; i < 2; i++) {
        this.createEnemy(enemy, prevX, prevY, false);
    }
};

playState.prototype.createEnemy = function(type, posX, posY, newWave){
    var enemy = this.enemies.create(posX, posY, enemyProperties[type].img);
    enemy.anchor.setTo(0.5, 0.5);
    enemy.body.collideWorldBounds = true;
    enemy.body.bounce.set(1);
    enemy.body.allowGravity = false;
    enemy.scale.setTo(0,0);

    enemy.body.velocity.y = game.rnd.integerInRange(enemyProperties[type].minV, enemyProperties[type].maxV) * game.rnd.pick([-1, 1]);
    enemy.body.velocity.x = game.rnd.integerInRange(enemyProperties[type].minV, enemyProperties[type].maxV) * game.rnd.pick([-1, 1]);
    enemy.nextSize = enemyProperties[type].nextSize;
    enemy.hp = enemyProperties[type].hp;
    enemy.dmg = enemyProperties[type].dmg;
    enemy.newWave = newWave;
    enemy.points = enemyProperties[type].points;
    enemy.powerUpChance = 100;
    enemy.score = enemyProperties[type].score;
    enemy.bubbleSfx = game.add.audio('bubbleSfx');
    enemy.bubbleSfx.allowMultiple = true;
    enemy.animations.add('pop', [1,2,3,4,5],30,false);

    game.add.tween(enemy.scale).to({x: 1, y: 1}, 300).start();

    this.waveProperties.counter -= newWave ? enemyProperties[type].points : 0;
    this.waveProperties.active += newWave ?  enemyProperties[type].points : 0;

};

playState.prototype.changeWeapon = function (player, powerUp) {
    powerUp.destroy();
    var gunType = game.rnd.pick(['shotgun', 'machineGun','sniper']);
    console.log(gunType);
    this.setWeapon[gunType](player);
};
