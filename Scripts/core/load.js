//state preloads assets for playState
var loadState = {
    //place assets to be loaded here
    preload: function(){
        game.load.image('background', "././Assets/img/tempGameAssets/tempBackground.png");

        game.load.image('player', "././Assets/img/tempGameAssets/tempPlayer.png");
        game.load.image('bullet', "././Assets/img/tempGameAssets/tempBullet.png");
        game.load.image('bigBubble', "././Assets/img/tempGameAssets/tempBigBubble.png");
        game.load.image('medBubble', "././Assets/img/tempGameAssets/tempMediumBubble.png");
        game.load.image('smallBubble', "././Assets/img/tempGameAssets/tempSmallBubble.png");
        game.load.image('playAgain', "././Assets/img/tempMenuAssets/playAgainO.png");

    },
    //code to make assets goes here
    create: function(){
        game.state.start('play');
    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    },
};