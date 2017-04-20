//state is the main menu state
var menuState = {
    //code to make assets goes here
    create: function () {

        this.backimage = game.add.image(0, 0, 'background'); //adding the background

        game.input.gamepad.start(); // start gamepad
        game.global.pad = game.input.gamepad.pad1; //allowing first player to navigate UI
        if (game.global.isPlaying && !game.global.menuMusic.isPlaying) {
            game.global.menuMusic.loopFull(0.4);
        }

        var nameLabel = game.add.image(game.width / 2, 230, 'title');
        nameLabel.anchor.setTo(0.5, 0.5);

        //create buttons
        this.btnP1 = new Button(game, game.width / 2, 470, 'playBttn', function () {
            game.state.start('characterselect', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);

        }, this, 1, 0);
        this.btnP1.anchor.setTo(0.5, 0.5);

        this.btnO = new Button(game, game.width / 2, 570, 'optionsBttn', function () {
            game.state.start('option', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
        }, this, 1, 0);
        this.btnO.anchor.setTo(0.5, 0.5);

        this.btnC = new Button(game, 1150, 30, 'credits', function () {
            game.state.start('credit', Phaser.Plugin.StateTransition.Out.SlideBottom, Phaser.Plugin.StateTransition.In.SlideBottom);
        },this,1,0);


        this.btnM = new Button(game, 50, 30, 'soundIcons', function () {
            if (game.global.isPlaying) {
                game.global.menuMusic.stop();
                game.global.gameMusicPlay = false;
                game.global.isPlaying = !game.global.isPlaying;
            }
            else {
                game.global.menuMusic.play();
                game.global.gameMusicPlay = true;
                game.global.isPlaying = !game.global.isPlaying;
            }
        });
        game.global.bttnArr = [this.btnC, this.btnP1, this.btnO]; //add all the buttons in the scene in order to the array

    },

    update: function () {
        this.backimage.y -= 0.4;
        if (this.backimage.y <= - this.backimage.height +736) {
            
        }
        game.global.moveMenu(this.box); //this function helps to navigate through menu
        this.btnM.frame = (game.global.menuMusic.isPlaying) ? 0 : 1;

    }
};

/* -- States below are the different menu button states -- */

var instructionState = {
    create: function () {
        game.add.image(0, 0, 'background');
        game.add.image(0, 5, 'controllerInstruction');

        this.btnPlay = new Button(game, 550, 650, 'play', function () {
            game.global.menuMusic.stop();
            game.state.start('load'); //Switches to load state. This starts the game.
        }, this, 1, 0);
        this.btnPlay.anchor.setTo(0.5, 0.5);

        this.btnE = new Button(game, 750, 650, 'exit', function () {
            game.state.start('menu', Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
        }, this, 1, 0);
        this.btnE.anchor.setTo(0.5, 0.5);

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
        this.bttn = new Button(game, 10, 650, 'exit', function () {
            game.state.start('menu', Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
        });

        var options = game.add.image(game.width / 2, 180, 'OptionsTitle');
        options.anchor.setTo(0.5, 0.5);
 

        var mute = game.add.image(400, 380, 'MusicButtom');
        this.btnM = new Button(game, 700, 360, 'soundIcons', function () {
            if (game.global.isPlaying) {
                game.global.menuMusic.stop();
                game.global.gameMusicPlay = false;
                game.global.isPlaying = !game.global.isPlaying;
            }
            else {
                game.global.menuMusic.play();
                game.global.gameMusicPlay = false;
                game.global.isPlaying = !game.global.isPlaying;
            }
        });

        var volume = game.add.image(200, 500, 'VolumeTitle');

        this.SlideBack = game.add.image(500, 535, 'sliderBarBack');
        this.SlideBack.anchor.setTo(0, 0.5);

        this.moveC = false;
        this.currPoint = game.global.menuMusic.volume * 10;

        this.createVolumeSlider();



        game.global.bttnArr = [this.bttn]; //add all the buttons in the scene in order to the array
    },

    update: function () {
        game.global.moveMenu(); //this function helps to navigate through menu
        this.btnM.frame = (game.global.menuMusic.isPlaying) ? 0 : 1;

        if (this.moveC) {
            if (game.input.mousePointer.x > this.circle.x + this.circle.width / 2 && this.currPoint <= 9) {
                this.circle.x = this.volPoints[++this.currPoint];
                game.global.menuMusic.volume = this.currPoint / 10;
                game.global.gameMusicVol = this.currPoint/10;
            }
            if (game.input.mousePointer.x < this.circle.x - this.circle.width && this.currPoint > 0) {
                this.circle.x = this.volPoints[--this.currPoint];
                game.global.menuMusic.volume = this.currPoint / 10;
                game.global.gameMusicVol = this.currPoint/10;


            }

        }

    },

    createVolumeSlider: function () {
        this.bar = this.add.image(530, 535, 'sliderBar');
        this.bar.anchor.setTo(0, 0.5);
        var vw = this.bar.x;
        var xw = this.bar.width / 10;
        this.volPoints = [vw, vw + xw, vw + xw * 2, vw + xw * 3, vw + xw * 4, vw + xw * 5, vw + xw * 6, vw + xw * 7, vw + xw * 8, vw + xw * 9, vw + xw * 10];
        this.circle = this.add.image(this.volPoints[this.currPoint], this.bar.y, 'sliderCircle');
        this.circle.anchor.setTo(0.5, 0.5);
        this.circle.inputEnabled = true;
        this.circle.events.onInputDown.add(listener, this);
        this.circle.events.onInputUp.add(listener, this);

        function listener() {
            this.moveC = !this.moveC;
        }

    }

};


var creditState = {

    create: function () {
        game.add.image(0, 0, 'background');

        this.cImage = game.add.image(0, 200, 'creditMenu');

        this.btnE = new Button(game, 20, 620, 'exitIcon', function () {
            game.state.start('menu', Phaser.Plugin.StateTransition.Out.SlideTop, Phaser.Plugin.StateTransition.In.SlideTop);
        });

        game.global.bttnArr = [this.btnE]; //add all the buttons in the scene in order to the array



    },
    //code to update the assets goes here //changes are reflected in game render
    update: function () {
        this.cImage.y--;
        if (this.cImage.y === - this.cImage.height) {
            game.state.start('menu', Phaser.Plugin.StateTransition.Out.SlideTop, Phaser.Plugin.StateTransition.In.SlideTop);
        }
    }
};



/* This is not a part of menu. State is shown when both players die*/
var gameOverState = {
    create: function () {
        game.global.MapSelect = 0;
        this.gameOverMusic = game.add.audio("gameOverMusic");
        this.gameOverMusic.play(null, null, 0.4, false, false);
        game.add.image(0, 0, 'background');

        this.over = game.add.image(game.width/2,300,'GameOver');
        this.over.anchor.setTo(0.5,0.5);


        this.btnPlayA = new Button(game, 400, 570, 'playAgain', function () {
            gameOverState.gameOverMusic.stop();
            game.state.start('characterselect'); //Starts the game again
        }, this, 1, 0);
        this.btnE = new Button(game, 700, 600, 'exit', function () {
            gameOverState.gameOverMusic.stop();
            game.state.start('menu', Phaser.Plugin.StateTransition.Out.ScaleUp, Phaser.Plugin.StateTransition.In.ScaleUp);
        }, this, 1, 0);


        var winner = (game.global.score1 > game.global.score2) ? "Player1Win" : "Player2Win";


        var winnerImage = game.add.image(game.width/2,450,winner);
        winnerImage.anchor.setTo(0.5,0.5);

        game.global.bttnArr = [this.btnPlayA, this.btnE];

    }
};
var characterSelect = {
    create: function () {
        game.global.pad2 = game.input.gamepad.pad2;
        game.add.image(0, 0, 'background');
        game.add.image(320, 15, 'CharacterSelectText');
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.leftKey.onDown.add(this.Select2Left, this);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.rightKey.onDown.add(this.Select2Right,this);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.Select2Enter,this);
        this.upkey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.upkey.onDown.add(this.Select2Up,this);
        this.downkey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.downkey.onDown.add(this.Select2Down,this);
        this.wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.wkey.onDown.add(this.Select1Up,this);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.sKey.onDown.add(this.Select1Down,this);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.aKey.onDown.add(this.Select1Left,this);
        this.dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.dkey.onDown.add(this.Select1Right,this);
        this.shiftkey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.shiftkey.onDown.add(this.Select1Enter,this);
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR,Phaser.Keyboard.UP,Phaser.Keyboard.DOWN]);
        this.Player1Index = 0;
        this.Player2Index = 0;
        this.player1box = game.add.sprite(190, 100, game.global.SplashArray[this.Player1Index]);
        this.player2box = game.add.sprite(700, 100, game.global.SplashArray[0]);
        this.btnE = new Button(game, 0, game.height - 70, 'exit', function () {
            game.state.start('menu', Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
        }, this, 1, 0);
        this.btnP1 = new Button(game, game.width - 180, game.height - 70, 'playBttn', function () {
            if(this.Ready1 && this.Ready2) {
                game.state.start('levelSelect', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
            }

        }, this, 1, 0);
        this.P1Down = new Button(game, 300, 640, 'ArrowDown', function () {
           this.Select1Down();
        }, this, 1, 0);
        this.P1UP = new Button(game, 300, 100, 'ArrowUp', function () {
            this.Select1Up();
        }, this, 1, 0);
        this.P1Right = new Button(game, 530, 324, 'ArrowRight', function () {
            this.Select1Right();
        }, this, 1, 0);
        this.P1Left = new Button(game, 188, 324, 'ArrowLeft', function () {
            this.Select1Left();
        }, this, 1, 0);
        this.P2Down = new Button(game, 815, 640, 'ArrowDown', function () {
                this.Select2Down();

        }, this, 1, 0);
        this.P2UP = new Button(game, 815, 100, 'ArrowUp', function () {
            this.Select2Up();
        }, this, 1, 0);
        this.P2Right = new Button(game, 1040, 324, 'ArrowRight', function () {
          this.Select2Right();
        }, this, 1, 0);
        this.P2Left = new Button(game, 700, 324, 'ArrowLeft', function () {
         this.Select2Left();
        }, this, 1, 0);
        this.legend = game.add.image(game.width / 2, 710, 'Legend');
        this.legend.anchor.setTo(0.5, 0.5);
        this.Ready1 = false;
        this.Ready2 = false;
        this.count1=0;
        this.count2=0;
    },
    update: function () {
        this.Select1();
        this.Select2();
        if(this.Ready1 === true && this.Ready2 === true){
            game.state.start('levelSelect', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
        }

    },

    Select1Up: function () {
        if(!this.Ready1) {
            if (this.Player1Index === 0) {
                this.Player1Index = game.global.SplashArray.length - 1;
                this.player1box.loadTexture(game.global.SplashArray[this.Player1Index]);
                game.global.Player1Select[0] = this.Player1Index;
            }
            else {
                this.Player1Index--;
                this.player1box.loadTexture(game.global.SplashArray[this.Player1Index]);
                game.global.Player1Select[0] = this.Player1Index;
            }
        }
    },
    Select1Down: function () {
        if(!this.Ready1) {
            if (this.Player1Index === game.global.SplashArray.length - 1) {
                this.Player1Index = 0;
                this.player1box.loadTexture(game.global.SplashArray[this.Player1Index]);
                game.global.Player1Select[0] = this.Player1Index;
            }
            else {
                this.Player1Index++;
                this.player1box.loadTexture(game.global.SplashArray[this.Player1Index]);
                game.global.Player1Select[0] = this.Player1Index;
            }
        }

    },
    Select1Left: function () {
        if(!this.Ready1) {
            if (this.player1box.frame === 0) {
                this.player1box.frame = 4;
                game.global.Player1Select[1] = this.player1box.frame;
            }
            else {
                this.player1box.frame--;
                game.global.Player1Select[1] = this.player1box.frame;
            }
        }

    },
    Select1Right: function () {
        if(!this.Ready1) {
            this.player1box.frame++;
            game.global.Player1Select[1] = this.player1box.frame;
        }
    },
    Select1Enter: function () {
        this.Ready1 = true;
        if(this.count1 ===0) {
            game.add.image(190, 100, 'Ready');
            this.count1++;
        }
    },
    Select2Up: function () {
        if(!this.Ready2) {
            if (this.Player2Index === 0) {
                this.Player2Index = game.global.SplashArray.length - 1;
                this.player2box.loadTexture(game.global.SplashArray[this.Player2Index]);
                game.global.Player2Select[0] = this.Player2Index;
            }
            else {
                this.Player2Index--;
                this.player2box.loadTexture(game.global.SplashArray[this.Player2Index]);
                game.global.Player2Select[0] = this.Player2Index;
            }
        }
    },
    Select2Down: function () {
        if(!this.Ready2) {
            if (this.Player2Index === game.global.SplashArray.length - 1) {
                this.Player2Index = 0;
                this.player2box.loadTexture(game.global.SplashArray[this.Player2Index]);
                game.global.Player2Select[0] = this.Player2Index;
            }
            else {
                this.Player2Index++;
                this.player2box.loadTexture(game.global.SplashArray[this.Player2Index]);
                game.global.Player2Select[0] = this.Player2Index;
            }
        }

    },
    Select2Left: function () {
        if(!this.Ready2) {
            if (this.player2box.frame === 0) {
                this.player2box.frame = 4;
                game.global.Player2Select[1] = this.player2box.frame;
            }
            else {
                this.player2box.frame--;
                game.global.Player2Select[1] = this.player2box.frame;
            }
        }

    },
    Select2Right: function () {
        if(!this.Ready2) {
            this.player2box.frame++;
            game.global.Player2Select[1] = this.player2box.frame;
        }
    },
    Select2Enter:function () {
        this.Ready2 = true;
        if(this.count2 ===0) {
            game.add.image(700, 100, 'Ready');
            this.count2++;
        }

    },
    Select1: function () {
        if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 20)) {
            this.Select1Left();
        }
        else if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 20)) {
            this.Select1Right();

        }
        if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_UP, 20)) {
            this.Select1Up();
        }
        else if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_DOWN, 20)) {
            this.Select1Down();
        }
        if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_A, 20)) { //&& Ready === true
            this.Select1Enter();

        }
    },
    Select2: function () {
        if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 20)) {
            this.Select2Left();
        }
        else if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 20)) {
            this.Select2Right();
        }
        if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_UP, 20)) {
            this.Select2Up();
        }
        else if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_DOWN, 20)) {
            this.Select2Down();
        }
        if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_A, 20)) {
            this.Select2Enter();

        }
    }
};
var LevelSelect = {
    create: function () {
        game.add.image(0, 0, 'background');
        this.title = game.add.image(game.width/2 , 45 , 'MapSelectText');
        this.title.anchor.setTo(0.5,0.5);
        this.backplate = game.add.image(game.width/2,game.height/2,'Backplate');
        this.backplate.anchor.setTo(0.5,0.5);
        this.CurrentImage = game.add.sprite(game.width/2, game.height/2, "LevelSplash");
        this.CurrentImage.anchor.setTo(0.5,0.5);
        this.btnE = new Button(game, 0, game.height - 70, 'exit', function () {
            game.state.start('menu', Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
        }, this, 1, 0);
        this.btnP1 = new Button(game, game.width - 180, game.height - 70, 'playBttn', function () {
            game.state.start('instruction', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);

        }, this, 1, 0);
        this.Initialize();
        this.P1Right = new Button(game, 1050, 300, 'ArrowRight', function () {
            if (game.global.MapSelect === 5) {
                game.global.MapSelect = 0;
                game.global.MusicSelect = 0;
                this.CurrentImage.frame = game.global.MapSelect;

            }
            else {
                game.global.MapSelect++;
                game.global.MusicSelect++;
                this.CurrentImage.frame = game.global.MapSelect;
            }
        }, this, 1, 0);
        this.P1Left = new Button(game, 200, 300, 'ArrowLeft', function () {
            if (game.global.MapSelect === 0) {
                game.global.MapSelect = 5;
                game.global.MusicSelect = 5;
                this.CurrentImage.frame = game.global.MapSelect;
            }
            else {
                game.global.MapSelect--;
                game.global.MusicSelect--;
                this.CurrentImage.frame = game.global.MapSelect;

            }
        }, this, 1, 0);
        this.PlayerPick = Math.floor((Math.random() * 2)+ 1);
        if(this.PlayerPick === 1){
            this.Picker = game.add.image(0,0,'Player1Pick');
        }
        else{
            this.Picker = game.add.image(0,0,'Player2Pick');
        }
        this.timer=0;
        this.runcount =0;
        this.continue1 = false;
        this.continue2 = false;

    },
    update: function () {
        this.timer++;
        if (this.timer++ >= 200){
            if (this.runcount === 0){
                this.Picker.destroy();
            }
            if(this.PlayerPick === 1){
                this.Select1();
                this.continue1 = true;
            }
            else {
                this.Select2();
                this.continue2 = true;
            }
        }
    },

    Select1: function () {
        if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 20)) {
            this.Select1Right();
        }
        else if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 20)) {
            this.Select1Left();

        }
        if (game.global.pad.justPressed(Phaser.Gamepad.XBOX360_A, 20)) {
           this.Select1Enter();

        }
    },
    Select2: function () {
        if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 20)) {
            this.Select2Right();
        }
        else if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 20)) {
           this.Select2Left();

        }
        if (game.global.pad2.justPressed(Phaser.Gamepad.XBOX360_A, 20)) {
           this.Select2Enter();

        }
    },

    Initialize: function () {
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.leftKey.onDown.add(this.Select2Left, this);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.rightKey.onDown.add(this.Select2Right,this);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.Select2Enter,this);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.aKey.onDown.add(this.Select1Left,this);
        this.dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.dkey.onDown.add(this.Select1Right,this);
        this.shiftkey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.shiftkey.onDown.add(this.Select1Enter,this);
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR,Phaser.Keyboard.UP,Phaser.Keyboard.DOWN]);

    },
    Select1Left: function () {
        if(this.continue1 === true) {
            if (game.global.MapSelect === 0) {
                game.global.MapSelect = 5;
                game.global.MusicSelect = 5;
                this.CurrentImage.frame = game.global.MapSelect;
            }
            else {
                game.global.MapSelect--;
                game.global.MusicSelect--;
                this.CurrentImage.frame = game.global.MapSelect;

            }
        }

    },
    Select1Right: function () {
        if (this.continue1 === true)
            if (game.global.MapSelect === 5) {
                game.global.MapSelect = 0;
                game.global.MusicSelect = 0;
                this.CurrentImage.frame = game.global.MapSelect;

            }
            else {
                game.global.MapSelect++;
                game.global.MusicSelect++;
                this.CurrentImage.frame = game.global.MapSelect;
            }
    },
    Select1Enter: function () {
        if(this.continue1 === true) {
            game.state.start('instruction', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
        }
    },
    Select2Enter: function () {
        if(this.continue2 === true) {
            game.state.start('instruction', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
        }
    },
    Select2Left: function () {
        if(this.continue2 === true) {
            if (game.global.MapSelect === 0) {
                game.global.MapSelect = 5;
                game.global.MusicSelect = 5;
                this.CurrentImage.frame = game.global.MapSelect;
            }
            else {
                game.global.MapSelect--;
                game.global.MusicSelect --;
                this.CurrentImage.frame = game.global.MapSelect;

            }
        }

    },
    Select2Right: function () {
        if(this.continue2 === true) {
            if (game.global.MapSelect === 5) {
                game.global.MapSelect = 0;
                game.global.MusicSelect = 0;
                this.CurrentImage.frame = game.global.MapSelect;

            }
            else {
                game.global.MapSelect++;
                game.global.MusicSelect++;
                this.CurrentImage.frame = game.global.MapSelect;
            }
        }
    }
};
