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
	strip.color('#FFF');
	strip.show();
  });
})
