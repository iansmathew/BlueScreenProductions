/////////////////////////////////////////////////////////////////
////                       BIG ENEMY                         ////
/////////////////////////////////////////////////////////////////


BigEnemy = function (game, x, y, newWave) {
    Phaser.Sprite.call(this, game, x, y, 'bigBubble');

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
    this.body.allowGravity = false;


    this.velY = game.rnd.integerInRange(50, 80) * game.rnd.pick([-1, 1]);
    this.velX = game.rnd.integerInRange(50, 80) * game.rnd.pick([-1, 1]);
    this.nextSize = 'medBubble';
    this.hp = 50;
    this.dmg = 50;
    this.wavePoints = 10;
    this.powerUpChance = 20;
    this.score = 100;
    this.partOfWave = newWave;
    this.animations.add('pop', [1,2,3,4,5],30,false);

    //this.bubbleSfx = game.add.audio('bubbleSfx');
    //this.bubbleSfx.allowMultiple = true;
};

/*--------------------------------------------------------*/
BigEnemy.prototype = Object.create(Phaser.Sprite.prototype);
BigEnemy.prototype.constructor = BigEnemy;
/*--------------------------------------------------------*/



/////////////////////////////////////////////////////////////////
////                    MEDIUM ENEMY                         ////
/////////////////////////////////////////////////////////////////


MedEnemy = function (game, x, y, newWave) {
    Phaser.Sprite.call(this, game, x, y, 'medBubble');

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
    this.body.allowGravity = false;
    this.scale.setTo(0,0);

    this.velY = game.rnd.integerInRange(80, 110) * game.rnd.pick([-1, 1]);
    this.velX = game.rnd.integerInRange(80, 110) * game.rnd.pick([-1, 1]);
    this.nextSize = 'smallBubble';
    this.hp = 25;
    this.dmg = 25;
    this.wavePoints = 5;
    this.powerUpChance = 20;
    this.score = 50;
    this.partOfWave = newWave;
    this.animations.add('pop', [1,2,3,4,5],30,false);

    //this.bubbleSfx = game.add.audio('bubbleSfx');
    //this.bubbleSfx.allowMultiple = true;
};

/*--------------------------------------------------------*/
MedEnemy.prototype = Object.create(Phaser.Sprite.prototype);
MedEnemy.prototype.constructor = MedEnemy;
/*--------------------------------------------------------*/



/////////////////////////////////////////////////////////////////
////                     SMALL ENEMY                         ////
/////////////////////////////////////////////////////////////////

SmallEnemy = function (game, x, y, newWave) {
    Phaser.Sprite.call(this, game, x, y, 'smallBubble');

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
    this.body.allowGravity = false;
    this.scale.setTo(0,0);

    this.velY = game.rnd.integerInRange(100, 140) * game.rnd.pick([-1, 1]);
    this.velX = game.rnd.integerInRange(100, 140) * game.rnd.pick([-1, 1]);
    this.nextSize = null;
    this.hp = 10;
    this.dmg = 10;
    this.wavePoints = 1;
    this.powerUpChance = 20;
    this.score = 25;
    this.partOfWave = newWave;
    this.animations.add('pop', [1,2,3,4,5],30,false);
    //this.bubbleSfx = game.add.audio('bubbleSfx');
    //this.bubbleSfx.allowMultiple = true;
};

/*--------------------------------------------------------*/
SmallEnemy.prototype = Object.create(Phaser.Sprite.prototype);
SmallEnemy.prototype.constructor = SmallEnemy;
/*--------------------------------------------------------*/


/////////////////////////////////////////////////////////////////
////                      ENEMY GROUP                        ////
/////////////////////////////////////////////////////////////////
var Enemies = function (game) {
    Phaser.Group.call(this, game);

    this.spawnWaves = true;
    this.createPool();

    game.add.existing(this);
};

Enemies.prototype = Object.create(Phaser.Group.prototype);
Enemies.prototype.constructor = Enemies;

Enemies.prototype.spawnEnemies = function () {
    if (waveProperties.counter > 0) {
        if (this.spawnWaves && waveProperties.active < waveProperties.max) {
            while (waveProperties.active < waveProperties.max)
            {
                this.addEnemy('bigBubble', 1, game.rnd.integerInRange(80, 1400), game.rnd.integerInRange(50, 400), true);
                this.addEnemy('smallBubble', 1, game.rnd.integerInRange(80, 1400), game.rnd.integerInRange(50, 400), true);
                this.addEnemy('medBubble', 1, game.rnd.integerInRange(80, 1400), game.rnd.integerInRange(50, 400), true);

            }
        }
    }
    else if (this.getFirstAlive() == null) {
        this.spawnWaves = false;
        if (!this.spawnWaves) {
            var myText = game.add.text(500, 80, 'Get ready for wave ' + ++waveProperties.level);
            game.add.tween(myText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
            game.add.tween(myText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);


            waveProperties.active = 0;
            waveProperties.counter = waveProperties.max * 4;
            waveProperties.max *= 2;
            this.spawnWaves = true;


        }
    }
};

Enemies.prototype.takeDamage = function (bullet, enemy, powerUpG, counter, player) {

    enemy.hp -= bullet.dmg;
    bullet.kill();
    if (enemy.hp <= 0)
    {
        enemy.body.enable = false;
        enemy.animations.play('pop');
        enemy.animations.currentAnim.onComplete.add(function () {
            enemy.kill();
        }, this);

        player.score += enemy.score;
        counter.text = (player.color == "red") ? "P1 Score: " + player.score : "P2 Score: " + player.score;

        var roll = game.rnd.integerInRange(0, 100);
        if (roll <= enemy.powerUpChance && enemy.partOfWave) {
            this.dropPowerUp(enemy.x, enemy.y, powerUpG);
        }

    }
};

Enemies.prototype.splitEnemy = function (deadEnemy) {
    if (deadEnemy.partOfWave) {
        waveProperties.active -= deadEnemy.wavePoints;

    }
    var nextEnemy = deadEnemy.nextSize;
    if (nextEnemy == null)
        return;
    else {
        //this.createEnemy(nextEnemy, deadEnemy.x, deadEnemy.y, false);
        this.addEnemy(deadEnemy.nextSize, 2, deadEnemy.x +  game.rnd.integerInRange(-10, 10), deadEnemy.y, false);
    }
};

Enemies.prototype.dropPowerUp = function (x, y, group) {
    var drop = game.add.sprite(x, y, 'powerUp');
    drop.lifespan = 4000; //powerup only lives for 4 seconds
    drop.item = Phaser.ArrayUtils.getRandomItem(["MachineGun", "Shotgun","Spreader","Splitter"]);
    game.physics.arcade.enable(drop);
    group.add(drop);
};

Enemies.prototype.createPool = function () {
    this.classType = BigEnemy;
    this.createMultiple(500);

    this.classType = MedEnemy;
    this.createMultiple(500);

    this.classType = SmallEnemy;
    this.createMultiple(700);


};

Enemies.prototype.addEnemy = function (type, active, x, y, newWave) {
    var counter = 0;
    this.forEachDead(function (sprite) {
        if (counter == active)
            return;
        else if (sprite.key == type)
        {
            counter++;
            sprite.reset(x, y);
            sprite.body.velocity.y = sprite.velY;
            sprite.body.velocity.x = sprite.velX;
            sprite.partOfWave = newWave || false;
            sprite.body.enable = true;
            sprite.frame = 0;
            sprite.scale.setTo(0,0);
            game.add.tween(sprite.scale).to({x: 1, y: 1}, 300).start();

            if (sprite.partOfWave) {
                waveProperties.counter -= sprite.wavePoints;
                waveProperties.active += sprite.wavePoints;

                console.log(waveProperties.active);
            }

        }
    });
};


/////////////////////////////////////////////////////////////////
////                      WAVE PROPERTIES                    ////
/////////////////////////////////////////////////////////////////
var waveProperties = {
    level: 1,
    max: 12,
    active: 0,
    counter: 24,
};