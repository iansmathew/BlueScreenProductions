//this is where we declare our game. This code loads last, but runs first
//refer to the 'keys' for switching states
var game = new Phaser.Game(1280, 736, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('option', optionState);
game.state.add('credit', creditState);
game.state.add('instruction', instructionState);
game.state.add('gameOver', gameOverState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');