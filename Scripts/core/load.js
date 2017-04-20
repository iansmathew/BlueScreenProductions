//state preload's assets for playState
var loadState = {
    //place assets to be loaded here
    preload: function(){

        this.backimage = game.add.image(0, 0, 'background');
        this.preloadBar = this.add.sprite(game.width/2, 690, 'loadBar');
        this.preloadBar.scale.setTo(0.8, 0.8);
        this.preloadBar.anchor.setTo(0.5, 0.5);

        this.load.setPreloadSprite(this.preloadBar);


        game.load.audio('bulletSfx', "././Assets/sound/Guns/blaster.mp3");
        game.load.audio('bubbleSfx', "././Assets/sound/Blorp/Blorp.mp3");
        game.load.audio('shotgunSfx',"././Assets/sound/Guns/shotgun.wav");
        game.load.audio('machineGunSfx',"././Assets/sound/Guns/machineGun.wav");
        game.load.audio('ShockSfx',"././Assets/sound/Guns/Shock.wav");
        game.load.audio('RocketSfx', "././Assets/sound/Guns/Rocket.mp3");
        game.load.audio('FlameSfx', "././Assets/sound/Guns/NewFlame.wav");
        game.load.audio('LaserSfx', "././Assets/sound/Guns/LaserCannon.wav");

        game.load.image('TileSet1', "Assets/TileMaps/BrownRed.png");
        game.load.tilemap('tileMap1', "Assets/TileMaps/map.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Level-1', "Assets/TileMaps/Level-1.png");

        game.load.image('TileSet2', "Assets/TileMaps/SnowPack.png");
        game.load.tilemap('tileMap2', "Assets/TileMaps/map2.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Level-2',"Assets/TileMaps/Level-2.png");

        game.load.image('TileSet3', "Assets/TileMaps/CityPack.png");
        game.load.tilemap('tileMap3', "Assets/TileMaps/map3.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Level-3',"Assets/TileMaps/Level-3.png");

        game.load.image('TileSet4', "Assets/TileMaps/SandPack.png");
        game.load.tilemap('tileMap4', "Assets/TileMaps/map4.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Level-4',"Assets/TileMaps/Level-4.png");

        game.load.image('TileSet5', "Assets/TileMaps/CandyPack.png");
        game.load.tilemap('tileMap5', "Assets/TileMaps/map5.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Level-5',"Assets/TileMaps/Level-5.png");

        game.load.image('TileSet6', "Assets/TileMaps/GrassPack.png");
        game.load.tilemap('tileMap6', "Assets/TileMaps/map6.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Level-6',"Assets/TileMaps/Level-6.png");

        game.load.image('Level-3',"Assets/TileMaps/Level-3.png");
        game.load.image('Level-4',"Assets/TileMaps/Level-4.png");
        game.load.image('Level-5',"Assets/TileMaps/Level-5.png");
        game.load.image('Level-6',"Assets/TileMaps/Level-6.png");


        game.load.spritesheet('heart', "Assets/img/tempGameAssets/heartSprite.png", 22, 22);
        game.load.spritesheet('pistol', "././Assets/img/tempGameAssets/pistol.png", 70, 35);
        game.load.spritesheet('machineGun', "././Assets/img/tempGameAssets/machineGun.png", 113, 30);
        game.load.spritesheet('orb', "././Assets/img/tempGameAssets/orb.png", 26, 28);
        game.load.spritesheet('shotgun', "././Assets/img/tempGameAssets/shotgun.png", 110, 40);
        game.load.spritesheet('flamethrower', "././Assets/img/tempGameAssets/flameThrower.png", 100, 35);

        game.load.image('bFlame', "././Assets/img/tempGameAssets/bulletFlame.png");
        game.load.image('bPistol', "././Assets/img/tempGameAssets/bulletPistol.png");
        game.load.image('bMachineGun', "././Assets/img/tempGameAssets/bulletMachineGun.png");
        game.load.image('bShotgun', "././Assets/img/tempGameAssets/bulletShotgun.png");
        game.load.image('bElectric', "././Assets/img/tempGameAssets/bulletLightning.png");




        game.load.spritesheet('bigBubble', "././Assets/img/tempGameAssets/largeBubble.png",120,120);
        game.load.spritesheet('medBubble', "././Assets/img/tempGameAssets/mediumBubble.png",74,74);
        game.load.spritesheet('smallBubble',"././Assets/img/tempGameAssets/smallBubble.png",24,24);
        game.load.spritesheet('metalBubble',"././Assets/img/tempGameAssets/metalBubble.png",24,24);
        game.load.spritesheet('rubberBubble',"././Assets/img/tempGameAssets/rubberBubble.png",74,74);
        game.load.spritesheet('miniRubberBubble',"././Assets/img/tempGameAssets/miniRubberBubble.png",24,24);
        game.load.spritesheet('mineLayerBubble',"././Assets/img/tempGameAssets/mineLayerBubble.png",120,120);
        game.load.spritesheet('mineBubble',"././Assets/img/tempGameAssets/mineBubble.png",24,24);

        game.load.image('powerUp', "././Assets/img/tempGameAssets/powerUp.png");

        game.load.image('bloodVfx', "././Assets/img/tempGameAssets/BloodFX.png");
        game.load.spritesheet('FireworkVFX', "././Assets/img/tempGameAssets/FireworkVFX.png",32,32,4);
        game.load.image('whitePuff', "././Assets/img/tempGameAssets/whitePuff.png");



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
        game.load.spritesheet('GirlSprite', "Assets/img/Character/GirlSprite.png", 60, 83);
        game.load.spritesheet('GirlBlond', "Assets/img/Character/GirlBlond.png", 60, 83);
        game.load.spritesheet('GirlDark', "Assets/img/Character/GirlDark.png", 60, 83);
        game.load.spritesheet('GirlDBlond', "Assets/img/Character/GirlDBlond.png", 60, 83);
        game.load.spritesheet('GirlPurple', "Assets/img/Character/GirlPurple.png", 60, 83);
        game.load.spritesheet('GuySprite', "Assets/img/Character/GuySprite.png", 60, 83);
        game.load.spritesheet('GuyBlack', "Assets/img/Character/GuyBlack.png", 60, 83);
        game.load.spritesheet('GuyBlue', "Assets/img/Character/GuyBlue.png", 60, 83);
        game.load.spritesheet('GuyPurple', "Assets/img/Character/GuyPurple.png", 60, 83);
        game.load.spritesheet('GuyRed', "Assets/img/Character/GuyRed.png", 60, 83);
        game.load.spritesheet('ZombieSprite', "Assets/img/Character/ZombiePewPew.png", 60, 83);
        game.load.spritesheet('ZombieGreen', "Assets/img/Character/ZombieGreen.png", 60, 83);
        game.load.spritesheet('ZombieGrey', "Assets/img/Character/ZombieGrey.png", 60, 83);
        game.load.spritesheet('ZombieGrop', "Assets/img/Character/ZombieGrop.png", 60, 83);
        game.load.spritesheet('ZombieDark', "Assets/img/Character/ZombieDark.png", 60, 83);



    },
    //code to make assets goes here
    create: function(){
        game.state.start('play');
    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    }
};