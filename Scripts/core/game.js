//this is where we declare our game. This code loads last, but runs first
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');