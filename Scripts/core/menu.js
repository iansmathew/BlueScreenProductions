//state is the main menu state
var menuState = {
    //code to make assets goes here
    create: function(){
        game.add.image(0, 0, 'background'); //adding the background

        game.input.gamepad.start(); // start gamepad
        game.global.pad = game.input.gamepad.pad1; //allowing first player to navigate UI

        var nameLabel = game.add.image(game.width/2, 100, 'title');
        nameLabel.anchor.setTo(0.5, 0.5);

        //create buttons
        this.btnP1 = new Button(game, 570, 200, 'singleP', function () {
            game.state.start('instruction');
        });
        this.btnO = new Button(game, 570, 300, 'options', function () {
            game.state.start('instruction');
        });
        this.btnC = new Button(game, 570, 400, 'credits', function () {
            game.state.start('credit');
        });
        this.btnE = new Button(game, 570, 500, 'exit', function () {
            game.state.start('option');
        });

        game.global.bttnArr = [this.btnP1, this.btnO, this.btnC, this.btnE]; //add all the buttons in the scene in order to the array
        this.box = game.add.image(game.global.bttnArr[game.global.bttnIdx].x, game.global.bttnArr[game.global.bttnIdx].y, 'box'); //this is the box that highlights the selected option

    },

    update: function () {
        game.global.moveMenu(this.box); //this function helps to navigate through menu
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

        this.btnPlay = new Button(game, 570, 600, 'play', function () {
            game.state.start('load'); //Switches to load state. This starts the game.
        });

        game.global.bttnArr = [this.btnPlay]; //add all the buttons in the scene in order to the array
        this.box = game.add.image(game.global.bttnArr[game.global.bttnIdx].x, game.global.bttnArr[game.global.bttnIdx].y, 'box'); //this is the box that highlights the selected option

    },

    update: function () {
        game.global.moveMenu(this.box); //this function helps to navigate through menu
    }
};


var optionState = {
    //code to create the buttons and text
    create: function () {
        game.add.image(0, 0, 'background');
        this.bttn = new Button(game, 570, 600, 'exit', function () {
            game.state.start('menu');
        });

        game.global.bttnArr = [this.bttn]; //add all the buttons in the scene in order to the array
        this.box = game.add.image(game.global.bttnArr[game.global.bttnIdx].x, game.global.bttnArr[game.global.bttnIdx].y, 'box'); //this is the box that highlights the selected option
    },

    //code to update the assets goes here //changes are reflected in game render
    update: function () {
        game.global.moveMenu(this.box); //this function helps to navigate through menu
    }
};


var creditState = {
    //code to create the buttons and text
    create: function(){
        game.add.image(0,0,'background');
         game.add.text(300,50,'                      PEW PEW\n               ' +
            '              BY\n     BLUE SCREEN PRODUCTIONS',
            {font: '40px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,265,'Producer                                       Cory Ronald',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,305,'Design Lead                                  Diego Camacho',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,345,'Engineer Lead                              Ian Sebastion Mathew',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,385,'Assets Lead                                   Jonathan Baker',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,425,'UI Lead                                         Chris Lee',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,465,'Sound Lead                                   Matthew Gordon',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,505,'QA Lead                                       Terry Humber',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,545,'Development Lead                       Colin Pugh',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,585,'Gameplay Lead                            Antonio Yumbla',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        game.add.text(275,625,'Content Lead                                Jason Lin',
            {font: '30px Times New Roman',fontWeight: 'bold',fill: '#000000'});
        this.btnE = new Button(game, 1125, 655, 'exit',function () {
            game.state.start('menu'); //Goes to menuState
        });

        game.global.bttnArr = [this.btnE];
        this.box = game.add.image(game.global.bttnArr[game.global.bttnIdx].x, game.global.bttnArr[game.global.bttnIdx].y, 'box');


    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){
        game.global.moveMenu(this.box);
    }
};



/* This is not a part of menu. State is shown when both players die*/
var gameOverState = {
    create: function () {
        game.add.image(0, 0, 'background');

        var gameOver = game.add.text(550, 300, 'GAME OVER!',
            {font: '40px Times New Roman', fill: '#ffffff' });

        this.btnPlayA = new Button(game, 500, 600, 'playAgain', function () {
            game.state.start('play'); //Starts the game again
        });
        this.btnE = new Button(game, 700, 610, 'exit',function () {
            game.state.start('menu'); //Goes to menuState
        });

		 this.scoreCounter1 = game.add.text(70, 10,'P1 Score: ' + game.global.score1,
            {font: '20px Times New Roman', fill: '#ffffff' });

        this.scoreCounter2 = game.add.text(1120, 10,'P2 Score: ' + game.global.score2,
            {font: '20px Times New Roman', fill: '#ffffff' });

        game.global.bttnArr = [this.btnPlayA, this.btnE];
        this.box = game.add.image(game.global.bttnArr[game.global.bttnIdx].x, game.global.bttnArr[game.global.bttnIdx].y, 'box');
    },

    update: function () {
        game.global.moveMenu(this.box);
    }
};

