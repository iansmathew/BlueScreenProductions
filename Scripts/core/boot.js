//state loads asset files for menu screen
var bootState = {
    //place menu assets to be loaded here
    preload: function(){
        /*--Main Menu--*/
        game.load.image('title', "././Assets/img/tempMenuAssets/gameTitle.png");
        game.load.image('background', "././Assets/img/tempMenuAssets/BackgroundMenu.png");
        game.load.spritesheet('playBttn', "././Assets/img/tempMenuAssets/playSprite.png",176,66,2);
        game.load.spritesheet('optionsBttn', "././Assets/img/tempMenuAssets/optionsSprite.png",280,66,2);
        game.load.image('credits', "././Assets/img/tempMenuAssets/creditBttn.png");

        /*--Options--*/
        game.load.image('exitIcon', "././Assets/img/tempMenuAssets/exitleft.png");
        game.load.image('OptionsTitle', "././Assets/img/tempMenuAssets/OptionsTitle.png");
        game.load.image('VolumeTitle', "././Assets/img/tempMenuAssets/VolumeTitle.png");
        game.load.image('MusicButtom', "././Assets/img/tempMenuAssets/MusicButtom.png");
        game.load.image('sliderBar', "././Assets/img/tempMenuAssets/sliderBar.png");
        game.load.image('sliderBarBack', "././Assets/img/tempMenuAssets/slideBarBack.png");
        game.load.image('sliderCircle', "././Assets/img/tempMenuAssets/sliderCircle.png");

        /*--Instructions--*/
        game.load.image('controllerInstruction', "././Assets/img/tempMenuAssets/controllerSetup.png");
        game.load.spritesheet('play', "././Assets/img/tempMenuAssets/startSprite.png",210,68,2);
        game.load.spritesheet('exit', "././Assets/img/tempMenuAssets/exitSprite.png",165,65,2);

        /*--Map Select--*/
        game.load.spritesheet('LevelSplash', "././Assets/img/tempMenuAssets/MapSelect.png", 768 ,422);
        game.load.image('MapSelectText', "././Assets/img/tempMenuAssets/MapSelectTitle.png");
        game.load.image('Backplate', "././Assets/img/tempMenuAssets/MapSelectBack.png");
        game.load.image('Player1Pick',"././Assets/img/tempMenuAssets/Player1Select.png");
        game.load.image('Player2Pick',"././Assets/img/tempMenuAssets/Player2Select.png");

        /*--CharacterSelect--*/
        game.load.image("Ready", "././Assets/img/tempMenuAssets/Ready.png");
        game.load.image('CharacterSelectText', "././Assets/img/tempMenuAssets/CharacterSelect.png");
        game.load.spritesheet('AdventureSplash', "Assets/img/Character/AdventurerSplash.png", 380 ,580);
        game.load.spritesheet('SoldierSplash', "Assets/img/Character/SoldierSplash.png", 380 ,580);
        game.load.spritesheet('GuySplash', "Assets/img/Character/GuySplash.png", 380 ,580);
        game.load.spritesheet('GirlSplash', "Assets/img/Character/GrilSplash.png", 380 ,580);
        game.load.spritesheet('ZombieSplash', "Assets/img/Character/ZombieSplash.png", 380 ,580);

        /*--GameOver--*/
        game.load.spritesheet('playAgain', "././Assets/img/tempMenuAssets/PlayAgain.png",260,130,2);
        game.load.image('GameOver', "././Assets/img/tempMenuAssets/GameOver.png");
        game.load.image('Player1Win', "././Assets/img/tempMenuAssets/PlayerWin.png");
        game.load.image('Player2Win', "././Assets/img/tempMenuAssets/Player2Win.png");

        /*--Credits--*/
        game.load.image('creditMenu', "././Assets/img/tempMenuAssets/creditMenu.png");

        /*--Various--*/
        game.load.spritesheet('soundIcons', "././Assets/img/tempMenuAssets/sound_icon.png", 100, 100);
        game.load.image("ArrowUp", "././Assets/img/tempMenuAssets/UpArrow.png");
        game.load.image("ArrowDown", "././Assets/img/tempMenuAssets/DownArrow.png");
        game.load.image("ArrowLeft", "././Assets/img/tempMenuAssets/LeftArrow.png");
        game.load.image("ArrowRight", "././Assets/img/tempMenuAssets/RightArrow.png");
        game.load.image("Legend", "././Assets/img/tempMenuAssets/Legend1P.png");

        /*--Audio--*/
        game.load.audio('menuMusic',"././Assets/sound/Music/MenuMusic.wav");
        game.load.audio('gameOverMusic',"././Assets/sound/Music/GameOver.ogg");
        game.load.audio('buttonSwitch',"././Assets/sound/Misc/ButtonSwitch.wav");
        game.load.audio('buttonForward',"././Assets/sound/Misc/ButtonForward.wav");
        game.load.audio('DefaultMusic', "././Assets/sound/Music/GameMusic.wav");
        game.load.audio('CityMusic',"././Assets/sound/Music/City.wav");
        game.load.audio('CandyLandMusic',"././Assets/sound/Music/CandyLand.wav");
        game.load.audio('DesertMusic',"././Assets/sound/Music/Desert.wav");
        game.load.audio('GrasslandMusic',"././Assets/sound/Music/Grassland.wav");
        game.load.audio('SnowMusic',"././Assets/sound/Music/Snow.wav");

        game.load.image('Wavy', "././Assets/img/tempGameAssets/Wave.png");
        game.load.image('Next', "././Assets/img/tempGameAssets/Next.png");
        game.load.spritesheet('Numbers', "././Assets/img/tempGameAssets/Numbers.png", 55, 79);
        game.load.image('Pause', "././Assets/img/tempMenuAssets/PauseScreen.png");

        game.load.image('loadBar', "././Assets/img/tempMenuAssets/loadBar.png");
        game.load.image('loading', "././Assets/img/tempMenuAssets/Loading.png");

        game.load.bitmapFont("KennyFont", "././Assets/font/font.png", "././Assets/font/font.fnt");


        


    },
    //code to make assets goes here
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        game.global.menuMusic = game.add.sound('menuMusic', 1, true);
        game.state.start('menu');
    }
};