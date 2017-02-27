//this is where we declare our game. This code loads last, but runs first
//refer to the 'keys' for switching states
var game = new Phaser.Game(1280, 736, Phaser.AUTO, 'gameDiv');

game.global = {
    score1: 0,
    score2: 0,
    bttnArr: [],
    bttnIdx: 0,
    pad: null,
    moveMenu: function () {
        game.global.bttnArr[game.global.bttnIdx].frame = 1;
        if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_DOWN, 20) && game.global.bttnIdx < game.global.bttnArr.length-1){
            game.global.bttnIdx++;
            game.global.bttnArr[game.global.bttnIdx].frame = 1;
            game.global.bttnArr[game.global.bttnIdx - 1].frame = 0;
        }
        else if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_UP, 20) && game.global.bttnIdx > 0)
        {
            game.global.bttnIdx--;
            game.global.bttnArr[game.global.bttnIdx].frame = 1;
            game.global.bttnArr[game.global.bttnIdx + 1].frame = 0;
        }
        if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_A, 20)) {
            game.global.bttnArr[game.global.bttnIdx].onPress();
            game.global.bttnIdx = 0; //resetting index back to first button
        }
    }
};


game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('option', optionState);
game.state.add('credit', creditState);
game.state.add('instruction', instructionState);
game.state.add('gameOver', gameOverState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');