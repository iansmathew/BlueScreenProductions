//state preload's assets for playState
var loadState = {
    //place assets to be loaded here
    preload: function(){
         game.load.image('TileSet1', "Assets/TileMaps/BrownRed.png");
        game.load.tilemap('tileMap1', "Assets/TileMaps/map.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Level-1',"Assets/TileMaps/Level-1.png");

        game.load.image('TileSet2', "Assets/TileMaps/SnowPack.png");
        game.load.tilemap('tileMap2', "Assets/TileMaps/map2.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Level-2',"Assets/TileMaps/Level-2.png");


        game.load.image('Level-3',"Assets/TileMaps/Level-3.png");
        game.load.image('Level-4',"Assets/TileMaps/Level-4.png");
        game.load.image('Level-5',"Assets/TileMaps/Level-5.png");
        game.load.image('Level-6',"Assets/TileMaps/Level-6.png");


        game.load.spritesheet('heart', "Assets/img/tempGameAssets/heartSprite.png", 22, 22);
        game.load.image('gun', "././Assets/img/tempGameAssets/gun.png");
        game.load.image('bFlame', "././Assets/img/tempGameAssets/bulletFlame.png");
        game.load.image('bPistol', "././Assets/img/tempGameAssets/bulletPistol.png");
        game.load.image('bMachineGun', "././Assets/img/tempGameAssets/bulletMachineGun.png");
        game.load.image('bShotgun', "././Assets/img/tempGameAssets/bulletShotgun.png");


        game.load.spritesheet('bigBubble', "././Assets/img/tempGameAssets/largeBubble.png",120,120);
        game.load.spritesheet('medBubble', "././Assets/img/tempGameAssets/mediumBubble.png",74,74);
        game.load.spritesheet('smallBubble',"././Assets/img/tempGameAssets/smallBubble.png",24,24);

        game.load.image('powerUp', "././Assets/img/tempGameAssets/powerUp.png");

        game.load.image('bloodVfx', "././Assets/img/tempGameAssets/BloodFX.png");
        game.load.spritesheet('FireworkVFX', "././Assets/img/tempGameAssets/FireworkVFX.png",32,32,4);

        game.load.audio('bulletSfx', "././Assets/sound/Guns/blaster.mp3");
        game.load.audio('bubbleSfx', "././Assets/sound/Blorp/Blorp.mp3");
        game.load.audio('shotgunSfx',"././Assets/sound/Guns/shotgun.wav");
        game.load.audio('machineGunSfx',"././Assets/sound/Guns/machineGun.wav");
        game.load.audio('sniperSfx',"././Assets/sound/Guns/sniper.mp3");
        game.load.audio('gameMusic', "././Assets/sound/Music/GameMusic.wav");

        game.load.image('playAgain', "././Assets/img/tempMenuAssets/playAgainO.png");
        game.load.image('exit', "././Assets/img/tempMenuAssets/btnExit.png");

        game.load.spritesheet('AdventureSprite', "Assets/img/Character/AdventureSprite.png", 60, 83);
        game.load.spritesheet('AdventurerBlond', "Assets/img/Character/AdventurerBlond.png", 60, 83);
        game.load.spritesheet('AdventurerDark', "Assets/img/Character/AdventurerDark.png", 60, 83);
        game.load.spritesheet('AdventurerGrey', "Assets/img/Character/AdventurerGrey.png", 60, 83);
        game.load.spritesheet('AdventurerOrange', "Assets/img/Character/AdventurerOrange.png", 60, 83);
        game.load.spritesheet('DankPewPew', "Assets/img/Character/DankPewPew.png", 60, 83);
        game.load.spritesheet('DankBald', "Assets/img/Character/DankBald.png", 60, 83);
        game.load.spritesheet('DankBlack', "Assets/img/Character/DankBlack.png", 60, 83);
        game.load.spritesheet('DankPurple', "Assets/img/Character/DankPurple.png", 60, 83);
        game.load.spritesheet('DankRed', "Assets/img/Character/DankRed.png", 60, 83);



    },
    //code to make assets goes here
    create: function(){
        game.state.start('play');
    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    }
};