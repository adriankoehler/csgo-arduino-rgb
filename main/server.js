var dataPin = 6;
var stripLength = 83

var startupColor = "#00ff00"; //Color after lanuching script
var csNoGame = "#ffffff"; //Main Menu or after game exit
var csWarmup = "#ff00ff"; //Warmup
var csRoundLive = "#00ff00"; //Round Live
var csFreezetime = "#ffffff"; //Freezetime
var csCtWin = "#0000ff"; //Counter terrorist win
var csTtWin = "#ffff00"; //Terrorist win
var csBombPlanted = "#FFA41C"; //Bomb planted
var csBombTimeBelowTen = "#FF761C";
var csBombTimeBelowFive = "#FF2411";

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
    strips: [ {pin: dataPin, length: stripLength}, ],
    gamma: 2.8,
  });

  // strip.on("ready", function() {
  //   // Set the entire strip to pink.
  //   strip.color('#990033');
  //   strip.show();
  // });

  strip.color(startupColor);
  strip.show();

	var bombPlanted = false;

	/*This event is added by me by modyfing main index.js of node-csgo-gsi package in(node_modules\node-csgo-gsi\index.js)),
	so if you install manually node-csgo-gsi by using npm, without replacing with downloaded index.js, this event won't work.*/
	gsi.on('noGame', function(data) {
	    if (data == 'none'){
        console.log("noGame");
        strip.color(csNoGame);
        strip.show();
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
        strip.color(csFreezetime);
        strip.show();
	    }
	    if(data == 'over'){
        console.log("round over");
	    	bombPlanted = false;
	    }
	});

// ---- CT/T WIN ----
	gsi.on('roundWinTeam', function(data) {
    console.log("roundWinTeam");
	    if (data == 'CT'){
	    	// led.stop();
	    	// led.color(csCtWin);
        strip.color(csCtWin);
        strip.show();
	    }
	    if (data == 'T'){
        strip.color(csTtWin);
        strip.show();
	    }
	});

// ---- BOMBTIMER ----
	gsi.on('bombTimeStart', function(time) {
    console.log("bombTimeStart");

    console.log("bombtime: " + time);
		bombPlanted = true;
    var currentColor = csBombPlanted;

    // strip.color(currentColor);
    // strip.show();

    var timeElapsed = 0
    var myVar = setInterval(myTimer, 1000);

    function myTimer() {
      timeElapsed++;
      var numLedsOn = Math.ceil(2.075*timeElapsed);
      console.log("time elapsed: " + timeElapsed + " - ledsOn: " + numLedsOn);

      if (timeElapsed >= 30) {
        currentColor=csBombTimeBelowTen;
        console.log("below 10");
      }
      if (timeElapsed >= 35) {
        currentColor=csBombTimeBelowFive;
        console.log("below 5");
      }

      strip.color("#000");
      for (var i = 0; i <= numLedsOn; i++) {
        //         strip.pixel(i).color(currentColor);
//                       ^
//
// TypeError: Cannot read property 'color' of undefined

        strip.pixel(i).color(currentColor);
      }
      strip.show();
    }

    function myStopFunction() {
      clearInterval(myVar);
    }

    // 29
    // bombtime(inloop): 39.45199990272522
    // while (time>0) {
    //   console.log("bombtime(inloop): " + time);
    //   var currentColor = csBombPlanted;
    //   if(time<10) {currentColor = csBombTimeBelowTen;}
    //   if(time<5) {currentColor = csBombTimeBelowFive;}
    //
    //   var numLedsOn = Math.ceil(0.7217*time);
    //   console.log(numLedsOn);
    //
    //   for (var i = 0; i <= numLedsOn; i++) {
    //     strip.pixel(i).color(csBombPlanted);
    //   }
    //   strip.show();
    //
    //   // delay(500);
    // }

    // for (var i = 0; i <= time*2; i++) {
    //     if(i<20) {currentColor = csBombTimeBelowTen;}
    //     if(i<10) {currentColor = csBombTimeBelowFive;}
    //
    //     var numLedsOn = Math.ceil(0.7217*time);
    //     console.log("leds on: " + numLedsOn);
    //
    //     for (var i = 0; i <= numLedsOn; i++) {
    //       strip.color("#000");
    //       strip.pixel(i).color(currentColor);
    //     }
    //     strip.show();
    //
    //   delay(500);
    // }

	});

// EXIT csgo-arduino program
	this.on("exit", function() {
    console.log("exit prgm");
    strip.color('#000');
    strip.show();
  });

});
