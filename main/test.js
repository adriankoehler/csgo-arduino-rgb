var dataPin = 6;
var stripLength = 83

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

	// strip.color('#00468F'); //02468F B57D1D

  for (var i = 0; i < stripLength/2; i++) {
    strip.pixel(i).color("#FFD37E");
  }

  for (var i = 42; i < stripLength; i++) {
    strip.pixel(i).color("#FFF1D0");
  }

	strip.show();

  });
})
