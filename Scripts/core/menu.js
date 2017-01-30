//state is the main menu state
var menuState = {
    //code to make assets goes here
    create: function(){
        //game.state.start('load');//remove this code before starting menu UI
        //adds background image to state
        game.add.image(0, 0, 'background');

        //displays name of game
        var nameLabel = game.add.text(game.width/2, 80, 'PewPew',
            {font: '50px Times New Roman', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);

        //create buttons
        this.btnP1 = game.add.button(570, 200, 'singleP', this.player1);
        this.btnO = game.add.button(570, 300, 'options', this.options);
        this.btnC = game.add.button(570, 400, 'credits',this.credits);
        this.btnE = game.add.button(570, 500, 'exit',this.exit);

    },


    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    },

    player1: function() {
        game.state.start('load');
    },

    options: function() {

    },

    credits:function() {

    },

    exit:function() {

    }

};

/* -- States below are the different menu button states -- */



var optionState = {
    //code to make assets goes here
    create: function(){

    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    }
};




var creditState = {
    //code to make assets goes here
    create: function(){

    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    }
};

