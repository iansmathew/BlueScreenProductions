/**
 * Created by iansm on 2017-02-18.
 */
Button = function (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {

    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group);
    this.onPress = callback;
    game.add.existing(this);
};

Button.prototype = Object.create(Phaser.Button.prototype);
Button.prototype.constructor = Button;
