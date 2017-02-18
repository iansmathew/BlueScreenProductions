//state preload's assets for playState
var loadState = {
    //place assets to be loaded here
    preload: function(){
        game.load.image('tileSet1', "Assets/TileMaps/tileSet1.png");
        game.load.tilemap('tileMap', "Assets/TileMaps/map.json", null, Phaser.Tilemap.TILED_JSON);

        game.load.spritesheet('player1', "Assets/img/tempGameAssets/Player1.png", 60, 83);
        game.load.spritesheet('player2', "Assets/img/tempGameAssets/Player2.png", 60, 83);
        game.load.image('bullet', "././Assets/img/tempGameAssets/tempBullet.png");

        game.load.spritesheet('bigBubble', "././Assets/img/tempGameAssets/largeBubble.png",120,120);
        game.load.spritesheet('medBubble', "././Assets/img/tempGameAssets/mediumBubble.png",74,74);
        game.load.spritesheet('smallBubble',"././Assets/img/tempGameAssets/smallBubble.png",24,24);

        game.load.image('bloodVfx', "././Assets/img/tempGameAssets/BloodFX.png");
        game.load.spritesheet('FireworkVFX', "././Assets/img/tempGameAssets/FireworkVFX.png",32,32,4);

        game.load.audio('bulletSfx', "././Assets/sound/Guns/blaster.mp3");
        game.load.audio('bubbleSfx', "././Assets/sound/Blorp/Blorp.mp3");
        game.load.audio('shotgunSfx',"././Assets/sound/Guns/shotgun.mp3");
        game.load.audio('machineGunSfx',"././Assets/sound/Guns/machineGun.mp3");
        game.load.audio('sniperSfx',"././Assets/sound/Guns/sniper.mp3");

        game.load.image('playAgain', "././Assets/img/tempMenuAssets/playAgainO.png");
        game.load.image('exit', "././Assets/img/tempMenuAssets/btnExit.png");

    },
    //code to make assets goes here
    create: function(){
        game.state.start('play');
    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    }
};