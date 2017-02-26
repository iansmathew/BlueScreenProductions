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
    this.scale.setTo(0,0);

    this.body.velocity.y = game.rnd.integerInRange(80, 100) * game.rnd.pick([-1, 1]);
    this.body.velocity.x = game.rnd.integerInRange(80, 100) * game.rnd.pick([-1, 1]);
    this.nextSize = 'MedEnemy';
    this.hp = 50;
    this.dmg = 50;
    this.wavePoints = 10;
    this.powerUpChance = 20;
    this.score = 100;
    this.partOfWave = newWave;
    //this.bubbleSfx = game.add.audio('bubbleSfx');
    //this.bubbleSfx.allowMultiple = true;
    this.animations.add('pop', [1,2,3,4,5],30,false);

    if (this.partOfWave) {
        waveProperties.counter -= this.wavePoints;
        waveProperties.active += this.wavePoints;
    }

    game.add.tween(this.scale).to({x: 1, y: 1}, 300).start();

    game.add.existing(this);
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

    this.body.velocity.y = game.rnd.integerInRange(80, 100) * game.rnd.pick([-1, 1]);
    this.body.velocity.x = game.rnd.integerInRange(80, 100) * game.rnd.pick([-1, 1]);
    this.nextSize = 'SmallEnemy';
    this.hp = 25;
    this.dmg = 25;
    this.wavePoints = 5;
    this.powerUpChance = 20;
    this.score = 50;
    this.partOfWave = newWave;
    //this.bubbleSfx = game.add.audio('bubbleSfx');
    //this.bubbleSfx.allowMultiple = true;
    this.animations.add('pop', [1,2,3,4,5],30,false);

    if (this.partOfWave) {
        waveProperties.counter -= this.wavePoints;
        waveProperties.active += this.wavePoints;
    }

    game.add.tween(this.scale).to({x: 1, y: 1}, 300).start();

    game.add.existing(this);
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

    this.body.velocity.y = game.rnd.integerInRange(80, 100) * game.rnd.pick([-1, 1]);
    this.body.velocity.x = game.rnd.integerInRange(80, 100) * game.rnd.pick([-1, 1]);
    this.nextSize = null;
    this.hp = 10;
    this.dmg = 10;
    this.wavePoints = 1;
    this.powerUpChance = 20;
    this.score = 25;
    this.partOfWave = newWave;
    //this.bubbleSfx = game.add.audio('bubbleSfx');
    //this.bubbleSfx.allowMultiple = true;
    this.animations.add('pop', [1,2,3,4,5],30,false);

    if (this.partOfWave) {
        waveProperties.counter -= this.wavePoints;
        waveProperties.active += this.wavePoints;
    }

    game.add.tween(this.scale).to({x: 1, y: 1}, 300).start();

    game.add.existing(this);
};

/*--------------------------------------------------------*/
SmallEnemy.prototype = Object.create(Phaser.Sprite.prototype);
SmallEnemy.prototype.constructor = SmallEnemy;
/*--------------------------------------------------------*/


/////////////////////////////////////////////////////////////////
////                      ENEMY CLASS                        ////
/////////////////////////////////////////////////////////////////
var Enemies = function (game) {
    Phaser.Group.call(this, game);
    
    this.spawnWaves = true;
    
    //this.spawnEnemies();

    game.add.existing(this);
};

Enemies.prototype = Object.create(Phaser.Group.prototype);
Enemies.prototype.constructor = Enemies;

Enemies.prototype.spawnEnemies = function () {
    if (waveProperties.counter > 0) {
        if (this.spawnWaves && waveProperties.active < waveProperties.max) {
            while (waveProperties.active < waveProperties.max)
            {
                var type = Phaser.ArrayUtils.getRandomItem(["BigEnemy", "MedEnemy", "SmallEnemy"]);
                var posX = game.rnd.integerInRange(80, 1400);
                var posY = game.rnd.integerInRange(50, 400);
                this.createEnemy(type, posX, posY, true);

            }
        }
    }
    else if (this.getFirstAlive() == null) {
        this.spawnWaves = false;
        if (this.spawnWaves == false) {
            var myText = game.add.text(500, 80, 'Get ready for next wave');
            game.add.tween(myText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
            game.add.tween(myText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);


            waveProperties.active = 0;
            waveProperties.counter = waveProperties.max * 4;
            waveProperties.max *= 2;
            this.spawnWaves = true;


        }
    }
};

Enemies.prototype.createEnemy = function (type, x, y, newWave) {
    var numEnem = (newWave) ? 1 : 2;
    for (var i =0; i < numEnem; i++) {
        switch (type) {
            case 'BigEnemy':
                this.add(new BigEnemy(game, x, y, newWave));
                break;

            case 'MedEnemy':
                this.add(new MedEnemy(game, x, y, newWave));
                break;

            case 'SmallEnemy':
                this.add(new SmallEnemy(game, x, y, newWave));
                break;
            default:
                console.log("Unknown Enemy: " + type);

        }
    }
};

Enemies.prototype.takeDamage = function (bullet, enemy, powerUpG, counter, player) {

    enemy.hp -= bullet.dmg;
    bullet.kill();
    if (enemy.hp <= 0)
    {
        enemy.kill();
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
    else
    this.createEnemy(nextEnemy, deadEnemy.x, deadEnemy.y, false);
};

Enemies.prototype.dropPowerUp = function (x, y, group) {
    var drop = game.add.sprite(x, y, 'powerUp');
    drop.lifespan = 4000; //powerup only lives for 4 seconds
    drop.item = Phaser.ArrayUtils.getRandomItem(["MachineGun"]);
    game.physics.arcade.enable(drop);
    group.add(drop);
};
/////////////////////////////////////////////////////////////////
////                      WAVE PROPERTIES                    ////
/////////////////////////////////////////////////////////////////
var waveProperties = {
    max: 12,
    active: 0,
    counter: 24,
};