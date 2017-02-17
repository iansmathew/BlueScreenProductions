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
        this.btnP1 = game.add.button(570, 200, 'singleP', function () {
            game.state.start('instruction'); //switches to Help
        });
        this.btnO = game.add.button(570, 300, 'options', function () {
            //switches to Options
        });
        this.btnC = game.add.button(570, 400, 'credits',function () {
            game.state.start('credit');
        });
        this.btnE = game.add.button(570, 500, 'exit', function () {
            //switches to Exit
        });

    }

};

/* -- States below are the different menu button states -- */

var instructionState = {
    create: function () {
        game.add.image(0, 0, 'background');

        var instructions = game.add.text(500, 80, 'Instructions',
            {font: '50px Times New Roman', fill: '#ffffff' });

        var upMoveMent = game.add.text(300, 200, 'Up Arrow Key - Jump',
            {font: '40px Times New Roman', fill: '#ffffff' });

        var rMoveMent = game.add.text(300, 300, 'Right Arrow Key - Move right',
            {font: '40px Times New Roman', fill: '#ffffff' });

        var lMoveMent = game.add.text(300, 400, 'Left Arrow Key - Move left',
            {font: '40px Times New Roman', fill: '#ffffff' });

        var shoot = game.add.text(300, 500, 'Space Bar - Shoot!',
            {font: '40px Times New Roman', fill: '#ffffff' });

        this.btnPlay = game.add.button(570, 600, 'play', function () {
            game.state.start('load'); //Switches to load state. This starts the game.
        });

    }
};


    var optionState = {
    //code to create the buttons and text
    create: function(){

    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    }
};


var creditState = {
    //code to create the buttons and text
    create: function(){
        game.add.image(0,0,'background');
         game.add.text(300,70,'                      PEW PEW\n               ' +
            '              BY\n     BLUE SCREEN PRODUCTIONS',
            {font: '40px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(250,300,'Producer                               Cory Ronald',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(250,335,'Lead Engineer                      Ian Sebastion Matthew',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(250,365,'Lead Assets                          Jonathan Baker',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(250,395,'Lead UI                                Chris Lee',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});



    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    }
};



/* This is not a part of menu. State is shown when both players die*/
var gameOverState = {
    create: function () {
        game.add.image(0, 0, 'background');

        var gameOver = game.add.text(550, 300, 'GAME OVER!',
            {font: '40px Times New Roman', fill: '#ffffff' });

        this.btnPlayA = game.add.button(500, 600, 'playAgain', function () {
            game.state.start('play'); //Starts the game again
        });
        this.btnE = game.add.button(700, 610, 'exit',function () {
            game.state.start('boot'); //Goes to menuState
        });
		
		 this.scoreCounter1 = game.add.text(70, 10,'P1 Score: ' + game.global.score1,
            {font: '20px Times New Roman', fill: '#ffffff' });

        this.scoreCounter2 = game.add.text(1120, 10,'P2 Score: ' + game.global.score2,
            {font: '20px Times New Roman', fill: '#ffffff' });
    }
};

