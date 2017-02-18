playState.prototype.setWeapon = {
    'shotgun': function (player) {
        console.log("Shotgun");
        player.weapon = game.add.weapon(30, 'bullet'); //
        player.weapon.enableBody = true;
        player.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        player.weapon.bulletAngleVariance = 10;
        player.weapon.bulletGravity.y =-1000;
        player.weapon.bulletSpeed = 850;
        player.weapon.fireRate = 200;
        player.weapon.trackSprite(player);
        player.weapon.damage = 10;
        player.shootSfx = player.shotgunSfx;
    },
    
    'machineGun' : function (player) {
        console.log("Machine Gun");
        player.weapon = game.add.weapon(30, 'bullet'); //
        player.weapon.enableBody = true;
        player.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        player.weapon.bulletGravity.y =-1000;
        player.weapon.bulletSpeed = 800;
        player.weapon.fireRate = 100;
        player.weapon.trackSprite(player);
        player.weapon.damage = 10;
        player.shootSfx = player.machineSfx;
    },
    'sniper' : function (player) {
        console.log("Sniper Rifle");
        player.weapon = game.add.weapon(30, 'bullet'); //
        player.weapon.enableBody = true;
        player.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        player.weapon.bulletGravity.y =-1000;
        player.weapon.bulletSpeed = 1000;
        player.weapon.fireRate = 700;
        player.weapon.trackSprite(player);
        player.weapon.damage = 100;
        player.shootSfx = player.sniperSfx;
    }
};