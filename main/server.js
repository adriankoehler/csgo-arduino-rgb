var dataPin = 6;
var stripLength = 83;

var startupColor = "#FFFFFF"; //Color after lanuching script
var csNoGame = "#FFFFFF"; //Main Menu or after game exit
var csWarmup = "#FFF1D0"; //Warmup (orange-ish white)
var csRoundLive = "#00FF00"; //Round Live, std
var csPlayerT = "#FFD37E"; //Round Live, Player is T --- dunkel: B57D1D hell: FFD37E
var csPlayerCT = "#B6DAFF"; //Round Live, Player is CT --- dunkel: 02468F hell: B6DAFF
var csFreezetime = "#DAFFFF"; //Freezetime
var csCtWin = "#1010FF"; //Counter terrorist win
var csTtWin = "#FFBA00"; //Terrorist win
var csBombPlanted = "#FFA41C"; //Bomb planted (orange)
var csBombTimeBelowTen = "#FF701C"; //Bombtimer <10s (orange-red)
var csBombTimeBelowFive = "#FF1201"; //Bombtimer <5s (red)

var CSGOGSI = require('node-csgo-gsi');
var gsi = new CSGOGSI();

pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();
var strip = null;

function delay(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
}

board.on("ready", function() {
  strip = new pixel.Strip({
    board: this,
    controller: "FIRMATA",
    strips: [{pin: dataPin, length: stripLength}],
    gamma: 2.8
  });

  strip.color(startupColor);
  strip.show();

    var bombPlanted = false;

    gsi.on('noGame', function(data) {
        if (data == 'none'){
        console.log("noGame");
        strip.color(csNoGame);
        strip.show();
        }
    });

// ---- PLAYER TEAM CT/T ----
  gsi.on('playerTeam', function(data) {
      if (data == 'CT'){
          console.log("is on ct");
          csRoundLive = csPlayerCT;
      }
      if (data == 'T'){
          console.log("is on t");
          csRoundLive = csPlayerT;
      }
  });

// ---- WARMUP ----
	gsi.on('gamePhase', function(data) {
	    if (data == 'warmup'){
        console.log("warmup");
        strip.color(csWarmup);
        strip.show();
	    }
	});

// ---- LIVE/FREEZETIME/OVER ----
	gsi.on('roundPhase', function(data) {
	    if (data == 'live'){
	    	if (bombPlanted != true){
              console.log("csRoundLive");
              strip.color(csRoundLive);
              strip.show();
	    	}
	    }
	    if (data == 'freezetime'){
            console.log("freezetime");
            //strip.color(csFreezetime);
            //strip.show();
	    }
	    if(data == 'over'){
            console.log("round over");
            stopBombtimer(timerId);
	    	bombPlanted = false;
	    }
	});

// ---- CT/T WIN ----
	gsi.on('roundWinTeam', function(data) {
        console.log("roundWinTeam");
            if (data == 'CT'){
                strip.color(csCtWin);
                strip.show();
            }
            if (data == 'T'){
                strip.color(csTtWin);
                strip.show();
            }
	});

// ---- BOMBTIMER ----
  var timerId;

  function stopBombtimer() {
    clearInterval(timerId);
  }

	gsi.on('bombTimeStart', function(time) {
    console.log("bombTimeStart");
    console.log("bombtime: " + time);

		bombPlanted = true;
    var currentColor = csBombPlanted;

    var timeElapsed = (40*2) - (time*2) + 0.2;
    console.log("bombtime: " + time + " -- " + timeElapsed);
    timerId = setInterval(myTimer, 500);

    function myTimer() {
      timeElapsed += 0.5;
      var numLedsOn = Math.ceil(2.075*timeElapsed);
      console.log("time elapsed: " + timeElapsed + " - ledsOn: " + numLedsOn);

      if (timeElapsed >= (30)) {
        currentColor=csBombTimeBelowTen;
        console.log("below 10");
      }
      if (timeElapsed >= (35)) {
        currentColor=csBombTimeBelowFive;
        console.log("below 5");
      }

      strip.color("#000");
      for (var i = 0; i <= numLedsOn; i++) {
        try {
          strip.pixel(i).color(currentColor);
        }
        catch(e) {
          console.log("failed to set color, stop timer");
          stopBombtimer(timerId);
        }
      }
      strip.show();
    }
	});

// EXIT CSGO-ARDUINO
	this.on("exit", function() {
    strip.color('#000');
    strip.show();
    console.log("exit prgm");
  });

});
