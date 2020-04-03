var dataPin = 6;
var stripLength = 83;

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
    strips: [ {pin: dataPin, length: stripLength} ],
    gamma: 2.8
  });

  strip.on("ready", function() {

	strip.color('#FDDDCC');
  strip.show();

  // for (var i = 0; i < stripLength; i++) {
  //   strip.pixel(i).color("#FF00");
  // 	strip.show();
  //   console.log(i);
  //   delay(500);
  // }

  });
})
