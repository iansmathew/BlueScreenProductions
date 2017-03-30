//state is the main menu state
var menuState = {
    //code to make assets goes here
    create: function(){
        game.add.image(0, 0, 'background'); //adding the background
        game.input.gamepad.start(); // start gamepad
        game.global.pad = game.input.gamepad.pad1; //allowing first player to navigate UI

        var nameLabel = game.add.image(game.width/2,200 , 'title');
        nameLabel.anchor.setTo(0.5, 0.5);

        //create buttons
        this.btnP1 = new Button(game, game.width/2, 400, 'playBttn', function (){
            game.state.start('characterselect', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);

        },this , 1,0);
        this.btnP1.anchor.setTo(0.5,0.5);

        this.btnO = new Button(game, game.width/2, 500, 'optionsBttn', function () {
            game.state.start('option', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
        }, this , 1,0);
        this.btnO.anchor.setTo(0.5,0.5);

        this.btnC = new Button(game, 1255, 25, 'credits', function () {
            game.state.start('credit', Phaser.Plugin.StateTransition.Out.SlideBottom, Phaser.Plugin.StateTransition.In.SlideBottom);
        },this,1,0);
        this.btnC.anchor.setTo(0.5,0.5);



        game.global.bttnArr = [this.btnC, this.btnP1, this.btnO]; //add all the buttons in the scene in order to the array
        if (!game.global.menuMusic.isPlaying) {
            game.global.menuMusic.loopFull(0.4);
        }
    },

    update: function () {
        game.global.moveMenu(); //this function helps to navigate through menu
    }
};

/* -- States below are the different menu button states -- */

var instructionState = {
    create: function () {
        game.add.image(0, 0, 'background');
        game.add.image(30, -50, 'controllerInstruction');

        this.btnPlay = new Button(game, 550, 650, 'play', function () {
            game.global.menuMusic.stop();
            game.state.start('load'); //Switches to load state. This starts the game.
        },this,1,0);
        this.btnPlay.anchor.setTo(0.5,0.5);

        this.btnE = new Button(game, 750, 650, 'exit',function () {
            game.state.start('menu',Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
        },this,1,0);
        this.btnE.anchor.setTo(0.5,0.5);

        game.global.bttnArr = [this.btnPlay, this.btnE]; //add all the buttons in the scene in order to the array
    },

    update: function () {
        game.global.moveMenu(this.box); //this function helps to navigate through menu
    }
};


var optionState = {
  //code to create the buttons and text
  create: function () {
      var isPlaying = true;
      game.add.image(0, 0, 'background');
      this.bttn = new Button(game, 1100, 650, 'exit', function () {
          game.state.start('menu', Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
      });

      var options = game.add.text(550, 50, 'Options',
          {font: '60px Times New Roman', fill: '#000000' });

      this.btnM = new Button(game, 50, 30, 'box', function() {
          if (isPlaying) {
              game.global.menuMusic.stop();
              isPlaying = !isPlaying;
          }
          else {
              game.global.menuMusic.play();
              isPlaying = !isPlaying;
          }
      });

      game.global.bttnArr = [this.bttn, this.btnM]; //add all the buttons in the scene in order to the array
      this.box = game.add.image(game.global.bttnArr[game.global.bttnIdx].x, game.global.bttnArr[game.global.bttnIdx].y, 'box'); //this is the box that highlights the selected option
  },


  update: function () {
      game.global.moveMenu(this.btnM, this.box); //this function helps to navigate through menu
  }
};


var creditState = {

    create: function(){
        game.add.image(0,0,'background');

        this.cImage = game.add.image(0, 200, 'creditMenu');

        this.btnE = new Button(game, 1125, 655, 'exit',function () {
            game.state.start('menu',Phaser.Plugin.StateTransition.Out.SlideTop, Phaser.Plugin.StateTransition.In.SlideTop);
        });

        game.global.bttnArr = [this.btnE];



    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){
        this.cImage.y--;
        game.global.moveMenu(this.box);
    }
};



/* This is not a part of menu. State is shown when both players die*/
var gameOverState = {
    create: function () {
        this.gameOverMusic = game.add.audio("gameOverMusic");
        this.gameOverMusic.play(null, null, 0.4, false, false);
        game.add.image(0, 0, 'background');

        var gameOver = game.add.text(550, 300, 'GAME OVER!',
            {font: '40px Times New Roman', fill: '#ffffff' });

        this.btnPlayA = new Button(game, 500, 600, 'playAgain', function () {
            gameOverState.gameOverMusic.stop();
            game.state.start('play'); //Starts the game again
        });
        this.btnE = new Button(game, 700, 610, 'exit',function () {
            gameOverState.gameOverMusic.stop();
            game.state.start('menu', Phaser.Plugin.StateTransition.Out.ScaleUp, Phaser.Plugin.StateTransition.In.ScaleUp);
        });

		 this.scoreCounter1 = game.add.text(70, 10,'P1 Score: ' + game.global.score1,
            {font: '20px Times New Roman', fill: '#ffffff' });

        this.scoreCounter2 = game.add.text(1120, 10,'P2 Score: ' + game.global.score2,
            {font: '20px Times New Roman', fill: '#ffffff' });

        var winner = (game.global.score1 > game.global.score2) ? "PLAYER 1" : "PLAYER 2";

        var winnerText = game.add.text(500, 100, winner + "WINS!");

        game.global.bttnArr = [this.btnPlayA, this.btnE];
        this.box = game.add.image(game.global.bttnArr[game.global.bttnIdx].x, game.global.bttnArr[game.global.bttnIdx].y, 'box');
    },

    update: function () {
        game.global.moveMenu(this.box);
    }
};

var characterSelect = {
    create: function(){
        game.global.pad2 = game.input.gamepad.pad2;
        game.add.image(0,0, 'background');
        game.add.image(320, 0 ,'CharacterSelectText');
        Player1Index = 0;
        Player2Index = 0;
        player1box = game.add.sprite(200,70,game.global.SplashArray[Player1Index]);
        player2box = game.add.sprite(700,70,game.global.SplashArray[0]);
        Ready = false;

        //Box2.graphicsData[0].fillColor = 0xFFFF00;
    },
    update: function(){
        this.Select1();
        this.Select2();
    },
    Select1: function(){
        if(game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 20)){
            if(player1box.frame === 0) {
                player1box.frame = 4;
                game.global.Player1Select[1] = player1box.frame;
            }
            else{
                player1box.frame--;
                game.global.Player1Select[1] = player1box.frame;
            }
        }
        else if(game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 20)){
            player1box.frame++;
            game.global.Player1Select[1] =  player1box.frame;
        }
        if(game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_UP, 20)){
            if(Player1Index === 0){
                Player1Index = game.global.SplashArray.length - 1;
                player1box = game.add.sprite(200,70,game.global.SplashArray[Player1Index]);
                game.global.Player1Select[0] = Player1Index;
            }
            else {
                Player1Index--;
                player1box = game.add.sprite(200, 70, game.global.SplashArray[Player1Index]);
                game.global.Player1Select[0] = Player1Index;
            }

        }
        else if(game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_DOWN, 20)){
            if (Player1Index === game.global.SplashArray.length - 1 ) {
                Player1Index = 0;
                player1box = game.add.sprite(200, 70, game.global.SplashArray[Player1Index]);
                game.global.Player1Select[0] = Player1Index;
            }
            else {
                Player1Index++;
                player1box = game.add.sprite(200, 70, game.global.SplashArray[Player1Index]);
                game.global.Player1Select[0] = Player1Index;
            }

        }
        if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_A, 20)) { //&& Ready === true
            game.state.start('levelSelect', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);

        }
    },
    Select2: function () {
        if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 20)) {
            if (player2box.frame === 0) {
                player2box.frame = 4;
                game.global.Player2Select[1] = player2box.frame;
            }
            else {
                player2box.frame--;
                game.global.Player2Select[1] = player2box.frame;
            }
        }
        else if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 20)) {
            player2box.frame++;
            game.global.Player2Select[1] = player2box.frame;
        }
        if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_UP, 20)) {
            if (Player2Index === 0) {
                Player2Index = game.global.SplashArray.length - 1;
                player2box = game.add.sprite(700, 70, game.global.SplashArray[Player2Index]);
                game.global.Player2Select[0] = Player2Index;
            }
            else {
                Player2Index--;
                player1box = game.add.sprite(700, 70, game.global.SplashArray[Player2Index]);
                game.global.Player2Select[0] = Player2Index;
            }

        }
        else if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_DOWN, 20)) {
            if (Player2Index === game.global.SplashArray.length - 1) {
                Player2Index = 0;
                player2box = game.add.sprite(700, 70, game.global.SplashArray[Player2Index]);
                game.global.Player2Select[0] = Player2Index;
            }
            else {
                Player2Index++;
                player2box = game.add.sprite(700, 70, game.global.SplashArray[Player2Index]);
                game.global.Player2Select[0] = Player2Index;
            }

        }
        if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_A, 20)) {
            Ready = true;

        }
    }
};
    var LevelSelect = {
        create: function () {
            game.add.image(0, 0, 'background');
            CurrentImage = game.add.sprite(256, 147, "LevelSplash");
            //PlayerPick = Math.floor((Math.random() * 2)+ 1);
            // console.log(PlayerPick);

        },
        update: function () {
            // if(PlayerPick === 1){
            this.Select1();
            //}
            //else{
            this.Select2();
            //}
        },

        Select1: function () {
            if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 20)) {
                if (game.global.MapSelect === 5) {
                    game.global.MapSelect = 0;
                    console.log(game.global.MapSelect);
                    CurrentImage.frame = game.global.MapSelect;

                }
                else {
                    game.global.MapSelect++;
                    console.log(game.global.MapSelect);
                    CurrentImage.frame = game.global.MapSelect;
                }
            }
            else if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 20)) {
                if (game.global.MapSelect === 0) {
                    game.global.MapSelect = 5;
                    console.log(game.global.MapSelect);
                    CurrentImage.frame = game.global.MapSelect;
                }
                else {
                    game.global.MapSelect--;
                    console.log(game.global.MapSelect);
                    CurrentImage.frame = game.global.MapSelect;

                }

            }
            if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_A, 20)) {
                game.state.start('instruction', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);

            }
        },
        Select2: function () {
            if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 20)) {
                if (game.global.MapSelect === 5) {
                    game.global.MapSelect = 0;
                    console.log(game.global.MapSelect);
                    CurrentImage.frame = game.global.MapSelect;

                }
                else {
                    game.global.MapSelect++;
                    console.log(game.global.MapSelect);
                    CurrentImage.frame = game.global.MapSelect;
                }
            }
            else if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 20)) {
                if (game.global.MapSelect === 0) {
                    game.global.MapSelect = 5;
                    console.log(game.global.MapSelect);
                    CurrentImage.frame = game.global.MapSelect;
                }
                else {
                    game.global.MapSelect--;
                    console.log(game.global.MapSelect);
                    CurrentImage.frame = game.global.MapSelect;

                }

            }
            if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_A, 20)) {
                game.state.start('instruction', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);

            }
        }
    };
