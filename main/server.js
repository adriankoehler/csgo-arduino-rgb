var dataPin = 6;
var stripLength = 83

var startupColor = "#00ff00"; //Color after lanuching script
var csNoGame = "#ffffff"; //Main Menu or after game exit
var csWarmup = "#ff00ff"; //Warmup
var csRoundLive = "#00ff00"; //Round Live
var csFreezetime = "#ffffff"; //Freezetime
var csCtWin = "#0000ff"; //Counter terrorist win
var csTtWin = "#ffff00"; //Terrorist win
var csBombPlanted = "#ff0000"; //Bomb planted


var CSGOGSI = require('node-csgo-gsi');
var gsi = new CSGOGSI();

//var five = require("johnny-five");
//var board = new five.Board();

//---
pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();
var strip = null;

board.on("ready", function() {
  strip = new pixel.Strip({
    board: this,
    controller: "FIRMATA",
    strips: [ {pin: dataPin, length: stripLength}, ],
    gamma: 2.8,
  });

  strip.on("ready", function() {
    // Set the entire strip to pink.
    strip.color('#990033');
    strip.show();
  });

  strip.color(startupColor);
  strip.show();

	var bombPlanted = false;

	/*This event is added by me by modyfing main index.js of node-csgo-gsi package in(node_modules\node-csgo-gsi\index.js)),
	so if you install manually node-csgo-gsi by using npm, without replacing with downloaded index.js, this event won't work.*/
	gsi.on('noGame', function(data) {
	    if (data == 'none'){
        strip.color(csNoGame);
        strip.show();
	    }
	});

	gsi.on('gamePhase', function(data) {
	    if (data == 'warmup'){
        strip.color(csWarmup);
        strip.show();
	    }
	});

	gsi.on('roundPhase', function(data) {
	    if (data == 'live'){
	    	if (bombPlanted != true){
          strip.color(csRoundLive);
          strip.show();
	    	}
	    }
	    if (data == 'freezetime'){
        strip.color(csFreezetime);
        strip.show();
	    }
	    if(data == 'over'){
	    	bombPlanted = false;
	    }
	});

	gsi.on('roundWinTeam', function(data) {
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

	gsi.on('bombTimeStart', function(time) {
		bombPlanted = true;
    strip.color(csBombPlanted);
    strip.show();
	});

	this.on("exit", function() {
    strip.color('#000');
    strip.show();
  });

});


// board.on("ready", function() {
//
// 	var led = new five.Led.RGB({
// 		pins: {
// 			red: redPin,
// 			green: greenPin,
// 			blue: bluePin
// 		}
// 	});
//
// 	led.color(startupColor);
//
// 	var bombPlanted = false;
//
// 	/*This event is added by me by modyfing main index.js of node-csgo-gsi package in(node_modules\node-csgo-gsi\index.js)),
// 	so if you install manually node-csgo-gsi by using npm, without replacing with downloaded index.js, this event won't work.*/
// 	gsi.on('noGame', function(data) {
// 	    if (data == 'none'){
// 	    	led.color(csNoGame);
// 	    }
// 	});
//
// 	gsi.on('gamePhase', function(data) {
// 	    if (data == 'warmup'){
// 	    	led.color(csWarmup);
// 	    }
// 	});
//
// 	gsi.on('roundPhase', function(data) {
// 	    if (data == 'live'){
// 	    	if (bombPlanted != true){
// 	    		led.color(csRoundLive);
// 	    	}
// 	    }
// 	    if (data == 'freezetime'){
// 	    	led.color(csFreezetime);
// 	    }
// 	    if(data == 'over'){
// 	    	bombPlanted = false;
// 	    }
// 	});
//
// 	gsi.on('roundWinTeam', function(data) {
// 	    if (data == 'CT'){
// 	    	led.stop();
// 	    	led.color(csCtWin);
// 	    }
// 	    if (data == 'T'){
// 	    	led.stop();
// 	    	led.color(csTtWin);
// 	    }
// 	});
//
// 	gsi.on('bombTimeStart', function(time) {
// 		bombPlanted = true;
// 		led.color(csBombPlanted);
// 	});
//
// 	this.on("exit", function() {
// 		led.stop();
//     	led.off();
//   	});
//
// });
