//state loads asset files for menu screen
var bootState = {
    //place menu assets to be loaded here
    preload: function(){

    },
    //code to make assets goes here
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        game.state.start('menu');
    },
};