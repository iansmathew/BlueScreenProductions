//state preload's assets for playState
var loadState = {
    //place assets to be loaded here
    preload: function(){
        game.load.image('tileSet1', "Assets/TileMaps/tileSet1.png");
        game.load.tilemap('tileMap', "Assets/TileMaps/map.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('player1', "Assets/img/tempGameAssets/Player1.png", 60, 83);
        game.load.spritesheet('player2', "Assets/img/tempGameAssets/Player2.png", 60, 83);
        game.load.image('bullet', "././Assets/img/tempGameAssets/tempBullet.png");
        game.load.image('bigBubble', "././Assets/img/tempGameAssets/tempBigBubble.png");
        game.load.image('medBubble', "././Assets/img/tempGameAssets/tempMediumBubble.png");
        game.load.image('smallBubble', "././Assets/img/tempGameAssets/tempSmallBubble.png");
        game.load.image('playAgain', "././Assets/img/tempMenuAssets/playAgainO.png");
        game.load.image('exit', "././Assets/img/tempMenuAssets/btnExit.png");
        game.load.audio('bulletSfx', "././Assets/sound/blaster.mp3");
        game.load.audio('bubbleSfx', "././Assets/sound/explosion.mp3");
        game.load.image('bloodVfx', "././Assets/img/tempGameAssets/BloodFX.png");
        game.load.spritesheet('FireworkVFX', "././Assets/img/tempGameAssets/FireworkVFX.png",32,32,4);

    },
    //code to make assets goes here
    create: function(){
        game.state.start('play');
    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    }
};