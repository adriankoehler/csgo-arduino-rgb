var dataPin = 6;
var stripLength = 30;
// var stripLength = 83;

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
//    strip.color('#FDDDCC');

// for (var i = 0; i < stripLength; i++) {
//   strip.pixel(i).color("#FF0000");
// 	strip.show();
//   delay(500);
// }

  strip.color("#222")
  strip.pixel(0).color("#550055")
  strip.shift(1, pixel.FORWARD, true); // the amount of LEDs to shift, the direction, and whether the pattern should wrap

  strip.show();

  });
})
