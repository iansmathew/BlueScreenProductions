playState.prototype.waveProperties = {
    timeCheck: 1500,
    max: 24,
    active: 0,
    counter: 24,
};

playState.prototype.spawnEnemies = function(){
    if (this.waveProperties.counter > 0) {
        while (this.waveProperties.active < this.waveProperties.max / 2) {

            var type = Phaser.ArrayUtils.getRandomItem(["enemyLarge", "enemyMed", "enemySmall"]);
            var posX = game.rnd.integerInRange(80, 1400);
            var posY = game.rnd.integerInRange(50, 400);
            this.createEnemy(type, posX, posY);

            }
        } else {
        console.log("Next wave started..");
        //add text that shows PREPARE FOR NEXT WAVE here.
        this.waveProperties.max *= 2;
        this.waveProperties.timeCheck += this.waveProperties.timeCheck;
        this.waveProperties.counter = this.waveProperties.max;
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
            enemy.hp -= 10;
            break;

    }
    bullet.kill(); //bullet dies on impact


    if (enemy.hp <= 0)
    {
        this.bEmitter.x = enemy.x;
        this.bEmitter.y = enemy.y;
        enemy.bubbleSfx.play();
        this.bEmitter.start(true,2000,null,20);
        enemy.destroy();
        this.splitEnemy(enemy.nextSize , enemy.x, enemy.y);
        this.waveProperties.active -= enemy.points;
        player.score += enemy.score;
        //console.log(player.score);


    }
};

playState.prototype.splitEnemy = function(enemy, prevX, prevY){
     if (enemy == "null")
            return;

    for (var i=0; i < 2; i++) {
        this.createEnemy(enemy, prevX, prevY);
    }
};

playState.prototype.createEnemy = function(type, posX, posY){
    var enemy = this.enemies.create(posX, posY, enemyProperties[type].img);
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
    enemy.score = enemyProperties[type].score;
    enemy.bubbleSfx = game.add.audio('bubbleSfx');
    enemy.bubbleSfx.allowMultiple = true;

    this.waveProperties.counter -= enemyProperties[type].points;
    this.waveProperties.active += enemyProperties[type].points;

}
