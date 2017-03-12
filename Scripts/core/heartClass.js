Heart = function (game, x, y, image) {
    Phaser.Sprite.call(this, game, x, y, image); //calls constructor

    this.hp = 20;

    game.add.existing(this);
};

/*--------------------------------------------------------*/
Heart.prototype = Object.create(Phaser.Sprite.prototype);
Heart.prototype.constructor = Heart;
/*--------------------------------------------------------*/

Heart.prototype.update = function () { //it is called every frame automatically

};

Heart.prototype.hitHeart = function (damage) {
    var absorbedDmg = damage - (damage-this.hp); //how much damage does the heart absorb?

    this.hp -= damage;
    console.log(this.hp);

    if (this.hp > 10)
    {
        this.frame = 0;
    }

    else if (this.hp <= 10 && this.hp >0)
    {
        this.frame = 1;
    }

    else if (this.hp <=0)
    {
        this.frame = 2;
        this.hp = 0;
    }



    return absorbedDmg;
};
