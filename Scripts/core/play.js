//state is the actual game
var playState = {
    //code to make assets goes here
    create: function(){
        /*-- setting world properties --*/
        game.add.sprite(0, 0, 'background');
        game.physics.arcade.gravity.y = 1000;

        //-- creating player --//
        this.player = this.createPlayer();
        this.player.weapon = this.setWeapon(this.player);


        /*-- creating enemy group --*/
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

        this.spawnEnemies('enemyLarge', 1, game.width/2, 0);
        

    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){
        this.movePlayer(this.player);

        game.physics.arcade.overlap(this.player.weapon.bullets, this.enemies, this.hitEnemy, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.killPlayer, null, this);
        
    },

    createPlayer: function () {
        var player = game.add.sprite(game.width/2, 780, 'player');
        player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(player);
        player.body.gravity.y = 1500;
        player.body.bounce.set(0.3);
        player.body.collideWorldBounds = true;
        player.cursor = game.input.keyboard.createCursorKeys();
        player.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //-- User defined properties for player --//
        player.hp = 100;

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

    createEnemies: function () {

    },

    movePlayer: function (player) {
        if (!player.alive) 

        if (player.cursor.left.isDown){
            player.body.velocity.x = -300;
        }
        else if (player.cursor.right.isDown){
            player.body.velocity.x = 300;
        }
        else {
            player.body.velocity.x = 0;
        }

        //jump
        if (player.cursor.up.isDown && player.body.onFloor()){
            player.body.velocity.y = -800;
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
        }
    },
    
    spawnEnemies: function (type, num, prevX, prevY) {
        for (var i =0; i < num; i++){
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
        }
    },
    
    hitEnemy: function (bullet, enemy) {
        bullet.kill(); //bullet dies on impact

        if (enemy.hp <= 0){
            enemy.kill();
            this.spawnEnemies(enemy.nextSize, 2, enemy.x, enemy.y);

        }
        else {
            enemy.hp -= 10;
        }
    },

    killPlayer: function (player, enemy) {
        if (player.hp <= 0) {
            player.kill();
            player.cursor = game.input.keyboard.disable = false; //deleting window.eventListeneres
            player.fireButton = game.input.keyboard.disable = false; //deleting window.eventListeneres
        }
        else
            player.hp -= enemy.dmg;
    },
};

var enemyProperties = {
    enemyLarge: {hp: 100, vel: 50, img: 'bigBubble', nextSize: 'enemyMed', dmg: 50},
    enemyMed: {hp: 50, vel: 100, img: 'medBubble', nextSize: 'enemySmall', dmg: 20},
    enemySmall: {hp: 20, vel: 200, img: 'smallBubble', nextSize: 'null', dmg: 10},
};
