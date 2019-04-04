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
	strip.color('#000');
	strip.show();
  });
})