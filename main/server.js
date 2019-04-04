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
var csBombTimeBelowTen = "#ff761c";
var csBombTimeBelowFive = "FF2411";

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

// ---- WARMUP ----
	gsi.on('gamePhase', function(data) {
	    if (data == 'warmup'){
        strip.color(csWarmup);
        strip.show();
	    }
	});

// ---- LIVE/FREEZETIME/OVER ----
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

// ---- CT/T WIN ----
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

// ---- BOMBTIMER ----
	gsi.on('bombTimeStart', function(time) {
    // todo: count down pixel by pixel, 10s: yellow, 5s: red
    //       blink between each tick?
    // läuft durch for schleife egal ob defused oder nicht?

    // 115s/83leds = 1.3855 leds pro sec auschalten

    // csBombPlanted: #FFA41C
    // red: #FF2411
    // green: #1CFF4B
    // blue: #189FFF
    
    console.log(time);
		bombPlanted = true;

    strip.color(csBombPlanted);
    strip.show();

    while (time>0) {
      console.log(time);
      var currentColor = csBombPlanted;
      if(time<10) {currentColor = csBombTimeBelowTen;}
      if(time<5) {currentColor = csBombTimeBelowFive;}

      var numLedsOn = Math.ceil(1.3855*time);
      console.log(numLedsOn);

      for (var i = 0; i <= numLedsOn; i++) {
        strip.pixel(i).color(csBombPlanted);
      }
      strip.show();

      delay(500);
    }

    // for (var i = 0; i <= stripLength; i++) {
    //   if()
    //   strip.pixel(i).color(csBombPlanted);
    //   strip.show();
    //   delay(500);
    // }

	});

// EXIT csgo-arduino program
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
